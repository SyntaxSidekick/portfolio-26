import type { PublicProject } from "@/lib/portfolio-api";
import { ProjectTechnologies } from "@/components/portfolio/shared/project-technologies";
import { FontAwesomeSvg } from "@/lib/fontAwesomeIcon";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {
  BriefcaseBusiness,
  CalendarClock,
  FileText,
  Clock,
  Flag,
  Layers,
  Monitor,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";

type ProjectDetailsProps = {
  project: PublicProject;
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const details = project.details ?? {};
  const callout =
    project.hero?.summary ||
    project.overview?.content ||
    project.description ||
    project.excerpt;
  const rows: Array<{ icon: LucideIcon; label: string; value?: string }> = [
    { icon: BriefcaseBusiness, label: "Client", value: details.client || project.client },
    { icon: Tag, label: "Industry", value: project.categories[0]?.name },
    { icon: Layers, label: "Project Type", value: details.subtype },
    { icon: Flag, label: "My Role", value: details.role || project.role },
    { icon: Clock, label: "Timeline", value: details.timeline },
    { icon: Users, label: "Team", value: details.teamSize },
    { icon: Monitor, label: "Status", value: details.statusLabel },
    {
      icon: CalendarClock,
      label: "Year",
      value: details.year ? String(details.year) : project.year ? String(project.year) : "",
    },
    { icon: Monitor, label: "Platform", value: details.platform },
  ].filter((row) => Boolean(row.value));

  if (rows.length === 0 && project.technologies.length === 0) {
    return null;
  }

  return (
    <section className="project-section project-details-section" aria-labelledby="project-details-title">
      <div className="panel">
        <div className="project-details-layout">
          <header className="project-section-header">
            <p className="project-section-kicker">
              <FileText aria-hidden="true" />
            </p>
            <h2 id="project-details-title">Project Details</h2>
          </header>

          <div className="project-details-aside">
            {callout ? (
              <blockquote>
                <FontAwesomeSvg className="project-details-quote-icon" icon={faQuoteLeft} />
                <p>{callout}</p>
                <footer>{details.client || project.client || project.title}</footer>
              </blockquote>
            ) : null}
          </div>

          <div className="project-details-main">
            {rows.length > 0 ? (
              <dl className="project-details-list">
                {rows.map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <Icon aria-hidden="true" />
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="project-details-technologies">
              <h3>Technologies</h3>
              <ProjectTechnologies technologies={project.technologies} label="Complete technology list" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
