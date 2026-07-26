import type { CategoryReference, TechnologyReference } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import { CaseStudyTipsPanel } from "./CaseStudyTipsPanel";
import { GalleryTipsPanel } from "./GalleryTipsPanel";
import { LinksSummaryPanel } from "./LinksSummaryPanel";
import { ProjectCompletionChecklist } from "./ProjectCompletionChecklist";
import { ProjectLivePreview } from "./ProjectLivePreview";
import type { ProjectEditorStepKey } from "./projectEditorConfig";
import type { CompletionSummary } from "./projectEditorCompletion";

export function ProjectEditorSidebar({
  values,
  categories,
  technologies,
  activeStep,
  completion,
}: {
  values: ProjectFormValues;
  categories: CategoryReference[];
  technologies: TechnologyReference[];
  activeStep?: ProjectEditorStepKey;
  completion: CompletionSummary;
}) {
  if (activeStep === "basics") {
    return (
      <>
        <ProjectLivePreview values={values} categories={categories} technologies={technologies} activeStep={activeStep} caseStudySectionOrder={values.caseStudySectionOrder} />
        <ProjectCompletionChecklist completion={completion} />
      </>
    );
  }

  if (activeStep === "case-study") {
    return (
      <>
        <ProjectLivePreview values={values} categories={categories} technologies={technologies} activeStep={activeStep} caseStudySectionOrder={values.caseStudySectionOrder} />
        <CaseStudyTipsPanel />
      </>
    );
  }

  if (activeStep === "gallery") {
    return (
      <>
        <ProjectLivePreview values={values} categories={categories} technologies={technologies} activeStep={activeStep} caseStudySectionOrder={values.caseStudySectionOrder} />
        <GalleryTipsPanel />
      </>
    );
  }

  if (activeStep === "links") {
    return (
      <>
        <ProjectLivePreview values={values} categories={categories} technologies={technologies} activeStep={activeStep} caseStudySectionOrder={values.caseStudySectionOrder} />
        <LinksSummaryPanel values={values} />
      </>
    );
  }

  if (activeStep === "publishing") {
    return (
      <>
        <ProjectLivePreview values={values} categories={categories} technologies={technologies} activeStep={activeStep} caseStudySectionOrder={values.caseStudySectionOrder} />
        <ProjectCompletionChecklist completion={completion} />
      </>
    );
  }

  return <ProjectLivePreview values={values} categories={categories} technologies={technologies} activeStep={activeStep} caseStudySectionOrder={values.caseStudySectionOrder} />;
}
