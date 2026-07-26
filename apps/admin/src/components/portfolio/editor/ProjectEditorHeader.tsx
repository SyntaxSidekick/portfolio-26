import type { ProjectStatus } from "../../../types/admin";

export function ProjectEditorHeader({
  editing,
  status,
}: {
  editing: boolean;
  status: ProjectStatus;
}) {
  return (
    <section className="project-editor-heading" aria-labelledby="project-editor-title">
      <div>
        <div className="project-editor-title-row">
          <h1 id="project-editor-title">{editing ? "Edit Project" : "Create Project"}</h1>
          <span className="status-pill">{status === "draft" ? "Draft" : status}</span>
        </div>
        <p>Build and customize your project case study.</p>
      </div>
    </section>
  );
}
