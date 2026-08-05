import type { Metadata } from "next";
import "@/styles/pages/bio/index.css";
import "@/styles/pages/bio/bio-intro.css";
import "@/styles/pages/bio/career-journey.css";
import "@/styles/pages/bio/bio-process.css";
import { BioIntro } from "@/components/bio/bio-intro";
import { CareerJourneySection } from "@/components/bio/career-journey-section";
import { CoreCapabilitiesSection } from "@/components/bio/core-capabilities-section";
import { BioProcess } from "@/components/bio/bio-process";
import {
  Accessibility,
  ArrowRight,
  Gauge,
  Layers3,
  Rocket,
  Send,
  TrendingUp,
} from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";

export const metadata: Metadata = {
  title: "About Riad Kilani | UX Engineer & Front-End Architect",
  description:
    "Learn about Riad Kilani's experience in front-end architecture, UX engineering, design systems, accessibility, and performance."
};

function BioPageContent() {
  return (
    <main id="bio-page" className="page bio">
      <div className="bio-container">
        <BioIntro />

        <CareerJourneySection />

        <BioProcess />

        <div className="skills-achievements-layout">
          <CoreCapabilitiesSection />

          <aside
            className="achievements-section"
            aria-labelledby="achievements-heading"
          >
            <header className="section-heading">
              <p className="eyebrow">Measured impact</p>
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
                    reduced development cycles by 40&ndash;60% across multi-team
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
            <p className="eyebrow">Have a complex product challenge?</p>

            <h2 id="cta-heading">Let&rsquo;s Build Something Impactful</h2>

            <p>
              I&rsquo;m open to senior front-end, UX engineering, architecture,
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
            <h2 id="connect-heading">Let&rsquo;s Connect</h2>

            <p>
              Explore my work, follow what I&rsquo;m building, or reach out to
              discuss an opportunity.
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
