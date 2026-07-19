(() => {
  const page = document.querySelector("#project-single-page");

  if (!page) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const internalLinks = [
    ...page.querySelectorAll('a[href^="#"]')
  ];

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetSelector = link.getAttribute("href");

      if (!targetSelector || targetSelector === "#") {
        return;
      }

      const target = page.querySelector(targetSelector);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: reducedMotion.matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    });
  });

  const revealItems = [
    ...page.querySelectorAll(
      ".metrics-grid, .panel, .cta-panel"
    )
  ];

  if (
    reducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  revealItems.forEach((item) => {
    item.classList.add("reveal-item");
  });

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px"
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
})();