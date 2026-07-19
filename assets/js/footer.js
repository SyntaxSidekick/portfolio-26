document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("#site-footer");
  const yearElement = document.querySelector("#footer-year");
  const backToTopButton = document.querySelector("#back-to-top");

  if (!footer) {
    return;
  }

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }
});