import Papa from "papaparse";
import { PROJECT_IMPORT_MAX_FILE_SIZE, PROJECT_IMPORT_MAX_ROWS, type ProjectImportTypeConfig, type RawProjectImportRow } from "./project-import";

export interface ParsedProjectImportCsv {
  headers: string[];
  rows: RawProjectImportRow[];
  warnings: string[];
}

const formulaPrefix = /^[=+\-@]/;

export async function parseProjectImportCsv(file: File, knownHeaders: Set<string>): Promise<ParsedProjectImportCsv> {
  if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv" && file.type !== "application/vnd.ms-excel") throw new Error("Choose a CSV file.");
  if (file.size === 0) throw new Error("CSV file is empty.");
  if (file.size > PROJECT_IMPORT_MAX_FILE_SIZE) throw new Error("CSV file is larger than 5 MB.");
  const text = removeBom(await file.text());
  if (!text.trim()) throw new Error("CSV file is empty.");
  return parseProjectImportCsvText(text, knownHeaders);
}

export function parseProjectImportCsvText(text: string, knownHeaders: Set<string>): ParsedProjectImportCsv {
  const rawHeader = removeBom(text).split(/\r?\n/, 1)[0] ?? "";
  const preflight = Papa.parse<string[]>(rawHeader, { header: false });
  const preflightHeaders = (preflight.data[0] ?? []).map((header) => String(header).trim()).filter(Boolean);
  const duplicate = preflightHeaders.find((header, index) => preflightHeaders.indexOf(header) !== index);
  if (duplicate) throw new Error(`Duplicate header: ${duplicate}`);
  const parsed = Papa.parse<Record<string, string>>(removeBom(text), { header: true, skipEmptyLines: "greedy", transformHeader: (header) => removeBom(header).trim(), transform: (value) => value });
  if (parsed.errors.length) throw new Error(parsed.errors[0]?.message ?? "CSV could not be parsed.");
  const headers = parsed.meta.fields?.map((field) => field.trim()).filter(Boolean) ?? [];
  if (!headers.length) throw new Error("CSV file needs a header row.");
  const data = parsed.data.filter((row) => Object.values(row).some((value) => String(value ?? "").trim()));
  if (data.length > PROJECT_IMPORT_MAX_ROWS) throw new Error(`CSV files can include at most ${PROJECT_IMPORT_MAX_ROWS} data rows.`);
  const warnings = headers.filter((header) => !knownHeaders.has(header)).map((header) => `${header} is not a supported project field.`);
  const rows = data.map((values, index) => ({ rowId: crypto.randomUUID(), rowNumber: index + 2, values: Object.fromEntries(headers.map((header) => [header, String(values[header] ?? "")])), presentColumns: headers }));
  return { headers, rows, warnings };
}

export function generateProjectImportTemplate(config: ProjectImportTypeConfig) {
  const header = config.templateColumns.map(escapeCsvCell).join(",");
  const row = config.templateColumns.map((column) => escapeCsvCell(config.exampleRow[column] ?? "")).join(",");
  return `${header}\r\n${row}\r\n`;
}

export function downloadCsvTemplate(config: ProjectImportTypeConfig) {
  const blob = new Blob([generateProjectImportTemplate(config)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${config.type}-portfolio-import-template.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function escapeCsvCell(value: string) {
  const safe = formulaPrefix.test(value) ? `'${value}` : value;
  return /[",\r\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

function removeBom(value: string) {
  return value.replace(/^\uFEFF/, "");
}
