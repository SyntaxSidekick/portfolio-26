import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Code2,
  Gauge,
  Layers3,
  PenTool,
  Sparkles,
} from "lucide-react";
import { technologyRegistry } from "@portfolio/technology-registry";
import { TechnologyIcon } from "@/lib/technologyIcons";
import { isTechnologyIconSupported } from "@/lib/technologyIcons";

type CapabilityTone =
  | "architecture"
  | "design"
  | "engineering"
  | "performance"
  | "quality"
  | "discovery";

type CapabilityTechnology = {
  name: string;
  technologyKey?: string;
  initials?: string;
};

type CoreCapability = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: CapabilityTone;
  technologies: CapabilityTechnology[];
};

const coreCapabilities: CoreCapability[] = [
  {
    title: "Engineering",
    description: "Build robust, scalable, and high-performance front-end experiences.",
    icon: Code2,
    tone: "architecture",
    technologies: [
      { name: "TypeScript", technologyKey: "typescript", initials: "TS" },
      { name: "React", technologyKey: "react" },
      { name: "Next.js", technologyKey: "nextjs", initials: "N" },
      { name: "JavaScript (ES6+)", technologyKey: "javascript" },
      { name: "HTML5 & Modern CSS", technologyKey: "html5" },
    ],
  },
  {
    title: "UX Engineering",
    description: "Bridge design and code to create intuitive, accessible, and seamless experiences.",
    icon: PenTool,
    tone: "design",
    technologies: [
      { name: "Figma", technologyKey: "figma" },
      { name: "Interaction Design", initials: "ID" },
      { name: "Information Architecture", initials: "IA" },
      { name: "Prototyping", initials: "PR" },
      { name: "User Research", initials: "UR" },
    ],
  },
  {
    title: "Design Systems",
    description: "Create consistent, scalable systems that accelerate development and align teams.",
    icon: Layers3,
    tone: "engineering",
    technologies: [
      { name: "Component Libraries", initials: "CL" },
      { name: "UI Patterns", initials: "UI" },
      { name: "Storybook", initials: "SB" },
      { name: "Design Tokens", initials: "DT" },
      { name: "Atomic Design", initials: "AD" },
    ],
  },
  {
    title: "Performance",
    description: "Optimize for speed, Core Web Vitals, and exceptional user experiences.",
    icon: Gauge,
    tone: "performance",
    technologies: [
      { name: "Core Web Vitals", initials: "CW" },
      { name: "Lighthouse", initials: "LH" },
      { name: "Web Performance", initials: "WP" },
      { name: "Code Splitting", initials: "CS" },
      { name: "Front-End Optimization", initials: "FO" },
    ],
  },
  {
    title: "Accessibility",
    description: "Build inclusive experiences that meet WCAG standards and established best practices.",
    icon: Accessibility,
    tone: "quality",
    technologies: [
      { name: "WCAG 2.1 AA", technologyKey: "wcag", initials: "A11Y" },
      { name: "ARIA", initials: "AR" },
      { name: "Semantic HTML", technologyKey: "html5" },
      { name: "Keyboard Navigation", initials: "KB" },
      { name: "Screen Reader Support", initials: "SR" },
    ],
  },
  {
    title: "AI Workflow Engineering",
    description: "Leverage AI tools and automation to build smarter, faster, and more efficiently.",
    icon: Sparkles,
    tone: "discovery",
    technologies: [
      { name: "GitHub Copilot", technologyKey: "github" },
      { name: "Claude Code", initials: "CC" },
      { name: "OpenAI Codex", initials: "AI" },
      { name: "AI Workflows", initials: "AI" },
      { name: "Workflow Automation", initials: "WA" },
    ],
  },
];

const technologyByKey = new Map(
  technologyRegistry.map((technology) => [technology.key, technology]),
);

function getTechnologyIconProps(technology: CapabilityTechnology) {
  const definition = technology.technologyKey
    ? technologyByKey.get(technology.technologyKey)
    : undefined;
  const iconKey = definition?.iconKey;
  const hasBrandIcon = isTechnologyIconSupported(iconKey);

  return {
    brandColor: hasBrandIcon
      ? definition?.brandColor
      : "var(--core-capability-color)",
    iconKey,
    initials: technology.initials,
  };
}

export function CoreCapabilities() {
  return (
    <div className="skills-section core-capabilities">
      <header className="section-heading">
        <p className="eyebrow">TECHNICAL LEADERSHIP AND CREATIVE EXECUTION</p>

        <h2 id="skills-heading">Core Capabilities</h2>

        <p>
          A senior-level combination of front-end engineering, experience
          architecture, interactive design, accessibility, performance, and
          modern delivery workflows.
        </p>
      </header>

      <ul className="core-capability-grid">
        {coreCapabilities.map((capability) => {
          const Icon = capability.icon;

          return (
            <li className="core-capability-item" key={capability.title}>
              <article className="core-capability-card" data-icon={capability.tone}>
                <div className="core-capability-icon" aria-hidden="true">
                  <Icon />
                </div>

                <h3>{capability.title}</h3>
                <p className="core-capability-description">{capability.description}</p>

                <div className="core-capability-divider" aria-hidden="true"></div>

                <p className="core-capability-label">Key Technologies</p>

                <ul className="core-technology-list" aria-label={`${capability.title} key technologies`}>
                  {capability.technologies.map((technology) => {
                    const iconProps = getTechnologyIconProps(technology);

                    return (
                      <li key={technology.name}>
                        <span className="core-technology-icon" aria-hidden="true">
                          <TechnologyIcon
                            brandColor={iconProps.brandColor}
                            iconKey={iconProps.iconKey}
                            initials={iconProps.initials}
                            name={technology.name}
                            size={14}
                          />
                        </span>
                        <span>{technology.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </li>
          );
        })}
      </ul>

      <aside className="additional-experience">
        <h3>Additional Tools &amp; Platforms</h3>

        <p>
          AWS, Azure, Node.js, Express, MongoDB, Git, CI/CD, Docker, Vite, Jira,
          Confluence, Google Analytics, Google Tag Manager, Adobe Creative
          Cloud, WordPress, and Figma Dev Mode.
        </p>
      </aside>
    </div>
  );
}
