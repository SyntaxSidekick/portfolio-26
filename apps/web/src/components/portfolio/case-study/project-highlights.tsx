import {
  Activity,
  BarChart3,
  Gauge,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Star,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { PublicProject } from "@/lib/portfolio-api";

function splitHighlight(text: string) {
  const [title, ...rest] = text.split(/\s[-–:]\s/);
  return {
    title: title.trim(),
    description: rest.join(" ").trim(),
  };
}

function getHighlightIcon(text: string): LucideIcon {
  const value = text.toLowerCase();

  if (value.includes("analytics") || value.includes("insight")) {
    return BarChart3;
  }

  if (value.includes("performance") || value.includes("core web vital") || value.includes("load")) {
    return Gauge;
  }

  if (value.includes("interactive") || value.includes("booking") || value.includes("friction")) {
    return MousePointerClick;
  }

  if (value.includes("accessib") || value.includes("compliant") || value.includes("security")) {
    return ShieldCheck;
  }

  if (value.includes("workflow") || value.includes("flow") || value.includes("component")) {
    return Workflow;
  }

  if (value.includes("engagement") || value.includes("experience")) {
    return Activity;
  }

  return Sparkles;
}

export function ProjectHighlights({ project }: { project: PublicProject }) {
  const highlights = [...(project.highlights ?? [])].sort(
    (first, second) => first.displayOrder - second.displayOrder,
  );

  if (highlights.length === 0) {
    return null;
  }

  return (
    <section className="project-section project-highlights" aria-labelledby="project-highlights-title">
      <div className="panel">
        <header className="project-section-header">
          <p className="project-section-kicker">
            <Star aria-hidden="true" />
          </p>
          <h2 id="project-highlights-title">Project Highlights</h2>
        </header>

        <ul className="project-highlight-list">
          {highlights.map((highlight) => {
            const { title, description } = splitHighlight(highlight.text);
            const Icon = getHighlightIcon(highlight.text);
            return (
              <li key={highlight.id}>
                <Icon aria-hidden="true" />
                <strong>{title}</strong>
                {description ? <p>{description}</p> : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
