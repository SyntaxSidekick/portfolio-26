export type TechnologyCategory =
  | "frontend"
  | "framework"
  | "language"
  | "styling"
  | "backend"
  | "database"
  | "cms"
  | "design"
  | "testing"
  | "build-tool"
  | "devops"
  | "cloud"
  | "accessibility"
  | "other";

export interface TechnologyDefinition {
  key: string;
  name: string;
  slug: string;
  category: TechnologyCategory;
  iconKey: string;
  brandColor?: string;
  aliases?: string[];
  active: boolean;
  displayOrder: number;
}

export const technologyRegistry: TechnologyDefinition[] = [
  { key: "html5", name: "HTML5", slug: "html5", category: "language", iconKey: "html5", brandColor: "#e34f26", active: true, displayOrder: 10 },
  { key: "css3", name: "CSS3", slug: "css3", category: "styling", iconKey: "css3", brandColor: "#1572b6", active: true, displayOrder: 20 },
  { key: "javascript", name: "JavaScript", slug: "javascript", category: "language", iconKey: "javascript", brandColor: "#f7df1e", active: true, displayOrder: 30 },
  { key: "typescript", name: "TypeScript", slug: "typescript", category: "language", iconKey: "typescript", brandColor: "#3178c6", active: true, displayOrder: 40 },
  { key: "php", name: "PHP", slug: "php", category: "language", iconKey: "php", brandColor: "#777bb4", active: true, displayOrder: 50 },
  { key: "sql", name: "SQL", slug: "sql", category: "database", iconKey: "database", active: true, displayOrder: 60 },
  { key: "markdown", name: "Markdown", slug: "markdown", category: "language", iconKey: "markdown", active: true, displayOrder: 70 },
  { key: "react", name: "React", slug: "react", category: "frontend", iconKey: "react", brandColor: "#61dafb", active: true, displayOrder: 100 },
  { key: "nextjs", name: "Next.js", slug: "nextjs", category: "framework", iconKey: "nextjs", active: true, displayOrder: 110 },
  { key: "vue", name: "Vue.js", slug: "vuejs", category: "framework", iconKey: "vue", brandColor: "#42b883", active: true, displayOrder: 120, aliases: ["vuejs"] },
  { key: "redux", name: "Redux", slug: "redux", category: "frontend", iconKey: "redux", brandColor: "#764abc", active: true, displayOrder: 130 },
  { key: "react-router", name: "React Router", slug: "react-router", category: "frontend", iconKey: "react-router", brandColor: "#ca4245", active: true, displayOrder: 140 },
  { key: "vite", name: "Vite", slug: "vite", category: "build-tool", iconKey: "vite", brandColor: "#646cff", active: true, displayOrder: 150 },
  { key: "astro", name: "Astro", slug: "astro", category: "framework", iconKey: "astro", brandColor: "#ff5d01", active: true, displayOrder: 160 },
  { key: "web-components", name: "Web Components", slug: "web-components", category: "frontend", iconKey: "web-components", active: true, displayOrder: 170 },
  { key: "lit", name: "Lit", slug: "lit", category: "frontend", iconKey: "lit", brandColor: "#324fff", active: true, displayOrder: 180 },
  { key: "sass", name: "Sass", slug: "sass", category: "styling", iconKey: "sass", brandColor: "#cc6699", active: true, displayOrder: 200 },
  { key: "tailwind", name: "Tailwind CSS", slug: "tailwind-css", category: "styling", iconKey: "tailwind", brandColor: "#06b6d4", active: true, displayOrder: 210 },
  { key: "css-modules", name: "CSS Modules", slug: "css-modules", category: "styling", iconKey: "css", active: true, displayOrder: 220 },
  { key: "styled-components", name: "Styled Components", slug: "styled-components", category: "styling", iconKey: "styled-components", brandColor: "#db7093", active: true, displayOrder: 230 },
  { key: "material-ui", name: "Material UI", slug: "material-ui", category: "styling", iconKey: "material-ui", brandColor: "#007fff", active: true, displayOrder: 240 },
  { key: "bootstrap", name: "Bootstrap", slug: "bootstrap", category: "styling", iconKey: "bootstrap", brandColor: "#7952b3", active: true, displayOrder: 250 },
  { key: "nodejs", name: "Node.js", slug: "nodejs", category: "backend", iconKey: "nodejs", brandColor: "#5fa04e", active: true, displayOrder: 300 },
  { key: "express", name: "Express", slug: "express", category: "backend", iconKey: "express", active: true, displayOrder: 310 },
  { key: "rest-api", name: "REST API", slug: "rest-api", category: "backend", iconKey: "api", active: true, displayOrder: 320 },
  { key: "graphql", name: "GraphQL", slug: "graphql", category: "backend", iconKey: "graphql", brandColor: "#e10098", active: true, displayOrder: 330 },
  { key: "wpgraphql", name: "WPGraphQL", slug: "wpgraphql", category: "cms", iconKey: "graphql", active: true, displayOrder: 340 },
  { key: "mongodb", name: "MongoDB", slug: "mongodb", category: "database", iconKey: "mongodb", brandColor: "#47a248", active: true, displayOrder: 400 },
  { key: "mysql", name: "MySQL", slug: "mysql", category: "database", iconKey: "mysql", brandColor: "#4479a1", active: true, displayOrder: 410 },
  { key: "postgresql", name: "PostgreSQL", slug: "postgresql", category: "database", iconKey: "postgresql", brandColor: "#4169e1", active: true, displayOrder: 420 },
  { key: "wordpress", name: "WordPress", slug: "wordpress", category: "cms", iconKey: "wordpress", brandColor: "#21759b", active: true, displayOrder: 500 },
  { key: "headless-wordpress", name: "Headless WordPress", slug: "headless-wordpress", category: "cms", iconKey: "wordpress", active: true, displayOrder: 510 },
  { key: "drupal", name: "Drupal", slug: "drupal", category: "cms", iconKey: "drupal", brandColor: "#0678be", active: true, displayOrder: 520 },
  { key: "woocommerce", name: "WooCommerce", slug: "woocommerce", category: "cms", iconKey: "woocommerce", brandColor: "#96588a", active: true, displayOrder: 530 },
  { key: "figma", name: "Figma", slug: "figma", category: "design", iconKey: "figma", brandColor: "#f24e1e", active: true, displayOrder: 600 },
  { key: "figjam", name: "FigJam", slug: "figjam", category: "design", iconKey: "figma", active: true, displayOrder: 610 },
  { key: "photoshop", name: "Adobe Photoshop", slug: "adobe-photoshop", category: "design", iconKey: "photoshop", brandColor: "#31a8ff", active: true, displayOrder: 620 },
  { key: "illustrator", name: "Adobe Illustrator", slug: "adobe-illustrator", category: "design", iconKey: "illustrator", brandColor: "#ff9a00", active: true, displayOrder: 630 },
  { key: "indesign", name: "Adobe InDesign", slug: "adobe-indesign", category: "design", iconKey: "indesign", brandColor: "#ff3366", active: true, displayOrder: 640 },
  { key: "framer", name: "Framer", slug: "framer", category: "design", iconKey: "framer", active: true, displayOrder: 650 },
  { key: "miro", name: "Miro", slug: "miro", category: "design", iconKey: "miro", brandColor: "#ffd02f", active: true, displayOrder: 660 },
  { key: "jest", name: "Jest", slug: "jest", category: "testing", iconKey: "jest", brandColor: "#c21325", active: true, displayOrder: 700 },
  { key: "vitest", name: "Vitest", slug: "vitest", category: "testing", iconKey: "vitest", brandColor: "#6e9f18", active: true, displayOrder: 710 },
  { key: "playwright", name: "Playwright", slug: "playwright", category: "testing", iconKey: "playwright", brandColor: "#2ead33", active: true, displayOrder: 720 },
  { key: "cypress", name: "Cypress", slug: "cypress", category: "testing", iconKey: "cypress", active: true, displayOrder: 730 },
  { key: "testing-library", name: "Testing Library", slug: "testing-library", category: "testing", iconKey: "testing-library", brandColor: "#e33332", active: true, displayOrder: 740 },
  { key: "lighthouse", name: "Lighthouse", slug: "lighthouse", category: "testing", iconKey: "lighthouse", active: true, displayOrder: 750 },
  { key: "axe", name: "axe", slug: "axe", category: "accessibility", iconKey: "axe", active: true, displayOrder: 760 },
  { key: "eslint", name: "ESLint", slug: "eslint", category: "testing", iconKey: "eslint", brandColor: "#4b32c3", active: true, displayOrder: 770 },
  { key: "prettier", name: "Prettier", slug: "prettier", category: "testing", iconKey: "prettier", brandColor: "#f7b93e", active: true, displayOrder: 780 },
  { key: "git", name: "Git", slug: "git", category: "devops", iconKey: "git", brandColor: "#f05032", active: true, displayOrder: 800 },
  { key: "github", name: "GitHub", slug: "github", category: "devops", iconKey: "github", active: true, displayOrder: 810 },
  { key: "github-actions", name: "GitHub Actions", slug: "github-actions", category: "devops", iconKey: "github-actions", brandColor: "#2088ff", active: true, displayOrder: 820 },
  { key: "jenkins", name: "Jenkins", slug: "jenkins", category: "devops", iconKey: "jenkins", active: true, displayOrder: 830 },
  { key: "pnpm", name: "pnpm", slug: "pnpm", category: "build-tool", iconKey: "pnpm", brandColor: "#f69220", active: true, displayOrder: 840 },
  { key: "npm", name: "npm", slug: "npm", category: "build-tool", iconKey: "npm", brandColor: "#cb3837", active: true, displayOrder: 850 },
  { key: "webpack", name: "Webpack", slug: "webpack", category: "build-tool", iconKey: "webpack", brandColor: "#8dd6f9", active: true, displayOrder: 860 },
  { key: "babel", name: "Babel", slug: "babel", category: "build-tool", iconKey: "babel", brandColor: "#f9dc3e", active: true, displayOrder: 870 },
  { key: "docker", name: "Docker", slug: "docker", category: "devops", iconKey: "docker", brandColor: "#2496ed", active: true, displayOrder: 880 },
  { key: "vercel", name: "Vercel", slug: "vercel", category: "cloud", iconKey: "vercel", active: true, displayOrder: 900 },
  { key: "netlify", name: "Netlify", slug: "netlify", category: "cloud", iconKey: "netlify", brandColor: "#00c7b7", active: true, displayOrder: 910 },
  { key: "cloudflare", name: "Cloudflare", slug: "cloudflare", category: "cloud", iconKey: "cloudflare", brandColor: "#f38020", active: true, displayOrder: 920 },
  { key: "aws", name: "AWS", slug: "aws", category: "cloud", iconKey: "aws", brandColor: "#ff9900", active: true, displayOrder: 930 },
  { key: "azure", name: "Azure", slug: "azure", category: "cloud", iconKey: "azure", brandColor: "#0078d4", active: true, displayOrder: 940 },
  { key: "wcag", name: "WCAG", slug: "wcag", category: "accessibility", iconKey: "accessibility", active: true, displayOrder: 1000 },
  { key: "aria", name: "ARIA", slug: "aria", category: "accessibility", iconKey: "accessibility", active: true, displayOrder: 1010 },
  { key: "core-web-vitals", name: "Core Web Vitals", slug: "core-web-vitals", category: "accessibility", iconKey: "lighthouse", active: true, displayOrder: 1020 },
];
