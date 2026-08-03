import type { ProjectFormValues } from "../ProjectForm";

export interface ProjectValidationContext {
  slugOwnersBySlug?: ReadonlyMap<string, string>;
  currentProjectId?: string;
}

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isGitHubProject(values: ProjectFormValues) {
  return values.projectType === "github";
}

export function isAbsoluteHttpUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function isValidGitHubRepositoryUrl(value: string) {
  const trimmed = value.trim();
  return /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(trimmed);
}

export function isValidOptionalDisplayOrder(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }

  const parsed = Number(trimmed);
  return Number.isInteger(parsed) && parsed >= 0;
}

export function findFirstInvalidProjectUrl(values: ProjectFormValues) {
  const candidates = [
    values.projectUrl,
    values.repositoryUrl,
    values.codepenUrl,
    values.caseStudyUrl,
  ]
    .map((value) => value.trim())
    .filter(Boolean);

  return candidates.find((url) => !isAbsoluteHttpUrl(url));
}

export function hasSlugConflict(slug: string, context?: ProjectValidationContext) {
  const normalized = slug.trim().toLowerCase();
  if (!normalized || !context?.slugOwnersBySlug) {
    return false;
  }

  const ownerId = context.slugOwnersBySlug.get(normalized);
  if (!ownerId) {
    return false;
  }

  return ownerId !== context.currentProjectId;
}
