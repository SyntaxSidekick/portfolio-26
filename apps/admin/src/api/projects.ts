import type { CaseStudySectionKey, CategoryReference, GalleryImage, MediaReference, PortfolioProject, ProjectHighlight, ProjectMetric, ProjectResult, ProjectStatus, ProjectType } from "../types/admin";
import { apiRequest } from "./client";

export interface ProjectPayload {
  title: string;
  slug: string;
  projectType: ProjectType;
  status: ProjectStatus;
  excerpt: string;
  description: string;
  featured: boolean;
  featuredImage?: MediaReference;
  gallery: GalleryImage[];
  hero: { eyebrow?: string; subtitle: string; summary: string; badgeText?: string };
  media: { featuredImage?: MediaReference; desktopImage?: MediaReference; mobileImage?: MediaReference; cardImage?: MediaReference; gallery: GalleryImage[] };
  overview: { heading?: string; content: string; iconKey?: string; media?: MediaReference };
  challenge: { heading?: string; content: string; iconKey?: string; accentColor?: string; media?: MediaReference };
  solution: { heading?: string; content: string; iconKey?: string; accentColor?: string; media?: MediaReference };
  caseStudy?: {
    sectionOrder: CaseStudySectionKey[];
    sectionMedia?: {
      overview?: MediaReference;
      challenge?: MediaReference;
      solution?: MediaReference;
      highlights?: MediaReference;
    };
  };
  primaryMetrics: ProjectMetric[];
  keyResults: ProjectResult[];
  highlights: ProjectHighlight[];
  details: { client?: string; role?: string; platform?: string; subtype?: string; timeline?: string; launchDate?: string; year?: number; teamSize?: string; statusLabel?: string };
  links: { projectUrl?: string; repositoryUrl?: string; codepenUrl?: string; caseStudyUrl?: string; primaryLabel?: string; secondaryLabel?: string; openInNewTab?: boolean };
  categories: CategoryReference[];
  technologyIds: string[];
  metrics: ProjectMetric[];
  projectUrl: string;
  repositoryUrl: string;
  codepenUrl: string;
  client: string;
  role: string;
  year?: number;
  displayOrder: number;
}

export function listProjects(signal?: AbortSignal) {
  return apiRequest<PortfolioProject[]>("/projects", {}, signal);
}

export function listPublishedProjects(signal?: AbortSignal) {
  return apiRequest<PortfolioProject[]>(`/projects?status=${"published" satisfies ProjectStatus}`, {}, signal);
}

export function getProject(id: string, signal?: AbortSignal) {
  return apiRequest<PortfolioProject>(`/projects/${id}`, {}, signal);
}

export function createProject(payload: ProjectPayload) {
  return apiRequest<PortfolioProject>("/projects", { method: "POST", body: JSON.stringify(payload) });
}

export function updateProject(id: string, payload: ProjectPayload) {
  return apiRequest<PortfolioProject>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export function patchProject(id: string, payload: Partial<ProjectPayload>) {
  return apiRequest<PortfolioProject>(`/projects/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export function deleteProject(id: string) {
  return apiRequest<void>(`/projects/${id}`, { method: "DELETE" });
}
