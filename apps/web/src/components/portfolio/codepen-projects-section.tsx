import { ArrowRight, Code2, Play } from "lucide-react";
import type { PublicProject } from "@/lib/portfolio-api";
import {
  getCodePenDemoHref,
  getCodePenHref,
  getExternalLinkProps,
  getPortfolioProjectImage,
  getProjectSubtype,
} from "@/lib/portfolio-data";

function CodePenProjectCard({ project }: { project: PublicProject }) {
  const image = getPortfolioProjectImage(project);
  const codepenHref = getCodePenHref(project);
  const demoHref = getCodePenDemoHref(project);

  return (
    <article className="portfolio-card codepen-project-card">
      <div className="portfolio-card-media">
        <a
          href={demoHref}
          {...getExternalLinkProps(demoHref)}
          aria-label={`View ${project.title} demo`}
        >
          <img
            src={image.url}
            alt={image.alt || `${project.title} preview`}
            width="1200"
            height="700"
          />
          <span className="portfolio-card-play" aria-hidden="true">
            <Play />
          </span>
        </a>
      </div>

      <div className="portfolio-card-content">
        <div className="portfolio-card-heading">
          <h3>{project.title}</h3>
          <span>{getProjectSubtype(project, "CodePen Project")}</span>
        </div>

        <p>{project.excerpt}</p>

        <div className="portfolio-card-actions">
          <a
            className="portfolio-card-link"
            href={demoHref}
            {...getExternalLinkProps(demoHref)}
          >
            View Demo <ArrowRight aria-hidden="true" />
          </a>
          <a
            className="portfolio-card-link"
            href={codepenHref}
            {...getExternalLinkProps(codepenHref)}
          >
            View on CodePen <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CodePenProjectsSection({
  projects,
}: {
  projects: PublicProject[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      className="portfolio-section codepen-projects"
      data-filter-section="codepen"
      aria-labelledby="codepen-projects-title"
    >
      <header className="portfolio-section-header">
        <div className="portfolio-section-heading">
          <h2 id="codepen-projects-title">
            <Code2 aria-hidden="true" />
            <span>CodePen Projects</span>
          </h2>
          <p>
            Front-end experiments, animations, interactions, and creative coding
            demos.
          </p>
        </div>

        <a className="text-link portfolio-section-link" href="/portfolio#codepen-projects">
          View all CodePen Projects <ArrowRight aria-hidden="true" />
        </a>
      </header>

      <ul className="portfolio-grid">
        {projects.map((project) => (
          <li key={project.id}>
            <CodePenProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
