import { useMemo, useState } from "react";
import { listCategories } from "../api/categories";
import { commitProjectImport, validateProjectImport, type CommitProjectImportResponse, type ValidateProjectImportResponse } from "../api/project-import";
import { listTechnologies } from "../api/technologies";
import { downloadCsvTemplate, parseProjectImportCsv } from "../utils/csv";
import { getProjectImportTypeConfig, projectImportTypeConfigs, sharedColumns, type ProjectImportDuplicateStrategy, type ProjectImportEmptyCellStrategy, type ProjectImportStatusStrategy, type RawProjectImportRow } from "../utils/project-import";
import type { ProjectType } from "../types/admin";
import type { CategoryReference, TechnologyReference } from "../types/admin";

export function useProjectImport() {
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<RawProjectImportRow[]>([]);
  const [parseWarnings, setParseWarnings] = useState<string[]>([]);
  const [duplicateStrategy, setDuplicateStrategy] = useState<ProjectImportDuplicateStrategy>("skip");
  const [emptyCellStrategy, setEmptyCellStrategy] = useState<ProjectImportEmptyCellStrategy>("preserve");
  const [statusStrategy, setStatusStrategy] = useState<ProjectImportStatusStrategy>("draft");
  const [createMissingCategories, setCreateMissingCategories] = useState(false);
  const [validation, setValidation] = useState<ValidateProjectImportResponse | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<CommitProjectImportResponse | null>(null);
  const [technologies, setTechnologies] = useState<TechnologyReference[]>([]);
  const [categories, setCategories] = useState<CategoryReference[]>([]);
  const [technologyMappings, setTechnologyMappings] = useState<Record<string, string>>({});
  const [categoryMappings, setCategoryMappings] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const config = projectType ? getProjectImportTypeConfig(projectType) : null;
  const knownHeaders = useMemo(() => new Set(sharedColumns), []);

  async function parseFile(nextFile: File) {
    setBusy(true);
    setError("");
    setFile(nextFile);
    setValidation(null);
    setResults(null);
    try {
      const parsed = await parseProjectImportCsv(nextFile, knownHeaders);
      setRows(parsed.rows);
      setParseWarnings(parsed.warnings);
    } catch (error) {
      setRows([]);
      setParseWarnings([]);
      setError(error instanceof Error ? error.message : "CSV could not be parsed.");
    } finally {
      setBusy(false);
    }
  }

  async function validate() {
    if (!projectType) {
      setError("Choose a project type before validating.");
      return;
    }
    if (!rows.length) {
      setError("Upload a CSV before validating.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const mappedRows = applyMappings(rows, technologyMappings, categoryMappings);
      const [next, nextTechnologies, nextCategories] = await Promise.all([
        validateProjectImport({ projectType, rows: mappedRows, options: { duplicateStrategy, emptyCellStrategy, statusStrategy, createMissingCategories } }),
        listTechnologies(undefined, { active: true }),
        listCategories(),
      ]);
      setValidation(next);
      setTechnologies(nextTechnologies);
      setCategories(nextCategories);
      setSelectedRows(new Set(next.rows.filter((row) => row.includeByDefault).map((row) => row.rowId)));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Import could not be validated.");
    } finally {
      setBusy(false);
    }
  }

  async function commit() {
    if (!validation) return;
    setBusy(true);
    setError("");
    try {
      setResults(await commitProjectImport({ importId: validation.importId, includedRowIds: [...selectedRows] }));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Import could not be committed.");
    } finally {
      setBusy(false);
    }
  }

  function toggleRow(rowId: string, checked: boolean) {
    setSelectedRows((current) => {
      const next = new Set(current);
      if (checked) next.add(rowId);
      else next.delete(rowId);
      return next;
    });
  }

  function reset() {
    setFile(null);
    setRows([]);
    setParseWarnings([]);
    setValidation(null);
    setResults(null);
    setSelectedRows(new Set());
    setError("");
  }

  function setTechnologyMapping(value: string, mappedTo: string) {
    setTechnologyMappings((current) => ({ ...current, [value]: mappedTo }));
  }

  function setCategoryMapping(value: string, mappedTo: string) {
    setCategoryMappings((current) => ({ ...current, [value]: mappedTo }));
  }

  return {
    projectType, setProjectType, config, projectTypes: projectImportTypeConfigs, file, rows, parseWarnings, duplicateStrategy, setDuplicateStrategy, emptyCellStrategy, setEmptyCellStrategy, statusStrategy, setStatusStrategy, createMissingCategories, setCreateMissingCategories, validation, selectedRows, results, busy, error, parseFile, validate, commit, toggleRow, reset,
    technologies, categories, technologyMappings, categoryMappings, setTechnologyMapping, setCategoryMapping,
    downloadTemplate: () => config && downloadCsvTemplate(config),
  };
}

function applyMappings(rows: RawProjectImportRow[], technologyMappings: Record<string, string>, categoryMappings: Record<string, string>) {
  return rows.map((row) => ({
    ...row,
    values: {
      ...row.values,
      technologies: mapPipeList(row.values.technologies ?? "", technologyMappings),
      categories: mapPipeList(row.values.categories ?? "", categoryMappings),
    },
  }));
}

function mapPipeList(value: string, mappings: Record<string, string>) {
  const next = value.split("|").map((item) => {
    const trimmed = item.trim();
    const mapped = mappings[trimmed];
    if (mapped === "__ignore__") return "";
    return mapped || trimmed;
  }).filter(Boolean);
  return [...new Set(next)].join("|");
}
