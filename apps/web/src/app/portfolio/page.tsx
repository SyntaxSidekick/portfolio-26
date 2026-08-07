import type { Metadata } from "next";
import "@/styles/pages/portfolio/index.css";
import "@/styles/pages/portfolio/portfolio-hero.css";
import "@/styles/pages/portfolio/portfolio-filters.css";
import "@/styles/pages/portfolio/case-studies.css";
import "@/styles/pages/portfolio/github-projects.css";
import "@/styles/pages/portfolio/design-projects.css";
import "@/styles/pages/portfolio/codepen-projects.css";
import { ContactCta } from "@/components/contact-cta";
import { CaseStudiesSection } from "@/components/portfolio/case-studies-section";
import { CodePenProjectsSection } from "@/components/portfolio/codepen-projects-section";
import { DesignProjectsSection } from "@/components/portfolio/design-projects-section";
import { GitHubProjectsSection } from "@/components/portfolio/github-projects-section";
import { PortfolioFilteredContent } from "@/components/portfolio/portfolio-filters";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { tryGetPublishedProjects } from "@/lib/portfolio-api";
import { groupPortfolioProjects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Portfolio | Riad Kilani",
  description:
    "Case studies, design projects, GitHub work, and code experiments by Riad Kilani.",
};

function PortfolioErrorState() {
  return (
    <section className="portfolio-error-state" aria-labelledby="portfolio-error-title">
      <h2 id="portfolio-error-title">Portfolio projects are unavailable</h2>
      <p>
        The project collection could not be loaded right now. Please try again
        shortly.
      </p>
    </section>
  );
}

async function PortfolioPageContent() {
  const { projects, error } = await tryGetPublishedProjects();
  const portfolio = groupPortfolioProjects(projects);

  if (process.env.NODE_ENV === "development" && error) {
    console.warn("Portfolio API unavailable:", error);
  }

  if (
    process.env.NODE_ENV === "development" &&
    portfolio.unknownProjects.length > 0
  ) {
    console.warn(
      "Portfolio projects with unknown projectType values:",
      portfolio.unknownProjects.map((project) => ({
        slug: project.slug,
        projectType: project.projectType,
      })),
    );
  }

  return (
    <main id="portfolio-page" className="page portfolio">
      <div className="portfolio-container">
        <PortfolioHero
          counts={portfolio.counts}
          totalProjects={portfolio.totalProjects}
        />

        {error ? <PortfolioErrorState /> : null}

        <PortfolioFilteredContent>
          <CaseStudiesSection projects={portfolio.caseStudies} />
          <GitHubProjectsSection projects={portfolio.githubProjects} />
          <DesignProjectsSection projects={portfolio.designProjects} />
          <CodePenProjectsSection projects={portfolio.codepenProjects} />
        </PortfolioFilteredContent>

        <ContactCta
          headingId="portfolio-contact-cta-title"
          eyebrow="Let's build"
          heading="Have an idea in mind?"
          description="Let's build something amazing together."
          cta={{
            href: "/contact",
            label: "Let's Connect",
            variant: "primary",
          }}
        />
      </div>
    </main>
  );
}

export default function Page() {
  return <PortfolioPageContent />;
}
