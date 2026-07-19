document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#site-header");
  const navigation = document.querySelector("#site-header-nav");
  const menuToggle = document.querySelector("#mobile-menu-toggle");
  const themeToggle = document.querySelector("#theme-toggle");
  const navigationLinks = document.querySelectorAll(
    "#site-header-nav a"
  );

  if (!header || !navigation || !menuToggle || !themeToggle) {
    return;
  }

  const storageKey = "riad-kilani-theme";

  function openMenu() {
    navigation.classList.add("is-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  }

  function closeMenu() {
    navigation.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  function toggleMenu() {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function applyTheme(theme) {
    const normalizedTheme =
      theme === "light" ? "light" : "dark";

    const isLight = normalizedTheme === "light";

    document.documentElement.setAttribute(
      "data-theme",
      normalizedTheme
    );

    themeToggle.setAttribute(
      "aria-pressed",
      String(isLight)
    );

    themeToggle.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark theme"
        : "Switch to light theme"
    );

    try {
      localStorage.setItem(storageKey, normalizedTheme);
    } catch (error) {
      console.warn("Theme preference could not be saved.", error);
    }
  }

  function getInitialTheme() {
    try {
      const savedTheme = localStorage.getItem(storageKey);

      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    } catch (error) {
      console.warn("Theme preference could not be read.", error);
    }

    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    return prefersLight ? "light" : "dark";
  }

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") ||
      "dark";

    const nextTheme =
      currentTheme === "light" ? "dark" : "light";

    applyTheme(nextTheme);
  }

  function updateScrolledHeader() {
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 20
    );
  }

  function updateActiveNavigation() {
    const currentPath =
      window.location.pathname.replace(/\/+$/, "") || "/";

    navigationLinks.forEach((link) => {
      const linkUrl = new URL(
        link.getAttribute("href"),
        window.location.origin
      );

      const linkPath =
        linkUrl.pathname.replace(/\/+$/, "") || "/";

      const isActive =
        currentPath === linkPath ||
        (
          linkPath !== "/" &&
          currentPath.startsWith(`${linkPath}/`)
        );

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  menuToggle.addEventListener("click", toggleMenu);
  themeToggle.addEventListener("click", toggleTheme);

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedInsideHeader = header.contains(event.target);

    if (!clickedInsideHeader) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    const menuWasOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    closeMenu();

    if (menuWasOpen) {
      menuToggle.focus();
    }
  });

  window.addEventListener(
    "scroll",
    updateScrolledHeader,
    { passive: true }
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      closeMenu();
    }
  });

  applyTheme(getInitialTheme());
  updateActiveNavigation();
  updateScrolledHeader();
});