import { BarChart3 } from "lucide-react";
import { ProjectMetrics } from "@/components/portfolio/shared/project-metrics";
import type { PublicProject } from "@/lib/portfolio-api";

export function ProjectResults({ project }: { project: PublicProject }) {
  const keyResults = [...(project.keyResults ?? [])].sort((first, second) => {
    const left = first.order ?? first.displayOrder ?? 0;
    const right = second.order ?? second.displayOrder ?? 0;
    return left - right;
  });

  if (keyResults.length === 0) {
    return null;
  }

  return (
    <section className="project-section project-results" aria-labelledby="project-results-title">
      <div className="panel project-results-panel">
        <div className="project-results-heading">
          <header className="project-section-header">
            <p className="project-section-kicker">
              <BarChart3 aria-hidden="true" />
            </p>
            <h2 id="project-results-title">Key Results</h2>
          </header>
          <p>Measured outcomes from the project work.</p>
        </div>

        <ProjectMetrics
          metrics={keyResults}
          variant="compact"
          ariaLabel={`${project.title} key results`}
        />
      </div>
    </section>
  );
}
