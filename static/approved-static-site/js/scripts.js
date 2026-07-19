/* =========================================================
   SHARED HEADER, NAVIGATION, AND THEME
   ========================================================= */

function initSharedHeaderNavigationAndTheme() {
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
}

/* =========================================================
   HOME
   Original source: root page.js
   ========================================================= */

function initHome() {
  if (!document.body.matches('[data-page="home"]')) {
    return;
  }

const roleButtons = Array.from(document.querySelectorAll(".role-item"));

let activeRoleIndex = roleButtons.findIndex((button) =>
  button.classList.contains("is-active")
);

let roleRotationTimer;

function activateRole(index) {
  roleButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  activeRoleIndex = index;
}

function showNextRole() {
  const nextIndex = (activeRoleIndex + 1) % roleButtons.length;
  activateRole(nextIndex);
}

function startRoleRotation() {
  window.clearInterval(roleRotationTimer);

  roleRotationTimer = window.setInterval(showNextRole, 3500);
}

roleButtons.forEach((button, index) => {
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("is-active"))
  );

  button.addEventListener("click", () => {
    activateRole(index);
    startRoleRotation();
  });
});

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reduceMotion && roleButtons.length > 1) {
  startRoleRotation();
}
}


/* =========================================================
   BIO
   Original source: bio/page.js
   ========================================================= */

function initBio() {
  if (!document.body.matches('[data-page="bio"]')) {
    return;
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}


/* =========================================================
   PORTFOLIO INDEX
   Original source: portfolio/page.js
   ========================================================= */

function initPortfolio() {
  if (!document.body.matches('[data-page="portfolio"]')) {
    return;
  }

(() => {
  const page = document.querySelector("#portfolio-page");
  if (!page) return;

  const filters = [...page.querySelectorAll(".category-filter")];
  const cards = [...page.querySelectorAll("[data-category]")];
  const sections = [...page.querySelectorAll("[data-source-section]")];
  const sourceLinks = [...page.querySelectorAll(".portfolio-source-nav a")];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function getCategories(card) {
    return (card.dataset.category || "")
      .split(/\s+/)
      .filter(Boolean);
  }

  function applyFilter(filter) {
    const category = filter.dataset.category || "all";

    filters.forEach((button) => {
      const active = button === filter;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active);
    });

    cards.forEach((card) => {
      const visible =
        category === "all" ||
        getCategories(card).includes(category);

      card.classList.toggle(
        "is-filtered-out",
        !visible
      );
    });

    sections.forEach((section) => {
      const visibleCards = [
        ...section.querySelectorAll("[data-category]")
      ].some(
        (card) =>
          !card.classList.contains("is-filtered-out")
      );

      section.hidden = !visibleCards;
    });
  }

  filters.forEach((button, index) => {
    button.addEventListener("click", () => {
      applyFilter(button);
    });

    button.addEventListener("keydown", (event) => {
      if (
        ![
          "ArrowRight",
          "ArrowLeft",
          "Home",
          "End"
        ].includes(event.key)
      ) {
        return;
      }

      event.preventDefault();

      let next = index;

      switch (event.key) {
        case "ArrowRight":
          next = (index + 1) % filters.length;
          break;

        case "ArrowLeft":
          next =
            (index - 1 + filters.length) %
            filters.length;
          break;

        case "Home":
          next = 0;
          break;

        case "End":
          next = filters.length - 1;
          break;
      }

      filters[next].focus();
      applyFilter(filters[next]);
    });
  });

  sourceLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reduceMotion.matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    });
  });

  applyFilter(filters[0]);
})();
}


/* =========================================================
   PORTFOLIO SINGLE
   Original source: portfolio/project/page.js
   ========================================================= */

function initPortfolioSingle() {
  if (!document.body.matches('[data-page="portfolio-single"]')) {
    return;
  }

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
}


/* =========================================================
   BLOG INDEX
   Original source: blog/page.js
   ========================================================= */

function initBlog() {
  if (!document.body.matches('[data-page="blog"]')) {
    return;
  }

const blogPosts = [
  {
    id: 1,
    title:
      "Native CSS Is Quietly Replacing Sass, but It Isn’t Replacing the Need for Sass",
    excerpt:
      "Native CSS is evolving faster than ever with nesting, variables, and @scope. Here’s what that means for your workflow, projects, and the future of Sass.",
    image:
      "https://placehold.co/1200x675/061525/45a7ff?text=Native+CSS+vs+Sass",
    url: "blog-single.html",
    date: "2025-06-18",
    readingTime: 8,
    type: "article",
    tags: ["CSS", "Sass", "Web Development", "Front-End"],
    featured: true
  },
  {
    id: 2,
    title: "TypeScript From the Ground Up, Day 3",
    excerpt:
      "Arrays, tuples, and custom types. Level up your TypeScript skills with practical examples.",
    image:
      "https://placehold.co/800x450/071529/4db4ff?text=TypeScript+Day+3",
    url: "blog-single.html",
    date: "2025-06-16",
    readingTime: 6,
    type: "tutorial",
    tags: ["TypeScript", "Tutorial", "JavaScript"]
  },
  {
    id: 3,
    title: "2026 CSS Features You Must Know",
    excerpt:
      "Container queries, style queries, and more. Explore the latest CSS features changing the game.",
    image:
      "https://placehold.co/800x450/132038/f6a83b?text=2026+CSS+Features",
    url: "blog-single.html",
    date: "2025-06-15",
    readingTime: 7,
    type: "article",
    tags: ["CSS", "Web Development", "Front-End"]
  },
  {
    id: 4,
    title: "60 JavaScript Projects in 60 Days",
    excerpt:
      "Build your JavaScript skills by building real-world projects. One project a day to mastery.",
    image:
      "https://placehold.co/800x450/1a1232/fbcf34?text=60+JavaScript+Projects",
    url: "blog-single.html",
    date: "2025-06-12",
    readingTime: 5,
    type: "tutorial",
    tags: ["JavaScript", "Projects", "Beginner"]
  },
  {
    id: 5,
    title: "JavaScript vs TypeScript: What Actually Changes",
    excerpt:
      "A practical comparison of JavaScript and TypeScript. See what really changes under the hood.",
    image:
      "https://placehold.co/800x450/071a31/58aaff?text=JavaScript+vs+TypeScript",
    url: "blog-single.html",
    date: "2025-06-10",
    readingTime: 6,
    type: "article",
    tags: ["JavaScript", "TypeScript", "Comparison"]
  },
  {
    id: 6,
    title: "TypeScript Basics for Beginners",
    excerpt:
      "Start your TypeScript journey the right way. Types, interfaces, and real examples.",
    image:
      "https://placehold.co/800x450/061629/56aaff?text=TypeScript+Basics",
    url: "blog-single.html",
    date: "2025-06-09",
    readingTime: 8,
    type: "tutorial",
    tags: ["TypeScript", "Tutorial", "Beginner"]
  },
  {
    id: 7,
    title: "Learn TypeScript in 10 Minutes",
    excerpt:
      "Get productive with TypeScript fast. Essential concepts explained in plain English.",
    image:
      "https://placehold.co/800x450/4a21c9/ffffff?text=Learn+TypeScript+in+10+Minutes",
    url: "blog-single.html",
    date: "2025-06-07",
    readingTime: 4,
    type: "guide",
    tags: ["TypeScript", "Tutorial", "JavaScript"]
  },
  {
    id: 8,
    title: "Why Great UX Feels Invisible",
    excerpt:
      "The invisible work behind seamless experiences. Principles of great UX design.",
    image:
      "https://placehold.co/800x450/e9f7ff/4aa8d8?text=Invisible+UX",
    url: "blog-single.html",
    date: "2025-06-03",
    readingTime: 5,
    type: "opinion",
    tags: ["Design", "UX", "User Experience"]
  },
  {
    id: 9,
    title: "Web Accessibility: A Complete Guide to Inclusive Websites",
    excerpt:
      "Make your websites accessible to everyone. Practical tips and best practices.",
    image:
      "https://placehold.co/800x450/249dd1/ffffff?text=Web+Accessibility",
    url: "blog-single.html",
    date: "2025-06-01",
    readingTime: 7,
    type: "guide",
    tags: ["Accessibility", "Guide", "Web Development"]
  },
  {
    id: 10,
    title:
      "How Material Design Motion Improves Perceived Performance in React Apps",
    excerpt:
      "Use motion to keep users engaged and improve perceived speed in your React applications.",
    image:
      "https://placehold.co/800x450/3030ae/49e0ef?text=Material+Motion",
    url: "blog-single.html",
    date: "2025-05-30",
    readingTime: 6,
    type: "article",
    tags: ["React", "Design", "Performance"]
  },
  {
    id: 11,
    title: "Building an Accessible Navigation System",
    excerpt:
      "Create menus that work with keyboards, screen readers, touch devices, and reduced motion.",
    image:
      "https://placehold.co/800x450/08192c/53baff?text=Accessible+Navigation",
    url: "blog-single.html",
    date: "2025-05-27",
    readingTime: 9,
    type: "tutorial",
    tags: ["Accessibility", "Navigation", "JavaScript"]
  },
  {
    id: 12,
    title: "The State of Front-End Development",
    excerpt:
      "A look at the tools, standards, and browser capabilities shaping modern front-end work.",
    image:
      "https://placehold.co/800x450/071526/5ac0ff?text=Front-End+Development",
    url: "blog-single.html",
    date: "2025-05-22",
    readingTime: 7,
    type: "news",
    tags: ["Front-End", "News", "Web Development"]
  },
  {
    id: 13,
    title: "Design Systems That Developers Actually Use",
    excerpt:
      "How to create a design system that stays useful, maintainable, and connected to production.",
    image:
      "https://placehold.co/800x450/101a2c/a788ff?text=Design+Systems",
    url: "blog-single.html",
    date: "2025-05-19",
    readingTime: 10,
    type: "guide",
    tags: ["Design Systems", "React", "CSS"]
  },
  {
    id: 14,
    title: "Stop Treating Accessibility as a Final Checklist",
    excerpt:
      "Accessibility works best when it is integrated into design, architecture, and development.",
    image:
      "https://placehold.co/800x450/092135/5bc0ff?text=Accessibility+First",
    url: "blog-single.html",
    date: "2025-05-15",
    readingTime: 6,
    type: "opinion",
    tags: ["Accessibility", "UX", "Development"]
  },
  {
    id: 15,
    title: "Modern CSS Layout Patterns",
    excerpt:
      "Practical Grid and Flexbox patterns for responsive, resilient application layouts.",
    image:
      "https://placehold.co/800x450/07172a/43b9ff?text=Modern+CSS+Layouts",
    url: "blog-single.html",
    date: "2025-05-11",
    readingTime: 8,
    type: "tutorial",
    tags: ["CSS", "Layout", "Responsive Design"]
  },
  {
    id: 16,
    title: "AI-Assisted Development Without Losing Control",
    excerpt:
      "Use AI tools to accelerate development while keeping architecture and quality in your hands.",
    image:
      "https://placehold.co/800x450/121839/6e96ff?text=AI-Assisted+Development",
    url: "blog-single.html",
    date: "2025-05-08",
    readingTime: 9,
    type: "article",
    tags: ["AI", "Development", "Workflow"]
  },
  {
    id: 17,
    title: "Core Web Vitals for Real Applications",
    excerpt:
      "Move beyond perfect demos and improve performance in content-heavy production applications.",
    image:
      "https://placehold.co/800x450/06202a/4bd3b8?text=Core+Web+Vitals",
    url: "blog-single.html",
    date: "2025-05-04",
    readingTime: 8,
    type: "guide",
    tags: ["Performance", "Core Web Vitals", "SEO"]
  },
  {
    id: 18,
    title: "What Changed in React This Month",
    excerpt:
      "A practical overview of recent React changes and what they mean for production teams.",
    image:
      "https://placehold.co/800x450/07182b/61dafb?text=React+News",
    url: "blog-single.html",
    date: "2025-05-01",
    readingTime: 5,
    type: "news",
    tags: ["React", "News", "JavaScript"]
  },
  {
    id: 19,
    title: "Semantic HTML Is Still a Competitive Advantage",
    excerpt:
      "Better structure improves accessibility, SEO, maintainability, and long-term resilience.",
    image:
      "https://placehold.co/800x450/17202b/f06529?text=Semantic+HTML",
    url: "blog-single.html",
    date: "2025-04-28",
    readingTime: 6,
    type: "article",
    tags: ["HTML", "Accessibility", "SEO"]
  }
];

const state = {
  filter: "all",
  search: "",
  sort: "latest",
  page: 1,
  postsPerPage: 9
};

const featuredPostContainer = document.querySelector(
  "#featured-post, .featured-post"
);
const articleGrid = document.querySelector("#article-grid");
const pagination = document.querySelector("#blog-pagination");
const emptyState = document.querySelector("#empty-state");
const statusMessage = document.querySelector("#blog-status");

const filterButtons = document.querySelectorAll(".blog-filter");
const searchInput = document.querySelector("#blog-search-input");
const sortSelect = document.querySelector("#blog-sort-select");
const resetButton = document.querySelector("#reset-filters");

const newsletterForm = document.querySelector("#newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterMessage = document.querySelector("#newsletter-message");

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${dateString}T12:00:00`));
}

function createTags(tags) {
  return tags
    .map(
      (tag) => `
        <span class="article-tag">${tag}</span>
      `
    )
    .join("");
}

function renderFeaturedPost() {
  const featuredPost = blogPosts.find((post) => post.featured);

  if (!featuredPostContainer) {
    return;
  }

  if (!featuredPost) {
    featuredPostContainer.hidden = true;
    return;
  }

  featuredPostContainer.hidden = false;

  featuredPostContainer.innerHTML = `
    <div class="featured-post-media">
      <span class="featured-label">Featured</span>

      <img
        class="featured-post-image"
        src="${featuredPost.image}"
        alt=""
        width="1200"
        height="675"
      />
    </div>

    <div class="featured-post-content">
      <p class="article-meta">
        <span>${formatDate(featuredPost.date)}</span>
        <span>${featuredPost.readingTime} min read</span>
      </p>

      <h2 id="featured-post-title">
        <a href="${featuredPost.url}">
          ${featuredPost.title}
        </a>
      </h2>

      <p class="featured-post-description">
        ${featuredPost.excerpt}
      </p>

      <div class="featured-post-footer">
        <div class="article-tags" aria-label="Article topics">
          ${createTags(featuredPost.tags)}
        </div>

        <a class="article-link" href="${featuredPost.url}">
          Read More
        </a>
      </div>
    </div>
  `;
}

function createArticleCard(post) {
  const article = document.createElement("article");
  article.className = "article-card";

  article.innerHTML = `
    <a
      class="article-card-media"
      href="${post.url}"
      aria-label="Read ${post.title}"
    >
      <img
        class="article-card-image"
        src="${post.image}"
        alt=""
        width="800"
        height="450"
        loading="lazy"
      />
    </a>

    <div class="article-card-content">
      <p class="article-meta">
        <span>${formatDate(post.date)}</span>
        <span>${post.readingTime} min read</span>
      </p>

      <h3>
        <a href="${post.url}">
          ${post.title}
        </a>
      </h3>

      <p class="article-card-description">
        ${post.excerpt}
      </p>

      <div class="article-tags" aria-label="Article topics">
        ${createTags(post.tags)}
      </div>
    </div>
  `;

  return article;
}

function getFilteredPosts() {
  const normalizedSearch = state.search.trim().toLowerCase();

  let posts = blogPosts.filter((post) => !post.featured);

  if (state.filter !== "all") {
    posts = posts.filter((post) => post.type === state.filter);
  }

  if (normalizedSearch) {
    posts = posts.filter((post) => {
      const searchableText = [
        post.title,
        post.excerpt,
        post.type,
        ...post.tags
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }

  posts.sort((firstPost, secondPost) => {
    switch (state.sort) {
      case "oldest":
        return new Date(firstPost.date) - new Date(secondPost.date);

      case "title":
        return firstPost.title.localeCompare(secondPost.title);

      case "reading-time":
        return firstPost.readingTime - secondPost.readingTime;

      case "latest":
      default:
        return new Date(secondPost.date) - new Date(firstPost.date);
    }
  });

  return posts;
}

function renderPagination(totalPosts) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalPosts / state.postsPerPage);

  if (totalPages <= 1) {
    pagination.hidden = true;
    return;
  }

  pagination.hidden = false;

  const previousButton = createPaginationButton(
    "‹ Prev",
    state.page - 1,
    state.page === 1
  );

  pagination.append(previousButton);

  const pageNumbers = getPaginationRange(totalPages);

  pageNumbers.forEach((pageNumber) => {
    if (pageNumber === "...") {
      const ellipsis = document.createElement("span");
      ellipsis.className = "pagination-button";
      ellipsis.textContent = "...";
      ellipsis.setAttribute("aria-hidden", "true");
      pagination.append(ellipsis);
      return;
    }

    const pageButton = createPaginationButton(
      String(pageNumber),
      pageNumber,
      false,
      pageNumber === state.page
    );

    pagination.append(pageButton);
  });

  const nextButton = createPaginationButton(
    "Next ›",
    state.page + 1,
    state.page === totalPages
  );

  pagination.append(nextButton);
}

function getPaginationRange(totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (state.page <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (state.page >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    ];
  }

  return [
    1,
    "...",
    state.page - 1,
    state.page,
    state.page + 1,
    "...",
    totalPages
  ];
}

function createPaginationButton(
  label,
  page,
  disabled = false,
  isCurrent = false
) {
  const button = document.createElement("button");

  button.className = "pagination-button";
  button.type = "button";
  button.textContent = label;
  button.disabled = disabled;

  if (isCurrent) {
    button.classList.add("is-current");
    button.setAttribute("aria-current", "page");
  }

  button.addEventListener("click", () => {
    state.page = page;
    renderArticles();

    document
      .querySelector(".articles-section")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });

  return button;
}

function renderArticles() {
  const filteredPosts = getFilteredPosts();

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / state.postsPerPage)
  );

  if (state.page > totalPages) {
    state.page = totalPages;
  }

  const startIndex = (state.page - 1) * state.postsPerPage;
  const visiblePosts = filteredPosts.slice(
    startIndex,
    startIndex + state.postsPerPage
  );

  articleGrid.innerHTML = "";

  visiblePosts.forEach((post) => {
    articleGrid.append(createArticleCard(post));
  });

  const hasResults = filteredPosts.length > 0;

  articleGrid.hidden = !hasResults;
  emptyState.hidden = hasResults;

  renderPagination(filteredPosts.length);

  const resultText =
    filteredPosts.length === 1
      ? "1 article found."
      : `${filteredPosts.length} articles found.`;

  statusMessage.textContent = resultText;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    state.page = 1;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    renderArticles();
  });
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  state.page = 1;
  renderArticles();
});

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  state.page = 1;
  renderArticles();
});

resetButton.addEventListener("click", () => {
  state.filter = "all";
  state.search = "";
  state.sort = "latest";
  state.page = 1;

  searchInput.value = "";
  sortSelect.value = "latest";

  filterButtons.forEach((button) => {
    const isAllButton = button.dataset.filter === "all";

    button.classList.toggle("is-active", isAllButton);
    button.setAttribute("aria-pressed", String(isAllButton));
  });

  renderArticles();
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = newsletterEmail.value.trim();

  if (!email || !newsletterEmail.validity.valid) {
    newsletterMessage.textContent =
      "Please enter a valid email address.";

    newsletterEmail.focus();
    return;
  }

  newsletterMessage.textContent =
    "Thanks for subscribing. Watch your inbox for the next issue.";

  newsletterForm.reset();
});

renderFeaturedPost();
renderArticles();
}


/* =========================================================
   BLOG SINGLE
   Original source: blog/article/page.js
   ========================================================= */

function initBlogSingle() {
  if (!document.body.matches('[data-page="blog-single"]')) {
    return;
  }

const article = document.querySelector("#blog-article");
const articleProgressBar = document.querySelector(
  "#article-reading-progress"
);
const fixedProgressBar = document.querySelector(
  "#fixed-reading-progress"
);
const readingValue = document.querySelector(
  "#article-reading-value"
);
const progressTrack = document.querySelector(".progress-track");

const tableOfContents = document.querySelector(
  ".article-table-of-contents"
);
const mobileTocButton = document.querySelector(
  ".mobile-toc-button"
);
const mobileTocIcon = document.querySelector(
  ".mobile-toc-icon"
);

const articleSections = [
  ...document.querySelectorAll(".article-section[id]")
];

const tocLinks = [
  ...document.querySelectorAll(
    ".article-table-of-contents a, .sidebar-toc a"
  )
];

const toast = document.querySelector("#toast-message");

let toastTimer;

/* Reading progress */

function updateReadingProgress() {
  if (!article) {
    return;
  }

  const articleTop =
    article.getBoundingClientRect().top + window.scrollY;

  const articleHeight = article.offsetHeight;
  const viewportHeight = window.innerHeight;
  const scrollPosition = window.scrollY;

  const readableDistance = Math.max(
    articleHeight - viewportHeight,
    1
  );

  const rawProgress =
    (scrollPosition - articleTop) / readableDistance;

  const progress = Math.min(
    Math.max(rawProgress, 0),
    1
  );

  const percentage = Math.round(progress * 100);

  articleProgressBar.style.width = `${percentage}%`;
  fixedProgressBar.style.width = `${percentage}%`;
  readingValue.textContent = `${percentage}%`;

  progressTrack.setAttribute(
    "aria-valuenow",
    String(percentage)
  );
}

/* Active table of contents link */

function updateActiveTableOfContents() {
  const offset = 160;
  let activeSectionId = articleSections[0]?.id || "";

  articleSections.forEach((section) => {
    const sectionTop =
      section.getBoundingClientRect().top;

    if (sectionTop <= offset) {
      activeSectionId = section.id;
    }
  });

  tocLinks.forEach((link) => {
    const targetId = link
      .getAttribute("href")
      ?.replace("#", "");

    link.classList.toggle(
      "is-active",
      targetId === activeSectionId
    );
  });
}

/* Mobile table of contents */

function updateMobileTocState() {
  if (window.innerWidth > 960) {
    tableOfContents.classList.add("is-open");
    mobileTocButton.setAttribute("aria-expanded", "true");
    mobileTocIcon.textContent = "−";
    return;
  }

  tableOfContents.classList.remove("is-open");
  mobileTocButton.setAttribute("aria-expanded", "false");
  mobileTocIcon.textContent = "+";
}

mobileTocButton?.addEventListener("click", () => {
  const isOpen =
    mobileTocButton.getAttribute("aria-expanded") ===
    "true";

  mobileTocButton.setAttribute(
    "aria-expanded",
    String(!isOpen)
  );

  tableOfContents.classList.toggle("is-open", !isOpen);
  mobileTocIcon.textContent = isOpen ? "+" : "−";
});

tableOfContents
  ?.querySelectorAll("a")
  .forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 960) {
        tableOfContents.classList.remove("is-open");

        mobileTocButton.setAttribute(
          "aria-expanded",
          "false"
        );

        mobileTocIcon.textContent = "+";
      }
    });
  });

/* Toast */

function showToast(message) {
  if (!toast) {
    return;
  }

  window.clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("is-visible");

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

/* Copy article URL */

document
  .querySelector(".copy-article-link")
  ?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      showToast("Article link copied.");
    } catch {
      showToast("Unable to copy the article link.");
    }
  });

/* Social sharing */

document
  .querySelectorAll(".share-button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const platform = button.dataset.platform;
      const pageUrl = encodeURIComponent(
        window.location.href
      );

      const pageTitle = encodeURIComponent(
        document.title ||
          "Native CSS Is Quietly Replacing Sass"
      );

      let shareUrl = "";

      if (platform === "x") {
        shareUrl =
          `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
      }

      if (platform === "linkedin") {
        shareUrl =
          `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
      }

      if (shareUrl) {
        window.open(
          shareUrl,
          "_blank",
          "noopener,noreferrer,width=720,height=520"
        );
      }
    });
  });

/* Copy code buttons */

document
  .querySelectorAll(".copy-code-button")
  .forEach((button) => {
    button.addEventListener("click", async () => {
      const codeBlock =
        button.closest(".code-block");

      const code =
        codeBlock?.querySelector("code")?.innerText;

      if (!code) {
        return;
      }

      const originalText = button.textContent;

      try {
        await navigator.clipboard.writeText(code);

        button.textContent = "Copied";
        showToast("Code copied.");

        window.setTimeout(() => {
          button.textContent = originalText;
        }, 1800);
      } catch {
        button.textContent = "Failed";

        window.setTimeout(() => {
          button.textContent = originalText;
        }, 1800);
      }
    });
  });

/* Helpful feedback */

const feedbackButtons = [
  ...document.querySelectorAll(".feedback-button")
];

const feedbackMessage = document.querySelector(
  ".feedback-message"
);

feedbackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    feedbackButtons.forEach((item) => {
      item.classList.remove("is-selected");
    });

    button.classList.add("is-selected");

    const feedbackType = button.dataset.feedback;

    feedbackMessage.textContent =
      feedbackType === "helpful"
        ? "Thank you for the feedback."
        : "Thank you. We will improve it.";
  });
});

/* Newsletter */

const newsletterInput = document.querySelector(
  "#newsletter-email"
);

const newsletterButton = document.querySelector(
  "#newsletter-submit"
);

const newsletterMessage = document.querySelector(
  ".newsletter-message"
);

function submitNewsletter() {
  const email = newsletterInput.value.trim();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    newsletterMessage.textContent =
      "Enter your email address.";

    newsletterInput.focus();
    return;
  }

  if (!emailPattern.test(email)) {
    newsletterMessage.textContent =
      "Enter a valid email address.";

    newsletterInput.focus();
    return;
  }

  newsletterMessage.textContent =
    "You’re subscribed. Welcome aboard.";

  newsletterInput.value = "";
}

newsletterButton?.addEventListener(
  "click",
  submitNewsletter
);

newsletterInput?.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter") {
      submitNewsletter();
    }
  }
);

/* Scroll and resize events */

function handleScroll() {
  updateReadingProgress();
  updateActiveTableOfContents();
}

window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateMobileTocState
);

updateMobileTocState();
updateReadingProgress();
updateActiveTableOfContents();
}


/* =========================================================
   CONTACT
   Original source: contact/page.js
   ========================================================= */

function initContact() {
  if (!document.body.matches('[data-page="contact"]')) {
    return;
  }

const contactForm = document.querySelector("#contact-form");
const submitButton = contactForm?.querySelector(".contact-submit");
const statusMessage = document.querySelector("#contact-status");

const fields = [
  {
    id: "contact-name",
    validate(value) {
      if (!value.trim()) {
        return "Please enter your name.";
      }

      if (value.trim().length < 2) {
        return "Your name must contain at least two characters.";
      }

      return "";
    }
  },
  {
    id: "contact-email",
    validate(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        return "Please enter your email address.";
      }

      if (!emailPattern.test(value.trim())) {
        return "Please enter a valid email address.";
      }

      return "";
    }
  },
  {
    id: "contact-subject",
    validate(value) {
      if (!value.trim()) {
        return "Please enter a subject.";
      }

      return "";
    }
  },
  {
    id: "contact-message",
    validate(value) {
      if (!value.trim()) {
        return "Please enter a message.";
      }

      if (value.trim().length < 20) {
        return "Please provide at least 20 characters.";
      }

      return "";
    }
  }
];

function getErrorElement(fieldId) {
  return document.querySelector(`[data-error-for="${fieldId}"]`);
}

function setFieldError(field, message) {
  const formField = field.closest(".form-field");
  const errorElement = getErrorElement(field.id);

  formField?.classList.toggle("is-invalid", Boolean(message));

  field.setAttribute("aria-invalid", message ? "true" : "false");

  if (message) {
    const errorId = `${field.id}-error`;

    errorElement.id = errorId;
    errorElement.textContent = message;
    field.setAttribute("aria-describedby", errorId);
  } else {
    errorElement.textContent = "";
    field.removeAttribute("aria-describedby");
  }
}

function validateField(fieldConfig) {
  const field = document.getElementById(fieldConfig.id);
  const errorMessage = fieldConfig.validate(field.value);

  setFieldError(field, errorMessage);

  return !errorMessage;
}

function validateForm() {
  return fields.map(validateField).every(Boolean);
}

fields.forEach((fieldConfig) => {
  const field = document.getElementById(fieldConfig.id);

  field.addEventListener("blur", () => {
    validateField(fieldConfig);
  });

  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") {
      validateField(fieldConfig);
    }

    statusMessage.textContent = "";
    statusMessage.classList.remove("is-error");
  });
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  statusMessage.textContent = "";
  statusMessage.classList.remove("is-error");

  const isValid = validateForm();

  if (!isValid) {
    const firstInvalidField = contactForm.querySelector(
      '[aria-invalid="true"]'
    );

    firstInvalidField?.focus();

    statusMessage.textContent =
      "Please correct the highlighted fields before submitting.";

    statusMessage.classList.add("is-error");
    return;
  }

  const originalButtonText =
    submitButton.querySelector("span").textContent;

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Sending...";

  try {
    /*
      Replace this demo timeout with your existing PHPMailer endpoint.

      Example:

      const formData = new FormData(contactForm);

      const response = await fetch("/contact.php", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }
    */

    await new Promise((resolve) => {
      window.setTimeout(resolve, 900);
    });

    contactForm.reset();

    fields.forEach((fieldConfig) => {
      const field = document.getElementById(fieldConfig.id);
      setFieldError(field, "");
    });

    statusMessage.textContent =
      "Thank you. Your message has been prepared successfully.";
  } catch (error) {
    statusMessage.textContent =
      "Something went wrong. Please try again or email me directly.";

    statusMessage.classList.add("is-error");
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = originalButtonText;
  }
});
}


/* =========================================================
   FOOTER AND BACK TO TOP
   ========================================================= */

function initFooterAndBackToTop() {
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
}

document.addEventListener("DOMContentLoaded", () => {
  initSharedHeaderNavigationAndTheme();
  initHome();
  initBio();
  initPortfolio();
  initPortfolioSingle();
  initBlog();
  initBlogSingle();
  initContact();
  initFooterAndBackToTop();
});
