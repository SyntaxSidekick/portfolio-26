import { ArrowRight, Rocket } from "lucide-react";
import { ProjectTags } from "@/components/portfolio/project-tags";
import type { PublicProject } from "@/lib/portfolio-api";
import {
  getPortfolioProjectImage,
  getProjectDetailHref,
  getProjectSubtype,
} from "@/lib/portfolio-data";

function CaseStudyCard({ project }: { project: PublicProject }) {
  const image = getPortfolioProjectImage(project);

  return (
    <article className="portfolio-card case-study-card">
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
          <span>{getProjectSubtype(project, "Case Study")}</span>
        </div>

        <p>{project.excerpt}</p>

        <ProjectTags project={project} />

        <a className="portfolio-card-link" href={getProjectDetailHref(project)}>
          View Case Study <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function CaseStudiesSection({
  projects,
}: {
  projects: PublicProject[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      className="portfolio-section case-studies"
      data-filter-section="case-study"
      aria-labelledby="case-studies-title"
    >
      <header className="portfolio-section-header">
        <div className="portfolio-section-heading">
          <h2 id="case-studies-title">
            <Rocket aria-hidden="true" />
            <span>Case Studies</span>
          </h2>
          <p>
            In-depth product work focused on solving real problems and
            delivering measurable results.
          </p>
        </div>

        <a className="text-link portfolio-section-link" href="/portfolio#case-studies">
          View all Case Studies <ArrowRight aria-hidden="true" />
        </a>
      </header>

      <ul className="portfolio-grid">
        {projects.map((project) => (
          <li key={project.id}>
            <CaseStudyCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
