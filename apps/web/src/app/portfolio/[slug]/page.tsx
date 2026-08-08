import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/styles/pages/portfolio-single/index.css";
import "@/styles/pages/portfolio-single/project-hero.css";
import "@/styles/pages/portfolio-single/project-metrics.css";
import "@/styles/pages/portfolio-single/project-narrative.css";
import "@/styles/pages/portfolio-single/project-details.css";
import "@/styles/pages/portfolio-single/project-gallery.css";
import "@/styles/pages/portfolio-single/project-navigation.css";
import "@/styles/pages/portfolio-single/single-design-projects.css";
import { ContactCta } from "@/components/contact-cta";
import { CaseStudyHero } from "@/components/portfolio/case-study/case-study-hero";
import { ProjectChallenge } from "@/components/portfolio/case-study/project-challenge";
import { ProjectHighlights } from "@/components/portfolio/case-study/project-highlights";
import { ProjectOverview } from "@/components/portfolio/case-study/project-overview";
import { ProjectResults } from "@/components/portfolio/case-study/project-results";
import { ProjectSolution } from "@/components/portfolio/case-study/project-solution";
import { ProjectDetails } from "@/components/portfolio/shared/project-details";
import { ProjectGallery } from "@/components/portfolio/shared/project-gallery";
import { ProjectMetrics } from "@/components/portfolio/shared/project-metrics";
import { ProjectNavigation } from "@/components/portfolio/shared/project-navigation";
import {
  getProjectBySlug,
  tryGetPublishedProjects,
  type PublicProject,
} from "@/lib/portfolio-api";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

function getDetailProjects(projects: PublicProject[]) {
  return projects
    .filter((project) => project.projectType === "case-study" || project.projectType === "design")
    .sort((first, second) => first.displayOrder - second.displayOrder);
}

function getDetailProjectsByType(projects: PublicProject[], projectType: "case-study" | "design") {
  return projects
    .filter((project) => project.projectType === projectType)
    .sort((first, second) => first.displayOrder - second.displayOrder);
}

function getProjectTypeLabel(project: PublicProject) {
  return project.projectType === "design" ? "Design Project" : "Case Study";
}

function getPrimaryMetrics(project: PublicProject) {
  return [
    ...(project.primaryMetrics?.length ? project.primaryMetrics : project.metrics),
  ].sort((first, second) => first.displayOrder - second.displayOrder);
}

function getAdjacentProjects(projects: PublicProject[], slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  return {
    previousProject: currentIndex > 0 ? projects[currentIndex - 1] : undefined,
    nextProject:
      currentIndex >= 0 && currentIndex < projects.length - 1
        ? projects[currentIndex + 1]
        : undefined,
  };
}

export async function generateStaticParams() {
  const { projects } = await tryGetPublishedProjects();
  return getDetailProjects(projects).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = await getProjectBySlug(slug);

    if (
      project.status !== "published" ||
      (project.projectType !== "case-study" && project.projectType !== "design")
    ) {
      return { title: "Not Found" };
    }

    const projectTypeLabel = getProjectTypeLabel(project);

    const image =
      project.media?.featuredImage ??
      project.media?.desktopImage ??
      project.featuredImage;
    const description =
      project.excerpt || project.overview?.content || project.description;

    return {
      title: `${project.title} | ${projectTypeLabel}`,
      description,
      alternates: {
        canonical: `/portfolio/${project.slug}`,
      },
      openGraph: {
        title: `${project.title} | ${projectTypeLabel}`,
        description,
        images: image?.url ? [{ url: image.url, alt: image.alt || project.title }] : undefined,
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

async function CaseStudyPageContent({ slug }: { slug: string }) {
  const { projects } = await tryGetPublishedProjects();
  const detailProjects = getDetailProjectsByType(projects, "case-study");
  const project = detailProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const primaryMetrics = getPrimaryMetrics(project);
  const { previousProject, nextProject } = getAdjacentProjects(detailProjects, slug);

  return (
    <main id="case-study-page" className="page portfolio-single case-study" data-project-type="case-study">
      <article className="portfolio-container">
        <CaseStudyHero project={project} />

        {primaryMetrics.length > 0 ? (
          <section className="project-section project-primary-metrics" aria-label="Primary project metrics">
            <ProjectMetrics
              metrics={primaryMetrics}
              ariaLabel={`${project.title} primary metrics`}
            />
          </section>
        ) : null}

        <ProjectOverview project={project} />
        <ProjectChallenge project={project} />
        <ProjectSolution project={project} />
        <ProjectResults project={project} />
        <ProjectHighlights project={project} />
        <ProjectDetails project={project} />
        <ProjectGallery project={project} />
        <ProjectNavigation
          previousProject={previousProject}
          nextProject={nextProject}
        />

        <ContactCta
          headingId="case-study-contact-cta-title"
          eyebrow="Have a similar challenge?"
          heading="Let's build something measurable"
          description="I help teams turn complex product and content challenges into fast, accessible, maintainable web experiences."
          cta={{
            href: "/contact",
            label: "Let's Connect",
            variant: "primary",
          }}
        />
      </article>
    </main>
  );
}

async function DesignProjectPageContent({ slug }: { slug: string }) {
  const { projects } = await tryGetPublishedProjects();
  const detailProjects = getDetailProjectsByType(projects, "design");
  const project = detailProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const primaryMetrics = getPrimaryMetrics(project);
  const { previousProject, nextProject } = getAdjacentProjects(detailProjects, slug);

  return (
    <main id="design-page" className="page portfolio-single design-page" data-project-type="design">
      <article className="portfolio-container">
        <CaseStudyHero project={project} />

        {primaryMetrics.length > 0 ? (
          <section className="project-section project-primary-metrics" aria-label="Primary project metrics">
            <ProjectMetrics
              metrics={primaryMetrics}
              ariaLabel={`${project.title} primary metrics`}
            />
          </section>
        ) : null}

        <ProjectOverview project={project} />
        <ProjectHighlights project={project} title="Key Deliverables" />
        <ProjectGallery project={project} title="Design Project Preview" />
        <ProjectDetails project={project} />
        <ProjectNavigation
          previousProject={previousProject}
          nextProject={nextProject}
          projectTypeLabel="design projects"
          indexHref="/portfolio#design-projects"
        />
      </article>
    </main>
  );
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  let project: PublicProject;

  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }

  if (project.projectType === "design") {
    return <DesignProjectPageContent slug={slug} />;
  }

  return <CaseStudyPageContent slug={slug} />;
}
