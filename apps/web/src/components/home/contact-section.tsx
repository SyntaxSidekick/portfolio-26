import { Mail, MapPin } from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="home-contact-panel">
          <div className="home-contact-intro">
            <p className="eyebrow">Let's Build Something Great</p>

            <h2>
              I&rsquo;m currently open
              <br />
              to new opportunities.
            </h2>

            <div className="home-availability-grid">
              <ul>
                <li>Full-time roles</li>
                <li>Contract work</li>
                <li>Consulting</li>
              </ul>

              <ul>
                <li>Remote or onsite</li>
                <li>Orlando, FL</li>
                <li>Open to relocation</li>
              </ul>
            </div>
          </div>

          <div className="home-contact-details">
            <a
              className="button button-primary home-contact-button"
              href="mailto:hello@riadkilani.com"
            >
              <span>Let's Connect</span>
              <span aria-hidden="true">&rarr;</span>
            </a>

            <p>Or reach out directly</p>

            <address className="footer-address">
              <a href="mailto:hello@riadkilani.com">
                <Mail aria-hidden="true" />
                <span>hello@riadkilani.com</span>
              </a>

              <span>
                <MapPin aria-hidden="true" />
                <span>Orlando, FL</span>
              </span>
            </address>

            <div className="home-contact-socials" aria-label="Social links">
              <SocialMediaLinks variant="contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
