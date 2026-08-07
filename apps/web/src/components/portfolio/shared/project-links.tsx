import { ArrowUpRight, GitBranch, type LucideIcon } from "lucide-react";
import type { PublicProject } from "@/lib/portfolio-api";
import { getExternalLinkProps } from "@/lib/portfolio-data";

type ProjectLinksProps = {
  project: PublicProject;
};

export function ProjectLinks({ project }: ProjectLinksProps) {
  const links = project.links ?? {};
  const projectUrl = links.projectUrl || project.projectUrl;
  const repositoryUrl = links.repositoryUrl || project.repositoryUrl;
  const actions: Array<{
    href: string;
    label: string;
    className: string;
    icon: LucideIcon;
  }> = [];

  if (projectUrl) {
    actions.push({
      href: projectUrl,
      label: links.primaryLabel || "Visit Live Project",
      className: "button button-primary",
      icon: ArrowUpRight,
    });
  }

  if (repositoryUrl) {
    actions.push({
      href: repositoryUrl,
      label: links.secondaryLabel || "View Repository",
      className: "button button-secondary",
      icon: GitBranch,
    });
  }

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="button-group project-actions">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <a
            className={action.className}
            href={action.href}
            key={action.href}
            {...getExternalLinkProps(action.href)}
          >
            <span>{action.label}</span>
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
