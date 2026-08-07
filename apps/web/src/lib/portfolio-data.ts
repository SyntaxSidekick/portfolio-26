import type { AnchorHTMLAttributes } from "react";
import type { PublicProject } from "@/lib/portfolio-api";

export const portfolioProjectTypes = [
  "case-study",
  "github",
  "design",
  "codepen",
] as const;

export type PortfolioProjectType = (typeof portfolioProjectTypes)[number];

export type PortfolioCounts = Record<PortfolioProjectType, number>;

export type GroupedPortfolioProjects = {
  caseStudies: PublicProject[];
  githubProjects: PublicProject[];
  designProjects: PublicProject[];
  codepenProjects: PublicProject[];
  totalProjects: number;
  counts: PortfolioCounts;
  unknownProjects: PublicProject[];
};

export function getPortfolioProjectImage(project: PublicProject) {
  return (
    project.media?.cardImage ??
    project.media?.featuredImage ??
    project.featuredImage ?? {
      url: "https://placehold.co/1200x700/071525/2da8ff?text=Project",
      alt: `${project.title} project preview`,
    }
  );
}

export function getProjectSubtype(project: PublicProject, fallback: string) {
  return project.details?.subtype || project.categories[0]?.name || fallback;
}

export function getProjectDetailHref(project: PublicProject) {
  return project.links?.caseStudyUrl || `/portfolio/${project.slug}`;
}

export function getGitHubProjectHref(project: PublicProject) {
  return project.links?.repositoryUrl || project.repositoryUrl || getProjectDetailHref(project);
}

export function getCodePenHref(project: PublicProject) {
  return project.links?.codepenUrl || project.codepenUrl || getProjectDetailHref(project);
}

export function getCodePenDemoHref(project: PublicProject) {
  return project.links?.projectUrl || project.projectUrl || getProjectDetailHref(project);
}

export function getExternalLinkProps(
  href: string,
): Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  return href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
}

export function groupPortfolioProjects(
  projects: PublicProject[],
): GroupedPortfolioProjects {
  const caseStudies: PublicProject[] = [];
  const githubProjects: PublicProject[] = [];
  const designProjects: PublicProject[] = [];
  const codepenProjects: PublicProject[] = [];
  const unknownProjects: PublicProject[] = [];

  for (const project of projects) {
    if (project.projectType === "case-study") {
      caseStudies.push(project);
    } else if (project.projectType === "github") {
      githubProjects.push(project);
    } else if (project.projectType === "design") {
      designProjects.push(project);
    } else if (project.projectType === "codepen") {
      codepenProjects.push(project);
    } else {
      unknownProjects.push(project);
    }
  }

  return {
    caseStudies,
    githubProjects,
    designProjects,
    codepenProjects,
    totalProjects: projects.length,
    counts: {
      "case-study": caseStudies.length,
      github: githubProjects.length,
      design: designProjects.length,
      codepen: codepenProjects.length,
    },
    unknownProjects,
  };
}
