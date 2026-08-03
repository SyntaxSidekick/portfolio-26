import Link from "next/link";
import { RotatingRoles } from "./rotating-roles";
import { ArrowRight, MessageCircle, MapPin } from "lucide-react";

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

            <div className="button-group hero-actions" data-stack="mobile">
              <Link className="button button-primary" href="#featured-work">
                <span>View My Work</span>
                <ArrowRight aria-hidden="true" />
              </Link>

              <Link className="button button-secondary" href="/contact">
                <span>Let's Talk</span>
                <MessageCircle aria-hidden="true" />
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
                  <span aria-hidden="true"><MapPin aria-hidden="true" /></span>
                  Based in Orlando, FL
                </div>
              </div>

              <RotatingRoles />
            </div>
          </div>
        </div>

        <dl className="metric-list" data-variant="home" aria-label="Professional metrics">
          <div className="metric-card">
            <dt>17+</dt>
            <dd>Years Experience</dd>
          </div>

          <div className="metric-card">
            <dt>100+</dt>
            <dd>Projects Delivered</dd>
          </div>

          <div className="metric-card">
            <dt>1M+</dt>
            <dd>Users Served</dd>
          </div>

          <div className="metric-card">
            <dt>99.4%</dt>
            <dd>Client Satisfaction</dd>
          </div>
        </dl>

        <div className="trusted">
          <p>Trusted by forward-thinking companies</p>

          <div className="trusted-logos">
            <span className="trusted-logo">
              <img src="/assets/images/brands/bonnier-logo.png" alt="Bonnier" />
            </span>

            <span className="trusted-logo">
              <img src="/assets/images/brands/vistana-logo.png" alt="Vistana Signature Experiences" />
            </span>

            <span className="trusted-logo">
              <img src="/assets/images/brands/virtued-logo.png" alt="VirtuEd" />
            </span>

            <span className="trusted-logo">
              <img src="/assets/images/brands/andor-logo.png" alt="Andor Health" />
            </span>

            <span className="trusted-logo">
              <img src="/assets/images/brands/logos-BMI-Elite-1.png" alt="BMI Elite" />
            </span>

            <span className="trusted-logo">
              <img src="/assets/images/brands/syntaxsidekick-logo.png" alt="SyntaxSidekick" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
