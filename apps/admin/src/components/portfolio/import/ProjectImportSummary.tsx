import type { ProjectImportSummary as Summary } from "../../../api/project-import";

export function ProjectImportSummary({ summary }: { summary: Summary }) {
  const items = [["Total rows", summary.total], ["Ready", summary.ready], ["Warnings", summary.warnings], ["Errors", summary.errors], ["Duplicates", summary.duplicates], ["Excluded", summary.excluded]];
  return <section className="import-summary" aria-label="Validation summary">{items.map(([label, value]) => <div className="panel import-summary-item" key={label}><span>{label}</span><strong>{value}</strong></div>)}</section>;
}
