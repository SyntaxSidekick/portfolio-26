"use client";

import Link from "next/link";
import { navigationItems } from "./site-navigation";
import { ArrowRight, ArrowUp, ChevronRight, ShieldCheck } from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";

export function SiteFooter() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-container">
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
              I design and engineer accessible, high-performance digital experiences that solve problems,
              drive results, and make an impact.
            </p>

            <nav className="footer-socials" aria-label="Social links">
              <SocialMediaLinks size="lg" variant="footer" />
            </nav>
          </section>

          <nav className="footer-column" aria-labelledby="footer-navigation-title">
            <h2 id="footer-navigation-title">Navigation</h2>

            <ul>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span>{item.label}</span>
                    <ChevronRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-column" aria-labelledby="footer-expertise-title">
            <h2 id="footer-expertise-title">Expertise</h2>

            <ul>
              <li><Link href="/bio.front-end-engineering">Front-end Engineering</Link></li>
              <li><Link href="/bio.ux-product-design">UX &amp; Product Design</Link></li>
              <li><Link href="/bio.design-systems">Design Systems</Link></li>
              <li><Link href="/bio.accessibility">Accessibility</Link></li>
              <li><Link href="/bio.performance">Performance</Link></li>
            </ul>
          </nav>

          <nav className="footer-column" aria-labelledby="footer-resources-title">
            <h2 id="footer-resources-title">Resources</h2>

            <ul>
              <li><Link href="/portfolio">Case Studies</Link></li>
              <li><Link href="/blog">Articles</Link></li>
              <li><Link href="/blog">Guides</Link></li>
              <li><Link href="/blog">Resources</Link></li>
            </ul>
          </nav>

          <section className="footer-contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Let&rsquo;s Connect</h2>

            <p>Have a project or opportunity in mind? I&rsquo;d love to hear from you.</p>

            <Link className="footer-cta" href="/contact">
              <span>Start a Conversation</span>

              <ArrowRight aria-hidden="true" />
            </Link>
          </section>
        </div>

        <div className="footer-bottom">
          <nav className="footer-legal" aria-label="Legal links">
            <Link href="/privacy">
              <ShieldCheck aria-hidden="true" />

              <span>Privacy Policy</span>
            </Link>

            <span className="footer-legal-divider" aria-hidden="true" />

            <Link href="/terms">Terms of Use</Link>
          </nav>

          <p className="footer-copyright">
            &copy; <span>{new Date().getFullYear()}</span> Riad Kilani. All rights reserved.
          </p>

          <button className="back-to-top" id="back-to-top" type="button" onClick={scrollToTop}>
            <span>Back to Top</span>

            <ArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
