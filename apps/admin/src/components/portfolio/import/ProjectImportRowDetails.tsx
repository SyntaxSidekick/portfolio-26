import type { ValidatedProjectImportRow } from "../../../api/project-import";

export function ProjectImportRowDetails({ row }: { row: ValidatedProjectImportRow }) {
  return <details className="import-row-details"><summary>Inspect row</summary><div className="import-detail-grid"><section><h4>Raw CSV</h4><pre>{JSON.stringify(row.rawValues, null, 2)}</pre></section><section><h4>Normalized</h4><pre>{JSON.stringify(row.normalized, null, 2)}</pre></section><section><h4>Payload Preview</h4><pre>{JSON.stringify(row.payload, null, 2)}</pre></section><section><h4>Issues</h4>{row.issues.length ? <ul>{row.issues.map((issue) => <li key={`${issue.code}-${issue.field}-${issue.message}`}>{issue.severity}: {issue.message}</li>)}</ul> : <p>No issues.</p>}</section></div></details>;
}
