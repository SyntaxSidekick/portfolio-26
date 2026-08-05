import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Gauge,
  Layers3,
  Rocket,
  TrendingUp,
} from "lucide-react";

type CareerHighlight = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const careerHighlights = [
  {
    id: "design-system-leadership",
    title: "Design System Leadership",
    description:
      "Built reusable design systems and component libraries that reduced development cycles by 40-60% across multi-team environments.",
    icon: Layers3,
  },
  {
    id: "accelerated-delivery",
    title: "Accelerated Delivery",
    description:
      "Re-architected a struggling React platform and delivered its beta six months ahead of schedule.",
    icon: Rocket,
  },
  {
    id: "performance-engineering",
    title: "Performance Engineering",
    description:
      "Consistently delivered Lighthouse scores above 90 with sub-two-second production load times.",
    icon: Gauge,
  },
  {
    id: "conversion-optimization",
    title: "Conversion Optimization",
    description:
      "Improved conversions by as much as 60% through analytics, interaction design, usability improvements, and experience redesign.",
    icon: TrendingUp,
  },
  {
    id: "accessibility-by-design",
    title: "Accessibility by Design",
    description:
      "Integrate semantic structure, keyboard support, responsive behavior, and WCAG practices throughout delivery.",
    icon: Accessibility,
  },
] satisfies CareerHighlight[];

export function CareerHighlights() {
  return (
    <aside
      className="career-highlights"
      aria-labelledby="career-highlights-title"
    >
      <header className="section-heading career-highlights-header">
        <p className="eyebrow">Measured impact</p>
        <h2 id="career-highlights-title">Career Highlights</h2>
      </header>

      <ul className="career-highlights-list">
        {careerHighlights.map((highlight) => {
          const Icon = highlight.icon;

          return (
            <li className="career-highlight" key={highlight.id}>
              <span className="career-highlight-icon" aria-hidden="true">
                <Icon focusable="false" />
              </span>

              <div className="career-highlight-content">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
