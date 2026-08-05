import type { LucideIcon } from "lucide-react";
import { Code2, Gauge, PenTool, Search, ShieldCheck, Workflow } from "lucide-react";

type BioProcessStep = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  iconTone:
    | "discovery"
    | "architecture"
    | "design"
    | "engineering"
    | "quality"
    | "performance";
};

const bioProcessSteps = [
  {
    id: 1,
    title: "Discovery & Strategy",
    description:
      "Define users, business goals, technical constraints, success metrics, and the core problem the product must solve.",
    icon: Search,
    iconTone: "discovery",
  },
  {
    id: 2,
    title: "Experience Architecture",
    description:
      "Map user journeys, information architecture, user flows, interaction models, and responsive experience requirements.",
    icon: Workflow,
    iconTone: "architecture",
  },
  {
    id: 3,
    title: "Interactive Design",
    description:
      "Create wireframes, visual concepts, interactive prototypes, and reusable design patterns that clarify the experience.",
    icon: PenTool,
    iconTone: "design",
  },
  {
    id: 4,
    title: "Engineering & Integration",
    description:
      "Build production-ready interfaces using modern component architecture, APIs, scalable CSS, and maintainable standards.",
    icon: Code2,
    iconTone: "engineering",
  },
  {
    id: 5,
    title: "Quality & Accessibility",
    description:
      "Validate usability, responsive behavior, browser compatibility, automated testing, keyboard support, and WCAG conformance.",
    icon: ShieldCheck,
    iconTone: "quality",
  },
  {
    id: 6,
    title: "Performance & Optimization",
    description:
      "Measure Core Web Vitals, analyze user behavior, optimize performance, and continuously improve product outcomes.",
    icon: Gauge,
    iconTone: "performance",
  },
] satisfies BioProcessStep[];

export function BioProcess() {
  return (
    <section
      className="bio-process"
      aria-labelledby="bio-process-heading"
    >
      <header className="section-heading">
        <p className="eyebrow">From strategy to production</p>

        <h2 id="bio-process-heading">My Front-End Process</h2>

        <p>
          A structured product, design, and engineering process that reduces
          ambiguity, improves collaboration, and creates measurable outcomes.
        </p>
      </header>

      <ol className="bio-process-grid">
        {bioProcessSteps.map((step) => {
          const Icon = step.icon;
          const [titleStart, titleEnd] = step.title.split(" & ");
          const titleId = `bio-process-step-${step.id}-title`;

          return (
            <li className="bio-process-item" key={step.id}>
              <span className="bio-process-number" aria-hidden="true">
                {step.id}
              </span>

              <article className="bio-process-card" aria-labelledby={titleId}>
                <Icon aria-hidden="true" data-icon={step.iconTone} />

                <h3 id={titleId}>
                  {titleEnd ? (
                    <>
                      {titleStart}
                      <br />
                      &amp; {titleEnd}
                    </>
                  ) : (
                    step.title
                  )}
                </h3>

                <p>{step.description}</p>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
