import type { ProjectImportRowStatus } from "../../../api/project-import";

export function ProjectImportStatus({ status }: { status: ProjectImportRowStatus }) {
  const label = ({ ready: "Ready", warning: "Warning", error: "Error", duplicate: "Duplicate", excluded: "Excluded" } satisfies Record<ProjectImportRowStatus, string>)[status];
  return <span className={`import-status ${status}`}>{label}</span>;
}
