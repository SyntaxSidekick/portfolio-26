const blogPosts = [
  {
    id: 1,
    title:
      "Native CSS Is Quietly Replacing Sass, but It Isn’t Replacing the Need for Sass",
    excerpt:
      "Native CSS is evolving faster than ever with nesting, variables, and @scope. Here’s what that means for your workflow, projects, and the future of Sass.",
    image:
      "https://placehold.co/1200x675/061525/45a7ff?text=Native+CSS+vs+Sass",
    url: "#native-css-sass",
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
    url: "#typescript-day-3",
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
    url: "#css-features",
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
    url: "#javascript-projects",
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
    url: "#javascript-vs-typescript",
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
    url: "#typescript-basics",
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
    url: "#typescript-ten-minutes",
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
    url: "#invisible-ux",
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
    url: "#web-accessibility",
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
    url: "#material-motion",
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
    url: "#accessible-navigation",
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
    url: "#state-front-end",
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
    url: "#design-systems",
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
    url: "#accessibility-checklist",
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
    url: "#css-layout-patterns",
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
    url: "#ai-development",
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
    url: "#core-web-vitals",
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
    url: "#react-news",
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
    url: "#semantic-html",
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

const featuredPostContainer = document.querySelector("#featured-post");
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