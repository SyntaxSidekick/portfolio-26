import type { CategoryReference, TechnologyReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import { ProjectBasicsStep } from "./ProjectBasicsStep";
import { ProjectCaseStudyStep, type CaseStudyStepErrors } from "./ProjectCaseStudyStep";
import { ProjectEditorAccordions } from "./ProjectEditorAccordions";
import { ProjectGalleryStep } from "./ProjectGalleryStep";
import { ProjectImagesStep, type ImagesStepErrors } from "./ProjectImagesStep";
import { ProjectLinksStep } from "./ProjectLinksStep";
import { ProjectPublishingStep } from "./ProjectPublishingStep";
import { ProjectTechnologiesStep } from "./ProjectTechnologiesStep";
import { projectEditorSteps } from "./projectEditorConfig";
import type { BasicsStepErrors, PublishingValidationSummary } from "./projectEditorCompletion";

export function ProjectEditorStepContent({
  currentStep,
  values,
  categories,
  technologies,
  basicsErrors,
  imageErrors,
  caseStudyErrors,
  publishingValidation,
  onChange,
}: {
  currentStep: number;
  values: ProjectFormValues;
  categories: CategoryReference[];
  technologies: TechnologyReference[];
  basicsErrors: BasicsStepErrors;
  imageErrors: ImagesStepErrors;
  caseStudyErrors: CaseStudyStepErrors;
  publishingValidation: PublishingValidationSummary;
  onChange: (values: ProjectFormValues) => void;
}) {
  const activeStep = projectEditorSteps[currentStep];

  if (currentStep === 0) {
    return (
      <>
        <ProjectBasicsStep values={values} categories={categories} technologies={technologies} errors={basicsErrors} onChange={onChange} />
        <ProjectEditorAccordions />
      </>
    );
  }

  if (currentStep === 1) {
    return <ProjectImagesStep values={values} errors={imageErrors} onChange={onChange} />;
  }

  if (currentStep === 2) {
    return <ProjectCaseStudyStep values={values} errors={caseStudyErrors} onChange={onChange} />;
  }

  if (currentStep === 3) {
    return <ProjectTechnologiesStep values={values} technologies={technologies} onChange={onChange} />;
  }

  if (currentStep === 4) {
    return <ProjectGalleryStep values={values} onChange={onChange} />;
  }

  if (currentStep === 5) {
    return <ProjectLinksStep values={values} onChange={onChange} />;
  }

  if (currentStep === 6) {
    return <ProjectPublishingStep values={values} validation={publishingValidation} onChange={onChange} />;
  }

  return (
    <section className="step-panel" aria-labelledby="step-coming-soon-title">
      <header className="step-panel-header">
        <h2 id="step-coming-soon-title">{activeStep?.title}</h2>
      </header>
    </section>
  );
}
