import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Accessibility,
  Activity,
  BarChart3,
  Rocket,
  Search,
  Shield,
  Timer,
  User,
  type LucideIcon,
} from "lucide-react";
import "@/styles/pages/portfolio-single.css";
import { getProjectBySlug, tryGetPublishedProjects } from "@/lib/portfolio-api";
import { TechnologyIcon } from "@/lib/technologyIcons";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

const resultIcons: Record<string, LucideIcon> = {
  accessibility: Accessibility,
  activity: Activity,
  "bar-chart": BarChart3,
  rocket: Rocket,
  search: Search,
  shield: Shield,
  timer: Timer,
  user: User,
};

function ResultIcon({ iconKey, accentColor }: { iconKey?: string; accentColor?: string }) {
  const Icon = resultIcons[iconKey ?? ""] ?? Rocket;
  return (
    <span className="result-icon" aria-hidden="true" style={{ color: accentColor || undefined }}>
      <Icon size={30} strokeWidth={1.8} />
    </span>
  );
}

export async function generateStaticParams() {
  const { projects } = await tryGetPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProjectBySlug(slug);
    return {
      title: project.title,
      description:
        project.excerpt || `Project case study for ${project.title}.`,
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  let project;

  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }
  const hero = project.hero ?? {
    subtitle: project.client || project.projectType,
    summary: project.excerpt,
    badgeText: "Featured Project",
  };
  const links = project.links ?? {
    projectUrl: project.projectUrl,
    repositoryUrl: project.repositoryUrl,
  };
  const details = project.details ?? {
    client: project.client,
    role: project.role,
    year: project.year,
    subtype: project.projectType,
  };
  const overview = project.overview ?? {
    heading: "Project Overview",
    content: project.description || project.excerpt,
  };
  const metrics = [
    ...(project.primaryMetrics?.length
      ? project.primaryMetrics
      : (project.metrics ?? [])),
  ].sort((a, b) => a.displayOrder - b.displayOrder);
  const keyResults = [...(project.keyResults ?? [])].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const highlights = [...(project.highlights ?? [])].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const technologies = [...project.technologies].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  const heroImage =
    project.media?.desktopImage ??
    project.media?.featuredImage ??
    project.featuredImage;
  const detailRows = [
    ["Role:", details.role],
    ["Platform:", details.platform],
    ["Type:", details.subtype ?? project.projectType],
    ["Timeline:", details.timeline],
    ["Launch:", details.launchDate],
    ["Client:", details.client],
    ["Team:", details.teamSize],
    ["Year:", details.year ? String(details.year) : ""],
  ].filter(([, value]) => value);

  return (
    <main id="project-single-page" className="page project-single">
      <section className="project-hero" aria-labelledby="project-title">
        <div className="project-container">
          <a className="back-link" href="/portfolio">
            <span aria-hidden="true">{"\u2190"}</span>
            Back to Portfolio
          </a>
          <div className="project-hero-grid">
            <div className="project-hero-content">
              {project.featured || hero.eyebrow ? (
                <span className="project-badge">
                  {hero.badgeText || hero.eyebrow || "Featured Project"}
                </span>
              ) : null}
              <h1 id="project-title">{project.title}</h1>
              <p className="project-subtitle">{hero.subtitle}</p>
              <p className="project-summary">{hero.summary}</p>
              {technologies.length ? (
                <ul className="technology-tags" aria-label="Technologies used">
                  {technologies.map((technology) => (
                    <li key={technology.id}>
                      {technology.iconKey ? (
                        <TechnologyIcon
                          iconKey={technology.iconKey}
                          name={technology.name}
                          brandColor={technology.brandColor}
                          size={16}
                        />
                      ) : null}{" "}
                      {technology.name}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="project-actions">
                {links.projectUrl ? (
                  <a className="button button-primary" href={links.projectUrl}>
                    {links.primaryLabel || "Visit Live Site"}{" "}
                    <span aria-hidden="true">{"\u2197"}</span>
                  </a>
                ) : null}
                {links.repositoryUrl ? (
                  <a
                    className="button button-secondary"
                    href={links.repositoryUrl}
                  >
                    {links.secondaryLabel || "View Source"}{" "}
                    <span aria-hidden="true">{"\u25c9"}</span>
                  </a>
                ) : null}
              </div>
            </div>
            <div className="project-hero-media" aria-label="Project preview">
              <figure className="desktop-preview">
                <img
                  src={
                    heroImage?.url ||
                    "https://placehold.co/1600x1000/071525/58aaff?text=Project"
                  }
                  alt={heroImage?.alt || project.title}
                  width="1600"
                  height="1000"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      {metrics.length ? (
        <section
          className="project-metrics"
          aria-label="Project performance metrics"
        >
          <div className="project-container">
            <dl className="metrics-grid">
              {metrics.map((metric) => (
                <div key={metric.id}>
                  <dt>{metric.value}</dt>
                  <dd>{metric.label}</dd>
                  {metric.description ? <dd>{metric.description}</dd> : null}
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}
      <section className="project-section" aria-labelledby="overview-title">
        <div className="project-container">
          <div className="panel overview-panel">
            <div className="section-label">Overview</div>
            <h2 id="overview-title">
              {overview.heading || "Project Overview"}
            </h2>
            <p className="section-intro">{overview.content}</p>
            {project.challenge?.content || project.solution?.content ? (
              <div className="challenge-solution-grid">
                {project.challenge?.content ? (
                  <section>
                    <div className="section-label">
                      {project.challenge.heading || "The Challenge"}
                    </div>
                    <p>{project.challenge.content}</p>
                  </section>
                ) : null}
                {project.solution?.content ? (
                  <section>
                    <div className="section-label">
                      {project.solution.heading || "The Solution"}
                    </div>
                    <p>{project.solution.content}</p>
                  </section>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      {keyResults.length || highlights.length ? (
        <section className="project-section" aria-label="Project outcomes">
          <div className="project-container">
            {keyResults.length ? (
              <div className="panel key-results-panel">
                <div className="section-label">Key Results</div>
                <dl className="results-grid">
                  {keyResults.map((result) => (
                    <div key={result.id}>
                      <ResultIcon
                        iconKey={result.iconKey}
                        accentColor={result.accentColor}
                      />
                      <dt>{result.value}</dt>
                      <dd>{result.label}</dd>
                      {result.description ? (
                        <dd>{result.description}</dd>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
            {highlights.length ? (
              <div className="panel highlights-panel">
                <div className="highlights-content">
                  <div className="section-label">Project Highlights</div>
                  <ul className="highlights-list">
                    {highlights.map((highlight) => (
                      <li key={highlight.id}>{highlight.text}</li>
                    ))}
                  </ul>
                </div>
                {detailRows.length ? (
                  <aside
                    className="project-details"
                    aria-labelledby="details-title"
                  >
                    <div className="section-label" id="details-title">
                      Project Details
                    </div>
                    <dl>
                      {detailRows.map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </aside>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  );
}
