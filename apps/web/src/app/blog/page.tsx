import type { Metadata } from "next";
import "./blog.css";

export const metadata: Metadata = {
  title: "Blog | Riad Kilani",
  description: "Articles and resources about front-end development, UX engineering, accessibility, and design systems."
};

function BlogIndexContent() {
  return (
    <div id="main-content">
<main id="blog-index">
  <section className="blog-page" aria-labelledby="blog-page-title">
    <div className="blog-container">

      
      <header className="blog-hero">
        <p className="blog-eyebrow">SyntaxSidekick Insights</p>

        <h1 id="blog-page-title">Insights &amp; Articles</h1>

        <p className="blog-hero-description">
          Practical tutorials, in-depth guides, and real-world insights
          on modern front-end development, design, and technology.
        </p>

        <span className="blog-hero-accent" aria-hidden="true"></span>
      </header>

      
      <section
        className="blog-controls"
        aria-label="Filter and search blog articles"
      >
        <div
          className="blog-filters"
          role="group"
          aria-label="Filter articles by content type"
        >
          <button
            className="blog-filter is-active"
            type="button"
            data-filter="all"
            aria-pressed="true"
          >
            All
          </button>

          <button
            className="blog-filter"
            type="button"
            data-filter="tutorial"
            aria-pressed="false"
          >
            Tutorials
          </button>

          <button
            className="blog-filter"
            type="button"
            data-filter="guide"
            aria-pressed="false"
          >
            Guides
          </button>

          <button
            className="blog-filter"
            type="button"
            data-filter="article"
            aria-pressed="false"
          >
            Articles
          </button>

          <button
            className="blog-filter"
            type="button"
            data-filter="news"
            aria-pressed="false"
          >
            News
          </button>

          <button
            className="blog-filter"
            type="button"
            data-filter="opinion"
            aria-pressed="false"
          >
            Opinion
          </button>
        </div>

        <div className="blog-tools">
          <label className="blog-search">
            <span className="sr-only">Search articles</span>

            <input
              id="blog-search-input"
              type="search"
              placeholder="Search articles..."
              autoComplete="off"
            />

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path
                d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </label>

          <label className="blog-sort">
            <span className="sr-only">Sort articles</span>

            <select id="blog-sort-select">
              <option value="latest">Sort by: Latest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="title">Sort by: Title</option>
              <option value="reading-time">Sort by: Reading Time</option>
            </select>
          </label>
        </div>
      </section>

      <p
        id="blog-status"
        className="blog-status sr-only"
        role="status"
        aria-live="polite"
      ></p>

      
      <article
        className="featured-post"
        data-post
        data-type="article"
        data-date="2025-06-18"
        data-reading-time="8"
        data-title="Native CSS Is Quietly Replacing Sass, but It Isn’t Replacing the Need for Sass"
        aria-labelledby="featured-post-title"
      >
        <div className="featured-post-media">
          <span className="featured-label">Featured</span>

          <img
            className="featured-post-image"
            src="https://placehold.co/1200x675/061525/45a7ff?text=Native+CSS+vs+Sass"
            alt="CSS and Sass development interfaces displayed beside a CSS shield"
            width="1200"
            height="675"
          />
        </div>

        <div className="featured-post-content">
          <p className="article-meta">
            <time dateTime="2025-06-18">Jun 18, 2025</time>
            <span>8 min read</span>
          </p>

          <h2 id="featured-post-title">
            <a href="/blog/native-css-sass">
              Native CSS Is Quietly Replacing Sass, but It Isn’t Replacing
              the Need for Sass
            </a>
          </h2>

          <p className="featured-post-description">
            Native CSS is evolving faster than ever with nesting, variables,
            and <code>@scope</code>. Here’s what that means for your workflow,
            projects, and the future of Sass.
          </p>

          <div className="featured-post-footer">
            <ul className="article-tags" aria-label="Article topics">
              <li className="article-tag">CSS</li>
              <li className="article-tag">Sass</li>
              <li className="article-tag">Web Development</li>
              <li className="article-tag">Front-End</li>
            </ul>

            <a className="article-link" href="/blog/native-css-sass">
              Read More
            </a>
          </div>
        </div>
      </article>

      
      <section className="articles-section" aria-labelledby="articles-title">
        <h2 id="articles-title" className="sr-only">Latest articles</h2>

        <div id="article-grid" className="article-grid">

          
          <article
            className="article-card"
            data-post
            data-type="tutorial"
            data-date="2025-06-16"
            data-reading-time="6"
            data-title="TypeScript From the Ground Up, Day 3"
          >
            <a
              className="article-card-media"
              href="/blog/typescript-day-three"
              aria-label="Read TypeScript From the Ground Up, Day 3"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/071529/4db4ff?text=TypeScript+Day+3"
                alt="TypeScript code examples with the TypeScript logo"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-06-16">Jun 16, 2025</time>
                <span>6 min read</span>
              </p>

              <h3>
                <a href="/blog/typescript-day-three">
                  TypeScript From the Ground Up, Day 3
                </a>
              </h3>

              <p className="article-card-description">
                Arrays, tuples, and custom types. Level up your TypeScript
                skills with practical examples.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">TypeScript</li>
                <li className="article-tag">Tutorial</li>
                <li className="article-tag">JavaScript</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="article"
            data-date="2025-06-15"
            data-reading-time="7"
            data-title="2026 CSS Features You Must Know"
          >
            <a
              className="article-card-media"
              href="/blog/css-features-2026"
              aria-label="Read 2026 CSS Features You Must Know"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/132038/f6a83b?text=2026+CSS+Features"
                alt="Modern interface displaying CSS features and development tools"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-06-15">Jun 15, 2025</time>
                <span>7 min read</span>
              </p>

              <h3>
                <a href="/blog/css-features-2026">
                  2026 CSS Features You Must Know
                </a>
              </h3>

              <p className="article-card-description">
                Container queries, style queries, and more. Explore the latest
                CSS features changing the game.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">CSS</li>
                <li className="article-tag">Web Development</li>
                <li className="article-tag">Front-End</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="tutorial"
            data-date="2025-06-12"
            data-reading-time="5"
            data-title="60 JavaScript Projects in 60 Days"
          >
            <a
              className="article-card-media"
              href="/blog/javascript-projects"
              aria-label="Read 60 JavaScript Projects in 60 Days"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/1a1232/fbcf34?text=60+JavaScript+Projects"
                alt="Graphic reading 60 JavaScript Projects in 60 Days"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-06-12">Jun 12, 2025</time>
                <span>5 min read</span>
              </p>

              <h3>
                <a href="/blog/javascript-projects">
                  60 JavaScript Projects in 60 Days
                </a>
              </h3>

              <p className="article-card-description">
                Build your JavaScript skills by building real-world projects.
                One project a day to mastery.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">JavaScript</li>
                <li className="article-tag">Projects</li>
                <li className="article-tag">Beginner</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="article"
            data-date="2025-06-10"
            data-reading-time="6"
            data-title="JavaScript vs TypeScript: What Actually Changes"
          >
            <a
              className="article-card-media"
              href="/blog/javascript-vs-typescript"
              aria-label="Read JavaScript vs TypeScript: What Actually Changes"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/071a31/58aaff?text=JavaScript+vs+TypeScript"
                alt="JavaScript and TypeScript logos displayed side by side"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-06-10">Jun 10, 2025</time>
                <span>6 min read</span>
              </p>

              <h3>
                <a href="/blog/javascript-vs-typescript">
                  JavaScript vs TypeScript: What Actually Changes
                </a>
              </h3>

              <p className="article-card-description">
                A practical comparison of JavaScript and TypeScript. See what
                really changes under the hood.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">JavaScript</li>
                <li className="article-tag">TypeScript</li>
                <li className="article-tag">Comparison</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="tutorial"
            data-date="2025-06-09"
            data-reading-time="8"
            data-title="TypeScript Basics for Beginners"
          >
            <a
              className="article-card-media"
              href="/blog/typescript-basics"
              aria-label="Read TypeScript Basics for Beginners"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/061629/56aaff?text=TypeScript+Basics"
                alt="TypeScript code editor and TypeScript logo"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-06-09">Jun 9, 2025</time>
                <span>8 min read</span>
              </p>

              <h3>
                <a href="/blog/typescript-basics">
                  TypeScript Basics for Beginners
                </a>
              </h3>

              <p className="article-card-description">
                Start your TypeScript journey the right way. Learn types,
                interfaces, and practical examples.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">TypeScript</li>
                <li className="article-tag">Tutorial</li>
                <li className="article-tag">Beginner</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="guide"
            data-date="2025-06-07"
            data-reading-time="4"
            data-title="Learn TypeScript in 10 Minutes"
          >
            <a
              className="article-card-media"
              href="/blog/typescript-ten-minutes"
              aria-label="Read Learn TypeScript in 10 Minutes"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/4a21c9/ffffff?text=Learn+TypeScript+in+10+Minutes"
                alt="Graphic reading Learn TypeScript in 10 Minutes"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-06-07">Jun 7, 2025</time>
                <span>4 min read</span>
              </p>

              <h3>
                <a href="/blog/typescript-ten-minutes">
                  Learn TypeScript in 10 Minutes
                </a>
              </h3>

              <p className="article-card-description">
                Get productive with TypeScript fast. Essential concepts
                explained in plain English.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">TypeScript</li>
                <li className="article-tag">Tutorial</li>
                <li className="article-tag">JavaScript</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="opinion"
            data-date="2025-06-03"
            data-reading-time="5"
            data-title="Why Great UX Feels Invisible"
          >
            <a
              className="article-card-media"
              href="/blog/invisible-ux"
              aria-label="Read Why Great UX Feels Invisible"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/e9f7ff/4aa8d8?text=Invisible+UX"
                alt="Minimal abstract interface representing invisible user experience design"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-06-03">Jun 3, 2025</time>
                <span>5 min read</span>
              </p>

              <h3>
                <a href="/blog/invisible-ux">
                  Why Great UX Feels Invisible
                </a>
              </h3>

              <p className="article-card-description">
                The invisible work behind seamless experiences. Explore the
                principles of great UX design.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">Design</li>
                <li className="article-tag">UX</li>
                <li className="article-tag">User Experience</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="guide"
            data-date="2025-06-01"
            data-reading-time="7"
            data-title="Web Accessibility: A Complete Guide to Building Inclusive Websites"
          >
            <a
              className="article-card-media"
              href="/blog/web-accessibility-guide"
              aria-label="Read Web Accessibility: A Complete Guide to Building Inclusive Websites"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/249dd1/ffffff?text=Web+Accessibility"
                alt="People using accessible digital interfaces and assistive technology"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-06-01">Jun 1, 2025</time>
                <span>7 min read</span>
              </p>

              <h3>
                <a href="/blog/web-accessibility-guide">
                  Web Accessibility: A Complete Guide to Building Inclusive
                  Websites
                </a>
              </h3>

              <p className="article-card-description">
                Make your websites accessible to everyone with practical
                recommendations, patterns, and best practices.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">Accessibility</li>
                <li className="article-tag">Guide</li>
                <li className="article-tag">Web Development</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="article"
            data-date="2025-05-30"
            data-reading-time="6"
            data-title="How Material Design Motion Improves Perceived Performance in React Applications"
          >
            <a
              className="article-card-media"
              href="/blog/material-design-motion"
              aria-label="Read How Material Design Motion Improves Perceived Performance in React Applications"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/3030ae/49e0ef?text=Material+Motion"
                alt="React and Material Design motion graphics"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-30">May 30, 2025</time>
                <span>6 min read</span>
              </p>

              <h3>
                <a href="/blog/material-design-motion">
                  How Material Design Motion Improves Perceived Performance
                  in React Applications
                </a>
              </h3>

              <p className="article-card-description">
                Use purposeful motion to keep users engaged and improve
                perceived speed in React applications.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">React</li>
                <li className="article-tag">Design</li>
                <li className="article-tag">Performance</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="tutorial"
            data-date="2025-05-27"
            data-reading-time="9"
            data-title="Building an Accessible Navigation System"
          >
            <a
              className="article-card-media"
              href="/blog/accessible-navigation"
              aria-label="Read Building an Accessible Navigation System"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/08192c/53baff?text=Accessible+Navigation"
                alt="Accessible navigation menu interface"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-27">May 27, 2025</time>
                <span>9 min read</span>
              </p>

              <h3>
                <a href="/blog/accessible-navigation">
                  Building an Accessible Navigation System
                </a>
              </h3>

              <p className="article-card-description">
                Create navigation that works with keyboards, screen readers,
                touch devices, and reduced-motion preferences.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">Accessibility</li>
                <li className="article-tag">Navigation</li>
                <li className="article-tag">JavaScript</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="news"
            data-date="2025-05-22"
            data-reading-time="7"
            data-title="The State of Front-End Development"
          >
            <a
              className="article-card-media"
              href="/blog/state-of-front-end"
              aria-label="Read The State of Front-End Development"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/071526/5ac0ff?text=Front-End+Development"
                alt="Modern front-end development tools and interfaces"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-22">May 22, 2025</time>
                <span>7 min read</span>
              </p>

              <h3>
                <a href="/blog/state-of-front-end">
                  The State of Front-End Development
                </a>
              </h3>

              <p className="article-card-description">
                A look at the tools, standards, and browser capabilities
                shaping modern front-end work.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">Front-End</li>
                <li className="article-tag">News</li>
                <li className="article-tag">Web Development</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="guide"
            data-date="2025-05-19"
            data-reading-time="10"
            data-title="Design Systems That Developers Actually Use"
          >
            <a
              className="article-card-media"
              href="/blog/usable-design-systems"
              aria-label="Read Design Systems That Developers Actually Use"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/101a2c/a788ff?text=Design+Systems"
                alt="Design system components and interface tokens"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-19">May 19, 2025</time>
                <span>10 min read</span>
              </p>

              <h3>
                <a href="/blog/usable-design-systems">
                  Design Systems That Developers Actually Use
                </a>
              </h3>

              <p className="article-card-description">
                Create a design system that stays useful, maintainable, and
                connected to production code.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">Design Systems</li>
                <li className="article-tag">React</li>
                <li className="article-tag">CSS</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="opinion"
            data-date="2025-05-15"
            data-reading-time="6"
            data-title="Stop Treating Accessibility as a Final Checklist"
          >
            <a
              className="article-card-media"
              href="/blog/accessibility-checklist"
              aria-label="Read Stop Treating Accessibility as a Final Checklist"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/092135/5bc0ff?text=Accessibility+First"
                alt="Accessibility-first product development workflow"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-15">May 15, 2025</time>
                <span>6 min read</span>
              </p>

              <h3>
                <a href="/blog/accessibility-checklist">
                  Stop Treating Accessibility as a Final Checklist
                </a>
              </h3>

              <p className="article-card-description">
                Accessibility works best when it is integrated into design,
                architecture, development, and testing.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">Accessibility</li>
                <li className="article-tag">UX</li>
                <li className="article-tag">Development</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="tutorial"
            data-date="2025-05-11"
            data-reading-time="8"
            data-title="Modern CSS Layout Patterns"
          >
            <a
              className="article-card-media"
              href="#modern-css-layouts"
              aria-label="Read Modern CSS Layout Patterns"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/07172a/43b9ff?text=Modern+CSS+Layouts"
                alt="Responsive CSS Grid and Flexbox layouts"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-11">May 11, 2025</time>
                <span>8 min read</span>
              </p>

              <h3>
                <a href="#modern-css-layouts">
                  Modern CSS Layout Patterns
                </a>
              </h3>

              <p className="article-card-description">
                Practical Grid and Flexbox patterns for responsive, resilient,
                and maintainable application layouts.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">CSS</li>
                <li className="article-tag">Layout</li>
                <li className="article-tag">Responsive Design</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="article"
            data-date="2025-05-08"
            data-reading-time="9"
            data-title="AI-Assisted Development Without Losing Control"
          >
            <a
              className="article-card-media"
              href="#ai-assisted-development"
              aria-label="Read AI-Assisted Development Without Losing Control"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/121839/6e96ff?text=AI-Assisted+Development"
                alt="Developer using AI-assisted coding tools"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-08">May 8, 2025</time>
                <span>9 min read</span>
              </p>

              <h3>
                <a href="#ai-assisted-development">
                  AI-Assisted Development Without Losing Control
                </a>
              </h3>

              <p className="article-card-description">
                Use AI tools to accelerate development while keeping
                architecture, accessibility, and quality in your hands.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">AI</li>
                <li className="article-tag">Development</li>
                <li className="article-tag">Workflow</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="guide"
            data-date="2025-05-04"
            data-reading-time="8"
            data-title="Core Web Vitals for Real Applications"
          >
            <a
              className="article-card-media"
              href="#core-web-vitals"
              aria-label="Read Core Web Vitals for Real Applications"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/06202a/4bd3b8?text=Core+Web+Vitals"
                alt="Performance metrics and Core Web Vitals dashboard"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-04">May 4, 2025</time>
                <span>8 min read</span>
              </p>

              <h3>
                <a href="#core-web-vitals">
                  Core Web Vitals for Real Applications
                </a>
              </h3>

              <p className="article-card-description">
                Move beyond perfect demos and improve performance in
                content-heavy, production-scale applications.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">Performance</li>
                <li className="article-tag">Core Web Vitals</li>
                <li className="article-tag">SEO</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="news"
            data-date="2025-05-01"
            data-reading-time="5"
            data-title="What Changed in React This Month"
          >
            <a
              className="article-card-media"
              href="#react-news"
              aria-label="Read What Changed in React This Month"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/07182b/61dafb?text=React+News"
                alt="React logo and development updates"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-05-01">May 1, 2025</time>
                <span>5 min read</span>
              </p>

              <h3>
                <a href="#react-news">
                  What Changed in React This Month
                </a>
              </h3>

              <p className="article-card-description">
                A practical overview of recent React changes and what they mean
                for production teams.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">React</li>
                <li className="article-tag">News</li>
                <li className="article-tag">JavaScript</li>
              </ul>
            </div>
          </article>

          
          <article
            className="article-card"
            data-post
            data-type="article"
            data-date="2025-04-28"
            data-reading-time="6"
            data-title="Semantic HTML Is Still a Competitive Advantage"
          >
            <a
              className="article-card-media"
              href="#semantic-html"
              aria-label="Read Semantic HTML Is Still a Competitive Advantage"
            >
              <img
                className="article-card-image"
                src="https://placehold.co/800x450/17202b/f06529?text=Semantic+HTML"
                alt="Semantic HTML document structure"
                width="800"
                height="450"
              />
            </a>

            <div className="article-card-content">
              <p className="article-meta">
                <time dateTime="2025-04-28">Apr 28, 2025</time>
                <span>6 min read</span>
              </p>

              <h3>
                <a href="#semantic-html">
                  Semantic HTML Is Still a Competitive Advantage
                </a>
              </h3>

              <p className="article-card-description">
                Better document structure improves accessibility, SEO,
                maintainability, and long-term resilience.
              </p>

              <ul className="article-tags" aria-label="Article topics">
                <li className="article-tag">HTML</li>
                <li className="article-tag">Accessibility</li>
                <li className="article-tag">SEO</li>
              </ul>
            </div>
          </article>

        </div>

        
        <div id="empty-state" className="blog-empty-state" hidden>
          <span className="blog-empty-icon" aria-hidden="true">⌕</span>

          <h2>No articles found</h2>

          <p>
            Try another search term or reset the selected category.
          </p>

          <button id="reset-filters" className="blog-reset-button" type="button">
            Reset filters
          </button>
        </div>
      </section>

      
      <aside className="newsletter" aria-labelledby="newsletter-title">
        <div className="newsletter-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="34" height="34">
            <path
              d="M3.5 5.5h17v13h-17z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="m4 6 8 7 8-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="newsletter-content">
          <h2 id="newsletter-title">
            Stay Ahead. Get Weekly Insights.
          </h2>

          <p>
            Join developers receiving practical tips, tutorials, and resources
            delivered to their inbox every week.
          </p>
        </div>

        <form id="newsletter-form" className="newsletter-form">
          <div className="newsletter-fields">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>

            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              required
            />

            <button type="submit">Subscribe</button>
          </div>

          <p className="newsletter-note">
            No spam. Unsubscribe anytime.
          </p>

          <p
            id="newsletter-message"
            className="newsletter-message"
            role="status"
            aria-live="polite"
          ></p>
        </form>
      </aside>

      
      <nav
        id="blog-pagination"
        className="blog-pagination"
        aria-label="Blog pagination"
      >
        <button
          className="pagination-button pagination-previous"
          type="button"
          disabled
        >
          ‹ Prev
        </button>

        <button
          className="pagination-button is-current"
          type="button"
          aria-current="page"
          data-page="1"
        >
          1
        </button>

        <button
          className="pagination-button"
          type="button"
          data-page="2"
        >
          2
        </button>

        <button
          className="pagination-button"
          type="button"
          data-page="3"
        >
          3
        </button>

        <button
          className="pagination-button"
          type="button"
          data-page="4"
        >
          4
        </button>

        <span className="pagination-ellipsis" aria-hidden="true">…</span>

        <button
          className="pagination-button"
          type="button"
          data-page="10"
        >
          10
        </button>

        <button
          className="pagination-button pagination-next"
          type="button"
        >
          Next ›
        </button>
      </nav>

    </div>
  </section>
</main>
</div>
  );
}

export default function Page() {
  return <BlogIndexContent />;
}
