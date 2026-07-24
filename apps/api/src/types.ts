import { z } from "zod";

export const projectStatuses = ["draft", "published", "archived"] as const;
export const projectTypes = ["case-study", "github", "design", "codepen"] as const;
export const technologyCategories = [
  "frontend",
  "framework",
  "language",
  "styling",
  "backend",
  "database",
  "cms",
  "design",
  "testing",
  "build-tool",
  "devops",
  "cloud",
  "accessibility",
  "other",
] as const;

export const mediaReferenceSchema = z.object({
  id: z.string().optional(),
  url: z.string().url().or(z.literal("")),
  thumbnailUrl: z.string().url().or(z.literal("")).optional(),
  title: z.string().optional(),
  alt: z.string().default(""),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const galleryImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url().or(z.literal("")),
  alt: z.string().default(""),
  caption: z.string().default(""),
  order: z.number().int().default(0),
  isFeatured: z.boolean().default(false),
});

export const referenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export const technologyReferenceSchema = referenceSchema.extend({
  key: z.string().optional(),
  category: z.enum(technologyCategories).optional(),
  iconKey: z.string().optional(),
  brandColor: z.string().optional(),
  active: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
  source: z.enum(["system", "custom"]).optional(),
});

export const projectMetricSchema = z.object({
  id: z.string().optional(),
  label: z.string().trim().min(1, "Metric label is required"),
  value: z.string().trim().min(1, "Metric value is required"),
  description: z.string().trim().optional(),
  displayOrder: z.number().int("Metric display order must be numeric"),
});

export const projectResultSchema = projectMetricSchema.extend({
  iconKey: z.string().trim().optional(),
  accentColor: z.string().trim().optional(),
});

export const projectHighlightSchema = z.object({
  id: z.string().optional(),
  text: z.string().trim().min(1, "Highlight text is required"),
  displayOrder: z.number().int().default(0),
});

const contentBlockSchema = z.object({
  heading: z.string().trim().optional(),
  content: z.string().trim().default(""),
  iconKey: z.string().trim().optional(),
  accentColor: z.string().trim().optional(),
});

export const projectInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1).optional(),
  projectType: z.enum(projectTypes).default("case-study"),
  status: z.enum(projectStatuses).default("draft"),
  excerpt: z.string().trim().default(""),
  description: z.string().trim().default(""),
  featured: z.boolean().default(false),
  featuredImage: mediaReferenceSchema.optional(),
  gallery: z.array(galleryImageSchema).default([]),
  hero: z.object({
    eyebrow: z.string().trim().optional(),
    subtitle: z.string().trim().min(1, "Hero subtitle is required"),
    summary: z.string().trim().min(1, "Hero summary is required"),
    badgeText: z.string().trim().optional(),
  }).optional(),
  media: z.object({
    featuredImage: mediaReferenceSchema.optional(),
    desktopImage: mediaReferenceSchema.optional(),
    mobileImage: mediaReferenceSchema.optional(),
    cardImage: mediaReferenceSchema.optional(),
    gallery: z.array(galleryImageSchema).default([]),
  }).optional(),
  overview: z.object({
    heading: z.string().trim().optional(),
    content: z.string().trim().min(1, "Overview content is required"),
  }).optional(),
  challenge: contentBlockSchema.optional(),
  solution: contentBlockSchema.optional(),
  primaryMetrics: z.array(projectMetricSchema).default([]),
  keyResults: z.array(projectResultSchema).default([]),
  highlights: z.array(projectHighlightSchema).default([]),
  details: z.object({
    client: z.string().trim().optional(),
    role: z.string().trim().optional(),
    platform: z.string().trim().optional(),
    subtype: z.string().trim().optional(),
    timeline: z.string().trim().optional(),
    launchDate: z.string().trim().optional(),
    year: z.number().int().min(1900).max(2100).optional(),
    teamSize: z.string().trim().optional(),
    statusLabel: z.string().trim().optional(),
  }).optional(),
  links: z.object({
    projectUrl: z.string().url().or(z.literal("")).optional(),
    repositoryUrl: z.string().url().or(z.literal("")).optional(),
    codepenUrl: z.string().url().or(z.literal("")).optional(),
    caseStudyUrl: z.string().url().or(z.literal("")).optional(),
    primaryLabel: z.string().trim().optional(),
    secondaryLabel: z.string().trim().optional(),
    openInNewTab: z.boolean().default(true),
  }).optional(),
  categories: z.array(referenceSchema).default([]),
  technologyIds: z.array(z.string()).default([]),
  technologies: z.array(technologyReferenceSchema).default([]),
  metrics: z.array(projectMetricSchema).default([]),
  projectUrl: z.string().url().or(z.literal("")).optional(),
  repositoryUrl: z.string().url().or(z.literal("")).optional(),
  codepenUrl: z.string().url().or(z.literal("")).optional(),
  client: z.string().trim().optional(),
  role: z.string().trim().optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  displayOrder: z.number().int().default(0),
});

export const taxonomyInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z.string().trim().optional(),
});

export const technologyInputSchema = taxonomyInputSchema.extend({
  key: z.string().trim().min(1, "Key is required").optional(),
  category: z.enum(technologyCategories).default("other"),
  iconKey: z.string().trim().min(1, "Icon key is required"),
  brandColor: z.string().trim().optional(),
  active: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  source: z.enum(["system", "custom"]).default("custom"),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
