import { ArrowLeft } from "lucide-react";
import { ProjectLinks } from "@/components/portfolio/shared/project-links";
import { ProjectTechnologies } from "@/components/portfolio/shared/project-technologies";
import type { PublicProject } from "@/lib/portfolio-api";

type CaseStudyHeroProps = {
  project: PublicProject;
};

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const projectTypeLabel = project.projectType === "design" ? "Design Project" : "Case Study";
  const hero = project.hero ?? {
    subtitle: project.details?.subtype || project.client || projectTypeLabel,
    summary: project.excerpt,
    badgeText: projectTypeLabel,
  };
  const heroImage =
    project.media?.desktopImage ??
    project.media?.featuredImage ??
    project.featuredImage;

  return (
    <header className="case-study-hero" aria-labelledby="project-title">
      <a className="text-link project-back-link" href="/portfolio">
        <ArrowLeft aria-hidden="true" />
        Back to Portfolio
      </a>

      <div className="case-study-hero-layout">
        <div className="case-study-hero-content">
          <p className="eyebrow">{hero.badgeText || hero.eyebrow || projectTypeLabel}</p>
          <h1 id="project-title">{project.title}</h1>
          <p className="project-subtitle">
            {hero.subtitle || project.details?.subtype || projectTypeLabel}
          </p>
          <p className="project-summary">{hero.summary || project.excerpt}</p>

          <ProjectTechnologies technologies={project.technologies} />
          <ProjectLinks project={project} />
        </div>

        {heroImage ? (
          <figure className="case-study-hero-media">
            <img
              src={heroImage.url}
              alt={heroImage.alt || `${project.title} project preview`}
              width="1600"
              height="1000"
            />
          </figure>
        ) : null}
      </div>
    </header>
  );
}
