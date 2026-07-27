import assert from "node:assert/strict";
import test from "node:test";
import { projectImportTestUtils } from "./project-import";
import type { ProjectInput } from "./types";

test("uniqueSlug appends the first available numeric suffix", () => {
  assert.equal(projectImportTestUtils.uniqueSlug("project-name", new Set(["project-name", "project-name-2"])), "project-name-3");
});

test("status normalization accepts safe aliases", () => {
  const issues: string[] = [];
  const issue = (_severity: "warning" | "error", code: string) => issues.push(code);
  assert.equal(projectImportTestUtils.normalizeStatus("publish", issue), "published");
  assert.equal(projectImportTestUtils.normalizeStatus("unpublished", issue), "draft");
  assert.equal(projectImportTestUtils.normalizeStatus("wat", issue), "draft");
  assert.deepEqual(issues, ["INVALID_STATUS"]);
});

test("boolean and integer normalization reject unsupported values", () => {
  const issues: string[] = [];
  const issue = (_severity: "warning" | "error", code: string) => issues.push(code);
  assert.equal(projectImportTestUtils.normalizeBoolean("yes", false, "featured", issue), true);
  assert.equal(projectImportTestUtils.normalizeBoolean("sometimes", false, "featured", issue), false);
  assert.equal(projectImportTestUtils.normalizeInteger("42", 0, "displayOrder", issue), 42);
  assert.equal(projectImportTestUtils.normalizeInteger("four", 0, "displayOrder", issue), 0);
  assert.deepEqual(issues, ["INVALID_BOOLEAN", "INVALID_NUMBER"]);
});

test("update patch preserves omitted fields and supplied empty cells when clear is selected", () => {
  const payload = {
    title: "Imported",
    slug: "imported",
    projectType: "case-study",
    status: "draft",
    excerpt: "",
    description: "Overview",
    featured: false,
    gallery: [],
    hero: { subtitle: "Imported", summary: "Overview" },
    media: { gallery: [] },
    overview: { content: "Overview" },
    challenge: { content: "" },
    solution: { content: "" },
    primaryMetrics: [],
    metrics: [],
    keyResults: [],
    highlights: [],
    categories: [],
    technologyIds: [],
    technologies: [],
    links: { openInNewTab: true },
    details: {},
    displayOrder: 0,
    projectUrl: "",
    repositoryUrl: "",
    codepenUrl: "",
    client: "",
    role: "",
  } satisfies ProjectInput;
  assert.deepEqual(Object.keys(projectImportTestUtils.buildPatch(payload, ["title"], "preserve")), ["title"]);
  const clearPatch = projectImportTestUtils.buildPatch(payload, ["excerpt"], "clear");
  assert.equal(clearPatch.excerpt, "");
});
