import { ArrowRight, Palette } from "lucide-react";
import type { PublicProject } from "@/lib/portfolio-api";
import {
  getPortfolioProjectImage,
  getProjectDetailHref,
  getProjectSubtype,
} from "@/lib/portfolio-data";

function DesignProjectCard({ project }: { project: PublicProject }) {
  const image = getPortfolioProjectImage(project);

  return (
    <article className="portfolio-card design-project-card">
      <div className="portfolio-card-media">
        <img
          src={image.url}
          alt={image.alt || project.title}
          width="1200"
          height="700"
        />
      </div>

      <div className="portfolio-card-content">
        <div className="portfolio-card-heading">
          <h3>{project.details?.client || project.title}</h3>
          <span>{getProjectSubtype(project, "Design Project")}</span>
        </div>

        <p>{project.excerpt}</p>

        <a className="portfolio-card-link" href={getProjectDetailHref(project)}>
          View Project <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function DesignProjectsSection({
  projects,
}: {
  projects: PublicProject[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      className="portfolio-section design-projects"
      data-filter-section="design"
      aria-labelledby="design-projects-title"
    >
      <header className="portfolio-section-header">
        <div className="portfolio-section-heading">
          <h2 id="design-projects-title">
            <Palette aria-hidden="true" />
            <span>Design Projects</span>
          </h2>
          <p>
            Design systems, product design, branding, and UI/UX explorations.
          </p>
        </div>

        <a className="text-link portfolio-section-link" href="/portfolio#design-projects">
          View all Design Projects <ArrowRight aria-hidden="true" />
        </a>
      </header>

      <ul className="portfolio-grid">
        {projects.map((project) => (
          <li key={project.id}>
            <DesignProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
