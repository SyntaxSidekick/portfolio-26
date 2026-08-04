"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  BriefcaseBusiness,
  FileText,
  Mail,
  MessageCircle,
  Send,
  UserRound,
} from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";

const contactEmail = "hello@riadkilani.com";

const footerNavigationItems = [
  { href: "/bio", label: "Bio", icon: UserRound },
  { href: "/portfolio", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/blog", label: "Articles", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function SiteFooter() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-container">
        <div className="footer-panel">
          <div className="footer-main">
            <section className="footer-intro" aria-labelledby="footer-about-title">
              <Link className="footer-logo" href="/" aria-label="Riad Kilani home">
                <img
                  src="/assets/images/riad-kilani-logo.svg"
                  alt="Riad Kilani, UX Engineer and Front-end Architect"
                />
              </Link>

              <h2 className="screen-reader-text" id="footer-about-title">
                About Riad Kilani
              </h2>

              <p className="footer-description">
                I design and engineer accessible front-end systems that solve{" "}
                <span>real</span> business problems and create better user experiences.
              </p>

              <nav className="footer-socials" aria-label="Social links">
                <SocialMediaLinks size="lg" variant="footer" />
              </nav>
            </section>

            <nav className="footer-navigation" aria-labelledby="footer-navigation-title">
              <h2 id="footer-navigation-title">Navigation</h2>

              <ul>
                {footerNavigationItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <Icon aria-hidden="true" />
                        <span>{item.label}</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <section className="footer-contact" aria-labelledby="footer-contact-title">
              <div className="footer-contact-icon" aria-hidden="true">
                <MessageCircle />
              </div>

              <h2 id="footer-contact-title">
                Let&rsquo;s build something <span>great</span> together.
              </h2>

              <p>Available for remote, hybrid, and consulting opportunities.</p>

              <Link className="button button-primary footer-cta" href="/contact">
                <span>Let&rsquo;s Connect</span>
                <ArrowRight aria-hidden="true" />
              </Link>

              <a className="footer-email" href={`mailto:${contactEmail}`}>
                <Send aria-hidden="true" />
                <span>{contactEmail}</span>
              </a>
            </section>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; <span>{new Date().getFullYear()}</span> Riad Kilani. All rights reserved.
            </p>

            <div className="footer-bottom-actions">
              <nav className="footer-legal" aria-label="Legal links">
                <Link href="/privacy">Privacy Policy</Link>

                <span className="footer-legal-divider" aria-hidden="true" />

                <Link href="/terms">Terms of Use</Link>
              </nav>

              <button
                aria-label="Back to top"
                className="back-to-top"
                id="back-to-top"
                type="button"
                onClick={scrollToTop}
              >
                <ArrowUp aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
