import { AlertTriangle } from "lucide-react";
import { NarrativeSummaryList } from "@/components/portfolio/case-study/narrative-summary-list";
import { TextContent } from "@/components/portfolio/case-study/text-content";
import type { PublicProject } from "@/lib/portfolio-api";

export function ProjectChallenge({ project }: { project: PublicProject }) {
  const challenge = project.challenge;
  const media = project.caseStudy?.sectionMedia?.challenge ?? challenge?.media;

  if (!challenge?.content) {
    return null;
  }

  return (
    <section className="project-section project-narrative" data-section-tone="warning" aria-labelledby="project-challenge-title">
      <div className="panel project-narrative-panel">
        <div>
          <header className="project-section-header">
            <p className="project-section-kicker">
              <AlertTriangle aria-hidden="true" />
            </p>
            <h2 id="project-challenge-title">{challenge.heading || "The Challenge"}</h2>
          </header>
          <TextContent content={challenge.content} />
        </div>

        {media?.url ? (
          <figure>
            <img src={media.url} alt={media.alt || `${project.title} challenge`} width="900" height="520" />
          </figure>
        ) : (
          <NarrativeSummaryList
            content={challenge.content}
            label={`${project.title} challenge summary`}
          />
        )}
      </div>
    </section>
  );
}
