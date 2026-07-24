export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  projectType: "case-study" | "github" | "design" | "codepen";
  status: "draft" | "published" | "archived";
  excerpt: string;
  description: string;
  featured: boolean;
  featuredImage?: { url: string; alt: string };
  hero?: { eyebrow?: string; subtitle: string; summary: string; badgeText?: string };
  media?: {
    featuredImage?: { url: string; alt: string };
    desktopImage?: { url: string; alt: string };
    mobileImage?: { url: string; alt: string };
    cardImage?: { url: string; alt: string };
  };
  overview?: { heading?: string; content: string };
  challenge?: { heading?: string; content: string; iconKey?: string; accentColor?: string };
  solution?: { heading?: string; content: string; iconKey?: string; accentColor?: string };
  categories: { id: string; name: string; slug: string }[];
  technologies: { id: string; key?: string; name: string; slug: string; category?: string; iconKey?: string; brandColor?: string; displayOrder?: number }[];
  metrics: {
    id: string;
    label: string;
    value: string;
    description?: string;
    displayOrder: number;
  }[];
  primaryMetrics?: PublicProject["metrics"];
  keyResults?: {
    id: string;
    label: string;
    value: string;
    description?: string;
    iconKey?: string;
    accentColor?: string;
    displayOrder: number;
  }[];
  highlights?: { id: string; text: string; displayOrder: number }[];
  details?: { client?: string; role?: string; platform?: string; subtype?: string; timeline?: string; launchDate?: string; year?: number; teamSize?: string; statusLabel?: string };
  links?: { projectUrl?: string; repositoryUrl?: string; codepenUrl?: string; caseStudyUrl?: string; primaryLabel?: string; secondaryLabel?: string; openInNewTab?: boolean };
  projectUrl?: string;
  repositoryUrl?: string;
  codepenUrl?: string;
  client?: string;
  role?: string;
  year?: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

const baseUrl = process.env.PORTFOLIO_API_BASE_URL ?? "http://localhost:4000/api";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Portfolio API request failed: ${response.status}`);
  }
  const body = await response.json();
  return body.data as T;
}

export function getPublishedProjects() {
  return request<PublicProject[]>("/projects?status=published");
}

export function getProjectBySlug(slug: string) {
  return request<PublicProject>(`/projects/slug/${slug}`);
}

export async function tryGetPublishedProjects() {
  try {
    return { projects: await getPublishedProjects(), error: "" };
  } catch (error) {
    return {
      projects: [],
      error: error instanceof Error ? error.message : "Portfolio API is unavailable",
    };
  }
}
