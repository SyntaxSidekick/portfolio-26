export type PublicationStatus = "Draft" | "Published";
export type ProjectStatus = "draft" | "published" | "archived";
export type ProjectType = "case-study" | "github" | "design" | "codepen";
export type TechnologyCategory = "frontend" | "framework" | "language" | "styling" | "backend" | "database" | "cms" | "design" | "testing" | "build-tool" | "devops" | "cloud" | "accessibility" | "other";
export type TechnologySource = "system" | "custom";

export interface GalleryImage {
  id: string;
  title?: string;
  url?: string;
  alt: string;
  caption: string;
  order: number;
  isFeatured: boolean;
}

export interface MediaReference {
  id?: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CategoryReference {
  id: string;
  name: string;
  slug: string;
  usageCount?: number;
}

export interface TechnologyReference extends CategoryReference {
  key?: string;
  category: TechnologyCategory;
  iconKey: string;
  brandColor?: string;
  active: boolean;
  displayOrder: number;
  source?: TechnologySource;
}

export interface ProjectMetric {
  id: string;
  label: string;
  value: string;
  description?: string;
  displayOrder: number;
}

export interface ProjectResult extends ProjectMetric {
  iconKey?: string;
  accentColor?: string;
}

export interface ProjectHighlight {
  id: string;
  text: string;
  displayOrder: number;
}

export interface ProjectContentBlock {
  heading?: string;
  content: string;
  iconKey?: string;
  accentColor?: string;
}

export interface Gallery {
  id: string;
  title: string;
  layout: "Grid" | "Masonry" | "Editorial";
  status: PublicationStatus;
  images: GalleryImage[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  projectType: ProjectType;
  status: ProjectStatus;
  excerpt: string;
  description: string;
  featured: boolean;
  featuredImage?: MediaReference;
  gallery: GalleryImage[];
  hero?: { eyebrow?: string; subtitle: string; summary: string; badgeText?: string };
  media?: { featuredImage?: MediaReference; desktopImage?: MediaReference; mobileImage?: MediaReference; cardImage?: MediaReference; gallery: GalleryImage[] };
  overview?: { heading?: string; content: string };
  challenge?: ProjectContentBlock;
  solution?: ProjectContentBlock;
  primaryMetrics?: ProjectMetric[];
  keyResults?: ProjectResult[];
  highlights?: ProjectHighlight[];
  details?: { client?: string; role?: string; platform?: string; subtype?: string; timeline?: string; launchDate?: string; year?: number; teamSize?: string; statusLabel?: string };
  links?: { projectUrl?: string; repositoryUrl?: string; codepenUrl?: string; caseStudyUrl?: string; primaryLabel?: string; secondaryLabel?: string; openInNewTab?: boolean };
  categories: CategoryReference[];
  technologyIds?: string[];
  technologies: TechnologyReference[];
  metrics: ProjectMetric[];
  projectUrl?: string;
  repositoryUrl?: string;
  codepenUrl?: string;
  client?: string;
  role?: string;
  year?: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  category: string;
  status: PublicationStatus;
  date: string;
  views?: string;
  tags: string[];
}

export interface MediaItem {
  id: string;
  filename: string;
  originalFilename: string;
  storageKey: string;
  url: string;
  thumbnailUrl?: string;
  mediumUrl?: string;
  largeUrl?: string;
  mimeType: string;
  extension: string;
  size: number;
  width?: number;
  height?: number;
  aspectRatio?: number;
  title: string;
  alt: string;
  caption?: string;
  description?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentSummary {
  id: string;
  initials: string;
  author: string;
  excerpt: string;
  receivedAt: string;
  relativeTime: string;
  unread: boolean;
}

export interface SiteStat {
  id: string;
  label: string;
  value: string;
  trend: string;
  icon: "file" | "briefcase" | "eye" | "activity" | "message" | "user";
  color: "blue" | "purple" | "green" | "yellow" | "pink";
}

export interface TrafficSource {
  id: string;
  label: string;
  value: string;
}
