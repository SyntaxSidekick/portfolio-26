"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { SocialMediaLinks } from "@/components/icons/SocialMediaLinks";
import { navigationItems } from "./site-navigation";

const footerNavigationItems = navigationItems.map((item) => ({
  ...item,
  label: item.href === "/blog" ? "Articles" : item.label,
}));

function isActiveFooterLink(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteFooter() {
  const pathname = usePathname();

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-container">
        <div className="footer-panel">
          <div className="footer-main">
            <div className="footer-intro">
              <Link className="footer-logo" href="/" aria-label="Riad Kilani home">
                <img
                  src="/assets/images/riad-kilani-logo.svg"
                  alt="Riad Kilani, UX Engineer and Front-end Architect"
                />
              </Link>
            </div>

            <nav className="footer-navigation" aria-label="Footer navigation">
              <ul>
                {footerNavigationItems.map((item) => {
                  const isActive = isActiveFooterLink(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        aria-current={isActive ? "page" : undefined}
                        className={isActive ? "active" : undefined}
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <nav className="footer-socials" aria-label="Social links">
              <ul className="social-media-links" data-size="lg" data-variant="footer">
                <SocialMediaLinks asListItems />
              </ul>
            </nav>
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
