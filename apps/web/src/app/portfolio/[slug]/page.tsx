import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CircleCheck,
  CloudDownload,
  Clock,
  Database,
  DollarSign,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import "@/styles/pages/portfolio-single.css";
import { getProjectBySlug, tryGetPublishedProjects } from "@/lib/portfolio-api";
import { TechnologyIcon } from "@/lib/technologyIcons";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

type MetricType = "users" | "downloads" | "uptime" | "performance" | "growth" | "time" | "revenue" | "rating" | "database" | "completion";

const metricPresets: Record<MetricType, { icon: LucideIcon; accent: string }> = {
  users: { icon: Users, accent: "#a68aff" },
  downloads: { icon: CloudDownload, accent: "#42cb8a" },
  uptime: { icon: ShieldCheck, accent: "#4ea2ff" },
  performance: { icon: Zap, accent: "#f2b545" },
  growth: { icon: TrendingUp, accent: "#42cb8a" },
  time: { icon: Clock, accent: "#f2b545" },
  revenue: { icon: DollarSign, accent: "#42cb8a" },
  rating: { icon: Star, accent: "#a68aff" },
  database: { icon: Database, accent: "#4ea2ff" },
  completion: { icon: CircleCheck, accent: "#f2b545" },
};

const legacyMetricTypeByIcon: Record<string, MetricType> = {
  users: "users",
  "cloud-download": "downloads",
  "shield-check": "uptime",
  zap: "performance",
  "trending-up": "growth",
  clock: "time",
  award: "completion",
  star: "rating",
  activity: "performance",
  chart: "growth",
  "check-circle": "completion",
  database: "database",
  shield: "uptime",
};

function metricTypeFromResult(type?: string, iconKey?: string): MetricType {
  if (type && type in metricPresets) {
    return type as MetricType;
  }
  if (iconKey && iconKey in legacyMetricTypeByIcon) {
    return legacyMetricTypeByIcon[iconKey];
  }
  return "users";
}

function ResultIcon({ type, iconKey }: { type?: string; iconKey?: string }) {
  const preset = metricPresets[metricTypeFromResult(type, iconKey)];
  const Icon = preset.icon;
  return (
    <span className="result-icon" aria-hidden="true" style={{ color: preset.accent }}>
      <Icon size={30} strokeWidth={1.8} />
    </span>
  );
}

const caseStudyCtaBenefits = [
  "Full-time roles",
  "Remote / Hybrid",
  "Contract work",
  "Orlando, FL",
  "Consulting",
  "Open to relocation",
];

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
  const keyResults = [...(project.keyResults ?? [])].sort((a, b) => {
    const left = typeof a.order === "number" ? a.order : typeof a.displayOrder === "number" ? a.displayOrder : 0;
    const right = typeof b.order === "number" ? b.order : typeof b.displayOrder === "number" ? b.displayOrder : 0;
    return left - right;
  });
  const highlights = [...(project.highlights ?? [])].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  const gallery = [
    ...(project.media?.gallery?.length ? project.media.gallery : (project.gallery ?? [])),
  ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
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
  const isEngineeringLab = project.projectType === "github";

  return (
    <main
      id="project-single-page"
      className="page project-single"
      data-project-type={isEngineeringLab ? "engineering-lab" : "case-study"}
    >
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
      {keyResults.length || highlights.length || (!isEngineeringLab && detailRows.length) ? (
        <section className="project-section" aria-label="Project outcomes">
          <div className="project-container">
            {keyResults.length ? (
              <div className="panel key-results-panel">
                <div className="section-label">Key Results</div>
                <dl className="results-grid">
                  {keyResults.map((result) => (
                    <div key={result.id}>
                      <ResultIcon
                        type={result.type}
                        iconKey={result.iconKey}
                      />
                      <dt>{result.value}</dt>
                      <dd>{result.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
            {highlights.length || (!isEngineeringLab && detailRows.length) ? (
              <div className={highlights.length ? "panel highlights-panel" : "panel highlights-panel details-panel"}>
                {highlights.length ? (
                  <div className="highlights-content">
                    <div className="section-label">Project Highlights</div>
                    <ul className="highlights-list">
                      {highlights.map((highlight) => (
                        <li key={highlight.id}>{highlight.text}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {!isEngineeringLab && detailRows.length ? (
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
      {!isEngineeringLab && gallery.length ? (
        <section className="project-section" aria-labelledby="gallery-title">
          <div className="project-container">
            <div className="panel gallery-panel">
              <div className="section-label">Gallery</div>
              <h2 id="gallery-title">Project Gallery</h2>
              <ul className="project-gallery">
                {gallery.map((image) => (
                  <li key={image.id || image.url}>
                    <figure>
                      <img src={image.url} alt={image.alt || project.title} />
                      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}
      {!isEngineeringLab ? (
        <section className="project-cta" aria-labelledby="project-cta-title">
          <div className="project-container">
            <div className="cta-panel">
              <div className="cta-copy">
                <div className="section-label">Let's Build Something Great</div>
                <h2 id="project-cta-title">Have a similar project in mind?</h2>
                <p>
                  I help businesses and teams build fast, accessible, and high-performing web experiences
                  that deliver results.
                </p>
              </div>
              <ul className="cta-benefits">
                {caseStudyCtaBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <a className="button button-primary cta-button" href="/contact">
                Let's Connect <span aria-hidden="true">{"\u2192"}</span>
              </a>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
