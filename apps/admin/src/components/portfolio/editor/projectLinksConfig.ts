import type { ProjectFormValues } from "../ProjectForm";

export type ProjectLinkSlot = "projectUrl" | "repositoryUrl" | "codepenUrl" | "caseStudyUrl";
export type ProjectLinkType = "live-project" | "github-repository" | "documentation" | "video" | "figma-design-file" | "social-media-post";
export type ProjectLinkIconKey = "external" | "github" | "code" | "file" | "book" | "palette" | "play" | "package" | "link";

export interface ProjectLinkDefinition {
  slot: ProjectLinkSlot;
  title: string;
  description: string;
  defaultType: ProjectLinkType;
  supportedTypes: ProjectLinkType[];
}

export interface ProjectLinkRow {
  slot: ProjectLinkSlot;
  url: string;
  title: string;
  description: string;
  type: ProjectLinkType;
  iconKey: ProjectLinkIconKey;
  visible: boolean;
}

export const linkTypeLabels: Record<ProjectLinkType, string> = {
  "live-project": "Live Project",
  "github-repository": "GitHub Repository",
  documentation: "Documentation",
  video: "Video",
  "figma-design-file": "Figma Design File",
  "social-media-post": "Social Media Post",
};

export const linkTypeIconKeys: Record<ProjectLinkType, ProjectLinkIconKey> = {
  "live-project": "external",
  "github-repository": "github",
  documentation: "book",
  video: "play",
  "figma-design-file": "palette",
  "social-media-post": "link",
};

export const linkDefinitions: ProjectLinkDefinition[] = [
  {
    slot: "projectUrl",
    title: "Live Project",
    description: "Deployed project destination.",
    defaultType: "live-project",
    supportedTypes: ["live-project", "documentation", "video", "figma-design-file", "social-media-post"],
  },
  {
    slot: "repositoryUrl",
    title: "GitHub Repository",
    description: "Source code and version control.",
    defaultType: "github-repository",
    supportedTypes: ["github-repository", "documentation", "social-media-post"],
  },
  {
    slot: "codepenUrl",
    title: "Documentation",
    description: "Project docs or user guide.",
    defaultType: "documentation",
    supportedTypes: ["documentation", "video", "social-media-post"],
  },
  {
    slot: "caseStudyUrl",
    title: "Video",
    description: "Demo or overview video.",
    defaultType: "video",
    supportedTypes: ["video", "figma-design-file", "social-media-post", "documentation"],
  },
];

export function isValidUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }
  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function sanitizeUrl(value: string) {
  return value.trim();
}

export function buildProjectLinkRows(
  values: ProjectFormValues,
  typeBySlot: Record<ProjectLinkSlot, ProjectLinkType>,
  visibilityBySlot?: Partial<Record<ProjectLinkSlot, boolean>>,
): ProjectLinkRow[] {
  return linkDefinitions.map((definition) => {
    const url = values[definition.slot].trim();
    const type = typeBySlot[definition.slot] ?? definition.defaultType;
    return {
      slot: definition.slot,
      url,
      title: linkTypeLabels[type],
      description: definition.description,
      type,
      iconKey: linkTypeIconKeys[type],
      visible: visibilityBySlot?.[definition.slot] ?? Boolean(url),
    };
  });
}

export function canonicalLinkTypeForSlot(slot: ProjectLinkSlot): ProjectLinkType {
  return linkDefinitions.find((definition) => definition.slot === slot)?.defaultType ?? "live-project";
}
