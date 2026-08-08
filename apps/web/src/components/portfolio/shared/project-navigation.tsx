import { ArrowLeft, ArrowRight, Grid2X2 } from "lucide-react";
import type { PublicProject } from "@/lib/portfolio-api";

type ProjectNavigationProps = {
  previousProject?: PublicProject;
  nextProject?: PublicProject;
  projectTypeLabel?: string;
  indexHref?: string;
};

export function ProjectNavigation({
  previousProject,
  nextProject,
  projectTypeLabel = "case studies",
  indexHref = "/portfolio#case-studies",
}: ProjectNavigationProps) {
  if (!previousProject && !nextProject) {
    return null;
  }

  return (
    <nav className="project-navigation" aria-label={`${projectTypeLabel} navigation`}>
      {previousProject ? (
        <a href={`/portfolio/${previousProject.slug}`}>
          <ArrowLeft aria-hidden="true" />
          <span>
            <small>Previous Project</small>
            <strong>{previousProject.title}</strong>
            <em>{previousProject.details?.subtype || previousProject.categories[0]?.name}</em>
          </span>
        </a>
      ) : <span />}

      <a className="project-navigation-index" href={indexHref} aria-label={`Back to ${projectTypeLabel}`}>
        <Grid2X2 aria-hidden="true" />
      </a>

      {nextProject ? (
        <a href={`/portfolio/${nextProject.slug}`}>
          <span>
            <small>Next Project</small>
            <strong>{nextProject.title}</strong>
            <em>{nextProject.details?.subtype || nextProject.categories[0]?.name}</em>
          </span>
          <ArrowRight aria-hidden="true" />
        </a>
      ) : <span />}
    </nav>
  );
}
