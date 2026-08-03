import { useMemo } from "react";
import type { CategoryReference, TechnologyReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import { validateCaseStudyStep } from "./ProjectCaseStudyStep";
import { validateImagesStep } from "./ProjectImagesStep";
import { ProjectEditorActions } from "./ProjectEditorActions";
import { ProjectEditorHeader } from "./ProjectEditorHeader";
import { ProjectEditorSidebar } from "./ProjectEditorSidebar";
import { ProjectEditorStepContent } from "./ProjectEditorStepContent";
import { useProjectEditorNavigation } from "./hooks/useProjectEditorNavigation";
import { useUnsavedChanges } from "./hooks/useUnsavedChanges";
import { projectEditorSteps } from "./projectEditorConfig";
import { getProjectCompletionWithContext, getPublishingValidationWithContext, validateBasicsStepWithContext } from "./projectEditorCompletion";
import type { StepVisualState } from "./ProjectStepNavigation";
import { ProjectStepNavigation } from "./ProjectStepNavigation";

function trim(value: string) {
  return value.trim();
}

function ensureSaveSafeValues(values: ProjectFormValues): ProjectFormValues {
  const fallbackSummary = trim(values.heroSummary) || trim(values.title);
  const fallbackSubtitle = trim(values.heroSubtitle) || trim(values.client) || trim(values.title);
  const fallbackOverview = trim(values.overviewContent) || fallbackSummary || trim(values.title);

  return {
    ...values,
    heroSummary: fallbackSummary,
    heroSubtitle: fallbackSubtitle,
    overviewContent: fallbackOverview,
  };
}

export function ProjectEditor({
  editing,
  values,
  categories,
  technologies,
  existingSlugEntries,
  currentProjectId,
  saving,
  error,
  message,
  isDirty,
  isPublishedProjectEdit,
  onChange,
  onSave,
  onPublish,
  onCancel,
  onPreview,
}: {
  editing: boolean;
  values: ProjectFormValues;
  categories: CategoryReference[];
  technologies: TechnologyReference[];
  existingSlugEntries: Array<{ id: string; slug: string }>;
  currentProjectId?: string;
  saving: boolean;
  error: string;
  message: string;
  isDirty: boolean;
  isPublishedProjectEdit: boolean;
  onChange: (values: ProjectFormValues) => void;
  onSave: (values: ProjectFormValues) => Promise<boolean>;
  onPublish: (values: ProjectFormValues) => Promise<boolean>;
  onCancel: () => void;
  onPreview: () => void;
}) {
  const validationContext = useMemo(
    () => ({
      slugOwnersBySlug: new Map(existingSlugEntries.map((entry) => [entry.slug, entry.id])),
      currentProjectId,
    }),
    [currentProjectId, existingSlugEntries],
  );

  const {
    currentStepIndex,
    stepErrors,
    setCurrentStepIndex,
    goToNextStep,
    goToPreviousStep,
    runBasicsValidation,
    runImagesValidation,
    runCaseStudyValidation,
  } = useProjectEditorNavigation(values, {
    validateBasics: (nextValues) => validateBasicsStepWithContext(nextValues, validationContext),
    validateImages: validateImagesStep,
    validateCaseStudy: validateCaseStudyStep,
  });

  const { confirmDiscardChanges } = useUnsavedChanges(isDirty);

  const completion = useMemo(() => getProjectCompletionWithContext(values, validationContext), [validationContext, values]);
  const publishingValidation = useMemo(() => getPublishingValidationWithContext(values, validationContext), [validationContext, values]);
  const stepValidationMap = useMemo(() => new Map(publishingValidation.items.map((item) => [item.id, item])), [publishingValidation.items]);

  const basicsValid = Object.keys(validateBasicsStepWithContext(values, validationContext)).length === 0;
  const imagesValid = Object.keys(validateImagesStep(values)).length === 0;
  const caseStudyValid = Object.keys(validateCaseStudyStep(values)).length === 0;

  function getStepState(index: number): StepVisualState {
    const step = projectEditorSteps[index];
    const stepValidation = step ? stepValidationMap.get(step.key) : undefined;

    if (index === 0) {
      if (currentStepIndex === 0 && Object.keys(stepErrors.basics).length > 0) {
        return "error";
      }
      if (stepValidation?.complete) {
        return "completed";
      }
      return "current";
    }

    if (index === currentStepIndex) {
      if (index === 2 && Object.keys(stepErrors["case-study"]).length > 0) {
        return "error";
      }
      return "current";
    }

    if (index < currentStepIndex) {
      return stepValidation?.complete ? "completed" : "available";
    }

    if (index > 0 && !basicsValid) {
      return "unavailable";
    }
    if (index > 1 && !imagesValid) {
      return "unavailable";
    }
    if (index > 2 && !caseStudyValid) {
      return "unavailable";
    }

    if (stepValidation?.complete) {
      return "completed";
    }

    return "available";
  }

  async function handleSaveDraft() {
    if (!runBasicsValidation()) {
      return;
    }
    if (currentStepIndex === 1 && !runImagesValidation()) {
      return;
    }
    if (currentStepIndex === 2 && !runCaseStudyValidation()) {
      return;
    }

    await onSave(ensureSaveSafeValues(values));
  }

  async function handlePublish() {
    if (!publishingValidation.readyToPublish) {
      const firstInvalidStepId = publishingValidation.firstInvalidStepId;
      if (firstInvalidStepId) {
        const index = projectEditorSteps.findIndex((step) => step.key === firstInvalidStepId);
        if (index >= 0) {
          setCurrentStepIndex(index);
        }
      }
      return;
    }

    await onPublish(ensureSaveSafeValues(values));
  }

  function handleCancel() {
    if (!confirmDiscardChanges()) {
      return;
    }
    onCancel();
  }

  function handleNextStep() {
    goToNextStep();
  }

  function handlePreviousStep() {
    goToPreviousStep();
  }

  function handleStepSelect(index: number) {
    const state = getStepState(index);
    if (state === "unavailable") {
      return;
    }
    if (index > 0 && !runBasicsValidation()) {
      return;
    }
    if (index > 1 && !runImagesValidation()) {
      return;
    }
    if (index > 2 && !runCaseStudyValidation()) {
      return;
    }
    setCurrentStepIndex(index);
  }

  const activeStep = projectEditorSteps[currentStepIndex];

  return (
    <div className="project-editor-shell">
      <ProjectEditorHeader editing={editing} status={values.status} />

      <ProjectStepNavigation getStepState={getStepState} onStepSelect={handleStepSelect} />

      <div className="editor-layout">
        <div className="editor-main">
          {error ? <p className="notice error" role="alert">{error}</p> : null}
          {message ? <p className="notice success" role="status">{message}</p> : null}

          <ProjectEditorStepContent
            currentStep={currentStepIndex}
            values={values}
            categories={categories}
            technologies={technologies}
            basicsErrors={stepErrors.basics}
            imageErrors={stepErrors.images}
            caseStudyErrors={stepErrors["case-study"]}
            publishingValidation={publishingValidation}
            onChange={onChange}
          />
        </div>

        <aside className="editor-sidebar">
          <ProjectEditorSidebar
            values={values}
            categories={categories}
            technologies={technologies}
            activeStep={activeStep?.key}
            completion={completion}
          />
        </aside>
      </div>

      <ProjectEditorActions
        currentStep={currentStepIndex}
        isDirty={isDirty}
        saving={saving}
        canPublish={publishingValidation.readyToPublish}
        publishLabel={isPublishedProjectEdit ? "Update Project" : "Publish Project"}
        onCancel={handleCancel}
        onPreview={onPreview}
        onSaveDraft={() => void handleSaveDraft()}
        onPreviousStep={handlePreviousStep}
        onNextStep={handleNextStep}
        onPublish={() => void handlePublish()}
      />
    </div>
  );
}
