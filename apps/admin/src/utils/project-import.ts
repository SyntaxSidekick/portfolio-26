import type { ProjectType } from "../types/admin";

export const PROJECT_IMPORT_MAX_FILE_SIZE = 5 * 1024 * 1024;
export const PROJECT_IMPORT_MAX_ROWS = 1000;

export type ProjectImportDuplicateStrategy = "skip" | "update" | "unique-slug";
export type ProjectImportEmptyCellStrategy = "preserve" | "clear";
export type ProjectImportStatusStrategy = "draft" | "csv";

export interface RawProjectImportRow {
  rowId: string;
  rowNumber: number;
  values: Record<string, string>;
  presentColumns: string[];
}

export interface ProjectImportTypeConfig {
  type: ProjectType;
  label: string;
  description: string;
  requiredColumns: string[];
  recommendedColumns: string[];
  templateColumns: string[];
  exampleRow: Record<string, string>;
}

export const sharedColumns = [
  "title", "slug", "status", "featured", "displayOrder", "projectType", "categories", "technologies", "excerpt", "description", "heroEyebrow", "heroSubtitle", "heroSummary", "heroBadgeText", "client", "role", "platform", "subtype", "timeline", "launchDate", "year", "teamSize", "statusLabel", "projectUrl", "repositoryUrl", "codepenUrl", "caseStudyUrl", "primaryLinkLabel", "secondaryLinkLabel", "openInNewTab", "featuredImageUrl", "featuredImageAlt", "desktopImageUrl", "desktopImageAlt", "mobileImageUrl", "mobileImageAlt", "cardImageUrl", "cardImageAlt", "overviewHeading", "overviewContent", "overviewIconKey", "challengeHeading", "challengeContent", "challengeIconKey", "challengeAccentColor", "solutionHeading", "solutionContent", "solutionIconKey", "solutionAccentColor", "metrics", "primaryMetrics", "keyResults", "highlights", "gallery",
];

export const projectImportTypeConfigs: ProjectImportTypeConfig[] = [
  {
    type: "case-study",
    label: "Case Study",
    description: "Detailed case studies with metrics and results",
    requiredColumns: ["title", "overviewContent", "challengeContent", "solutionContent"],
    recommendedColumns: ["technologies", "featuredImageUrl", "featuredImageAlt", "cardImageUrl", "cardImageAlt", "metrics", "keyResults"],
    templateColumns: ["title", "slug", "status", "featured", "categories", "technologies", "heroSubtitle", "heroSummary", "client", "role", "timeline", "year", "featuredImageUrl", "featuredImageAlt", "cardImageUrl", "cardImageAlt", "overviewHeading", "overviewContent", "challengeHeading", "challengeContent", "solutionHeading", "solutionContent", "metrics", "keyResults", "highlights", "projectUrl"],
    exampleRow: {
      title: "Syntax Sidekick", slug: "syntax-sidekick", status: "draft", featured: "true", categories: "Web Development|Content Platforms", technologies: "React|TypeScript|Next.js|WordPress", heroSubtitle: "A modern publishing platform", heroSummary: "A headless technical publication designed for performance and structured content.", client: "Sintacks Studio", role: "UX Engineer and Front-End Architect", timeline: "6 months", year: "2026", featuredImageUrl: "http://localhost:4000/media/syntax-sidekick-featured.webp", featuredImageAlt: "Syntax Sidekick homepage", cardImageUrl: "http://localhost:4000/media/syntax-sidekick-card.webp", cardImageAlt: "Syntax Sidekick portfolio card", overviewHeading: "Project overview", overviewContent: "Built a statically generated frontend connected to a headless WordPress CMS.", challengeHeading: "The challenge", challengeContent: "The previous publishing workflow lacked consistency and performance.", solutionHeading: "The solution", solutionContent: "Created a structured headless publishing system.", metrics: `[{"label":"Lighthouse score","value":"94+","displayOrder":0}]`, keyResults: `[{"type":"performance","value":"70%","label":"Faster publishing workflow","order":0}]`, highlights: `[{"text":"Reusable publishing architecture","displayOrder":0}]`, projectUrl: "https://syntaxsidekick.com",
    },
  },
  {
    type: "github",
    label: "GitHub Project",
    description: "Open source and GitHub repository projects",
    requiredColumns: ["title", "repositoryUrl"],
    recommendedColumns: ["technologies", "featuredImageUrl", "featuredImageAlt", "cardImageUrl", "cardImageAlt"],
    templateColumns: ["title", "slug", "status", "categories", "technologies", "excerpt", "description", "repositoryUrl", "projectUrl", "featuredImageUrl", "featuredImageAlt", "cardImageUrl", "cardImageAlt", "platform", "subtype", "year", "highlights"],
    exampleRow: { title: "PipelineOS", slug: "pipelineos", status: "draft", categories: "Applications|Dashboards", technologies: "React|TypeScript|Express|MongoDB", excerpt: "A local job and freelance relationship manager.", description: "A MERN application for managing applications, recruiters, contacts, and freelance leads.", repositoryUrl: "https://github.com/example/pipelineos", projectUrl: "http://localhost:5173", featuredImageUrl: "http://localhost:4000/media/pipelineos-featured.webp", featuredImageAlt: "PipelineOS dashboard", cardImageUrl: "http://localhost:4000/media/pipelineos-card.webp", cardImageAlt: "PipelineOS project card", platform: "Web", subtype: "Open Source", year: "2026", highlights: `[{"text":"Typed React and Express architecture","displayOrder":0}]` },
  },
  {
    type: "design",
    label: "Design Project",
    description: "UI/UX and design-focused projects",
    requiredColumns: ["title", "subtype"],
    recommendedColumns: ["featuredImageUrl", "featuredImageAlt", "gallery"],
    templateColumns: ["title", "slug", "status", "featured", "categories", "technologies", "heroSubtitle", "heroSummary", "subtype", "client", "role", "timeline", "year", "featuredImageUrl", "featuredImageAlt", "desktopImageUrl", "desktopImageAlt", "mobileImageUrl", "mobileImageAlt", "cardImageUrl", "cardImageAlt", "overviewContent", "highlights", "projectUrl"],
    exampleRow: { title: "Portfolio 2026 Design System", slug: "portfolio-2026-design-system", status: "draft", featured: "true", categories: "Design Systems|Portfolio", technologies: "Figma|CSS", heroSubtitle: "A scalable visual system", heroSummary: "A reusable design system supporting the public portfolio and administration interface.", subtype: "Design System", client: "Personal Project", role: "UX Engineer and Front-End Architect", timeline: "4 weeks", year: "2026", featuredImageUrl: "http://localhost:4000/media/design-system-featured.webp", featuredImageAlt: "Portfolio design system overview", desktopImageUrl: "http://localhost:4000/media/design-system-desktop.webp", desktopImageAlt: "Desktop component library", mobileImageUrl: "http://localhost:4000/media/design-system-mobile.webp", mobileImageAlt: "Mobile portfolio components", cardImageUrl: "http://localhost:4000/media/design-system-card.webp", cardImageAlt: "Portfolio design system card", overviewContent: "Created tokens, components, templates, and accessibility standards.", highlights: `[{"text":"Reusable token and component architecture","displayOrder":0}]`, projectUrl: "https://example.com/design-system" },
  },
  {
    type: "codepen",
    label: "Code Experiment",
    description: "CodePen and technical experiments",
    requiredColumns: ["title"],
    recommendedColumns: ["technologies", "featuredImageUrl", "featuredImageAlt"],
    templateColumns: ["title", "slug", "status", "categories", "technologies", "excerpt", "description", "subtype", "codepenUrl", "projectUrl", "repositoryUrl", "featuredImageUrl", "featuredImageAlt", "cardImageUrl", "cardImageAlt", "highlights"],
    exampleRow: { title: "Accessible Animated Tabs", slug: "accessible-animated-tabs", status: "draft", categories: "Accessibility|Experiments", technologies: "HTML5|CSS3|JavaScript", excerpt: "An accessible tab interface with progressive motion.", description: "Explores keyboard navigation, focus management, and reduced-motion support.", subtype: "Accessibility Experiment", codepenUrl: "https://codepen.io/example/pen/example", projectUrl: "https://example.com/demo", repositoryUrl: "https://github.com/example/accessible-tabs", featuredImageUrl: "http://localhost:4000/media/tabs-featured.webp", featuredImageAlt: "Accessible animated tabs", cardImageUrl: "http://localhost:4000/media/tabs-card.webp", cardImageAlt: "Accessible tabs project card", highlights: `[{"text":"Full keyboard interaction and reduced-motion support","displayOrder":0}]` },
  },
];

export function getProjectImportTypeConfig(type: ProjectType) {
  return projectImportTypeConfigs.find((config) => config.type === type) ?? projectImportTypeConfigs[0];
}

export function normalizeStatusCell(value: string) {
  const map: Record<string, "draft" | "published" | "archived" | undefined> = { draft: "draft", published: "published", publish: "published", unpublished: "draft", active: "published", archived: "archived", archive: "archived" };
  return map[value.trim().toLowerCase()];
}

export function normalizeBooleanCell(value: string) {
  const map: Record<string, boolean | undefined> = { true: true, yes: true, "1": true, false: false, no: false, "0": false };
  return map[value.trim().toLowerCase()];
}

export function normalizeIntegerCell(value: string) {
  return /^-?\d+$/.test(value.trim()) ? Number.parseInt(value, 10) : undefined;
}
