import { ArrowRight, GitBranch } from "lucide-react";
import type { PublicProject } from "@/lib/portfolio-api";
import {
  getExternalLinkProps,
  getGitHubProjectHref,
  getPortfolioProjectImage,
  getProjectSubtype,
} from "@/lib/portfolio-data";

function GitHubProjectCard({ project }: { project: PublicProject }) {
  const image = getPortfolioProjectImage(project);
  const href = getGitHubProjectHref(project);

  return (
    <article className="portfolio-card github-project-card">
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
          <h3>{project.title}</h3>
          <span>{getProjectSubtype(project, "GitHub Project")}</span>
        </div>

        <p>{project.excerpt}</p>

        <a
          className="portfolio-card-link"
          href={href}
          {...getExternalLinkProps(href)}
        >
          <GitBranch aria-hidden="true" /> View on GitHub
        </a>
      </div>
    </article>
  );
}

export function GitHubProjectsSection({
  projects,
}: {
  projects: PublicProject[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      className="portfolio-section github-projects"
      data-filter-section="github"
      aria-labelledby="github-projects-title"
    >
      <header className="portfolio-section-header">
        <div className="portfolio-section-heading">
          <h2 id="github-projects-title">
            <GitBranch aria-hidden="true" />
            <span>GitHub Projects</span>
          </h2>
          <p>
            Open-source tools, applications, and development experiments
            available on GitHub.
          </p>
        </div>

        <a className="text-link portfolio-section-link" href="/portfolio#github-projects">
          View all GitHub Projects <ArrowRight aria-hidden="true" />
        </a>
      </header>

      <ul className="portfolio-grid">
        {projects.map((project) => (
          <li key={project.id}>
            <GitHubProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
