import type { Metadata } from "next";
import "@/styles/pages/bio.css";
import { BioCapabilityGroup } from "@/components/bio/bio-capability-group";
import { bioCapabilityGroups } from "@/data/bio-capabilities";
import type { BioCapabilityGroupId } from "@/data/bio-capabilities";
import type { ReactNode } from "react";
import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  Blocks,
  Braces,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Circle,
  Code2,
  Gauge,
  GitBranch,
  Globe2,
  Layers3,
  MousePointerClick,
  Network,
  Palette,
  PanelsTopLeft,
  PenTool,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";

export const metadata: Metadata = {
  title: "About Riad Kilani | UX Engineer & Front-End Architect",
  description: "Learn about Riad Kilani’s experience in front-end architecture, UX engineering, design systems, accessibility, and performance."
};

const capabilityGroupIcons: Record<BioCapabilityGroupId, ReactNode> = {
  "core-engineering": <Braces aria-hidden="true" />,
  "frameworks-platforms": <Blocks aria-hidden="true" />,
  "front-end-architecture": <Network aria-hidden="true" />,
  "ux-interactive-design": <MousePointerClick aria-hidden="true" />,
  "design-systems": <PanelsTopLeft aria-hidden="true" />,
  "design-prototyping-tools": <Palette aria-hidden="true" />,
  "quality-performance": <BadgeCheck aria-hidden="true" />,
  "analytics-insights": <ChartNoAxesCombined aria-hidden="true" />,
  "delivery-workflow": <GitBranch aria-hidden="true" />,
  "ai-assisted-development": <Sparkles aria-hidden="true" />,
};

function BioPageContent() {
  return (
<main id="bio-page" className="page bio">
  <div className="bio-container">    
    <section className="bio-intro" aria-labelledby="bio-heading">
      <div className="bio-intro__content">
        <header className="bio-heading-group">
          <p className="bio-eyebrow">
            Senior UX Engineer &amp; Front-End Architect
          </p>

          <h1 id="bio-heading">
            About <span>Riad Kilani</span>
          </h1>

          <p className="bio-role">
            Front-End Architecture
            <span aria-hidden="true">|</span>
            Interactive Product Design
            <span aria-hidden="true">|</span>
            AI-Assisted Development
          </p>
        </header>

        <p className="bio-lede">
          I transform complex product requirements into scalable, accessible,
          and high-performance digital experiences that connect user needs,
          business objectives, visual design, and production-ready engineering.
        </p>

        <dl className="metric-list" data-variant="bio" aria-label="Professional impact">
          <div className="metric-card">
            <dt>17+</dt>
            <dd>Years of Experience</dd>
          </div>

          <div className="metric-card">
            <dt>100+</dt>
            <dd>Products &amp; Projects</dd>
          </div>

          <div className="metric-card">
            <dt>40–60%</dt>
            <dd>Faster Delivery</dd>
          </div>

          <div className="metric-card">
            <dt>90+</dt>
            <dd>Lighthouse Scores</dd>
          </div>
        </dl>

        <ul className="bio-availability" aria-label="Professional availability">
          <li>
            <Circle aria-hidden="true" />
            Remote Friendly
          </li>

          <li>
            <Globe2 aria-hidden="true" />
            Available for Opportunities
          </li>

          <li>
            <BriefcaseBusiness aria-hidden="true" />
            Contract, Consulting &amp; Full-Time
          </li>
        </ul>
      </div>

      <aside className="bio-quote-card" aria-label="Professional philosophy">
        <div className="bio-portrait-wrap">
          <div className="bio-portrait-glow" aria-hidden="true"></div>

          <img
            className="bio-portrait"
            src="/assets/images/riad-kilani-alt-profile-pic.png"
            alt="Riad Kilani"
            width="600"
            height="600"
          />
        </div>

        <blockquote>
          <span className="quote-mark" aria-hidden="true">“</span>

          <p>
            I bridge product strategy, interactive design, and front-end
            engineering to create digital systems that are intuitive,
            maintainable, accessible, and built to scale.
          </p>

          <footer>
            <cite>Riad Kilani</cite>
          </footer>
        </blockquote>
      </aside>
    </section>

    
    <section
      className="bio-section process-section"
      aria-labelledby="process-heading"
    >
      <header className="section-heading">
        <p className="section-eyebrow">From strategy to production</p>

        <h2 id="process-heading">My Front-End Process</h2>

        <p>
          A structured product, design, and engineering process that reduces
          ambiguity, improves collaboration, and creates measurable outcomes.
        </p>
      </header>

      <ol className="process-grid">
        <li className="process-item">
          <span className="process-number" aria-hidden="true">1</span>

          <article className="process-card">
            <Search aria-hidden="true" />

            <h3>Discovery<br />&amp; Strategy</h3>

            <p>
              Define users, business goals, technical constraints, success
              metrics, and the core problem the product must solve.
            </p>
          </article>
        </li>

        <li className="process-item">
          <span className="process-number" aria-hidden="true">2</span>

          <article className="process-card">
            <Workflow aria-hidden="true" />

            <h3>Experience<br />Architecture</h3>

            <p>
              Map user journeys, information architecture, user flows,
              interaction models, and responsive experience requirements.
            </p>
          </article>
        </li>

        <li className="process-item">
          <span className="process-number" aria-hidden="true">3</span>

          <article className="process-card">
            <PenTool aria-hidden="true" />

            <h3>Interactive<br />Design</h3>

            <p>
              Create wireframes, visual concepts, interactive prototypes, and
              reusable design patterns that clarify the experience.
            </p>
          </article>
        </li>

        <li className="process-item">
          <span className="process-number" aria-hidden="true">4</span>

          <article className="process-card">
            <Code2 aria-hidden="true" />

            <h3>Engineering<br />&amp; Integration</h3>

            <p>
              Build production-ready interfaces using modern component
              architecture, APIs, scalable CSS, and maintainable standards.
            </p>
          </article>
        </li>

        <li className="process-item">
          <span className="process-number" aria-hidden="true">5</span>

          <article className="process-card">
            <ShieldCheck aria-hidden="true" />

            <h3>Quality<br />&amp; Accessibility</h3>

            <p>
              Validate usability, responsive behavior, browser compatibility,
              automated testing, keyboard support, and WCAG conformance.
            </p>
          </article>
        </li>

        <li className="process-item">
          <span className="process-number" aria-hidden="true">6</span>

          <article className="process-card">
            <Gauge aria-hidden="true" />

            <h3>Performance<br />&amp; Optimization</h3>

            <p>
              Measure Core Web Vitals, analyze user behavior, optimize
              performance, and continuously improve product outcomes.
            </p>
          </article>
        </li>
      </ol>
    </section>

    
    <div className="skills-achievements-layout">
      <section className="skills-section" aria-labelledby="skills-heading">
        <header className="section-heading">
          <p className="section-eyebrow">
            Technical leadership and creative execution
          </p>

          <h2 id="skills-heading">Core Capabilities</h2>

          <p>
            A senior-level combination of front-end engineering, experience
            architecture, interactive design, visual design, accessibility,
            performance, and modern delivery workflows.
          </p>
        </header>

        <div className="skills-grid">
          {bioCapabilityGroups.map((group) => (
            <BioCapabilityGroup
              group={group}
              icon={capabilityGroupIcons[group.id]}
              key={group.id}
            />
          ))}
        </div>

        <aside className="additional-experience">
          <h3>Additional Platform Experience</h3>

          <p>
            AWS, Azure, Salesforce Experience Cloud, Epic EMR integrations,
            WebRTC, Google Analytics, Google Tag Manager, Adobe SiteCatalyst,
            Tailwind CSS, Sass, Drupal, Magento, AngularJS, jQuery, Hotjar,
            Chart.js, Mailchimp, A/B testing, and heat mapping.
          </p>
        </aside>
      </section>

      
      <aside
        className="achievements-section"
        aria-labelledby="achievements-heading"
      >
        <header className="section-heading">
          <p className="section-eyebrow">Measured impact</p>
          <h2 id="achievements-heading">Career Highlights</h2>
        </header>

        <div className="achievements-list">
          <article className="achievement-card">
            <div className="achievement-icon" aria-hidden="true">
              <Layers3 />
            </div>

            <div>
              <h3>Design System Leadership</h3>

              <p>
                Built reusable design systems and component libraries that
                reduced development cycles by 40–60% across multi-team
                environments.
              </p>
            </div>
          </article>

          <article className="achievement-card">
            <div className="achievement-icon" aria-hidden="true">
              <Rocket />
            </div>

            <div>
              <h3>Accelerated Delivery</h3>

              <p>
                Re-architected a struggling React platform and delivered its
                beta six months ahead of schedule.
              </p>
            </div>
          </article>

          <article className="achievement-card">
            <div className="achievement-icon" aria-hidden="true">
              <Gauge />
            </div>

            <div>
              <h3>Performance Engineering</h3>

              <p>
                Consistently delivered Lighthouse scores above 90 with
                sub-two-second production load times.
              </p>
            </div>
          </article>

          <article className="achievement-card">
            <div className="achievement-icon" aria-hidden="true">
              <TrendingUp />
            </div>

            <div>
              <h3>Conversion Optimization</h3>

              <p>
                Improved conversions by as much as 60% through analytics,
                interaction design, usability improvements, and experience
                redesign.
              </p>
            </div>
          </article>

          <article className="achievement-card">
            <div className="achievement-icon" aria-hidden="true">
              <Accessibility />
            </div>

            <div>
              <h3>Accessibility by Design</h3>

              <p>
                Integrate semantic structure, keyboard support, responsive
                behavior, and WCAG practices throughout delivery.
              </p>
            </div>
          </article>
        </div>
      </aside>
    </div>

    
    <section className="bio-cta" aria-labelledby="cta-heading">
      <div className="bio-cta__icon" aria-hidden="true">
        <Send />
      </div>

      <div className="bio-cta__content">
        <p className="section-eyebrow">Have a complex product challenge?</p>

        <h2 id="cta-heading">Let’s Build Something Impactful</h2>

        <p>
          I’m open to senior front-end, UX engineering, architecture,
          interactive design, consulting, and product design opportunities
          where thoughtful systems and measurable outcomes matter.
        </p>
      </div>

      <a className="bio-button" href=".contact">
        <span>Get In Touch</span>
        <ArrowRight aria-hidden="true" />
      </a>
    </section>

    
    <section className="connect-section" aria-labelledby="connect-heading">
      <header className="section-heading">
        <h2 id="connect-heading">Let’s Connect</h2>

        <p>
          Explore my work, follow what I’m building, or reach out to discuss an
          opportunity.
        </p>
      </header>

      <nav aria-label="Professional profiles">
        <SocialMediaLinks showLabels variant="bio" />
      </nav>
    </section>
  </div>
</main>

  );
}

export default function Page() {
  return <BioPageContent />;
}
