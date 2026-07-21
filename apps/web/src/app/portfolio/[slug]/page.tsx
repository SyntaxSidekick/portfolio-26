import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./portfolio-single.css";
import { portfolioProjects } from "@/data/portfolio-projects";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

function PortfolioProjectContent() {
  return (
    <main id="project-single-page" className="project-single-main">
      <section className="project-hero" aria-labelledby="project-title">
        <div className="project-container">
          <a className="back-link" href="/portfolio">
            <span aria-hidden="true">←</span>
            Back to Portfolio
          </a>

          <div className="project-hero-grid">
            <div className="project-hero-content">
              <span className="project-badge">Featured Project</span>

              <h1 id="project-title">SyntaxSidekick</h1>
              <p className="project-subtitle">
                Modern Coding Blog &amp; Resource Hub
              </p>

              <p className="project-summary">
                A custom WordPress platform delivering tutorials, guides, and
                resources on modern front-end development, UX, accessibility,
                performance, SEO, and best practices for today’s web developers.
              </p>

              <ul className="technology-tags" aria-label="Technologies used">
                <li>
                  <span aria-hidden="true">◉</span> WordPress
                </li>
                <li>
                  <span aria-hidden="true">▣</span> HTML5
                </li>
                <li>
                  <span aria-hidden="true">▣</span> CSS3
                </li>
                <li>
                  <span aria-hidden="true">▣</span> JavaScript
                </li>
                <li>
                  <span aria-hidden="true">◌</span> PHP
                </li>
                <li aria-label="Two additional technologies">+2</li>
              </ul>

              <div className="project-actions">
                <a
                  className="button button-primary"
                  href="https://syntaxsidekick.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Live Site
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  className="button button-secondary"
                  href="https://github.com/riadkilani"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source
                  <span aria-hidden="true">◉</span>
                </a>
              </div>
            </div>

            <div className="project-hero-media" aria-label="Project preview">
              <figure className="desktop-preview">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85"
                  alt="SyntaxSidekick coding resource website shown on a desktop display"
                  width="1600"
                  height="1000"
                />
              </figure>

              <figure className="mobile-preview">
                <img
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=85"
                  alt="SyntaxSidekick article layout shown on a mobile screen"
                  width="700"
                  height="1400"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section
        className="project-metrics"
        aria-label="Project performance metrics"
      >
        <div className="project-container">
          <dl className="metrics-grid">
            <div>
              <dt>90+</dt>
              <dd>Lighthouse Score</dd>
            </div>

            <div>
              <dt>WCAG 2.2 AA</dt>
              <dd>Accessibility Standard</dd>
            </div>

            <div>
              <dt>100%</dt>
              <dd>Performance Score</dd>
            </div>

            <div>
              <dt>99.9%</dt>
              <dd>Uptime</dd>
            </div>

            <div>
              <dt>5K+</dt>
              <dd>Monthly Visitors</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="project-section" aria-labelledby="overview-title">
        <div className="project-container">
          <div className="panel overview-panel">
            <div className="section-label">Overview</div>
            <h2 id="overview-title">Project Overview</h2>

            <p className="section-intro">
              SyntaxSidekick is a content-driven platform built with WordPress
              and modern front-end practices. It provides developers with
              high-quality, practical content while maintaining exceptional
              performance, accessibility, and user experience.
            </p>

            <div className="challenge-solution-grid">
              <article className="challenge-block">
                <h3>
                  <span aria-hidden="true">▣</span> The Challenge
                </h3>
                <p>
                  Create a fast, accessible, and scalable blog that can handle
                  technical content, code samples, downloadable resources, and a
                  growing library of articles while providing an exceptional
                  reading experience across all devices.
                </p>
              </article>

              <article className="solution-block">
                <h3>
                  <span aria-hidden="true">✓</span> The Solution
                </h3>
                <p>
                  Built a custom WordPress theme with a component-based
                  architecture, optimized for Core Web Vitals and accessibility.
                  Implemented a modern design system, advanced performance
                  techniques, and intuitive content structure for an outstanding
                  user experience.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="project-section" aria-labelledby="results-title">
        <div className="project-container">
          <div className="panel results-panel">
            <div className="section-label" id="results-title">
              Key Results
            </div>

            <dl className="results-grid">
              <div>
                <span className="result-icon" aria-hidden="true">
                  ↗
                </span>
                <dt>2.5s</dt>
                <dd>Average Load Time</dd>
              </div>

              <div>
                <span className="result-icon" aria-hidden="true">
                  ▥
                </span>
                <dt>80%+</dt>
                <dd>Mobile Performance</dd>
              </div>

              <div>
                <span className="result-icon" aria-hidden="true">
                  ◎
                </span>
                <dt>WCAG 2.2 AA</dt>
                <dd>Fully Accessible</dd>
              </div>

              <div>
                <span className="result-icon" aria-hidden="true">
                  ◉
                </span>
                <dt>40%+</dt>
                <dd>Organic Traffic Increase</dd>
              </div>

              <div>
                <span className="result-icon" aria-hidden="true">
                  ◯
                </span>
                <dt>5K+</dt>
                <dd>Monthly Visitors</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="project-section" aria-labelledby="highlights-title">
        <div className="project-container">
          <div className="panel highlights-panel">
            <div className="highlights-content">
              <div className="section-label" id="highlights-title">
                Project Highlights
              </div>

              <ul className="highlights-list">
                <li>Custom WordPress theme built for speed and scalability</li>
                <li>Syntax highlighting with copy-to-clipboard</li>
                <li>Component-driven architecture for easy maintenance</li>
                <li>Dark mode with user preference detection</li>
                <li>WCAG 2.2 AA accessibility compliance</li>
                <li>Advanced search and filtering system</li>
                <li>Optimized for Core Web Vitals (LCP, FID, CLS)</li>
                <li>SEO optimized with Schema markup</li>
              </ul>
            </div>

            <aside className="project-details" aria-labelledby="details-title">
              <div className="section-label" id="details-title">
                Project Details
              </div>

              <dl>
                <div>
                  <dt>Role:</dt>
                  <dd>Front-End Architect &amp; Developer</dd>
                </div>

                <div>
                  <dt>Platform:</dt>
                  <dd>WordPress</dd>
                </div>

                <div>
                  <dt>Type:</dt>
                  <dd>Blog / Resource Hub</dd>
                </div>

                <div>
                  <dt>Timeline:</dt>
                  <dd>4 Weeks</dd>
                </div>

                <div>
                  <dt>Launch:</dt>
                  <dd>March 2025</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="project-cta" aria-labelledby="cta-title">
        <div className="project-container">
          <div className="cta-panel">
            <div className="cta-copy">
              <div className="section-label">Let’s Build Something Great</div>
              <h2 id="cta-title">Have a similar project in mind?</h2>
              <p>
                I help businesses and teams build fast, accessible, and
                high-performing web experiences that deliver results.
              </p>
            </div>

            <ul className="cta-benefits">
              <li>Full-time roles</li>
              <li>Remote / Hybrid</li>
              <li>Contract work</li>
              <li>Orlando, FL</li>
              <li>Consulting</li>
              <li>Open to relocation</li>
            </ul>

            <a className="button button-primary cta-button" href="/contact">
              Let’s Connect
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((entry) => entry.slug === slug);

  if (!project) {
    return { title: "Not Found" };
  }

  return {
    title: project.title,
    description: `Project case study for ${project.title}.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return <PortfolioProjectContent />;
}
