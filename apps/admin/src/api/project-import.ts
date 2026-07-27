import type { ProjectImportDuplicateStrategy, ProjectImportEmptyCellStrategy, ProjectImportStatusStrategy, RawProjectImportRow } from "../utils/project-import";
import type { ProjectType } from "../types/admin";
import { apiRequest } from "./client";

export type ProjectImportIssueSeverity = "warning" | "error";
export type ProjectImportRowStatus = "ready" | "warning" | "error" | "duplicate" | "excluded";

export interface ProjectImportIssue {
  rowId: string;
  rowNumber: number;
  field?: string;
  severity: ProjectImportIssueSeverity;
  code: string;
  message: string;
  originalValue?: unknown;
}

export interface ValidatedProjectImportRow {
  rowId: string;
  rowNumber: number;
  status: ProjectImportRowStatus;
  includeByDefault: boolean;
  duplicate?: { type: "csv" | "database"; slug: string; projectId?: string; projectTitle?: string };
  duplicateAction?: ProjectImportDuplicateStrategy;
  issues: ProjectImportIssue[];
  rawValues: Record<string, string>;
  normalized: { slug?: string; title?: string; technologyIds?: string[]; categories?: Array<{ id: string; name: string; slug: string }> };
  payload: { title: string; slug?: string; projectType: ProjectType; status: string; technologyIds?: string[] };
}

export interface ProjectImportSummary {
  total: number;
  ready: number;
  warnings: number;
  errors: number;
  duplicates: number;
  excluded: number;
}

export interface ValidateProjectImportResponse {
  importId: string;
  expiresAt: string;
  rows: ValidatedProjectImportRow[];
  summary: ProjectImportSummary;
}

export interface CommitProjectImportResponse {
  results: Array<{ rowId: string; rowNumber: number; title: string; slug?: string; status: "created" | "updated" | "skipped" | "failed"; message: string; projectId?: string; editUrl?: string; warnings: number }>;
  summary: { created: number; updated: number; skipped: number; failed: number; warnings: number };
}

export function validateProjectImport(payload: { projectType: ProjectType; rows: RawProjectImportRow[]; options: { duplicateStrategy: ProjectImportDuplicateStrategy; emptyCellStrategy: ProjectImportEmptyCellStrategy; statusStrategy: ProjectImportStatusStrategy; createMissingCategories: boolean } }) {
  return apiRequest<ValidateProjectImportResponse>("/projects/import/validate", { method: "POST", body: JSON.stringify(payload) });
}

export function commitProjectImport(payload: { importId: string; includedRowIds: string[] }) {
  return apiRequest<CommitProjectImportResponse>("/projects/import/commit", { method: "POST", body: JSON.stringify(payload) });
}
