import type { Metadata } from "next";
import "./bio.css";

export const metadata: Metadata = {
  title: "About Riad Kilani | UX Engineer & Front-End Architect",
  description: "Learn about Riad Kilani’s experience in front-end architecture, UX engineering, design systems, accessibility, and performance."
};

function BioPageContent() {
  return (
    <div id="main-content">
<main id="bio-page">
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

        <dl className="bio-metrics" aria-label="Professional impact">
          <div className="bio-metric">
            <dt>17+</dt>
            <dd>Years of Experience</dd>
          </div>

          <div className="bio-metric">
            <dt>100+</dt>
            <dd>Products &amp; Projects</dd>
          </div>

          <div className="bio-metric">
            <dt>40–60%</dt>
            <dd>Faster Delivery</dd>
          </div>

          <div className="bio-metric">
            <dt>90+</dt>
            <dd>Lighthouse Scores</dd>
          </div>
        </dl>

        <ul className="bio-availability" aria-label="Professional availability">
          <li>
            <i data-lucide="globe-2" aria-hidden="true"></i>
            Remote Friendly
          </li>

          <li>
            <i data-lucide="circle" aria-hidden="true"></i>
            Available for Opportunities
          </li>

          <li>
            <i data-lucide="briefcase-business" aria-hidden="true"></i>
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
            <i data-lucide="search" aria-hidden="true"></i>

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
            <i data-lucide="workflow" aria-hidden="true"></i>

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
            <i data-lucide="pen-tool" aria-hidden="true"></i>

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
            <i data-lucide="code-2" aria-hidden="true"></i>

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
            <i data-lucide="shield-check" aria-hidden="true"></i>

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
            <i data-lucide="gauge" aria-hidden="true"></i>

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
          
          <article className="skill-group">
            <header className="skill-group__header">
              <i data-lucide="braces" aria-hidden="true"></i>

              <div>
                <h3>Core Engineering</h3>
                <p>Production front-end development</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot html" aria-hidden="true"></span>
                Semantic HTML5
              </li>

              <li>
                <span className="skill-dot css" aria-hidden="true"></span>
                Modern CSS Architecture
              </li>

              <li>
                <span className="skill-dot js" aria-hidden="true"></span>
                JavaScript ES6+
              </li>

              <li>
                <span className="skill-dot ts" aria-hidden="true"></span>
                TypeScript
              </li>

              <li>
                <span className="skill-dot sql" aria-hidden="true"></span>
                SQL &amp; Structured Data
              </li>
            </ul>
          </article>

          
          <article className="skill-group">
            <header className="skill-group__header">
              <i data-lucide="blocks" aria-hidden="true"></i>

              <div>
                <h3>Frameworks &amp; Platforms</h3>
                <p>Scalable application development</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot react" aria-hidden="true"></span>
                React &amp; Redux
              </li>

              <li>
                <span className="skill-dot next" aria-hidden="true"></span>
                Next.js
              </li>

              <li>
                <span className="skill-dot vue" aria-hidden="true"></span>
                Vue.js, Vue Router &amp; Vuex
              </li>

              <li>
                <span className="skill-dot node" aria-hidden="true"></span>
                Node.js &amp; Express
              </li>

              <li>
                <span className="skill-dot wordpress" aria-hidden="true"></span>
                Headless &amp; Enterprise CMS
              </li>
            </ul>
          </article>

          
          <article className="skill-group">
            <header className="skill-group__header">
              <i data-lucide="network" aria-hidden="true"></i>

              <div>
                <h3>Front-End Architecture</h3>
                <p>Maintainable systems at scale</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot architecture" aria-hidden="true"></span>
                Enterprise UI Architecture
              </li>

              <li>
                <span className="skill-dot micro" aria-hidden="true"></span>
                Micro-Frontend Strategy
              </li>

              <li>
                <span className="skill-dot component" aria-hidden="true"></span>
                Component-Driven Architecture
              </li>

              <li>
                <span className="skill-dot webcomponents" aria-hidden="true"></span>
                Web Components
              </li>

              <li>
                <span className="skill-dot api" aria-hidden="true"></span>
                REST APIs &amp; Integrations
              </li>
            </ul>
          </article>

          
          <article className="skill-group">
            <header className="skill-group__header">
              <i data-lucide="mouse-pointer-click" aria-hidden="true"></i>

              <div>
                <h3>UX &amp; Interactive Design</h3>
                <p>Experience strategy and interface behavior</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot interaction" aria-hidden="true"></span>
                Interaction Design
              </li>

              <li>
                <span className="skill-dot ux" aria-hidden="true"></span>
                UX Research &amp; Strategy
              </li>

              <li>
                <span className="skill-dot journeys" aria-hidden="true"></span>
                User Journeys &amp; User Flows
              </li>

              <li>
                <span className="skill-dot ia" aria-hidden="true"></span>
                Information Architecture
              </li>

              <li>
                <span className="skill-dot responsive" aria-hidden="true"></span>
                Responsive Product Design
              </li>
            </ul>
          </article>

          
          <article className="skill-group">
            <header className="skill-group__header">
              <i data-lucide="panels-top-left" aria-hidden="true"></i>

              <div>
                <h3>Design Systems</h3>
                <p>Connecting design and engineering</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot design" aria-hidden="true"></span>
                Design System Architecture
              </li>

              <li>
                <span className="skill-dot tokens" aria-hidden="true"></span>
                Design Tokens
              </li>

              <li>
                <span className="skill-dot library" aria-hidden="true"></span>
                Component Libraries
              </li>

              <li>
                <span className="skill-dot patterns" aria-hidden="true"></span>
                Reusable UI Patterns
              </li>

              <li>
                <span className="skill-dot documentation" aria-hidden="true"></span>
                System Documentation
              </li>
            </ul>
          </article>

          
          <article className="skill-group skill-group--tools">
            <header className="skill-group__header">
              <i data-lucide="palette" aria-hidden="true"></i>

              <div>
                <h3>Design &amp; Prototyping Tools</h3>
                <p>From early concepts to production-ready interfaces</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot figma" aria-hidden="true"></span>
                Figma &amp; FigJam
              </li>

              <li>
                <span className="skill-dot balsamiq" aria-hidden="true"></span>
                Balsamiq
              </li>

              <li>
                <span className="skill-dot invision" aria-hidden="true"></span>
                InVision
              </li>

              <li>
                <span className="skill-dot photoshop" aria-hidden="true"></span>
                Adobe Photoshop
              </li>

              <li>
                <span className="skill-dot illustrator" aria-hidden="true"></span>
                Adobe Illustrator
              </li>

              <li>
                <span className="skill-dot indesign" aria-hidden="true"></span>
                Adobe InDesign
              </li>

              <li>
                <span className="skill-dot xd" aria-hidden="true"></span>
                Adobe XD
              </li>
            </ul>
          </article>

          
          <article className="skill-group">
            <header className="skill-group__header">
              <i data-lucide="badge-check" aria-hidden="true"></i>

              <div>
                <h3>Quality &amp; Performance</h3>
                <p>Reliable, inclusive experiences</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot accessibility" aria-hidden="true"></span>
                WCAG 2.1 AA Accessibility
              </li>

              <li>
                <span className="skill-dot lighthouse" aria-hidden="true"></span>
                Lighthouse &amp; Core Web Vitals
              </li>

              <li>
                <span className="skill-dot playwright" aria-hidden="true"></span>
                Playwright Testing
              </li>

              <li>
                <span className="skill-dot jest" aria-hidden="true"></span>
                Jest &amp; Front-End Testing
              </li>

              <li>
                <span className="skill-dot seo" aria-hidden="true"></span>
                Technical SEO
              </li>
            </ul>
          </article>

          
          <article className="skill-group">
            <header className="skill-group__header">
              <i data-lucide="git-branch" aria-hidden="true"></i>

              <div>
                <h3>Delivery &amp; Workflow</h3>
                <p>Modern engineering productivity</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot git" aria-hidden="true"></span>
                Git &amp; GitHub
              </li>

              <li>
                <span className="skill-dot cicd" aria-hidden="true"></span>
                CI/CD Pipelines
              </li>

              <li>
                <span className="skill-dot vite" aria-hidden="true"></span>
                Vite, Webpack &amp; Babel
              </li>

              <li>
                <span className="skill-dot storybook" aria-hidden="true"></span>
                Storybook
              </li>

              <li>
                <span className="skill-dot agile" aria-hidden="true"></span>
                Agile, Jira &amp; Confluence
              </li>
            </ul>
          </article>

          
          <article className="skill-group">
            <header className="skill-group__header">
              <i data-lucide="sparkles" aria-hidden="true"></i>

              <div>
                <h3>AI-Assisted Development</h3>
                <p>Modern production and automation workflows</p>
              </div>
            </header>

            <ul>
              <li>
                <span className="skill-dot ai" aria-hidden="true"></span>
                LLM-Assisted Development
              </li>

              <li>
                <span className="skill-dot copilot" aria-hidden="true"></span>
                GitHub Copilot
              </li>

              <li>
                <span className="skill-dot claude" aria-hidden="true"></span>
                Claude Code
              </li>

              <li>
                <span className="skill-dot codex" aria-hidden="true"></span>
                OpenAI Codex
              </li>

              <li>
                <span className="skill-dot automation" aria-hidden="true"></span>
                AI Workflow Automation
              </li>
            </ul>
          </article>
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
              <i data-lucide="layers-3"></i>
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
              <i data-lucide="rocket"></i>
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
              <i data-lucide="gauge"></i>
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
              <i data-lucide="trending-up"></i>
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
              <i data-lucide="accessibility"></i>
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
        <i data-lucide="send"></i>
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

      <a className="bio-button" href="#contact">
        <span>Get In Touch</span>
        <i data-lucide="arrow-right" aria-hidden="true"></i>
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
        <ul className="social-links">
          <li>
            <a
              href="https://www.linkedin.com/in/riad-kilani"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="linkedin" aria-hidden="true"></i>
              <span>LinkedIn</span>
            </a>
          </li>

          <li>
            <a
              href="https://github.com/riadkilani"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="github" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>
          </li>

          <li>
            <a
              href="https://codepen.io/riadkilani"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="codepen" aria-hidden="true"></i>
              <span>CodePen</span>
            </a>
          </li>

          <li>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i data-lucide="twitter" aria-hidden="true"></i>
              <span>X</span>
            </a>
          </li>

          <li>
            <a href="mailto:career@riadkilani.com">
              <i data-lucide="mail" aria-hidden="true"></i>
              <span>Email</span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  </div>
</main>
</div>
  );
}

export default function Page() {
  return <BioPageContent />;
}
