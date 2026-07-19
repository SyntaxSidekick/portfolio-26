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