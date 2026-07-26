import { useState } from "react";
import type { ProjectFormValues } from "../../ProjectForm";
import { caseStudyFieldIds, caseStudyFieldOrder, type CaseStudyStepErrors } from "../ProjectCaseStudyStep";
import { basicsFieldIds, basicsFieldOrder } from "../ProjectBasicsStep.constants";
import type { ImagesStepErrors } from "../ProjectImagesStep";
import type { BasicsStepErrors } from "../projectEditorCompletion";
import { projectSteps, type ProjectStepId } from "../utils/projectSteps";

type StepErrorState = {
  basics: BasicsStepErrors;
  images: ImagesStepErrors;
  "case-study": CaseStudyStepErrors;
};

type Validators = {
  validateBasics: (values: ProjectFormValues) => BasicsStepErrors;
  validateImages: (values: ProjectFormValues) => ImagesStepErrors;
  validateCaseStudy: (values: ProjectFormValues) => CaseStudyStepErrors;
};

function focusFirstInvalidBasics(errors: BasicsStepErrors) {
  for (const key of basicsFieldOrder) {
    if (!errors[key]) {
      continue;
    }
    const field = document.getElementById(basicsFieldIds[key]);
    if (field instanceof HTMLElement) {
      field.focus();
    }
    return;
  }
}

function focusFirstInvalidCaseStudy(errors: CaseStudyStepErrors) {
  for (const key of caseStudyFieldOrder) {
    if (!errors[key]) {
      continue;
    }
    const field = document.getElementById(caseStudyFieldIds[key]);
    if (field instanceof HTMLElement) {
      field.focus();
    }
    return;
  }
}

export function useProjectEditorNavigation(values: ProjectFormValues, validators: Validators) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepErrors, setStepErrors] = useState<StepErrorState>({
    basics: {},
    images: {},
    "case-study": {},
  });

  const currentStep = projectSteps[currentStepIndex]?.id ?? "basics";

  function runBasicsValidation() {
    const errors = validators.validateBasics(values);
    setStepErrors((current) => ({ ...current, basics: errors }));
    if (Object.keys(errors).length > 0) {
      focusFirstInvalidBasics(errors);
      return false;
    }
    return true;
  }

  function runImagesValidation() {
    const errors = validators.validateImages(values);
    setStepErrors((current) => ({ ...current, images: errors }));
    return Object.keys(errors).length === 0;
  }

  function runCaseStudyValidation() {
    const errors = validators.validateCaseStudy(values);
    setStepErrors((current) => ({ ...current, "case-study": errors }));
    if (Object.keys(errors).length > 0) {
      focusFirstInvalidCaseStudy(errors);
      return false;
    }
    return true;
  }

  function canAccessStep(step: ProjectStepId) {
    const index = projectSteps.findIndex((item) => item.id === step);
    if (index <= 0) {
      return true;
    }
    if (!runBasicsValidation()) {
      return false;
    }
    if (index > 1 && !runImagesValidation()) {
      return false;
    }
    if (index > 2 && !runCaseStudyValidation()) {
      return false;
    }
    return true;
  }

  function goToStep(step: ProjectStepId) {
    if (!canAccessStep(step)) {
      return;
    }
    const index = projectSteps.findIndex((item) => item.id === step);
    if (index >= 0) {
      setCurrentStepIndex(index);
    }
  }

  function goToPreviousStep() {
    setCurrentStepIndex((current) => Math.max(0, current - 1));
  }

  function goToNextStep() {
    if (currentStepIndex === 0 && !runBasicsValidation()) {
      return false;
    }
    if (currentStepIndex === 1 && !runImagesValidation()) {
      return false;
    }
    if (currentStepIndex === 2 && !runCaseStudyValidation()) {
      return false;
    }

    setCurrentStepIndex((current) => Math.min(projectSteps.length - 1, current + 1));
    return true;
  }

  function validateCurrentStep() {
    if (currentStepIndex === 0) {
      return runBasicsValidation();
    }
    if (currentStepIndex === 1) {
      return runImagesValidation();
    }
    if (currentStepIndex === 2) {
      return runCaseStudyValidation();
    }
    return true;
  }

  return {
    currentStep,
    currentStepIndex,
    stepErrors,
    setCurrentStepIndex,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    validateCurrentStep,
    runBasicsValidation,
    runImagesValidation,
    runCaseStudyValidation,
  };
}
