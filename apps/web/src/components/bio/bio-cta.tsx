import { ArrowRight, Send } from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";

export function BioCTA() {
  return (
    <section className="bio-cta" aria-labelledby="bio-cta-title">
      <div className="bio-cta-panel">
        <div className="bio-cta-main">
          <div className="bio-cta-icon" aria-hidden="true">
            <Send />
          </div>

          <div className="bio-cta-content">
            <p className="eyebrow">Have a complex product challenge?</p>

            <h2 id="bio-cta-title">Let&rsquo;s Build Something Impactful</h2>

            <p>
              I&rsquo;m open to senior front-end, UX engineering, architecture,
              interactive design, consulting, and product design opportunities
              where thoughtful systems and measurable outcomes matter.
            </p>
          </div>

          <div className="bio-cta-action">
            <a className="bio-button" href=".contact">
              <span>Get In Touch</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="bio-cta-connect">
          <p>Prefer to explore my work first? Connect with me on these platforms.</p>

          <nav className="bio-cta-socials" aria-label="Professional profiles">
            <SocialMediaLinks showLabels variant="bio" />
          </nav>
        </div>
      </div>
    </section>
  );
}
