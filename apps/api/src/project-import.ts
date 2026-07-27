import { randomUUID } from "node:crypto";
import type { Express } from "express";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { technologyRegistry } from "@portfolio/technology-registry";
import { categories, projects, technologies, toObjectId } from "./db";
import { cleanProjectInput, getStoredTechnologyIds, resolveSubmittedTechnologyIds } from "./project-utils";
import { errorResponse, serializeDocument, slugify } from "./serialize";
import { projectInputSchema, projectTypes, type ProjectInput } from "./types";

const MAX_ROWS = 1000;
const IMPORT_TTL_MS = 30 * 60 * 1000;
const MAX_STORED_IMPORTS = 20;
const duplicateStrategies = ["skip", "update", "unique-slug"] as const;
const emptyCellStrategies = ["preserve", "clear"] as const;
const statusStrategies = ["draft", "csv"] as const;

type ProjectType = (typeof projectTypes)[number];
type DuplicateStrategy = (typeof duplicateStrategies)[number];
type EmptyCellStrategy = (typeof emptyCellStrategies)[number];
type StatusStrategy = (typeof statusStrategies)[number];
type Severity = "warning" | "error";
type RowStatus = "ready" | "warning" | "error" | "duplicate" | "excluded";
type CommitResultStatus = "created" | "updated" | "skipped" | "failed";

interface SubmittedRow {
  rowId?: string;
  rowNumber: number;
  values: Record<string, string>;
  presentColumns: string[];
}

export interface ProjectImportIssue {
  rowId: string;
  rowNumber: number;
  field?: string;
  severity: Severity;
  code: string;
  message: string;
  originalValue?: unknown;
}

interface ValidatedImportRow {
  rowId: string;
  rowNumber: number;
  status: RowStatus;
  includeByDefault: boolean;
  duplicate?: { type: "csv" | "database"; slug: string; projectId?: string; projectTitle?: string };
  duplicateAction?: DuplicateStrategy;
  issues: ProjectImportIssue[];
  rawValues: Record<string, string>;
  normalized: Record<string, unknown>;
  payload: ProjectInput;
  patch: Partial<ProjectInput>;
  existingProjectId?: string;
}

interface StoredImport {
  id: string;
  expiresAt: number;
  committed: boolean;
  projectType: ProjectType;
  options: ImportOptions;
  rows: ValidatedImportRow[];
}

interface ImportOptions {
  duplicateStrategy: DuplicateStrategy;
  emptyCellStrategy: EmptyCellStrategy;
  statusStrategy: StatusStrategy;
  createMissingCategories: boolean;
}

const validateSchema = z.object({
  projectType: z.enum(projectTypes),
  rows: z.array(z.object({ rowId: z.string().optional(), rowNumber: z.number().int(), values: z.record(z.string(), z.string()), presentColumns: z.array(z.string()) })).max(MAX_ROWS),
  options: z.object({
    duplicateStrategy: z.enum(duplicateStrategies).default("skip"),
    emptyCellStrategy: z.enum(emptyCellStrategies).default("preserve"),
    statusStrategy: z.enum(statusStrategies).default("csv"),
    createMissingCategories: z.boolean().default(false),
  }),
});

const commitSchema = z.object({ importId: z.string().min(1), includedRowIds: z.array(z.string()).max(MAX_ROWS) });
const imports = new Map<string, StoredImport>();
const supportedColumns = new Set([
  "title", "slug", "status", "featured", "displayOrder", "projectType", "categories", "technologies", "excerpt", "description", "heroEyebrow", "heroSubtitle", "heroSummary", "heroBadgeText", "client", "role", "platform", "subtype", "timeline", "launchDate", "year", "teamSize", "statusLabel", "projectUrl", "repositoryUrl", "codepenUrl", "caseStudyUrl", "primaryLinkLabel", "secondaryLinkLabel", "openInNewTab", "featuredImageUrl", "featuredImageAlt", "desktopImageUrl", "desktopImageAlt", "mobileImageUrl", "mobileImageAlt", "cardImageUrl", "cardImageAlt", "overviewHeading", "overviewContent", "overviewIconKey", "challengeHeading", "challengeContent", "challengeIconKey", "challengeAccentColor", "solutionHeading", "solutionContent", "solutionIconKey", "solutionAccentColor", "metrics", "primaryMetrics", "keyResults", "highlights", "gallery",
]);

export function registerProjectImportRoutes(app: Express) {
  app.post("/api/projects/import/validate", async (request, response, next) => {
    try {
      cleanupImports();
      const input = validateSchema.parse(request.body);
      const rows = await validateRows(input.projectType, input.rows, input.options);
      const importId = randomUUID();
      imports.set(importId, { id: importId, expiresAt: Date.now() + IMPORT_TTL_MS, committed: false, projectType: input.projectType, options: input.options, rows });
      trimImports();
      response.json({ data: { importId, expiresAt: new Date(Date.now() + IMPORT_TTL_MS).toISOString(), rows, summary: summarizeRows(rows) } });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/projects/import/commit", async (request, response, next) => {
    try {
      cleanupImports();
      const input = commitSchema.parse(request.body);
      const stored = imports.get(input.importId);
      if (!stored) {
        response.status(410).json(errorResponse("Import expired or not found"));
        return;
      }
      if (stored.committed) {
        response.status(409).json(errorResponse("Import has already been committed"));
        return;
      }
      const selected = new Set(input.includedRowIds);
      const invalid = [...selected].filter((rowId) => !stored.rows.some((row) => row.rowId === rowId));
      if (invalid.length) {
        response.status(400).json(errorResponse("One or more selected rows were not validated"));
        return;
      }
      stored.committed = true;
      const results = [];
      for (const row of stored.rows.filter((item) => selected.has(item.rowId))) {
        results.push(await commitRow(row, stored.options));
      }
      response.json({ data: { results, summary: summarizeResults(results) } });
    } catch (error) {
      next(error);
    }
  });
}

async function validateRows(projectType: ProjectType, rows: SubmittedRow[], options: ImportOptions) {
  const technologyResolver = await createTechnologyResolver();
  const categoryResolver = await createCategoryResolver(options.createMissingCategories);
  const existing = await projects().find({}).project({ _id: 1, slug: 1, title: 1 }).toArray();
  const existingBySlug = new Map(existing.map((project) => [String(project.slug), project]));
  const seenSlugs = new Set<string>();
  const usedSlugs = new Set(existingBySlug.keys());
  const validated: ValidatedImportRow[] = [];

  for (const submitted of rows) {
    const rowId = submitted.rowId || randomUUID();
    const issues: ProjectImportIssue[] = [];
    const issue = (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => issues.push({ rowId, rowNumber: submitted.rowNumber, severity, code, message, field, originalValue });
    for (const column of submitted.presentColumns) {
      if (!supportedColumns.has(column)) issue("warning", "UNKNOWN_HEADER", `${column} is not imported.`, column);
    }
    const values = submitted.values;
    const projectTypeCell = cell(values, "projectType");
    if (projectTypeCell && projectTypeCell !== projectType) issue("error", "PROJECT_TYPE_MISMATCH", `CSV projectType must match ${projectType}.`, "projectType", projectTypeCell);
    if (!cell(values, "title")) issue("error", "MISSING_REQUIRED_FIELD", "Title is required.", "title");
    if (!hasSummary(values)) issue("error", "MISSING_REQUIRED_FIELD", "Add excerpt, heroSummary, description, or overviewContent.", "excerpt");
    const status = options.statusStrategy === "draft" ? "draft" : normalizeStatus(cell(values, "status"), issue);
    const featured = normalizeBoolean(cell(values, "featured"), false, "featured", issue);
    const openInNewTab = normalizeBoolean(cell(values, "openInNewTab"), true, "openInNewTab", issue);
    const displayOrder = normalizeInteger(cell(values, "displayOrder"), 0, "displayOrder", issue);
    const year = normalizeOptionalInteger(cell(values, "year"), "year", issue);
    const teamSize = cell(values, "teamSize");
    const slug = slugify(cell(values, "slug") || cell(values, "title") || `row-${submitted.rowNumber}`);
    let finalSlug = slug;
    let duplicate = undefined as ValidatedImportRow["duplicate"];
    let duplicateAction: DuplicateStrategy | undefined;
    if (seenSlugs.has(slug)) {
      duplicate = { type: "csv", slug };
      duplicateAction = "skip";
      issue("error", "DUPLICATE_CSV_SLUG", `Duplicate slug ${slug} appears in this CSV.`, "slug", slug);
    }
    const databaseDuplicate = existingBySlug.get(slug);
    if (databaseDuplicate) {
      duplicate = { type: "database", slug, projectId: databaseDuplicate._id.toString(), projectTitle: String(databaseDuplicate.title ?? "") };
      duplicateAction = options.duplicateStrategy;
      issue(options.duplicateStrategy === "skip" ? "warning" : "warning", "DUPLICATE_DATABASE_SLUG", `Slug ${slug} already exists.`, "slug", slug);
      if (options.duplicateStrategy === "unique-slug") finalSlug = uniqueSlug(slug, usedSlugs);
    }
    seenSlugs.add(slug);
    usedSlugs.add(finalSlug);

    const techIds = resolveList(cell(values, "technologies")).flatMap((name) => {
      const resolved = technologyResolver.get(normalKey(name));
      if (!resolved) {
        issue("warning", "UNKNOWN_TECHNOLOGY", `${name} was not matched to an existing technology.`, "technologies", name);
        return [];
      }
      return [resolved.id];
    });
    const categoryRefs = [];
    for (const name of resolveList(cell(values, "categories"))) {
      const resolved = await categoryResolver.resolve(name);
      if (!resolved) issue("warning", "UNKNOWN_CATEGORY", `${name} was not matched to an existing category.`, "categories", name);
      else categoryRefs.push(resolved);
    }

    const gallery = parseJsonArray(cell(values, "gallery"), "gallery", issue).map((item, index) => normalizeGalleryItem(item, index, issue)).filter(Boolean);
    const featuredImage = mediaRef(values, "featuredImage", issue);
    const cardImage = mediaRef(values, "cardImage", issue);
    const desktopImage = mediaRef(values, "desktopImage", issue);
    const mobileImage = mediaRef(values, "mobileImage", issue);
    const primaryMetrics = [...parseMetrics(cell(values, "primaryMetrics"), "primaryMetrics", issue), ...parseMetrics(cell(values, "metrics"), "metrics", issue)];
    const keyResults = parseResults(cell(values, "keyResults"), issue);
    const highlights = parseHighlights(cell(values, "highlights"), issue);

    addTypeIssues(projectType, values, { techIds, featuredImage, cardImage, gallery, primaryMetrics, keyResults }, issue);
    const payloadCandidate = {
      title: cell(values, "title"), slug: finalSlug, projectType, status, excerpt: cell(values, "excerpt") || cell(values, "heroSummary") || cell(values, "description") || cell(values, "overviewContent"), description: cell(values, "description") || cell(values, "overviewContent") || cell(values, "heroSummary") || cell(values, "excerpt"), featured, displayOrder,
      featuredImage, gallery, hero: { eyebrow: optional(values, "heroEyebrow"), subtitle: cell(values, "heroSubtitle") || cell(values, "client") || cell(values, "title"), summary: cell(values, "heroSummary") || cell(values, "excerpt") || cell(values, "description") || cell(values, "overviewContent"), badgeText: optional(values, "heroBadgeText") },
      media: { featuredImage, desktopImage, mobileImage, cardImage, gallery },
      overview: { heading: optional(values, "overviewHeading"), content: cell(values, "overviewContent") || cell(values, "description") || cell(values, "heroSummary") || cell(values, "excerpt"), iconKey: optional(values, "overviewIconKey") },
      challenge: { heading: optional(values, "challengeHeading"), content: cell(values, "challengeContent"), iconKey: optional(values, "challengeIconKey"), accentColor: optional(values, "challengeAccentColor") },
      solution: { heading: optional(values, "solutionHeading"), content: cell(values, "solutionContent"), iconKey: optional(values, "solutionIconKey"), accentColor: optional(values, "solutionAccentColor") },
      caseStudy: { sectionOrder: ["overview", "challenge", "solution", "key-results", "lessons-learned"] },
      primaryMetrics, metrics: primaryMetrics, keyResults, highlights,
      details: { client: optional(values, "client"), role: optional(values, "role"), platform: optional(values, "platform"), subtype: optional(values, "subtype"), timeline: optional(values, "timeline"), launchDate: optional(values, "launchDate"), year, teamSize: teamSize || undefined, statusLabel: optional(values, "statusLabel") },
      links: { projectUrl: optional(values, "projectUrl"), repositoryUrl: optional(values, "repositoryUrl"), codepenUrl: optional(values, "codepenUrl"), caseStudyUrl: optional(values, "caseStudyUrl"), primaryLabel: optional(values, "primaryLinkLabel"), secondaryLabel: optional(values, "secondaryLinkLabel"), openInNewTab },
      categories: categoryRefs, technologyIds: unique(techIds), projectUrl: cell(values, "projectUrl"), repositoryUrl: cell(values, "repositoryUrl"), codepenUrl: cell(values, "codepenUrl"), client: cell(values, "client"), role: cell(values, "role"), year,
    };

    let payload = payloadCandidate as ProjectInput;
    try {
      payload = projectInputSchema.parse(payloadCandidate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const item of error.issues) issue("error", "INVALID_PROJECT_PAYLOAD", item.message, item.path.join("."));
      }
    }
    const patch = buildPatch(payload, submitted.presentColumns, options.emptyCellStrategy);
    const hasErrors = issues.some((item) => item.severity === "error");
    const statusValue: RowStatus = hasErrors ? "error" : duplicate && options.duplicateStrategy === "skip" ? "excluded" : duplicate ? "duplicate" : issues.length ? "warning" : "ready";
    validated.push({ rowId, rowNumber: submitted.rowNumber, status: statusValue, includeByDefault: !hasErrors && statusValue !== "excluded", duplicate, duplicateAction, issues, rawValues: values, normalized: { slug: finalSlug, title: payload.title, technologyIds: payload.technologyIds, categories: payload.categories }, payload, patch, existingProjectId: duplicate?.type === "database" ? duplicate.projectId : undefined });
  }
  return validated;
}

async function commitRow(row: ValidatedImportRow, options: ImportOptions) {
  try {
    if (row.issues.some((issue) => issue.severity === "error")) return result(row, "failed", "Row has validation errors.");
    if (row.duplicate?.type === "database" && options.duplicateStrategy === "skip") return result(row, "skipped", "Skipped existing project.");
    const now = new Date().toISOString();
    if (row.duplicate?.type === "database" && options.duplicateStrategy === "update" && row.existingProjectId) {
      const _id = toObjectId(row.existingProjectId);
      if (!_id) return result(row, "failed", "Invalid existing project id.");
      const current = await projects().findOne({ _id });
      if (!current) return result(row, "failed", "Existing project was not found.");
      const technologyIds = row.patch.technologyIds ? await resolveSubmittedTechnologyIds(row.patch.technologyIds, [], new Set(getStoredTechnologyIds(current))) : undefined;
      const patch = { ...cleanProjectInput(projectInputSchema.partial().parse(row.patch)), updatedAt: now } as Record<string, unknown>;
      if (technologyIds) patch.technologyIds = technologyIds;
      if (typeof patch.slug === "string") patch.slug = slugify(patch.slug);
      const updated = await projects().findOneAndUpdate({ _id }, { $set: patch }, { returnDocument: "after" });
      return result(row, "updated", "Project updated.", updated?._id.toString(), String(updated?.slug ?? row.payload.slug));
    }
    const payload = { ...row.payload, slug: options.duplicateStrategy === "unique-slug" ? await nextAvailableSlug(row.payload.slug || row.payload.title) : row.payload.slug };
    if (await projects().findOne({ slug: payload.slug })) return result(row, "failed", `Slug ${payload.slug} already exists.`);
    const technologyIds = await resolveSubmittedTechnologyIds(payload.technologyIds, [], new Set());
    const insert = await projects().insertOne({ ...cleanProjectInput(projectInputSchema.parse(payload)), technologyIds, slug: payload.slug ? slugify(payload.slug) : slugify(payload.title), createdAt: now, updatedAt: now });
    return result(row, "created", "Project created.", insert.insertedId.toString(), String(payload.slug));
  } catch (error) {
    return result(row, "failed", error instanceof Error ? error.message : "Import failed.");
  }
}

function result(row: ValidatedImportRow, status: CommitResultStatus, message: string, projectId?: string, slug = row.payload.slug) {
  return { rowId: row.rowId, rowNumber: row.rowNumber, title: row.payload.title, slug, status, message, projectId, editUrl: projectId ? `/portfolio/${projectId}/edit` : undefined, warnings: row.issues.filter((issue) => issue.severity === "warning").length };
}

function summarizeRows(rows: ValidatedImportRow[]) {
  return { total: rows.length, ready: rows.filter((row) => row.status === "ready").length, warnings: rows.filter((row) => row.issues.some((issue) => issue.severity === "warning")).length, errors: rows.filter((row) => row.issues.some((issue) => issue.severity === "error")).length, duplicates: rows.filter((row) => row.duplicate).length, excluded: rows.filter((row) => !row.includeByDefault).length };
}

function summarizeResults(results: Array<ReturnType<typeof result>>) {
  return { created: results.filter((row) => row.status === "created").length, updated: results.filter((row) => row.status === "updated").length, skipped: results.filter((row) => row.status === "skipped").length, failed: results.filter((row) => row.status === "failed").length, warnings: results.reduce((count, row) => count + row.warnings, 0) };
}

function cleanupImports() {
  const now = Date.now();
  for (const [id, batch] of imports) if (batch.expiresAt < now || batch.committed) imports.delete(id);
}

function trimImports() {
  while (imports.size > MAX_STORED_IMPORTS) {
    const oldest = imports.keys().next().value;
    if (!oldest) return;
    imports.delete(oldest);
  }
}

function cell(values: Record<string, string>, key: string) {
  return (values[key] ?? "").trim();
}

function optional(values: Record<string, string>, key: string) {
  return cell(values, key) || undefined;
}

function hasSummary(values: Record<string, string>) {
  return ["excerpt", "heroSummary", "description", "overviewContent"].some((key) => cell(values, key));
}

function normalizeStatus(value: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  if (!value) return "draft";
  const map: Record<string, "draft" | "published" | "archived"> = { draft: "draft", published: "published", publish: "published", unpublished: "draft", active: "published", archived: "archived", archive: "archived" };
  const next = map[value.toLowerCase()];
  if (!next) issue("error", "INVALID_STATUS", `${value} is not a supported status.`, "status", value);
  return next ?? "draft";
}

function normalizeBoolean(value: string, fallback: boolean, field: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  if (!value) return fallback;
  const map: Record<string, boolean> = { true: true, yes: true, "1": true, false: false, no: false, "0": false };
  const next = map[value.toLowerCase()];
  if (typeof next !== "boolean") issue("error", "INVALID_BOOLEAN", `${value} is not true/false, yes/no, or 1/0.`, field, value);
  return next ?? fallback;
}

function normalizeInteger(value: string, fallback: number, field: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  if (!value) return fallback;
  if (!/^-?\d+$/.test(value)) issue("error", "INVALID_NUMBER", `${value} is not a valid integer.`, field, value);
  return Number.parseInt(value, 10) || fallback;
}

function normalizeOptionalInteger(value: string, field: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  if (!value) return undefined;
  if (!/^-?\d+$/.test(value)) {
    issue("error", "INVALID_NUMBER", `${value} is not a valid integer.`, field, value);
    return undefined;
  }
  return Number.parseInt(value, 10);
}

function resolveList(value: string) {
  const seen = new Set<string>();
  return value.split("|").map((item) => item.trim()).filter((item) => item && !seen.has(item.toLowerCase()) && seen.add(item.toLowerCase()));
}

function parseJsonArray(value: string, field: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void): unknown[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) return parsed;
    issue("error", "INVALID_JSON", `${field} must be a JSON array.`, field, value);
  } catch {
    issue("error", "INVALID_JSON", `${field} contains invalid JSON.`, field, value);
  }
  return [];
}

function safeId(value: unknown) {
  return typeof value === "string" && /^[\w:-]{1,80}$/.test(value) ? value : randomUUID();
}

function parseMetrics(value: string, field: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  return parseJsonArray(value, field, issue).map((item, index) => {
    if (!isRecord(item) || typeof item.label !== "string" || typeof item.value !== "string") issue("error", "INVALID_METRIC", "Metrics require label and value.", field, item);
    return { id: safeId(isRecord(item) ? item.id : undefined), label: isRecord(item) ? String(item.label ?? "") : "", value: isRecord(item) ? String(item.value ?? "") : "", description: isRecord(item) && typeof item.description === "string" ? item.description : undefined, displayOrder: numberFrom(item, "displayOrder", index) };
  });
}

function parseResults(value: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  return parseJsonArray(value, "keyResults", issue).map((item, index) => {
    if (!isRecord(item) || typeof item.label !== "string" || typeof item.value !== "string") issue("error", "INVALID_RESULT", "Key results require label and value.", "keyResults", item);
    return { id: safeId(isRecord(item) ? item.id : undefined), type: isRecord(item) && typeof item.type === "string" ? item.type : "users", value: isRecord(item) ? String(item.value ?? "") : "", label: isRecord(item) ? String(item.label ?? "") : "", order: numberFrom(item, "order", index) };
  });
}

function parseHighlights(value: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  return parseJsonArray(value, "highlights", issue).map((item, index) => {
    if (!isRecord(item) || typeof item.text !== "string") issue("error", "INVALID_HIGHLIGHT", "Highlights require text.", "highlights", item);
    return { id: safeId(isRecord(item) ? item.id : undefined), text: isRecord(item) ? String(item.text ?? "") : "", displayOrder: numberFrom(item, "displayOrder", index) };
  });
}

function normalizeGalleryItem(item: unknown, index: number, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  if (!isRecord(item)) {
    issue("error", "INVALID_GALLERY_ITEM", "Gallery entries must be objects.", "gallery", item);
    return undefined;
  }
  const url = String(item.url ?? "").trim();
  const alt = String(item.alt ?? "").trim();
  if (!validImportUrl(url)) issue("error", "INVALID_URL", "Gallery URL must be localhost media, http, or https.", "gallery", url);
  if (!alt) issue("error", "MISSING_IMAGE_ALT", "Gallery images require alt text.", "gallery", item);
  return { id: safeId(item.id), url, alt, caption: String(item.caption ?? ""), order: numberFrom(item, "order", index), isFeatured: item.isFeatured === true || String(item.isFeatured ?? "").toLowerCase() === "true" };
}

function mediaRef(values: Record<string, string>, prefix: string, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  const url = cell(values, `${prefix}Url`);
  if (!url) return undefined;
  const alt = cell(values, `${prefix}Alt`);
  if (!validImportUrl(url)) issue("error", "INVALID_URL", `${prefix}Url must be localhost media, http, or https.`, `${prefix}Url`, url);
  if (!alt) issue("error", "MISSING_IMAGE_ALT", `${prefix}Alt is required when ${prefix}Url is supplied.`, `${prefix}Alt`);
  return { url, alt };
}

function validImportUrl(value: string) {
  if (!value || /^[a-zA-Z]:\\/.test(value) || value.startsWith("/Users/") || value.startsWith("./") || value.startsWith("../") || value.startsWith("data:")) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function addTypeIssues(projectType: ProjectType, values: Record<string, string>, context: { techIds: string[]; featuredImage?: unknown; cardImage?: unknown; gallery: unknown[]; primaryMetrics: unknown[]; keyResults: unknown[] }, issue: (severity: Severity, code: string, message: string, field?: string, originalValue?: unknown) => void) {
  if (projectType === "case-study") {
    for (const field of ["overviewContent", "challengeContent", "solutionContent"]) if (!cell(values, field)) issue("error", "MISSING_REQUIRED_FIELD", `${field} is required for case studies.`, field);
    if (!context.techIds.length) issue("warning", "MISSING_RECOMMENDED_FIELD", "Technologies are recommended for case studies.", "technologies");
    if (!context.featuredImage || !context.cardImage) issue("warning", "MISSING_RECOMMENDED_FIELD", "Featured and card images are recommended.", "featuredImageUrl");
    if (!context.primaryMetrics.length) issue("warning", "MISSING_RECOMMENDED_FIELD", "Metrics are recommended.", "metrics");
    if (!context.keyResults.length) issue("warning", "MISSING_RECOMMENDED_FIELD", "Key results are recommended.", "keyResults");
  }
  if (projectType === "github" && !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(cell(values, "repositoryUrl"))) issue("error", "INVALID_URL", "GitHub projects require a repository URL like https://github.com/owner/repo.", "repositoryUrl", cell(values, "repositoryUrl"));
  if (projectType === "design") {
    if (!cell(values, "subtype")) issue("error", "MISSING_REQUIRED_FIELD", "Subtype is required for design projects.", "subtype");
    if (!context.featuredImage && !context.cardImage && !context.gallery.length) issue("warning", "MISSING_RECOMMENDED_FIELD", "Design projects should include image fields or gallery images.", "featuredImageUrl");
  }
  if (projectType === "codepen" && !cell(values, "codepenUrl") && !cell(values, "projectUrl") && !cell(values, "repositoryUrl")) issue("error", "MISSING_REQUIRED_FIELD", "Code experiments require codepenUrl, projectUrl, or repositoryUrl.", "codepenUrl");
}

function buildPatch(payload: ProjectInput, presentColumns: string[], strategy: EmptyCellStrategy) {
  const present = new Set(presentColumns);
  const patch: Partial<ProjectInput> = {};
  const copy = <K extends keyof ProjectInput>(key: K, columns: string[]) => {
    if (columns.some((column) => present.has(column))) patch[key] = payload[key] as never;
  };
  for (const key of ["title", "slug", "status", "featured", "displayOrder", "excerpt", "description", "projectUrl", "repositoryUrl", "codepenUrl", "client", "role", "year"] as const) copy(key, [key]);
  copy("categories", ["categories"]);
  copy("technologyIds", ["technologies"]);
  copy("hero", ["heroEyebrow", "heroSubtitle", "heroSummary", "heroBadgeText"]);
  copy("media", ["featuredImageUrl", "featuredImageAlt", "desktopImageUrl", "desktopImageAlt", "mobileImageUrl", "mobileImageAlt", "cardImageUrl", "cardImageAlt", "gallery"]);
  copy("featuredImage", ["featuredImageUrl", "featuredImageAlt"]);
  copy("gallery", ["gallery"]);
  copy("overview", ["overviewHeading", "overviewContent", "overviewIconKey"]);
  copy("challenge", ["challengeHeading", "challengeContent", "challengeIconKey", "challengeAccentColor"]);
  copy("solution", ["solutionHeading", "solutionContent", "solutionIconKey", "solutionAccentColor"]);
  copy("details", ["client", "role", "platform", "subtype", "timeline", "launchDate", "year", "teamSize", "statusLabel"]);
  copy("links", ["projectUrl", "repositoryUrl", "codepenUrl", "caseStudyUrl", "primaryLinkLabel", "secondaryLinkLabel", "openInNewTab"]);
  copy("primaryMetrics", ["primaryMetrics", "metrics"]);
  copy("metrics", ["primaryMetrics", "metrics"]);
  copy("keyResults", ["keyResults"]);
  copy("highlights", ["highlights"]);
  if (strategy === "preserve") removeEmptyPatchValues(patch);
  return patch;
}

function removeEmptyPatchValues(value: Record<string, unknown>) {
  for (const key of Object.keys(value)) {
    const item = value[key];
    if (item === "" || item === undefined) delete value[key];
    else if (Array.isArray(item) && item.length === 0) delete value[key];
    else if (isRecord(item)) removeEmptyPatchValues(item);
  }
}

async function createTechnologyResolver() {
  const data = await technologies().find({}).toArray();
  const resolver = new Map<string, { id: string; name: string }>();
  for (const technology of data) {
    const id = technology._id.toString();
    for (const value of [id, technology.key, technology.slug, technology.name]) if (value) resolver.set(normalKey(String(value)), { id, name: String(technology.name) });
  }
  for (const definition of technologyRegistry) {
    const found = resolver.get(normalKey(definition.key)) || resolver.get(normalKey(definition.slug)) || resolver.get(normalKey(definition.name));
    if (found) for (const alias of definition.aliases ?? []) resolver.set(normalKey(alias), found);
  }
  resolver.set("js", resolver.get("javascript") ?? resolver.get("java-script")!);
  resolver.set("reactjs", resolver.get("react")!);
  resolver.set("react.js", resolver.get("react")!);
  resolver.set("nextjs", resolver.get("next.js") ?? resolver.get("nextjs")!);
  return resolver;
}

async function createCategoryResolver(createMissing: boolean) {
  const data = await categories().find({}).toArray();
  const resolver = new Map<string, { id: string; name: string; slug: string }>();
  const add = (item: { _id?: ObjectId; id?: string; name: string; slug: string }) => {
    const record = { id: item.id ?? item._id!.toString(), name: item.name, slug: item.slug };
    for (const value of [record.id, record.slug, record.name]) resolver.set(normalKey(value), record);
    return record;
  };
  data.forEach((item) => add({ _id: item._id, name: String(item.name ?? ""), slug: String(item.slug ?? "") }));
  return {
    async resolve(value: string) {
      const found = resolver.get(normalKey(value));
      if (found || !createMissing) return found;
      const name = value.trim();
      const slug = slugify(name);
      const result = await categories().insertOne({ name, slug, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      return add({ id: result.insertedId.toString(), name, slug });
    },
  };
}

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

function uniqueSlug(slug: string, used: Set<string>) {
  let index = 2;
  let next = `${slug}-${index}`;
  while (used.has(next)) next = `${slug}-${++index}`;
  return next;
}

async function nextAvailableSlug(value: string) {
  const base = slugify(value);
  const existing = await projects().find({ slug: { $regex: `^${escapeRegex(base)}(-\\d+)?$` } }).project({ slug: 1 }).toArray();
  return uniqueSlug(base, new Set(existing.map((project) => String(project.slug))));
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function numberFrom(item: unknown, key: string, fallback: number) {
  return isRecord(item) && typeof item[key] === "number" && Number.isInteger(item[key]) ? item[key] : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export const projectImportTestUtils = {
  buildPatch,
  normalizeStatus,
  normalizeBoolean,
  normalizeInteger,
  uniqueSlug,
  summarizeRows,
};
