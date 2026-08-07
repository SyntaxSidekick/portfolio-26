import { CheckCircle2 } from "lucide-react";
import { NarrativeSummaryList } from "@/components/portfolio/case-study/narrative-summary-list";
import { TextContent } from "@/components/portfolio/case-study/text-content";
import type { PublicProject } from "@/lib/portfolio-api";

export function ProjectSolution({ project }: { project: PublicProject }) {
  const solution = project.solution;
  const media = project.caseStudy?.sectionMedia?.solution ?? solution?.media;

  if (!solution?.content) {
    return null;
  }

  return (
    <section className="project-section project-narrative" data-section-tone="success" aria-labelledby="project-solution-title">
      <div className="panel project-narrative-panel">
        <div>
          <header className="project-section-header">
            <p className="project-section-kicker">
              <CheckCircle2 aria-hidden="true" />
            </p>
            <h2 id="project-solution-title">{solution.heading || "The Solution"}</h2>
          </header>
          <TextContent content={solution.content} />
        </div>

        {media?.url ? (
          <figure>
            <img src={media.url} alt={media.alt || `${project.title} solution`} width="900" height="520" />
          </figure>
        ) : (
          <NarrativeSummaryList
            content={solution.content}
            label={`${project.title} solution summary`}
          />
        )}
      </div>
    </section>
  );
}
