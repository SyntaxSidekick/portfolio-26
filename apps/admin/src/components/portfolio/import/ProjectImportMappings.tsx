import type { CategoryReference, TechnologyReference } from "../../../types/admin";
import type { ValidatedProjectImportRow } from "../../../api/project-import";

export function ProjectImportMappings({ rows, technologies, categories, technologyMappings, categoryMappings, createMissingCategories, onTechnologyMapping, onCategoryMapping, onRevalidate }: { rows: ValidatedProjectImportRow[]; technologies: TechnologyReference[]; categories: CategoryReference[]; technologyMappings: Record<string, string>; categoryMappings: Record<string, string>; createMissingCategories: boolean; onTechnologyMapping: (value: string, mappedTo: string) => void; onCategoryMapping: (value: string, mappedTo: string) => void; onRevalidate: () => void }) {
  const unknownTechnologies = collectIssues(rows, "UNKNOWN_TECHNOLOGY");
  const unknownCategories = collectIssues(rows, "UNKNOWN_CATEGORY");
  if (!unknownTechnologies.length && !unknownCategories.length) return null;
  return <article className="panel import-mappings"><div className="panel-header"><div><h2>Mappings</h2><p>Map unknown values globally, ignore them, then validate again.</p></div><button className="button button-primary" type="button" onClick={onRevalidate}>Revalidate mappings</button></div><div className="import-mapping-grid">{unknownTechnologies.length ? <section><h3>Unknown technologies</h3>{unknownTechnologies.map((value) => <label key={value}>{value}<select value={technologyMappings[value] ?? ""} onChange={(event) => onTechnologyMapping(value, event.target.value)}><option value="">Leave unresolved</option><option value="__ignore__">Ignore</option>{technologies.map((technology) => <option key={technology.id} value={technology.name}>{technology.name}</option>)}</select></label>)}</section> : null}{unknownCategories.length ? <section><h3>Unknown categories</h3>{unknownCategories.map((value) => <label key={value}>{value}<select value={categoryMappings[value] ?? ""} onChange={(event) => onCategoryMapping(value, event.target.value)}><option value="">{createMissingCategories ? "Create during validation" : "Leave unresolved"}</option><option value="__ignore__">Ignore</option>{categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}</select></label>)}</section> : null}</div></article>;
}

function collectIssues(rows: ValidatedProjectImportRow[], code: string) {
  const values = rows.flatMap((row) => row.issues.filter((issue) => issue.code === code).map((issue) => String(issue.originalValue ?? ""))).filter(Boolean);
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}
