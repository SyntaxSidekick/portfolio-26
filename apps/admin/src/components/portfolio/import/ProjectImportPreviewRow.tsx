import type { ValidatedProjectImportRow } from "../../../api/project-import";
import { ProjectImportRowDetails } from "./ProjectImportRowDetails";
import { ProjectImportStatus } from "./ProjectImportStatus";

export function ProjectImportPreviewRow({ row, checked, onToggle }: { row: ValidatedProjectImportRow; checked: boolean; onToggle: (checked: boolean) => void }) {
  const error = row.issues.some((issue) => issue.severity === "error");
  const technologies = row.normalized.technologyIds?.length ?? 0;
  const categories = row.normalized.categories?.map((category) => category.name).join(", ") || "None";
  const images = ["featuredImageUrl", "desktopImageUrl", "mobileImageUrl", "cardImageUrl"].filter((field) => row.rawValues[field]?.trim()).length;
  return <><tr id={`import-row-${row.rowId}`}><td><input aria-label={`Include row ${row.rowNumber}`} type="checkbox" checked={checked} disabled={error || row.status === "excluded"} onChange={(event) => onToggle(event.target.checked)} /></td><td>{row.rowNumber}</td><td><ProjectImportStatus status={row.status} /></td><td>{row.payload.title}</td><td>{row.normalized.slug ?? row.payload.slug}</td><td>{row.payload.projectType}</td><td>{row.payload.status}</td><td>{technologies}</td><td>{categories}</td><td>{images}</td><td>{row.issues.length}</td><td>{row.duplicate ? `${row.duplicateAction ?? "skip"} ${row.duplicate.slug}` : "Import"}</td></tr><tr><td colSpan={12}><ProjectImportRowDetails row={row} /></td></tr></>;
}
