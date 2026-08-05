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
    title: "40-60% Faster Delivery",
    description:
      "Reusable design systems and component architecture reduced engineering effort and accelerated feature delivery across multi-team environments.",
    icon: Layers3,
  },
  {
    id: "accelerated-delivery",
    title: "Six-Month Early Beta Delivery",
    description:
      "Re-architected a struggling React platform and delivered its beta six months ahead of schedule.",
    icon: Rocket,
  },
  {
    id: "performance-engineering",
    title: "90+ Lighthouse Scores",
    description:
      "Consistently delivered production applications with Lighthouse scores above 90 and sub-two-second load times.",
    icon: Gauge,
  },
  {
    id: "conversion-optimization",
    title: "Conversion Gains up to 60%",
    description:
      "Improved conversions by as much as 60% through analytics, interaction design, usability improvements, and experience redesign.",
    icon: TrendingUp,
  },
  {
    id: "accessibility-by-design",
    title: "Enterprise Product Leadership",
    description:
      "Led front-end architecture, UX engineering, and design systems across healthcare, travel, ecommerce, media, and education platforms.",
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
        <h2 id="career-highlights-title">Measurable Impact</h2>
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
