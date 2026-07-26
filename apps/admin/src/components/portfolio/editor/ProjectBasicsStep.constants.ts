import type { BasicsStepErrors } from "./projectEditorCompletion";

export const basicsFieldOrder: Array<keyof BasicsStepErrors> = ["title", "slug", "projectType", "categories", "heroSummary", "displayOrder"];

export const basicsFieldIds: Record<keyof BasicsStepErrors, string> = {
  title: "project-title",
  slug: "project-slug",
  projectType: "project-type",
  categories: "project-category-first",
  heroSummary: "project-summary",
  displayOrder: "project-display-order",
};
