import type { Metadata } from "next";
import "@/styles/pages/portfolio.css";
import "@/styles/components/cards.css";
import {
  tryGetPublishedProjects,
  type PublicProject,
} from "@/lib/portfolio-api";
import { TechnologyIcon } from "@/lib/technologyIcons";

export const metadata: Metadata = {
  title: "Portfolio | Riad Kilani",
  description:
    "Case studies, design projects, GitHub work, and code experiments by Riad Kilani.",
};

const sections: {
  id: string;
  title: string;
  description: string;
  type: PublicProject["projectType"];
  modifier?: string;
}[] = [
  {
    id: "case-studies",
    title: "Case Studies",
    description:
      "In-depth case studies of full-scale products and platforms from concept to launch.",
    type: "case-study",
  },
  {
    id: "github-projects",
    title: "GitHub Projects",
    description: "Open-source and personal projects hosted on GitHub.",
    type: "github",
    modifier: "portfolio-section--github",
  },
  {
    id: "design-projects",
    title: "Design Projects",
    description: "UI/UX design, branding, and design-system explorations.",
    type: "design",
    modifier: "portfolio-section--design",
  },
  {
    id: "codepen-experiments",
    title: "Code Experiments",
    description:
      "Front-end experiments, animations, and interactive prototypes.",
    type: "codepen",
    modifier: "portfolio-section--codepen",
  },
];

function ProjectCard({
  project,
  compact,
}: {
  project: PublicProject;
  compact?: boolean;
}) {
  const cardImage =
    project.media?.cardImage ??
    project.media?.featuredImage ??
    project.featuredImage;
  const image =
    cardImage?.url ||
    "https://placehold.co/1200x700/071525/2da8ff?text=Project";
  const tags = project.technologies.slice(0, 5);

  if (compact) {
    return (
      <article
        className="card compact-card"
        data-category={project.categories
          .map((category) => category.slug)
          .join(" ")}
      >
        <img
          src={image}
          alt={cardImage?.alt || project.title}
          width="900"
          height="500"
        />
        <h3>{project.title}</h3>
        <p>{project.excerpt}</p>
        <div className="compact-meta">
          {tags.map((technology) => (
            <span key={technology.id}>
              {technology.iconKey ? (
                <TechnologyIcon
                  iconKey={technology.iconKey}
                  name={technology.name}
                  brandColor={technology.brandColor}
                  size={14}
                />
              ) : null}
              {technology.name}
            </span>
          ))}
        </div>
        <div className="compact-actions">
          <a href={`/portfolio/${project.slug}`}>View Project</a>
        </div>
      </article>
    );
  }

  return (
    <article
      className="card project-card"
      data-category={project.categories
        .map((category) => category.slug)
        .join(" ")}
    >
      <div className="card-media">
        {project.featured ? (
          <span className="project-badge">Featured</span>
        ) : null}
        <img
          src={image}
          alt={cardImage?.alt || project.title}
          width="1200"
          height="700"
        />
      </div>
      <div className="card-body">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-eyebrow">
            {project.details?.subtype || project.categories[0]?.name}
          </p>
        <p className="card-description">{project.excerpt}</p>
        <ul className="tag-list">
          {tags.map((technology) => (
            <li key={technology.id} aria-label={technology.name} title={technology.name}>
              <TechnologyIcon
                iconKey={technology.iconKey ?? technology.slug}
                name={technology.name}
                brandColor={technology.brandColor}
                size={14}
              /><span>{technology.name}</span>
            </li>
          ))}
        </ul>
        <hr />
        <a className="card-link" href={`/portfolio/${project.slug}`}>
          View Case Study <span aria-hidden="true">{"\u2192"}</span>
        </a>
      </div>
    </article>
  );
}

export default async function Page() {
  const { projects, error } = await tryGetPublishedProjects();

  return (
    <main id="portfolio-page" className="page portfolio">
      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <div className="portfolio-container">
          <p className="portfolio-kicker">Portfolio</p>
          <h1 id="portfolio-title">
            Selected <span>Work</span>
          </h1>
          <p className="portfolio-intro">
            A curated collection of projects, built with{" "}
            <strong>purpose</strong>, <strong>precision</strong>, and{" "}
            <strong>real-world impact</strong>.
          </p>
          <div
            className="portfolio-category-filters"
            aria-label="Filter projects by discipline"
          >
            <button
              type="button"
              className="category-filter is-active"
              data-category="all"
              aria-pressed="true"
            >
              <span aria-hidden="true">{"\u25a6"}</span> All Projects
            </button>
            <button
              type="button"
              className="category-filter"
              data-category="web"
              aria-pressed="false"
            >
              <span aria-hidden="true">{"\u25a3"}</span> Web Applications
            </button>
            <button
              type="button"
              className="category-filter"
              data-category="systems"
              aria-pressed="false"
            >
              <span aria-hidden="true">{"\u2b21"}</span> Design Systems
            </button>
            <button
              type="button"
              className="category-filter"
              data-category="design"
              aria-pressed="false"
            >
              <span aria-hidden="true">{"\u27a4"}</span> UI/UX &amp; Design
            </button>
            <button
              type="button"
              className="category-filter"
              data-category="tools"
              aria-pressed="false"
            >
              <span aria-hidden="true">{"\u2692"}</span> Tools &amp; Utilities
            </button>
          </div>
          <nav className="portfolio-source-nav" aria-label="Portfolio sections">
            <a href="#case-studies">Case Studies</a>
            <a href="#github-projects">GitHub Projects</a>
            <a href="#design-projects">Design Projects</a>
            <a href="#codepen-experiments">Code Experiments</a>
          </nav>
        </div>
      </section>

      {error ? (
        <section
          className="portfolio-section"
          aria-labelledby="portfolio-api-status"
        >
          <div className="portfolio-container">
            <header className="section-heading">
              <span className="section-line" aria-hidden="true" />
              <div>
                <h2 id="portfolio-api-status">Portfolio API Unavailable</h2>
                <p>
                  Start MongoDB and `pnpm --filter @portfolio/api dev`, then
                  refresh this page.
                </p>
              </div>
              <span className="section-line" aria-hidden="true" />
            </header>
          </div>
        </section>
      ) : null}

      {sections.map((section) => {
        const sectionProjects = projects.filter(
          (project) => project.projectType === section.type,
        );
        return (
          <section
            key={section.id}
            id={section.id}
            className={`portfolio-section ${section.modifier ?? ""}`}
            data-source-section={section.type}
            aria-labelledby={`${section.id}-title`}
          >
            <div className="portfolio-container">
              <header className="section-heading">
                <span className="section-line" aria-hidden="true" />
                <div>
                  <h2 id={`${section.id}-title`}>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
                <span className="section-line" aria-hidden="true" />
              </header>
              <div
                className={
                  section.type === "case-study"
                    ? "project-grid project-grid--case-studies"
                    : "project-grid project-grid--compact"
                }
              >
                {sectionProjects.length ? (
                  sectionProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      compact={section.type !== "case-study"}
                    />
                  ))
                ) : (
                  <p>No published projects yet.</p>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
