import type { BlogPostSummary, CommentSummary, Gallery, MediaItem, PortfolioProject, SiteStat, TechnologyReference, TrafficSource } from "../types/admin";

const mockTechnology = (id: string, name: string, slug: string, iconKey = slug): TechnologyReference => ({
  id,
  key: slug,
  name,
  slug,
  category: "frontend",
  iconKey,
  active: true,
  displayOrder: 0,
  source: "system",
});

export const siteStats: SiteStat[] = [
  { id: "posts", label: "Total Posts", value: "156", trend: "\u2191 12 this month", icon: "file", color: "blue" },
  { id: "projects", label: "Portfolio Projects", value: "24", trend: "\u2191 3 this month", icon: "briefcase", color: "purple" },
  { id: "views", label: "Total Views", value: "48.7K", trend: "\u2191 18.2% vs last month", icon: "eye", color: "blue" },
  { id: "engagement", label: "Avg. Engagement", value: "4m 32s", trend: "\u2191 8.1% vs last month", icon: "activity", color: "green" },
  { id: "comments", label: "Comments", value: "98", trend: "\u2191 15 this month", icon: "message", color: "yellow" },
  { id: "subscribers", label: "Subscribers", value: "2.1K", trend: "\u2191 7.3% vs last month", icon: "user", color: "pink" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "syntaxsidekick",
    title: "SyntaxSidekick",
    slug: "syntaxsidekick",
    excerpt: "Coding Blog & Resource Hub",
    description: "Coding Blog & Resource Hub",
    projectType: "case-study",
    status: "published",
    featured: true,
    categories: [{ id: "web-development", name: "Web Development", slug: "web-development" }],
    technologies: [mockTechnology("nextjs", "Next.js", "nextjs"), mockTechnology("typescript", "TypeScript", "typescript"), mockTechnology("css", "CSS", "css")],
    featuredImage: { url: "", alt: "SyntaxSidekick" },
    gallery: [],
    metrics: [],
    displayOrder: 1,
    createdAt: "2025-03-28T00:00:00.000Z",
    updatedAt: "2025-03-28T00:00:00.000Z",
  },
  {
    id: "abosify",
    title: "Abosify",
    slug: "abosify",
    excerpt: "Business Autopilot OS",
    description: "Business Autopilot OS",
    projectType: "github",
    status: "published",
    featured: true,
    categories: [{ id: "web-application", name: "Web Application", slug: "web-application" }],
    technologies: [mockTechnology("react", "React", "react"), mockTechnology("node", "Node", "node"), mockTechnology("mongodb", "MongoDB", "mongodb")],
    featuredImage: { url: "", alt: "Abosify" },
    gallery: [],
    metrics: [],
    displayOrder: 2,
    createdAt: "2025-02-15T00:00:00.000Z",
    updatedAt: "2025-02-15T00:00:00.000Z",
  },
  {
    id: "virtued",
    title: "VirtuEd Online",
    slug: "virtued",
    excerpt: "E-Learning Platform",
    description: "E-Learning Platform",
    projectType: "github",
    status: "published",
    featured: false,
    categories: [{ id: "web-application", name: "Web Application", slug: "web-application" }],
    technologies: [mockTechnology("react", "React", "react"), mockTechnology("express", "Express", "express"), mockTechnology("mongodb", "MongoDB", "mongodb")],
    featuredImage: { url: "", alt: "VirtuEd" },
    gallery: [],
    metrics: [],
    displayOrder: 3,
    createdAt: "2025-01-05T00:00:00.000Z",
    updatedAt: "2025-01-05T00:00:00.000Z",
  },
  {
    id: "bonnier",
    title: "Bonnier Design System",
    slug: "bonnier",
    excerpt: "Design System & Component Library",
    description: "Design System & Component Library",
    projectType: "design",
    status: "published",
    featured: true,
    categories: [{ id: "design-system", name: "Design System", slug: "design-system" }],
    technologies: [mockTechnology("figma", "Figma", "figma"), mockTechnology("react", "React", "react"), mockTechnology("storybook", "Storybook", "storybook")],
    featuredImage: { url: "", alt: "Bonnier" },
    gallery: [],
    metrics: [],
    displayOrder: 4,
    createdAt: "2024-12-12T00:00:00.000Z",
    updatedAt: "2024-12-12T00:00:00.000Z",
  },
  {
    id: "vistana",
    title: "Time 2 Visit (Vistana)",
    slug: "vistana",
    excerpt: "Travel & Hospitality Platform",
    description: "Travel & Hospitality Platform",
    projectType: "case-study",
    status: "published",
    featured: false,
    categories: [{ id: "web-development", name: "Web Development", slug: "web-development" }],
    technologies: [mockTechnology("nextjs", "Next.js", "nextjs"), mockTechnology("graphql", "GraphQL", "graphql")],
    featuredImage: { url: "", alt: "Time 2 Visit" },
    gallery: [],
    metrics: [],
    displayOrder: 5,
    createdAt: "2024-11-20T00:00:00.000Z",
    updatedAt: "2024-11-20T00:00:00.000Z",
  },
];

export const blogPosts: BlogPostSummary[] = [
  { id: "native-css", title: "Native CSS Is Quietly Replacing Sass, But It Isn't...", category: "Web Development", status: "Published", date: "Jan 16, 2025", views: "2.4K views", tags: ["CSS"] },
  { id: "everyday-types", title: "Everyday Types Explained (From the Ground Up)", category: "TypeScript", status: "Published", date: "Jan 14, 2025", views: "1.8K views", tags: ["TypeScript"] },
  { id: "css-2026", title: "2026: CSS Features You Must Know", category: "CSS", status: "Published", date: "Jan 10, 2025", views: "3.1K views", tags: ["CSS"] },
  { id: "js-60", title: "60 JavaScript Projects in 60 Days", category: "JavaScript", status: "Draft", date: "Dec 31, 2024", tags: ["JavaScript"] },
  { id: "js-vs-ts", title: "JavaScript vs TypeScript: What Actually Changes", category: "TypeScript", status: "Published", date: "Dec 30, 2024", views: "2.0K views", tags: ["TypeScript"] },
];

export const recentComments: CommentSummary[] = [
  { id: "james", initials: "JC", author: "James Carter", excerpt: "Great article on CSS Grid! Helped me fix a...", receivedAt: "2026-07-19T16:00", relativeTime: "2h ago", unread: true },
  { id: "sarah", initials: "SJ", author: "Sarah Johnson", excerpt: "Really insightful post on accessibility...", receivedAt: "2026-07-19T13:00", relativeTime: "5h ago", unread: true },
  { id: "alex", initials: "AM", author: "Alex Martinez", excerpt: "The TypeScript tips are fire. Super helpful!", receivedAt: "2026-07-18", relativeTime: "1d ago", unread: true },
  { id: "priya", initials: "PS", author: "Priya Shah", excerpt: "Love your content. Keep up the amazing...", receivedAt: "2026-07-17", relativeTime: "2d ago", unread: true },
];

export const trafficSources: TrafficSource[] = [
  { id: "organic", label: "Organic Search", value: "62%" },
  { id: "direct", label: "Direct", value: "18%" },
  { id: "social", label: "Social", value: "10%" },
  { id: "referral", label: "Referral", value: "6%" },
  { id: "other", label: "Other", value: "4%" },
];

export const galleries: Gallery[] = [
  {
    id: "brand-systems",
    title: "Brand Systems",
    layout: "Masonry",
    status: "Published",
    images: [
      { id: "brand-01", title: "Identity board", alt: "Brand identity board", caption: "Primary marks and tone", order: 1, isFeatured: true },
      { id: "brand-02", title: "Poster layout", alt: "Editorial poster layout", caption: "Print composition", order: 2, isFeatured: false },
    ],
  },
];

export const mediaItems: MediaItem[] = [
  { id: "hero", filename: "portfolio-hero.jpg", originalFilename: "portfolio-hero.jpg", storageKey: "media/originals/mock/portfolio-hero.jpg", url: "", mimeType: "image/jpeg", extension: "jpg", size: 438272, title: "Portfolio hero", alt: "Portfolio hero image", caption: "Homepage hero", description: "", tags: [], createdAt: "2026-07-18T00:00:00.000Z", updatedAt: "2026-07-18T00:00:00.000Z" },
  { id: "case-study", filename: "case-study-cover.png", originalFilename: "case-study-cover.png", storageKey: "media/originals/mock/case-study-cover.png", url: "", mimeType: "image/png", extension: "png", size: 319488, title: "Case study cover", alt: "Case study cover", caption: "Project card image", description: "", tags: [], createdAt: "2026-07-17T00:00:00.000Z", updatedAt: "2026-07-17T00:00:00.000Z" },
];
