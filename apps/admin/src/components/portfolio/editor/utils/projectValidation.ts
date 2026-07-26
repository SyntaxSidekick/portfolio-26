import type { ProjectFormValues } from "../../ProjectForm";
import { validateCaseStudyStep, type CaseStudyStepErrors } from "../ProjectCaseStudyStep";
import { validateImagesStep, type ImagesStepErrors } from "../ProjectImagesStep";
import { validateBasicsStep, type BasicsStepErrors } from "../projectEditorCompletion";
import type { ProjectStepId } from "./projectSteps";

export type ProjectStepErrors = {
  basics: BasicsStepErrors;
  images: ImagesStepErrors;
  "case-study": CaseStudyStepErrors;
  technologies: Record<string, never>;
  gallery: Record<string, never>;
  links: Record<string, never>;
  publishing: Record<string, never>;
};

export function getProjectStepErrors(values: ProjectFormValues): ProjectStepErrors {
  return {
    basics: validateBasicsStep(values),
    images: validateImagesStep(values),
    "case-study": validateCaseStudyStep(values),
    technologies: {},
    gallery: {},
    links: {},
    publishing: {},
  };
}

export function isStepValid(step: ProjectStepId, values: ProjectFormValues) {
  const errors = getProjectStepErrors(values)[step];
  return Object.keys(errors).length === 0;
}
