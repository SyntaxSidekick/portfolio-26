import { FileText } from "lucide-react";
import { TextContent } from "@/components/portfolio/case-study/text-content";
import type { PublicProject } from "@/lib/portfolio-api";

export function ProjectOverview({ project }: { project: PublicProject }) {
  const overview = project.overview ?? {
    heading: "Project Overview",
    content: project.description || project.excerpt,
  };
  const media = project.caseStudy?.sectionMedia?.overview ?? overview.media;

  if (!overview.content) {
    return null;
  }

  return (
    <section className="project-section project-overview" aria-labelledby="project-overview-title">
      <div className="panel project-overview-panel">
        <div>
          <header className="project-section-header">
            <p className="project-section-kicker">
              <FileText aria-hidden="true" />
            </p>
            <h2 id="project-overview-title">{overview.heading || "Project Overview"}</h2>
          </header>
          <TextContent content={overview.content} />
        </div>

        {media?.url ? (
          <figure>
            <img src={media.url} alt={media.alt || `${project.title} overview`} width="900" height="520" />
          </figure>
        ) : null}
      </div>
    </section>
  );
}
