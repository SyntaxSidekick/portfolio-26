import { BriefcaseBusiness, Circle, Globe2 } from "lucide-react";

export function BioIntro() {
  return (
    <section className="bio-intro" aria-labelledby="bio-heading">
      <div className="bio-intro__content">
        <header className="bio-heading-group">
          <p className="eyebrow">Senior UX Engineer &amp; Front-End Architect</p>

          <h1 id="bio-heading">
            About <span>Riad Kilani</span>
          </h1>

          <ul className="bio-role" aria-label="Areas of focus">
            <li>Front-End Architecture</li>
            <li>Interactive Product Design</li>
            <li>AI Workflow Engineering</li>
          </ul>
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
            <dt>40&ndash;60%</dt>
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

      <figure className="bio-quote-card" aria-label="Professional philosophy">
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
          <span className="quote-mark" aria-hidden="true">
            &ldquo;
          </span>

          <p>
            I bridge product strategy, interactive design, and front-end
            engineering to create digital systems that are intuitive,
            maintainable, accessible, and built to scale.
          </p>

        </blockquote>

        <figcaption>
          <cite>Riad Kilani</cite>
        </figcaption>
      </figure>
    </section>
  );
}
