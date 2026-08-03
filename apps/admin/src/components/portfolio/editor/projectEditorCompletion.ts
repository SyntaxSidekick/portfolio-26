import type { ProjectFormValues } from "../ProjectForm";
import {
  findFirstInvalidProjectUrl,
  hasSlugConflict,
  isAbsoluteHttpUrl,
  isGitHubProject,
  isValidGitHubRepositoryUrl,
  isValidOptionalDisplayOrder,
  slugPattern,
  type ProjectValidationContext,
} from "./projectValidationRules";

export interface BasicsStepErrors {
  title?: string;
  slug?: string;
  projectType?: string;
  categories?: string;
  heroSummary?: string;
  displayOrder?: string;
}

export interface CompletionItem {
  id: string;
  label: string;
  complete: boolean;
  issue?: string;
}

export interface CompletionSummary {
  items: CompletionItem[];
  completeCount: number;
  total: number;
  percent: number;
}

export interface PublishingValidationSummary extends CompletionSummary {
  readyToPublish: boolean;
  firstInvalidStepId?: CompletionItem["id"];
}

const stepOrder = ["basics", "images", "case-study", "technologies", "gallery", "links", "publishing"] as const;

function hasCaseStudyContent(values: ProjectFormValues) {
  return Boolean(values.overviewContent.trim() && values.challengeContent.trim() && values.solutionContent.trim());
}

function hasCaseStudyResultMismatch(values: ProjectFormValues) {
  return values.keyResults.some((result) => {
    const hasLabel = Boolean(result.label?.trim());
    const hasValue = Boolean(result.value?.trim());
    return hasLabel !== hasValue;
  });
}

function normalizeCompletion(items: CompletionItem[]): PublishingValidationSummary {
  const completeCount = items.filter((item) => item.complete).length;
  const total = items.length;
  const percent = total > 0 ? Math.round((completeCount / total) * 100) : 0;
  const firstInvalid = items.find((item) => !item.complete);

  return {
    items,
    completeCount,
    total,
    percent,
    readyToPublish: !firstInvalid,
    firstInvalidStepId: firstInvalid?.id,
  };
}

export function getPublishingValidation(values: ProjectFormValues): PublishingValidationSummary {
  return getPublishingValidationWithContext(values);
}

export function getPublishingValidationWithContext(values: ProjectFormValues, context?: ProjectValidationContext): PublishingValidationSummary {
  const basicsErrors = validateBasicsStepWithContext(values, context);
  const badLink = findFirstInvalidProjectUrl(values);
  const hasAnyLink = [values.projectUrl, values.repositoryUrl, values.codepenUrl, values.caseStudyUrl].some((url) => Boolean(url.trim()));
  const githubProject = isGitHubProject(values);

  const repositoryUrl = values.repositoryUrl.trim();
  const hasRepositoryUrl = Boolean(repositoryUrl);
  const hasValidRepositoryUrl = hasRepositoryUrl && isAbsoluteHttpUrl(repositoryUrl) && isValidGitHubRepositoryUrl(repositoryUrl);

  const publishingDisplayOrderValid = githubProject
    ? isValidOptionalDisplayOrder(values.displayOrder)
    : Number.isInteger(Number(values.displayOrder)) && Number(values.displayOrder) >= 0;

  const items: CompletionItem[] = [
    {
      id: "basics",
      label: "Project Basics",
      complete: Object.keys(basicsErrors).length === 0,
      issue: basicsErrors.title || basicsErrors.slug || basicsErrors.projectType || basicsErrors.categories || basicsErrors.heroSummary || basicsErrors.displayOrder,
    },
    {
      id: "images",
      label: "Images",
      complete: githubProject
        ? true
        : Boolean(
          values.featuredImageUrl.trim()
          && values.desktopImageUrl.trim()
          && values.mobileImageUrl.trim()
          && values.cardImageUrl.trim()
          && values.featuredImageAlt.trim()
          && values.desktopImageAlt.trim()
          && values.mobileImageAlt.trim()
          && values.cardImageAlt.trim(),
        ),
      issue: "Featured, desktop, mobile, and card images with alt text are required.",
    },
    {
      id: "case-study",
      label: "Case Study",
      complete: githubProject ? true : hasCaseStudyContent(values) && !hasCaseStudyResultMismatch(values),
      issue: hasCaseStudyResultMismatch(values)
        ? "Each key result needs both a label and a value."
        : "Overview, challenge, and solution content are required.",
    },
    {
      id: "technologies",
      label: "Technologies",
      complete: githubProject ? true : values.technologies.length > 0,
      issue: "Select at least one technology.",
    },
    {
      id: "gallery",
      label: "Gallery",
      complete: true,
      issue: undefined,
    },
    {
      id: "links",
      label: "Links",
      complete: githubProject
        ? hasValidRepositoryUrl && !badLink
        : hasAnyLink && !badLink,
      issue: githubProject
        ? !hasRepositoryUrl
          ? "Repository URL is required for GitHub projects."
          : !isAbsoluteHttpUrl(repositoryUrl)
            ? "Use a valid absolute URL starting with http:// or https://."
            : !isValidGitHubRepositoryUrl(repositoryUrl)
              ? "Use a GitHub repository URL in the format https://github.com/owner/repo."
              : badLink
                ? "Use valid absolute URLs starting with http:// or https://."
                : undefined
        : badLink
          ? "Use valid absolute URLs starting with http:// or https://."
          : "Add at least one project link.",
    },
    {
      id: "publishing",
      label: "Publishing",
      complete: Boolean(values.status && slugPattern.test(values.slug.trim()) && publishingDisplayOrderValid),
      issue: githubProject
        ? "Set a valid slug and publication status. If display order is set, it must be 0 or greater."
        : "Set a valid slug, publication status, and a display order of 0 or greater.",
    },
  ].map((item) => (item.complete ? { ...item, issue: undefined } : item));

  const orderedItems = stepOrder
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is CompletionItem => Boolean(item));

  return normalizeCompletion(orderedItems);
}

export function validateBasicsStep(values: ProjectFormValues): BasicsStepErrors {
  return validateBasicsStepWithContext(values);
}

export function validateBasicsStepWithContext(values: ProjectFormValues, context?: ProjectValidationContext): BasicsStepErrors {
  const errors: BasicsStepErrors = {};
  const githubProject = isGitHubProject(values);

  if (!values.title.trim()) {
    errors.title = "Project title is required.";
  }

  if (!values.slug.trim()) {
    errors.slug = "Slug is required.";
  } else if (!slugPattern.test(values.slug.trim())) {
    errors.slug = "Use lowercase letters, numbers, and hyphens only.";
  } else if (hasSlugConflict(values.slug, context)) {
    errors.slug = "Slug is already in use.";
  }

  if (!values.projectType) {
    errors.projectType = "Project type is required.";
  }

  if (!githubProject && values.categories.length === 0) {
    errors.categories = "Select at least one project category.";
  }

  if (!githubProject && !values.heroSummary.trim()) {
    errors.heroSummary = "Short description is required.";
  }

  if (githubProject) {
    if (!isValidOptionalDisplayOrder(values.displayOrder)) {
      errors.displayOrder = "Display order must be a whole number greater than or equal to 0.";
    }
    return errors;
  }

  const parsedDisplayOrder = Number(values.displayOrder);
  if (!Number.isInteger(parsedDisplayOrder) || parsedDisplayOrder < 0) {
    errors.displayOrder = "Display order must be a whole number greater than or equal to 0.";
  }

  return errors;
}

export function getProjectCompletion(values: ProjectFormValues): CompletionSummary {
  return getProjectCompletionWithContext(values);
}

export function getProjectCompletionWithContext(values: ProjectFormValues, context?: ProjectValidationContext): CompletionSummary {
  const summary = getPublishingValidationWithContext(values, context);
  return {
    items: summary.items,
    completeCount: summary.completeCount,
    total: summary.total,
    percent: summary.percent,
  };
}
