import Link from "next/link";
import { RotatingRoles } from "./rotating-roles";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Senior Front-End Engineer</p>

            <h1 id="hero-title">
              I build accessible, <br />
              scalable front-end systems <br />
              that drive <span>real results.</span>
            </h1>

            <p className="hero-description">
              With 17+ years of experience, I help businesses turn complex ideas into fast,
              user-centric digital experiences.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" href="#featured-work">
                <span>View My Work</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <Link className="button button-secondary" href="/contact">
                <span>Let's Talk</span>
                <span aria-hidden="true">&#9673;</span>
              </Link>
            </div>
          </div>

          <div className="hero-profile">
            <div className="profile-layout">
              <div className="profile-portrait-wrap">
                <div className="profile-orbit" aria-hidden="true" />

                <div className="profile-portrait">
                  <img src="/assets/images/riad-kilani-main-profile-pic.png" alt="Riad Kilani" />
                </div>

                <div className="location-badge">
                  <span aria-hidden="true">&#9679;</span>
                  Based in Orlando, FL
                </div>
              </div>

              <RotatingRoles />
            </div>
          </div>
        </div>

        <dl className="metrics" aria-label="Professional metrics">
          <div className="metric">
            <dt>17+</dt>
            <dd>Years Experience</dd>
          </div>

          <div className="metric">
            <dt>100+</dt>
            <dd>Projects Delivered</dd>
          </div>

          <div className="metric">
            <dt>1M+</dt>
            <dd>Users Served</dd>
          </div>

          <div className="metric">
            <dt>99.4%</dt>
            <dd>Client Satisfaction</dd>
          </div>
        </dl>

        <div className="trusted">
          <p>Trusted by forward-thinking companies</p>

          <div className="trusted-logos">
            <span>BONNIER</span>

            <span className="logo-vistana">
              VISTANA
              <small>Signature Experiences</small>
            </span>

            <span>VirtuEd</span>

            <span className="logo-andor">
              ANDOR
              <small>HEALTH</small>
            </span>

            <span className="logo-bmi">
              BMI
              <small>ELITE</small>
            </span>

            <span>SyntaxSidekick</span>
          </div>
        </div>
      </div>
    </section>
  );
}
