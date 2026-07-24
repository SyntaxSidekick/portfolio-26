import { NavLink, useNavigate } from "react-router-dom";
import type { PortfolioProject } from "../../types/admin";
import { AdminIcon } from "../shared/AdminIcon";

const thumbClasses = ["project-one", "project-two", "project-three", "project-four", "project-five"];

export function ProjectsTable({ projects, onDelete }: { projects: PortfolioProject[]; onDelete?: (project: PortfolioProject) => void }) {
  const navigate = useNavigate();

  return (
    <article className="panel portfolio-panel">
      <div className="panel-header">
        <h2>Latest Portfolio Projects</h2>
        <NavLink to="/portfolio">
          View all projects <AdminIcon name="external" />
        </NavLink>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td>
                  <div className="project-cell">
                    <span className={`project-thumb ${thumbClasses[index % thumbClasses.length]}`} />
                    <div>
                      <strong>{project.title}</strong>
                      <small>{project.excerpt}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="tag blue-tag">{project.categories[0]?.name ?? "Uncategorized"}</span>
                </td>
                <td>
                  <span className={project.status === "published" ? "tag green-tag" : "tag neutral-tag"}>{project.status}</span>
                </td>
                <td>{new Date(project.updatedAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button type="button" aria-label={`View ${project.title}`} onClick={() => navigate(`/portfolio/${project.id}`)}>
                    <AdminIcon name="eye" />
                  </button>
                  <button type="button" aria-label={`Edit ${project.title}`} onClick={() => navigate(`/portfolio/${project.id}/edit`)}>
                    <AdminIcon name="edit" />
                  </button>
                  <button type="button" aria-label={`More ${project.title} actions`}>
                    <AdminIcon name="more" />
                  </button>
                  {onDelete ? (
                    <button type="button" aria-label={`Delete ${project.title}`} onClick={() => onDelete(project)}>
                      <AdminIcon name="close" />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
