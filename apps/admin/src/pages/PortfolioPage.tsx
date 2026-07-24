import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAbortError } from "../api/client";
import { deleteProject, listProjects } from "../api/projects";
import { PortfolioFilters } from "../components/portfolio/PortfolioFilters";
import { ProjectsTable } from "../components/portfolio/ProjectsTable";
import { PageHeading } from "../components/shared/PageHeading";
import { filterRows } from "../shared/filterRows";
import type { PortfolioProject, ProjectStatus } from "../types/admin";

export function PortfolioPage({ query }: { query: string }) {
  const navigate = useNavigate();
  const [type, setType] = useState("All");
  const [status, setStatus] = useState<ProjectStatus | "All">("All");
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setError("");
    listProjects(controller.signal)
      .then((projects) => {
        if (active) setProjects(projects);
      })
      .catch((error: unknown) => {
        if (active && !isAbortError(error)) setError(error instanceof Error ? error.message : "Projects could not be loaded");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const filtered = useMemo(
    () => filterRows(projects, query, ["title", "excerpt", "projectType", "status"]).filter((project) => (type === "All" || project.projectType === type) && (status === "All" || project.status === status)),
    [projects, query, status, type],
  );

  async function handleDelete(project: PortfolioProject) {
    if (!confirm(`Delete ${project.title}?`)) return;
    await deleteProject(project.id);
    setProjects((current) => current.filter((item) => item.id !== project.id));
    setMessage(`${project.title} deleted.`);
  }

  return (
    <>
      <PageHeading title="Portfolio" description="Manage projects, statuses, categories, technologies, gallery metadata, and display order." />
      <div className="heading-actions admin-actions-row"><button className="button button-primary" type="button" onClick={() => navigate("/portfolio/new")}>Create Project</button><Link className="button button-secondary" to="/portfolio/categories">Categories</Link><Link className="button button-secondary" to="/portfolio/technologies">Technologies</Link></div>
      <PortfolioFilters type={type} status={status} onType={setType} onStatus={setStatus} />
      {message ? <p className="notice success">{message}</p> : null}
      {loading ? <article className="panel empty-panel">Loading projects...</article> : null}
      {error ? <article className="panel empty-panel">{error}</article> : null}
      {!loading && !error && filtered.length === 0 ? <article className="panel empty-panel">No projects found.</article> : null}
      {!loading && !error && filtered.length > 0 ? <ProjectsTable projects={filtered} onDelete={handleDelete} /> : null}
    </>
  );
}
