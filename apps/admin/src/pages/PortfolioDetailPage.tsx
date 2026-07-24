import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isAbortError } from "../api/client";
import { deleteProject, getProject } from "../api/projects";
import { TechnologyIcon } from "../lib/technologyIcons";
import { PageHeading } from "../components/shared/PageHeading";
import type { PortfolioProject } from "../types/admin";

export function PortfolioDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<PortfolioProject>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    let active = true;
    getProject(id, controller.signal)
      .then((project) => {
        if (active) setProject(project);
      })
      .catch((error: unknown) => {
        if (active && !isAbortError(error)) setError(error instanceof Error ? error.message : "Project could not be loaded");
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [id]);

  async function handleDelete() {
    if (!project || !confirm(`Delete ${project.title}?`)) return;
    await deleteProject(project.id);
    navigate("/portfolio");
  }

  if (error) return <article className="panel empty-panel">{error}</article>;
  if (!project) return <article className="panel empty-panel">Loading project...</article>;

  return (
    <>
      <PageHeading title={project.title} description={project.excerpt || "Admin project details."} />
      <article className="panel detail-panel">
        <div className="panel-header"><h2>Project Details</h2><div className="heading-actions"><Link className="button button-secondary" to="/portfolio">Back to projects</Link><Link className="button button-primary" to={`/portfolio/${project.id}/edit`}>Edit</Link><button className="button button-secondary" type="button" onClick={handleDelete}>Delete</button></div></div>
        <dl className="detail-list">
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Project type</dt><dd>{project.projectType}</dd></div>
          <div><dt>Featured</dt><dd>{project.featured ? "Yes" : "No"}</dd></div>
          <div><dt>Categories</dt><dd>{project.categories.map((item) => item.name).join(", ") || "None"}</dd></div>
          <div><dt>Technologies</dt><dd>{project.technologies.length ? project.technologies.map((item) => <span className="tag neutral-tag technology-detail-tag" key={item.id}><TechnologyIcon className="technology-icon" iconKey={item.iconKey} name={item.name} brandColor={item.brandColor} size={16} />{item.name}</span>) : "None"}</dd></div>
          <div><dt>Project URL</dt><dd>{project.projectUrl || "None"}</dd></div>
          <div><dt>Repository URL</dt><dd>{project.repositoryUrl || "None"}</dd></div>
          <div><dt>CodePen URL</dt><dd>{project.codepenUrl || "None"}</dd></div>
          <div><dt>Featured image</dt><dd>{project.featuredImage?.url || "None"}</dd></div>
          <div><dt>Gallery count</dt><dd>{project.gallery.length}</dd></div>
          <div><dt>Metric count</dt><dd>{project.metrics?.length ?? 0}</dd></div>
          <div><dt>Created</dt><dd>{new Date(project.createdAt).toLocaleString()}</dd></div>
          <div><dt>Updated</dt><dd>{new Date(project.updatedAt).toLocaleString()}</dd></div>
          <div className="detail-wide"><dt>Description</dt><dd>{project.description || "None"}</dd></div>
        </dl>
      </article>
      {project.metrics?.length ? (
        <article className="panel detail-panel">
          <div className="panel-header"><h2>Metrics</h2></div>
          <div className="admin-metrics-grid">
            {[...project.metrics].sort((a, b) => a.displayOrder - b.displayOrder).map((metric) => (
              <div className="admin-metric-card" key={metric.id}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                {metric.description ? <p>{metric.description}</p> : null}
              </div>
            ))}
          </div>
        </article>
      ) : null}
    </>
  );
}
