export const projectStepIds = [
  "basics",
  "images",
  "case-study",
  "technologies",
  "gallery",
  "links",
  "publishing",
] as const;

export type ProjectStepId = (typeof projectStepIds)[number];

export interface ProjectStepDefinition {
  id: ProjectStepId;
  number: number;
  shortLabel: string;
  title: string;
}

export const projectSteps = [
  { id: "basics", number: 1, shortLabel: "Basics", title: "Project Basics" },
  { id: "images", number: 2, shortLabel: "Images", title: "Images" },
  { id: "case-study", number: 3, shortLabel: "Case Study", title: "Case Study" },
  { id: "technologies", number: 4, shortLabel: "Technologies", title: "Technologies" },
  { id: "gallery", number: 5, shortLabel: "Gallery", title: "Gallery" },
  { id: "links", number: 6, shortLabel: "Links", title: "Links" },
  { id: "publishing", number: 7, shortLabel: "Publishing", title: "Publishing" },
] satisfies readonly ProjectStepDefinition[];

export function getStepByIndex(index: number) {
  return projectSteps[index];
}

export function getStepIndex(step: ProjectStepId) {
  return projectSteps.findIndex((item) => item.id === step);
}
