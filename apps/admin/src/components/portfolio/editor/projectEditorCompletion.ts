import type { ProjectFormValues } from "../ProjectForm";

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

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const stepOrder = ["basics", "images", "case-study", "technologies", "gallery", "links", "publishing"] as const;

function isAbsoluteHttpUrl(value: string) {
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

function firstPopulatedInvalidUrl(values: ProjectFormValues) {
  const candidates = [values.projectUrl, values.repositoryUrl, values.codepenUrl, values.caseStudyUrl]
    .map((value) => value.trim())
    .filter(Boolean);
  return candidates.find((url) => !isAbsoluteHttpUrl(url));
}

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
  const basicsErrors = validateBasicsStep(values);
  const badLink = firstPopulatedInvalidUrl(values);
  const hasAnyLink = [values.projectUrl, values.repositoryUrl, values.codepenUrl, values.caseStudyUrl].some((url) => Boolean(url.trim()));

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
      complete: Boolean(
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
      complete: hasCaseStudyContent(values) && !hasCaseStudyResultMismatch(values),
      issue: hasCaseStudyResultMismatch(values)
        ? "Each key result needs both a label and a value."
        : "Overview, challenge, and solution content are required.",
    },
    {
      id: "technologies",
      label: "Technologies",
      complete: values.technologies.length > 0,
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
      complete: hasAnyLink && !badLink,
      issue: badLink
        ? "Use valid absolute URLs starting with http:// or https://."
        : "Add at least one project link.",
    },
    {
      id: "publishing",
      label: "Publishing",
      complete: Boolean(values.status && slugPattern.test(values.slug.trim()) && Number.isInteger(Number(values.displayOrder)) && Number(values.displayOrder) >= 0),
      issue: "Set a valid slug, publication status, and a display order of 0 or greater.",
    },
  ].map((item) => (item.complete ? { ...item, issue: undefined } : item));

  const orderedItems = stepOrder
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is CompletionItem => Boolean(item));

  return normalizeCompletion(orderedItems);
}

export function validateBasicsStep(values: ProjectFormValues): BasicsStepErrors {
  const errors: BasicsStepErrors = {};

  if (!values.title.trim()) {
    errors.title = "Project title is required.";
  }

  if (!values.slug.trim()) {
    errors.slug = "Slug is required.";
  } else if (!slugPattern.test(values.slug.trim())) {
    errors.slug = "Use lowercase letters, numbers, and hyphens only.";
  }

  if (!values.projectType) {
    errors.projectType = "Project type is required.";
  }

  if (values.categories.length === 0) {
    errors.categories = "Select at least one project category.";
  }

  if (!values.heroSummary.trim()) {
    errors.heroSummary = "Short description is required.";
  }

  const parsedDisplayOrder = Number(values.displayOrder);
  if (!Number.isInteger(parsedDisplayOrder) || parsedDisplayOrder < 0) {
    errors.displayOrder = "Display order must be a whole number greater than or equal to 0.";
  }

  return errors;
}

export function getProjectCompletion(values: ProjectFormValues): CompletionSummary {
  const summary = getPublishingValidation(values);
  return {
    items: summary.items,
    completeCount: summary.completeCount,
    total: summary.total,
    percent: summary.percent,
  };
}
