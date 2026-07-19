"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type SiteShellProps = Readonly<{
  children: ReactNode;
}>;

declare global {
  interface Window {
    lucide?: {
      createIcons: () => void;
    };
  }
}

const navigationItems = [
  { href: "/bio", label: "Bio" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

const pageScopes = [
  { path: "/portfolio/", page: "portfolio-single" },
  { path: "/blog/", page: "blog-single" },
  { path: "/bio", page: "bio" },
  { path: "/portfolio", page: "portfolio" },
  { path: "/blog", page: "blog" },
  { path: "/contact", page: "contact" },
  { path: "/privacy", page: "privacy" },
  { path: "/terms", page: "terms" }
] as const;

function getPageScope(pathname: string) {
  if (pathname === "/") {
    return "home";
  }

  return pageScopes.find((scope) => pathname === scope.path || pathname.startsWith(scope.path))?.page ?? "not-found";
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const nextTheme = storedTheme === "light" ? "light" : "dark";

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  useEffect(() => {
    document.body.dataset.page = getPageScope(pathname);
  }, [pathname]);

  useEffect(() => {
    const renderLucideIcons = () => window.lucide?.createIcons();

    if (window.lucide) {
      renderLucideIcons();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>("script[data-lucide-loader]");

    if (existingScript) {
      existingScript.addEventListener("load", renderLucideIcons);
      return () => existingScript.removeEventListener("load", renderLucideIcons);
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/lucide@latest/dist/umd/lucide.min.js";
    script.defer = true;
    script.dataset.lucideLoader = "true";
    script.addEventListener("load", renderLucideIcons);
    document.head.appendChild(script);

    return () => script.removeEventListener("load", renderLucideIcons);
  }, [pathname]);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 12);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const closeOnDesktopResize = () => {
      if (window.innerWidth > 1100) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktopResize);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktopResize);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="site-header">
        <div className="site-header-container">
          <Link className="site-header-logo" href="/" aria-label="Riad Kilani home">
            <img
              src="/assets/images/riad-kilani-logo.svg"
              alt="Riad Kilani, UX Engineer and Front-end Architect"
            />
          </Link>

          <nav
            className={`site-header-nav${menuOpen ? " is-open" : ""}`}
            id="site-header-nav"
            aria-label="Primary navigation"
          >
            {navigationItems.map((item) => (
              <Link
                className={pathname === item.href ? "active" : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header-actions">
            <button
              className="theme-toggle"
              id="theme-toggle"
              type="button"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={theme === "light"}
              onClick={toggleTheme}
            >
              <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-icon theme-toggle-icon-sun">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3.5" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.42 1.42" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.42" />
                  </svg>
                </span>

                <span className="theme-toggle-icon theme-toggle-icon-moon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
                  </svg>
                </span>

                <span className="theme-toggle-thumb" />
              </span>
            </button>

            <Link className="site-header-cta" href="/contact">
              <span>Let&rsquo;s Connect</span>

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m14 7 5 5-5 5" />
              </svg>
            </Link>

            <button
              className="mobile-menu-toggle"
              id="mobile-menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="site-header-nav"
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {children}

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
                <a href="https://www.linkedin.com/in/riadkilani" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M8 10v7" />
                    <path d="M8 7v.01" />
                    <path d="M12 17v-4a3 3 0 0 1 6 0v4" />
                    <path d="M12 10v7" />
                  </svg>
                </a>

                <a href="https://github.com/riadkilani" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 3.7 5.1 5.1 0 0 0 19.2 0S18 0 15 1.5a13.4 13.4 0 0 0-7 0C5 0 3.8 0 3.8 0a5.1 5.1 0 0 0-.1 3.7A5.5 5.5 0 0 0 2.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
                    <path d="M8 19c-3 .9-3-1.5-4.2-2" />
                  </svg>
                </a>

                <a href="https://codepen.io/riadkilani" target="_blank" rel="noopener noreferrer" aria-label="CodePen">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m12 2 9 6v8l-9 6-9-6V8l9-6Z" />
                    <path d="m3 8 9 6 9-6" />
                    <path d="m3 16 9-6 9 6" />
                    <path d="M12 2v8" />
                    <path d="M12 14v8" />
                  </svg>
                </a>

                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 4l16 16" />
                    <path d="M20 4 4 20" />
                  </svg>
                </a>

                <a href="mailto:hello@riadkilani.com" aria-label="Email Riad Kilani">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </a>
              </nav>
            </section>

            <nav className="footer-column" aria-labelledby="footer-navigation-title">
              <h2 id="footer-navigation-title">Navigation</h2>

              <ul>
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <span>{item.label}</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="footer-column" aria-labelledby="footer-expertise-title">
              <h2 id="footer-expertise-title">Expertise</h2>

              <ul>
                <li><Link href="/bio#front-end-engineering">Front-end Engineering</Link></li>
                <li><Link href="/bio#ux-product-design">UX &amp; Product Design</Link></li>
                <li><Link href="/bio#design-systems">Design Systems</Link></li>
                <li><Link href="/bio#accessibility">Accessibility</Link></li>
                <li><Link href="/bio#performance">Performance</Link></li>
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

                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m14 7 5 5-5 5" />
                </svg>
              </Link>
            </section>
          </div>

          <div className="footer-bottom">
            <nav className="footer-legal" aria-label="Legal links">
              <Link href="/privacy">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>

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

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 19V5" />
                <path d="m6 11 6-6 6 6" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
