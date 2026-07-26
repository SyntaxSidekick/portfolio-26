import type { TechnologyDefinition } from "@portfolio/technology-registry";

export type BioCapabilityItem = {
  id: string;
  name: string;
  technologyKey?: TechnologyDefinition["key"];
  iconKey?: TechnologyDefinition["iconKey"];
  brandColor?: TechnologyDefinition["brandColor"];
  initials?: string;
};

export type BioCapabilityGroupId =
  | "core-engineering"
  | "frameworks-platforms"
  | "front-end-architecture"
  | "ux-interactive-design"
  | "design-systems"
  | "design-prototyping-tools"
  | "quality-performance"
  | "analytics-insights"
  | "delivery-workflow"
  | "ai-assisted-development";

export type BioCapabilityGroup = {
  id: BioCapabilityGroupId;
  title: string;
  description: string;
  items: BioCapabilityItem[];
};

export const bioCapabilityGroups: BioCapabilityGroup[] = [
  {
    id: "core-engineering",
    title: "Core Engineering",
    description: "Production front-end development",
    items: [
      { id: "semantic-html5", name: "Semantic HTML5", technologyKey: "html5" },
      { id: "modern-css-architecture", name: "Modern CSS Architecture", technologyKey: "css3" },
      { id: "javascript-es6", name: "JavaScript ES6+", technologyKey: "javascript" },
      { id: "typescript", name: "TypeScript", technologyKey: "typescript" },
      { id: "sql-structured-data", name: "SQL & Structured Data", technologyKey: "mysql", initials: "SQL" },
    ],
  },
  {
    id: "frameworks-platforms",
    title: "Frameworks & Platforms",
    description: "Scalable application development",
    items: [
      { id: "react-redux", name: "React & Redux", technologyKey: "react" },
      { id: "nextjs", name: "Next.js", technologyKey: "nextjs" },
      { id: "vue-router-vuex", name: "Vue.js, Vue Router & Vuex", technologyKey: "vue" },
      { id: "nodejs-express", name: "Node.js & Express", technologyKey: "nodejs" },
      { id: "headless-enterprise-cms", name: "Headless & Enterprise CMS", technologyKey: "wordpress" },
    ],
  },
  {
    id: "front-end-architecture",
    title: "Front-End Architecture",
    description: "Maintainable systems at scale",
    items: [
      { id: "enterprise-ui-architecture", name: "Enterprise UI Architecture", initials: "UI", brandColor: "#4aaaff" },
      { id: "micro-frontend-strategy", name: "Micro-Frontend Strategy", initials: "MF", brandColor: "#4aaaff" },
      { id: "component-driven-architecture", name: "Component-Driven Architecture", initials: "CD", brandColor: "#4aaaff" },
      { id: "web-components", name: "Web Components", technologyKey: "web-components", initials: "WC" },
      { id: "rest-apis-integrations", name: "REST APIs & Integrations", technologyKey: "rest-api", initials: "API" },
    ],
  },
  {
    id: "ux-interactive-design",
    title: "UX & Interactive Design",
    description: "Experience strategy and interface behavior",
    items: [
      { id: "interaction-design", name: "Interaction Design", initials: "IxD", brandColor: "#39ff14" },
      { id: "ux-research-strategy", name: "UX Research & Strategy", initials: "UX", brandColor: "#39ff14" },
      { id: "user-journeys-flows", name: "User Journeys & User Flows", initials: "UJ", brandColor: "#39ff14" },
      { id: "information-architecture", name: "Information Architecture", initials: "IA", brandColor: "#39ff14" },
      { id: "responsive-product-design", name: "Responsive Product Design", initials: "RP", brandColor: "#39ff14" },
    ],
  },
  {
    id: "design-systems",
    title: "Design Systems",
    description: "Connecting design and engineering",
    items: [
      { id: "design-system-architecture", name: "Design System Architecture", initials: "DS", brandColor: "#ff2bd6" },
      { id: "design-tokens", name: "Design Tokens", initials: "DT", brandColor: "#ff2bd6" },
      { id: "component-libraries", name: "Component Libraries", initials: "CL", brandColor: "#ff2bd6" },
      { id: "reusable-ui-patterns", name: "Reusable UI Patterns", initials: "UI", brandColor: "#ff2bd6" },
      { id: "system-documentation", name: "System Documentation", initials: "SD", brandColor: "#ff2bd6" },
    ],
  },
  {
    id: "design-prototyping-tools",
    title: "Design & Prototyping Tools",
    description: "From early concepts to production-ready interfaces",
    items: [
      { id: "figma-figjam", name: "Figma & FigJam", technologyKey: "figma" },
      { id: "balsamiq", name: "Balsamiq", initials: "B", brandColor: "#f6bd16" },
      { id: "invision", name: "InVision", initials: "IV", brandColor: "#ff3366" },
      { id: "photoshop", name: "Adobe Photoshop", technologyKey: "photoshop" },
      { id: "illustrator", name: "Adobe Illustrator", technologyKey: "illustrator" },
      { id: "indesign", name: "Adobe InDesign", technologyKey: "indesign" },
      { id: "adobe-xd", name: "Adobe XD", initials: "XD", brandColor: "#ff61f6" },
    ],
  },
  {
    id: "quality-performance",
    title: "Quality & Performance",
    description: "Reliable, inclusive experiences",
    items: [
      { id: "wcag-accessibility", name: "WCAG 2.1 AA Accessibility", technologyKey: "wcag", initials: "A11Y" },
      { id: "lighthouse-core-web-vitals", name: "Lighthouse & Core Web Vitals", technologyKey: "lighthouse", initials: "LH" },
      { id: "playwright-testing", name: "Playwright Testing", technologyKey: "playwright" },
      { id: "jest-front-end-testing", name: "Jest & Front-End Testing", technologyKey: "jest" },
      { id: "technical-seo", name: "Technical SEO", initials: "SEO", brandColor: "#38bdf8" },
    ],
  },
  {
    id: "analytics-insights",
    title: "Analytics & Insights",
    description: "Behavior tracking and UX optimization",
    items: [
      { id: "google-analytics-4", name: "Google Analytics 4", initials: "GA", brandColor: "#f9ab00" },
      { id: "google-tag-manager", name: "Google Tag Manager", initials: "GTM", brandColor: "#4285f4" },
      { id: "adobe-analytics", name: "Adobe Analytics", initials: "AA", brandColor: "#fa0f00" },
      { id: "hotjar", name: "Hotjar", initials: "HJ", brandColor: "#ff3c00" },
      { id: "heatmapping-session-recordings", name: "Heatmapping & Session Recordings", initials: "HM", brandColor: "#f97316" },
    ],
  },
  {
    id: "delivery-workflow",
    title: "Delivery & Workflow",
    description: "Modern engineering productivity",
    items: [
      { id: "git-github", name: "Git & GitHub", technologyKey: "git" },
      { id: "cicd-pipelines", name: "CI/CD Pipelines", technologyKey: "github-actions", initials: "CI" },
      { id: "vite-webpack-babel", name: "Vite, Webpack & Babel", technologyKey: "vite" },
      { id: "storybook", name: "Storybook", initials: "SB", brandColor: "#4dabf7" },
      { id: "agile-jira-confluence", name: "Agile, Jira & Confluence", initials: "AJ", brandColor: "#4dabf7" },
    ],
  },
  {
    id: "ai-assisted-development",
    title: "AI-Assisted Development",
    description: "Modern production and automation workflows",
    items: [
      { id: "llm-assisted-development", name: "LLM-Assisted Development", initials: "AI", brandColor: "#b35cf0" },
      { id: "github-copilot", name: "GitHub Copilot", technologyKey: "github", initials: "GH" },
      { id: "claude-code", name: "Claude Code", initials: "CC", brandColor: "#b35cf0" },
      { id: "openai-codex", name: "OpenAI Codex", initials: "AI", brandColor: "#b35cf0" },
      { id: "ai-workflow-automation", name: "AI Workflow Automation", initials: "AI", brandColor: "#b35cf0" },
    ],
  },
];
