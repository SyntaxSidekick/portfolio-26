(() => {
  const portfolioPage = document.querySelector("#portfolio-page");

  if (!portfolioPage) {
    return;
  }

  const filterButtons = [
    ...portfolioPage.querySelectorAll(".portfolio-filter"),
  ];

  const projectCards = [
    ...portfolioPage.querySelectorAll(".project-card"),
  ];

  const resultsStatus = portfolioPage.querySelector(
    ".portfolio-results-status"
  );

  const emptyState = portfolioPage.querySelector(
    ".portfolio-empty-state"
  );

  const categoryNames = {
    all: "all projects",
    web: "web application projects",
    systems: "design system projects",
    design: "UI and UX design projects",
    tools: "tools and utility projects",
  };

  function getProjectCategories(card) {
    return (card.dataset.category || "")
      .split(/\s+/)
      .filter(Boolean);
  }

  function updateProjects(selectedFilter) {
    let visibleProjects = 0;

    projectCards.forEach((card, index) => {
      const categories = getProjectCategories(card);

      const shouldShow =
        selectedFilter === "all" ||
        categories.includes(selectedFilter);

      card.classList.remove("is-filtering-in");

      if (shouldShow) {
        card.classList.remove("is-filtered-out");

        window.setTimeout(() => {
          card.classList.add("is-filtering-in");
        }, index * 35);

        visibleProjects += 1;
      } else {
        card.classList.add("is-filtered-out");
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleProjects > 0;
    }

    if (resultsStatus) {
      const projectLabel =
        visibleProjects === 1 ? "project" : "projects";

      resultsStatus.textContent =
        selectedFilter === "all"
          ? `Showing all ${visibleProjects} ${projectLabel}`
          : `Showing ${visibleProjects} ${
              categoryNames[selectedFilter] || "projects"
            }`;
    }
  }

  function activateFilter(selectedButton) {
    const selectedFilter =
      selectedButton.dataset.filter || "all";

    filterButtons.forEach((button) => {
      const isSelected = button === selectedButton;

      button.classList.toggle("is-active", isSelected);
      button.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });

    updateProjects(selectedFilter);

    const activeCard = projectCards.find(
      (card) =>
        !card.classList.contains("is-filtered-out")
    );

    if (activeCard) {
      activeCard.setAttribute("tabindex", "-1");
    }
  }

  filterButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      activateFilter(button);
    });

    button.addEventListener("keydown", (event) => {
      const supportedKeys = [
        "ArrowRight",
        "ArrowLeft",
        "Home",
        "End",
      ];

      if (!supportedKeys.includes(event.key)) {
        return;
      }

      event.preventDefault();

      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % filterButtons.length;
      }

      if (event.key === "ArrowLeft") {
        nextIndex =
          (index - 1 + filterButtons.length) %
          filterButtons.length;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      }

      if (event.key === "End") {
        nextIndex = filterButtons.length - 1;
      }

      const nextButton = filterButtons[nextIndex];

      nextButton.focus();
      activateFilter(nextButton);

      nextButton.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "nearest",
        inline: "center",
      });
    });
  });

  updateProjects("all");
})();