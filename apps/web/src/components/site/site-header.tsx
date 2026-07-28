"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { navigationItems } from "./site-navigation";

export function SiteHeader() {
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

  return (
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
                <Sun aria-hidden="true" />
              </span>

              <span className="theme-toggle-icon theme-toggle-icon-moon">
                <Moon aria-hidden="true" />
              </span>

              <span className="theme-toggle-thumb" />
            </span>
          </button>

          <Link className="site-header-cta" href="/contact">
            <span>Let&rsquo;s Connect</span>

            <ArrowRight aria-hidden="true" />
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
  );
}
