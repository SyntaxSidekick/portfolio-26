import type { LucideIcon } from "lucide-react";
import {
  PersonStanding,
  Blocks,
  CodeXml,
  CircleGauge,
  LayoutPanelLeft,
  Sparkles,
} from "lucide-react";

type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const capabilities: Capability[] = [
  {
    icon: CodeXml,
    title: "Front-End Architecture",
    description:
      "Scalable, maintainable front-end systems with modern best practices.",
  },
  {
    icon: Blocks,
    title: "Design Systems",
    description:
      "Building reusable component libraries that ensure consistency and speed.",
  },
  {
    icon: PersonStanding,
    title: "Accessibility",
    description:
      "WCAG-compliant experiences that are inclusive and usable for everyone.",
  },
  {
    icon: CircleGauge,
    title: "Performance",
    description:
      "Optimized for speed, Core Web Vitals, and exceptional user experiences.",
  },
  {
    icon: LayoutPanelLeft,
    title: "UX Engineering",
    description:
      "Bridging the gap between design and development seamlessly.",
  },
  {
    icon: Sparkles,
    title: "AI Development",
    description:
      "Leveraging AI tools to build smarter, faster, and more efficient solutions.",
  },
];

export function CapabilitiesSection() {
  return (
    <section
      className="section capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">What I Do</p>

          <h2 id="capabilities-title">
            Engineering better experiences
            <br />
            through <span>clean code and thoughtful design.</span>
          </h2>
        </header>

        <ul className="capability-grid">
          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <li className="card capability-card" key={capability.title}>
                <div className="capability-icon" aria-hidden="true">
                  <Icon />
                </div>

                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
