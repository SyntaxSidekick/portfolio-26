import { projectSteps, type ProjectStepDefinition, type ProjectStepId } from "./utils/projectSteps";

export type ProjectEditorStepKey = ProjectStepId;

export interface ProjectEditorStep {
  key: ProjectEditorStepKey;
  number: number;
  shortLabel: string;
  title: string;
}

export const projectEditorSteps: ProjectEditorStep[] = projectSteps.map((step: ProjectStepDefinition) => ({
  key: step.id,
  number: step.number,
  shortLabel: step.shortLabel,
  title: step.title,
}));
