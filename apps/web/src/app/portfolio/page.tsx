import type { Metadata } from "next";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Portfolio | Riad Kilani",
  description: "Case studies, design projects, GitHub work, and code experiments by Riad Kilani."
};

function PortfolioIndexContent() {
  return (
    <div id="main-content">
<main id="portfolio-page">
    <section className="portfolio-hero" aria-labelledby="portfolio-title">
      <div className="portfolio-container">
        <p className="portfolio-kicker">Portfolio</p>
        <h1 id="portfolio-title">Selected <span>Work</span></h1>
        <p className="portfolio-intro">
          A curated collection of projects, built with
          <strong>purpose</strong>, <strong>precision</strong>, and
          <strong>real-world impact</strong>.
        </p>

        <div className="portfolio-category-filters" aria-label="Filter projects by discipline">
          <button type="button" className="category-filter is-active" data-category="all" aria-pressed="true">
            <span aria-hidden="true">▦</span> All Projects
          </button>
          <button type="button" className="category-filter" data-category="web" aria-pressed="false">
            <span aria-hidden="true">▣</span> Web Applications
          </button>
          <button type="button" className="category-filter" data-category="systems" aria-pressed="false">
            <span aria-hidden="true">⬡</span> Design Systems
          </button>
          <button type="button" className="category-filter" data-category="design" aria-pressed="false">
            <span aria-hidden="true">➤</span> UI/UX &amp; Design
          </button>
          <button type="button" className="category-filter" data-category="tools" aria-pressed="false">
            <span aria-hidden="true">⚒</span> Tools &amp; Utilities
          </button>
        </div>

        <nav className="portfolio-source-nav" aria-label="Portfolio sections">
          <a href="#case-studies"><span aria-hidden="true">▥</span> Case Studies</a>
          <a href="#github-projects"><span aria-hidden="true">●</span> GitHub Projects</a>
          <a href="#design-projects"><span aria-hidden="true">◇</span> Design Projects</a>
          <a href="#codepen-experiments"><span aria-hidden="true">⬢</span> Code Experiments</a>
        </nav>
      </div>
    </section>

    <section id="case-studies" className="portfolio-section" data-source-section="case-study" aria-labelledby="case-studies-title">
      <div className="portfolio-container">
        <header className="section-heading">
          <span className="section-line" aria-hidden="true"></span>
          <div>
            <h2 id="case-studies-title">Featured Case Studies</h2>
            <p>In-depth case studies of full-scale products and platforms from concept to launch.</p>
          </div>
          <span className="section-line" aria-hidden="true"></span>
        </header>

        <div className="project-grid project-grid--case-studies">
          <article className="project-card" data-category="web tools">
            <div className="project-card__media">
              <span className="project-badge">Featured</span>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85" alt="PipelineOS analytics dashboard" width="1200" height="700" />
            </div>
            <div className="project-card__body">
              <h3>PipelineOS</h3>
              <p className="project-type">Job Relations Manager</p>
              <p>A comprehensive platform for tracking applications, managing leads, recruiters, and communications in one place.</p>
              <ul className="tag-list"><li>React</li><li>Node.js</li><li>MongoDB</li><li>Express</li></ul>
              <a className="project-link" href="/portfolio/pipelineos">View Case Study <span>→</span></a>
            </div>
          </article>

          <article className="project-card" data-category="web design">
            <div className="project-card__media">
              <span className="project-badge">Featured</span>
              <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85" alt="Travel booking website on a laptop" width="1200" height="700" />
            </div>
            <div className="project-card__body">
              <h3>Time 2 Visit</h3>
              <p className="project-type">Travel Booking Platform</p>
              <p>Complete travel platform with increased bookings through modern UX/UI and performance optimization.</p>
              <ul className="tag-list"><li>Vue.js</li><li>Vite</li><li>Pinia</li><li>SCSS</li></ul>
              <a className="project-link" href="#time2visit">View Case Study <span>→</span></a>
            </div>
          </article>

          <article className="project-card" data-category="web design">
            <div className="project-card__media">
              <span className="project-badge">Featured</span>
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85" alt="Healthcare team using a telehealth interface" width="1200" height="700" />
            </div>
            <div className="project-card__body">
              <h3>Andor Health</h3>
              <p className="project-type">Telehealth Platform</p>
              <p>Telehealth solution integrating EMR, patient management, and real-time consultations with advanced dashboards.</p>
              <ul className="tag-list"><li>Vue.js</li><li>WebRTC</li><li>Epic API</li><li>Sass</li></ul>
              <a className="project-link" href="/portfolio/andor-health">View Case Study <span>→</span></a>
            </div>
          </article>

          <article className="project-card" data-category="web design">
            <div className="project-card__media">
              <img src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=85" alt="Editorial food photography" width="1200" height="700" />
            </div>
            <div className="project-card__body">
              <h3>Saveur</h3>
              <p className="project-type">Content Platform</p>
              <p>High-traffic editorial platform with custom WordPress themes and performance tuning for a rich editorial experience.</p>
              <ul className="tag-list"><li>WordPress</li><li>PHP</li><li>jQuery</li><li>SCSS</li></ul>
              <a className="project-link" href="/portfolio/saveur">View Case Study <span>→</span></a>
            </div>
          </article>

          <article className="project-card" data-category="web tools">
            <div className="project-card__media">
              <img src="https://placehold.co/1200x700/071525/2da8ff?text=Event+Platform" alt="Event platform marketing screen" width="1200" height="700" />
            </div>
            <div className="project-card__body">
              <h3>BMI Elite</h3>
              <p className="project-type">Event Platform</p>
              <p>Event and membership platform that improved conversions and generated measurable additional revenue.</p>
              <ul className="tag-list"><li>React</li><li>Next.js</li><li>Stripe</li><li>Tailwind</li></ul>
              <a className="project-link" href="/portfolio/bmi-elite">View Case Study <span>→</span></a>
            </div>
          </article>

          <article className="project-card" data-category="web systems tools">
            <div className="project-card__media">
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85" alt="Internal business platform on desktop displays" width="1200" height="700" />
            </div>
            <div className="project-card__body">
              <h3>HD Supply</h3>
              <p className="project-type">Internal Platform</p>
              <p>Internal platform that automated front-end generation and reduced repetitive development effort.</p>
              <ul className="tag-list"><li>React</li><li>Node.js</li><li>Handlebars</li><li>Sass</li></ul>
              <a className="project-link" href="/portfolio/hd-supply">View Case Study <span>→</span></a>
            </div>
          </article>
        </div>

        <a className="section-action" href="#all-case-studies">View All Case Studies <span>→</span></a>
      </div>
    </section>

    <section id="github-projects" className="portfolio-section portfolio-section--github" data-source-section="github" aria-labelledby="github-title">
      <div className="portfolio-container">
        <header className="section-heading section-heading--green">
          <span className="section-line" aria-hidden="true"></span>
          <div>
            <h2 id="github-title">GitHub Projects</h2>
            <p>Open-source and personal projects hosted on GitHub.</p>
          </div>
          <span className="section-line" aria-hidden="true"></span>
        </header>

        <div className="project-grid project-grid--compact">
          <article className="compact-card" data-category="systems tools">
            <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=85" alt="Design system interface" width="900" height="500" />
            <h3>RK Design System</h3>
            <p>Reusable component library with accessible, scalable UI components.</p>
            <div className="compact-meta"><span>TypeScript</span><span>★ 128</span></div>
            <div className="compact-actions"><a href="https://github.com/" target="_blank" rel="noopener noreferrer">View Repository</a><a href="#demo">Live Demo</a></div>
          </article>

          <article className="compact-card" data-category="web tools">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85" alt="Portfolio template code and preview" width="900" height="500" />
            <h3>Portfolio Template</h3>
            <p>Modern portfolio template built with React, accessible CSS, and motion.</p>
            <div className="compact-meta"><span>React</span><span>★ 96</span></div>
            <div className="compact-actions"><a href="https://github.com/" target="_blank" rel="noopener noreferrer">View Repository</a><a href="#demo">Live Demo</a></div>
          </article>

          <article className="compact-card" data-category="tools">
            <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85" alt="Code editor showing an API project" width="900" height="500" />
            <h3>TaskFlow API</h3>
            <p>RESTful API for task management with authentication and real-time updates.</p>
            <div className="compact-meta"><span>Node.js</span><span>★ 74</span></div>
            <div className="compact-actions"><a href="https://github.com/" target="_blank" rel="noopener noreferrer">View Repository</a><a href="#demo">Live Demo</a></div>
          </article>

          <article className="compact-card" data-category="tools">
            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=85" alt="Developer tools source code" width="900" height="500" />
            <h3>Developer Tools</h3>
            <p>Collection of CLI tools created to improve developer productivity.</p>
            <div className="compact-meta"><span>JavaScript</span><span>★ 54</span></div>
            <div className="compact-actions"><a href="https://github.com/" target="_blank" rel="noopener noreferrer">View Repository</a></div>
          </article>
        </div>

        <a className="section-action section-action--green" href="https://github.com/" target="_blank" rel="noopener noreferrer">View All GitHub Projects <span>→</span></a>
      </div>
    </section>

    <section id="design-projects" className="portfolio-section portfolio-section--design" data-source-section="design" aria-labelledby="design-title">
      <div className="portfolio-container">
        <header className="section-heading section-heading--purple">
          <span className="section-line" aria-hidden="true"></span>
          <div>
            <h2 id="design-title">Design Projects</h2>
            <p>UI/UX design, branding, and design-system explorations.</p>
          </div>
          <span className="section-line" aria-hidden="true"></span>
        </header>

        <div className="project-grid project-grid--compact">
          <article className="compact-card" data-category="design">
            <img src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=900&q=85" alt="Financial dashboard interface design" width="900" height="500" />
            <h3>Fintech Dashboard</h3>
            <p>Dashboard concept for a financial analytics platform.</p>
            <div className="compact-meta"><span>Figma</span></div>
            <div className="compact-actions"><a href="/portfolio/fintech-dashboard">View Design</a></div>
          </article>

          <article className="compact-card" data-category="design">
            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=85" alt="Mobile banking application screens" width="900" height="500" />
            <h3>Mobile Banking App</h3>
            <p>Modern mobile banking experience and interaction concept.</p>
            <div className="compact-meta"><span>Figma</span></div>
            <div className="compact-actions"><a href="#mobile-banking">View Design</a></div>
          </article>

          <article className="compact-card" data-category="design systems">
            <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85" alt="Design system components and documentation" width="900" height="500" />
            <h3>Design System V2</h3>
            <p>Complete design system with components, tokens, and documentation.</p>
            <div className="compact-meta"><span>Figma</span></div>
            <div className="compact-actions"><a href="/portfolio/design-system-v2">View Case Study</a></div>
          </article>

          <article className="compact-card" data-category="design">
            <img src="https://images.unsplash.com/photo-1561070791-36c11767b26a?auto=format&fit=crop&w=900&q=85" alt="Typography and brand identity study" width="900" height="500" />
            <h3>Brand Identity</h3>
            <p>Brand identity and visual language exploration.</p>
            <div className="compact-meta"><span>Illustrator</span></div>
            <div className="compact-actions"><a href="/portfolio/brand-identity">View Gallery</a></div>
          </article>
        </div>

        <a className="section-action section-action--purple" href="#all-design-projects">View All Design Projects <span>→</span></a>
      </div>
    </section>

    <section id="codepen-experiments" className="portfolio-section portfolio-section--codepen" data-source-section="codepen" aria-labelledby="codepen-title">
      <div className="portfolio-container">
        <header className="section-heading section-heading--gold">
          <span className="section-line" aria-hidden="true"></span>
          <div>
            <h2 id="codepen-title">CodePen Experiments</h2>
            <p>Front-end experiments, animations, and interactive prototypes.</p>
          </div>
          <span className="section-line" aria-hidden="true"></span>
        </header>

        <div className="project-grid project-grid--compact">
          <article className="compact-card" data-category="web design">
            <img src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=900&q=85" alt="Interactive 3D card interface" width="900" height="500" />
            <h3>3D Card Hover</h3>
            <p>Interactive 3D card hover effects with animation.</p>
            <div className="compact-meta"><span>HTML</span><span>CSS</span><span>JS</span></div>
            <div className="compact-actions"><a href="https://codepen.io/" target="_blank" rel="noopener noreferrer">View on CodePen</a></div>
          </article>

          <article className="compact-card" data-category="web design">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=85" alt="Animated liquid button experiment" width="900" height="500" />
            <h3>Liquid Button</h3>
            <p>Animated liquid hover button effect.</p>
            <div className="compact-meta"><span>HTML</span><span>CSS</span><span>JS</span></div>
            <div className="compact-actions"><a href="https://codepen.io/" target="_blank" rel="noopener noreferrer">View on CodePen</a></div>
          </article>

          <article className="compact-card" data-category="web tools">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85" alt="Scroll animation prototype" width="900" height="500" />
            <h3>Scroll Animation</h3>
            <p>Smooth scroll-triggered animation with GSAP.</p>
            <div className="compact-meta"><span>HTML</span><span>CSS</span><span>JS</span></div>
            <div className="compact-actions"><a href="https://codepen.io/" target="_blank" rel="noopener noreferrer">View on CodePen</a></div>
          </article>

          <article className="compact-card" data-category="design web">
            <img src="https://placehold.co/900x500/071525/58aaff?text=Interface+Experiment" alt="Glassmorphism interface experiment" width="900" height="500" />
            <h3>Glassmorphism UI</h3>
            <p>Glassmorphism card design concept.</p>
            <div className="compact-meta"><span>HTML</span><span>CSS</span></div>
            <div className="compact-actions"><a href="https://codepen.io/" target="_blank" rel="noopener noreferrer">View on CodePen</a></div>
          </article>
        </div>

        <a className="section-action section-action--gold" href="https://codepen.io/" target="_blank" rel="noopener noreferrer">View All CodePen Experiments <span>→</span></a>
      </div>
    </section>

    <section className="portfolio-cta">
      <div className="portfolio-container">
        <div className="portfolio-cta__panel">
          <div className="portfolio-cta__icon" aria-hidden="true">➤</div>
          <div>
            <h2>Have a Project in Mind?</h2>
            <p>I’m always open to discussing new opportunities, solving complex challenges, and creating impactful digital experiences.</p>
          </div>
          <a href="#contact">Let’s Connect <span>→</span></a>
        </div>
      </div>
    </section>

    <section id="contact" className="portfolio-connect" aria-labelledby="connect-title">
      <div className="portfolio-container">
        <h2 id="connect-title">Let’s Connect</h2>
        <p>Interested in collaborating on a project or just want to say hello? Connect with me across the platforms below.</p>
        <div className="social-links">
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://codepen.io/" target="_blank" rel="noopener noreferrer">CodePen</a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          <a href="mailto:hello@example.com">Email</a>
        </div>
      </div>
    </section>
  </main>
</div>
  );
}

export default function Page() {
  return <PortfolioIndexContent />;
}
