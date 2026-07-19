export type BlogPost = Readonly<{
  slug: string;
  title: string;
}>;

export const blogPosts = [
  {
    "title": "Native CSS Is Replacing Sass Faster Than You Think",
    "slug": "native-css-sass"
  },
  {
    "title": "TypeScript From Day Three",
    "slug": "typescript-day-three"
  },
  {
    "title": "CSS Features Every Front-End Developer Should Know in 2026",
    "slug": "css-features-2026"
  },
  {
    "title": "JavaScript Projects That Build Real Confidence",
    "slug": "javascript-projects"
  },
  {
    "title": "JavaScript vs TypeScript: What Actually Changes",
    "slug": "javascript-vs-typescript"
  },
  {
    "title": "TypeScript Basics for Front-End Developers",
    "slug": "typescript-basics"
  },
  {
    "title": "TypeScript in Ten Minutes",
    "slug": "typescript-ten-minutes"
  },
  {
    "title": "The Invisible UX Work That Makes Interfaces Feel Simple",
    "slug": "invisible-ux"
  },
  {
    "title": "A Practical Web Accessibility Guide",
    "slug": "web-accessibility-guide"
  },
  {
    "title": "Material Design Motion Patterns That Still Hold Up",
    "slug": "material-design-motion"
  },
  {
    "title": "Accessible Navigation Patterns",
    "slug": "accessible-navigation"
  },
  {
    "title": "The State of Front-End Architecture",
    "slug": "state-of-front-end"
  },
  {
    "title": "Design Systems That Stay Usable",
    "slug": "usable-design-systems"
  },
  {
    "title": "Accessibility Checklist for Product Teams",
    "slug": "accessibility-checklist"
  }
] satisfies BlogPost[];
