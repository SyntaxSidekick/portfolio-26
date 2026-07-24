import {
  faCodepen,
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeSvg } from "@/lib/fontAwesomeIcon";
import { Mail, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-intro">
            <p className="eyebrow">Let's Build Something Great</p>

            <h2>
              I&rsquo;m currently open
              <br />
              to new opportunities.
            </h2>

            <div className="availability-grid">
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

          <div className="contact-details">
            <a
              className="button button-primary contact-button"
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

            <div className="social-links" aria-label="Social links">
              <a
                href="https://www.linkedin.com/in/riadkilani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FontAwesomeSvg icon={faLinkedin} />
              </a>
              <a
                href="https://github.com/riadkilani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FontAwesomeSvg icon={faGithub} />
              </a>
              <a
                href="https://codepen.io/riadkilani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CodePen"
              >
                <FontAwesomeSvg icon={faCodepen} />
              </a>
              <a
                href="https://x.com/riadkilani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <FontAwesomeSvg icon={faXTwitter} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
