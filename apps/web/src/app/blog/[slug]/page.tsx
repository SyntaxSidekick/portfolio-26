import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./blog-single.css";
import { blogPosts } from "@/data/blog-posts";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

function BlogArticleContent() {
  return (
    <div id="main-content">
<main className="blog-post-page">
  <div className="blog-background-grid" aria-hidden="true"></div>
  <div className="blog-background-glow blog-background-glow-one" aria-hidden="true"></div>
  <div className="blog-background-glow blog-background-glow-two" aria-hidden="true"></div>

  <div className="reading-progress-fixed" aria-hidden="true">
    <span id="fixed-reading-progress"></span>
  </div>

  <div className="blog-container">
    <a className="back-to-articles" href="#">
      <span aria-hidden="true">←</span>
      Back to All Articles
    </a>

    <div className="blog-post-layout">
      <article className="blog-article" id="blog-article">
        <header className="article-header">
          <a className="article-category" href="#">Web Development</a>

          <h1>
            Native CSS Is Quietly Replacing Sass, But It Isn’t Replacing the
            Need for Sass
          </h1>

          <p className="article-description">
            Native CSS is evolving faster than ever with nesting, variables,
            and <code>@scope</code>. Here’s what that means for your workflow,
            projects, and the future of Sass.
          </p>

          <div className="article-meta-layout">
            <div className="article-author">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=85"
                alt="Portrait of Riad Kilani"
              />

              <div>
                <strong>Riad Kilani</strong>

                <div className="article-meta">
                  <time dateTime="2025-06-11">June 11, 2025</time>
                  <span aria-hidden="true">•</span>
                  <span>8 min read</span>
                  <span aria-hidden="true">•</span>
                  <a href="#comments">12 Comments</a>
                </div>
              </div>
            </div>

            <div className="article-sharing">
              <span>Share this article</span>

              <div className="sharing-buttons">
                <button
                  className="round-button share-button"
                  type="button"
                  data-platform="x"
                  aria-label="Share article on X"
                >
                  X
                </button>

                <button
                  className="round-button share-button"
                  type="button"
                  data-platform="linkedin"
                  aria-label="Share article on LinkedIn"
                >
                  in
                </button>

                <button
                  className="round-button copy-article-link"
                  type="button"
                  aria-label="Copy article link"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.6 13.4a1 1 0 0 1 0-1.4l3.2-3.2a3 3 0 0 1 4.2 4.2l-2.3 2.3a3 3 0 0 1-4.2 0 1 1 0 1 1 1.4-1.4 1 1 0 0 0 1.4 0l2.3-2.3a1 1 0 0 0-1.4-1.4L12 13.4a1 1 0 0 1-1.4 0Z"
                    />
                    <path
                      d="M13.4 10.6a1 1 0 0 1 0 1.4l-3.2 3.2A3 3 0 0 1 6 11l2.3-2.3a3 3 0 0 1 4.2 0 1 1 0 1 1-1.4 1.4 1 1 0 0 0-1.4 0l-2.3 2.3a1 1 0 0 0 1.4 1.4l3.2-3.2a1 1 0 0 1 1.4 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <figure className="article-featured-image">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=90"
            alt="Development interface showing code and design panels"
          />

          <span className="featured-image-overlay" aria-hidden="true"></span>

          <div className="featured-image-graphic" aria-hidden="true">
            <span className="sass-logo">Sass</span>
            <span className="graphic-divider">+</span>
            <span className="css-logo">CSS</span>
          </div>
        </figure>

        <div className="article-reading-progress">
          <span>Reading Progress</span>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Article reading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          >
            <span id="article-reading-progress"></span>
          </div>

          <strong id="article-reading-value">0%</strong>
        </div>

        <nav className="article-table-of-contents" aria-label="Table of contents">
          <button
            className="mobile-toc-button"
            type="button"
            aria-expanded="true"
            aria-controls="article-toc-list"
          >
            <span>Table of Contents</span>
            <span className="mobile-toc-icon" aria-hidden="true">−</span>
          </button>

          <ol id="article-toc-list">
            <li>
              <a href="#variables">Variables: Compile-Time vs Runtime</a>
            </li>

            <li>
              <a href="#nesting">Nesting: Without a Preprocessor</a>
            </li>

            <li>
              <a href="#container-queries">
                From Media Queries to Container Queries
              </a>
            </li>

            <li>
              <a href="#runtime-theming">
                Runtime Theming Changes Everything
              </a>
            </li>

            <li>
              <a href="#sass-wins">Where Sass Still Wins</a>
            </li>

            <li>
              <a href="#evolution">This Is Evolution, Not Replacement</a>
            </li>
          </ol>
        </nav>

        <div className="article-content">
          <p className="article-summary">
            <strong>TL;DR:</strong> Native CSS has absorbed most of what made
            Sass essential. Variables, nesting, cascade controls, container
            queries, and runtime theming now live natively in the language.
            That does not make Sass obsolete. It changes its role. Sass moves
            from required infrastructure to an optional build-time power tool.
          </p>

          <p>
            If you write dashboards, interfaces, or design systems, this shift
            is important. Native CSS is becoming capable enough to manage much
            of the work that once required an additional preprocessing layer.
          </p>

          <section className="article-section" id="variables">
            <header className="section-heading">
              <span>01</span>

              <div>
                <h2>Variables: Compile-Time vs Runtime</h2>

                <p>
                  Sass variables are resolved at build time. Once compiled,
                  the value is frozen into the output.
                </p>
              </div>
            </header>

            <div className="code-block">
              <div className="code-header">
                <span>SCSS</span>

                <button className="copy-code-button" type="button">
                  Copy
                </button>
              </div>

              <pre><code><span className="code-variable">$primary</span>: <span className="code-value">#006fed</span>;

<span className="code-selector">.button</span> {'{'}
  <span className="code-property">background</span>: <span className="code-variable">$primary</span>;
{'}'}</code></pre>
            </div>

            <p>
              Native CSS variables live at runtime and can be changed without
              rebuilding the application.
            </p>

            <div className="code-block">
              <div className="code-header">
                <span>CSS</span>

                <button className="copy-code-button" type="button">
                  Copy
                </button>
              </div>

              <pre><code><span className="code-selector">:root</span> {'{'}
  <span className="code-property">--primary</span>: <span className="code-value">#006fed</span>;
{'}'}

<span className="code-selector">.button</span> {'{'}
  <span className="code-property">background</span>: <span className="code-function">var</span>(<span className="code-property">--primary</span>);
{'}'}</code></pre>
            </div>

            <p>
              You can now swap an entire design system in real time without
              recompiling your CSS.
            </p>
          </section>

          <section className="article-section" id="nesting">
            <header className="section-heading">
              <span>02</span>

              <div>
                <h2>Nesting: Without a Preprocessor</h2>

                <p>
                  What once required Sass now works directly inside modern CSS.
                </p>
              </div>
            </header>

            <div className="code-block">
              <div className="code-header">
                <span>CSS</span>

                <button className="copy-code-button" type="button">
                  Copy
                </button>
              </div>

              <pre><code><span className="code-selector">.card</span> {'{'}
  <span className="code-property">padding</span>: <span className="code-value">1rem</span>;

  <span className="code-selector">.title</span> {'{'}
    <span className="code-property">font-size</span>: <span className="code-value">1.25rem</span>;
  {'}'}

  <span className="code-selector">&amp;:hover</span> {'{'}
    <span className="code-property">border-color</span>: <span className="code-function">var</span>(<span className="code-property">--accent</span>);
  {'}'}
{'}'}</code></pre>
            </div>

            <p>
              The syntax looks familiar, but this is real CSS. There is no
              compilation step, abstraction layer, or preprocessing dependency.
            </p>
          </section>

          <aside className="article-callout">
            <span className="callout-icon" aria-hidden="true">&lt;/&gt;</span>

            <div>
              <strong>The important distinction</strong>

              <p>
                Native CSS is not simply duplicating Sass one feature at a
                time. It is solving many of the same problems through a runtime
                browser platform rather than a build-time language.
              </p>
            </div>
          </aside>

          <section className="article-section" id="container-queries">
            <header className="section-heading">
              <span>03</span>

              <div>
                <h2>From Media Queries to Container Queries</h2>

                <p>
                  Traditional responsive design centered on viewport
                  breakpoints.
                </p>
              </div>
            </header>

            <div className="code-block">
              <div className="code-header">
                <span>CSS</span>

                <button className="copy-code-button" type="button">
                  Copy
                </button>
              </div>

              <pre><code><span className="code-keyword">@media</span> (<span className="code-property">min-width</span>: <span className="code-value">768px</span>) {'{'}
  <span className="code-selector">.card</span> {'{'}
    <span className="code-property">grid-template-columns</span>: <span className="code-value">1fr 1fr</span>;
  {'}'}
{'}'}</code></pre>
            </div>

            <p>
              Modern CSS lets components respond to their own available space.
            </p>

            <div className="code-block">
              <div className="code-header">
                <span>CSS</span>

                <button className="copy-code-button" type="button">
                  Copy
                </button>
              </div>

              <pre><code><span className="code-selector">.card-wrapper</span> {'{'}
  <span className="code-property">container-type</span>: <span className="code-value">inline-size</span>;
{'}'}

<span className="code-keyword">@container</span> (<span className="code-property">min-width</span>: <span className="code-value">600px</span>) {'{'}
  <span className="code-selector">.card</span> {'{'}
    <span className="code-property">grid-template-columns</span>: <span className="code-value">1fr 1fr</span>;
  {'}'}
{'}'}</code></pre>
            </div>

            <p>
              The layout now listens to its component instead of the screen,
              making reusable components more predictable across pages,
              sidebars, dashboards, and modal layouts.
            </p>
          </section>

          <section className="article-section" id="runtime-theming">
            <header className="section-heading">
              <span>04</span>

              <div>
                <h2>Runtime Theming Changes Everything</h2>

                <p>
                  Sass can generate themes, but native CSS can change them
                  instantly in the browser.
                </p>
              </div>
            </header>

            <div className="code-block">
              <div className="code-header">
                <span>CSS</span>

                <button className="copy-code-button" type="button">
                  Copy
                </button>
              </div>

              <pre><code><span className="code-selector">:root</span> {'{'}
  <span className="code-property">--surface</span>: <span className="code-value">#07111d</span>;
  <span className="code-property">--text</span>: <span className="code-value">#f7fbff</span>;
{'}'}

<span className="code-selector">[data-theme="light"]</span> {'{'}
  <span className="code-property">--surface</span>: <span className="code-value">#ffffff</span>;
  <span className="code-property">--text</span>: <span className="code-value">#08111f</span>;
{'}'}</code></pre>
            </div>

            <p>
              There is no duplication, recompilation, or need to pass theme
              values through every individual component.
            </p>

            <ul className="article-feature-list">
              <li>
                <span aria-hidden="true">✓</span>
                User-selectable themes
              </li>

              <li>
                <span aria-hidden="true">✓</span>
                Brand-specific interface themes
              </li>

              <li>
                <span aria-hidden="true">✓</span>
                Accessibility preferences
              </li>

              <li>
                <span aria-hidden="true">✓</span>
                Runtime design-token updates
              </li>
            </ul>
          </section>

          <section className="article-section" id="sass-wins">
            <header className="section-heading">
              <span>05</span>

              <div>
                <h2>Where Sass Still Wins</h2>

                <p>
                  Sass remains valuable when build-time logic provides a real
                  architectural advantage.
                </p>
              </div>
            </header>

            <div className="comparison-grid">
              <article>
                <span className="comparison-label">Native CSS</span>

                <h3>Runtime capabilities</h3>

                <ul>
                  <li>Dynamic custom properties</li>
                  <li>Container queries</li>
                  <li>Native cascade layers</li>
                  <li>Browser-level theming</li>
                  <li>Progressive enhancement</li>
                </ul>
              </article>

              <article>
                <span className="comparison-label">Sass</span>

                <h3>Build-time capabilities</h3>

                <ul>
                  <li>Complex functions and loops</li>
                  <li>Programmatic token generation</li>
                  <li>Large utility generators</li>
                  <li>Advanced color transformations</li>
                  <li>Compile-time design logic</li>
                </ul>
              </article>
            </div>

            <p>
              A modern architecture can use native CSS for browser behavior
              while reserving Sass for build-time tasks it performs especially
              well.
            </p>
          </section>

          <section className="article-section" id="evolution">
            <header className="section-heading">
              <span>06</span>

              <div>
                <h2>This Is Evolution, Not Replacement</h2>

                <p>
                  The future is not Sass versus CSS. It is understanding what
                  belongs in the browser and what belongs in the build process.
                </p>
              </div>
            </header>

            <blockquote>
              <p>
                Use native CSS for runtime behavior. Use Sass when build-time
                automation genuinely improves the system.
              </p>
            </blockquote>

            <p>
              Sass is not disappearing. Its responsibilities are becoming more
              focused. That is a sign of a maturing platform, not the death of
              a tool.
            </p>
          </section>

          <a className="continue-reading-button" href="#">
            Continue Reading
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <footer className="article-footer" id="comments">
          <div className="article-feedback">
            <span>Was this article helpful?</span>

            <button
              className="feedback-button"
              type="button"
              data-feedback="helpful"
              aria-label="Mark this article as helpful"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M7 10v10H3V10h4Zm4 10H9V9.6l3.7-6.1a1.4 1.4 0 0 1 2.6.8L15 9h4.2a2 2 0 0 1 2 2.3l-1 7a2 2 0 0 1-2 1.7H11Z"
                />
              </svg>
            </button>

            <button
              className="feedback-button"
              type="button"
              data-feedback="not-helpful"
              aria-label="Mark this article as not helpful"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M17 14V4h4v10h-4ZM13 4h2v10.4l-3.7 6.1a1.4 1.4 0 0 1-2.6-.8L9 15H4.8a2 2 0 0 1-2-2.3l1-7A2 2 0 0 1 5.8 4H13Z"
                />
              </svg>
            </button>

            <span className="feedback-message" aria-live="polite"></span>
          </div>

          <nav className="article-navigation" aria-label="Article navigation">
            <a href="#" className="previous-article">
              <span className="navigation-arrow" aria-hidden="true">←</span>

              <span>
                <small>Previous Article</small>
                <strong>60 JavaScript Projects in 60 Days</strong>
              </span>
            </a>

            <a className="all-articles-link" href="#" aria-label="View all articles">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="6" height="6" rx="1"></rect>
                <rect x="15" y="3" width="6" height="6" rx="1"></rect>
                <rect x="3" y="15" width="6" height="6" rx="1"></rect>
                <rect x="15" y="15" width="6" height="6" rx="1"></rect>
              </svg>
            </a>

            <a href="#" className="next-article">
              <span>
                <small>Next Article</small>
                <strong>TypeScript From the Ground Up, Day 3</strong>
              </span>

              <span className="navigation-arrow" aria-hidden="true">→</span>
            </a>
          </nav>
        </footer>
      </article>

      <aside className="article-sidebar">
        <div className="article-sidebar-inner">
          <section className="sidebar-card author-sidebar-card">
            <h2>About the Author</h2>

            <div className="sidebar-author">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=85"
                alt="Portrait of Riad Kilani"
              />

              <div>
                <strong>Riad Kilani</strong>

                <p>
                  UX Engineer and Front-End Architect focused on performance,
                  accessibility, and developer experience.
                </p>
              </div>
            </div>

            <a className="sidebar-text-link" href="#">
              View full bio
              <span aria-hidden="true">→</span>
            </a>
          </section>

          <nav className="sidebar-card sidebar-toc" aria-label="On this page">
            <h2>On This Page</h2>

            <ol>
              <li>
                <a href="#variables">Variables: Compile-Time vs Runtime</a>
              </li>

              <li>
                <a href="#nesting">Nesting: Without a Preprocessor</a>
              </li>

              <li>
                <a href="#container-queries">
                  From Media Queries to Container Queries
                </a>
              </li>

              <li>
                <a href="#runtime-theming">
                  Runtime Theming Changes Everything
                </a>
              </li>

              <li>
                <a href="#sass-wins">Where Sass Still Wins</a>
              </li>

              <li>
                <a href="#evolution">This Is Evolution, Not Replacement</a>
              </li>
            </ol>
          </nav>

          <section className="sidebar-card recent-articles-card">
            <h2>Recent Articles</h2>

            <div className="recent-articles-list">
              <a className="recent-article" href="#">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=240&q=80"
                  alt=""
                />

                <span>
                  <strong>
                    Native CSS Is Quietly Replacing Sass, But It Isn’t Replacing
                    the Need for Sass
                  </strong>

                  <small>Jun 11, 2025</small>
                </span>
              </a>

              <a className="recent-article" href="#">
                <img
                  src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=240&q=80"
                  alt=""
                />

                <span>
                  <strong>TypeScript From the Ground Up, Day 3</strong>
                  <small>Jun 10, 2025</small>
                </span>
              </a>

              <a className="recent-article" href="#">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=240&q=80"
                  alt=""
                />

                <span>
                  <strong>60 JavaScript Projects in 60 Days</strong>
                  <small>Jun 10, 2025</small>
                </span>
              </a>

              <a className="recent-article" href="#">
                <img
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=240&q=80"
                  alt=""
                />

                <span>
                  <strong>
                    JavaScript vs TypeScript: What Actually Changes
                  </strong>

                  <small>Jun 9, 2025</small>
                </span>
              </a>

              <a className="recent-article" href="#">
                <img
                  src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=240&q=80"
                  alt=""
                />

                <span>
                  <strong>Learn TypeScript in 10 Minutes</strong>
                  <small>Jun 7, 2025</small>
                </span>
              </a>
            </div>
          </section>

          <section className="sidebar-card tags-sidebar-card">
            <h2>Tags</h2>

            <div className="article-tags">
              <a href="#">CSS</a>
              <a href="#">Sass</a>
              <a href="#">Web Development</a>
              <a href="#">JavaScript</a>
              <a href="#">TypeScript</a>
              <a href="#">Performance</a>
              <a href="#">Frontend</a>
              <a href="#">Tutorial</a>
            </div>
          </section>

          <section className="sidebar-card newsletter-sidebar-card">
            <span className="newsletter-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M3 5h18v14H3V5Zm2 2v.4l7 5 7-5V7H5Zm14 10V9.8l-7 5-7-5V17h14Z"
                />
              </svg>
            </span>

            <div>
              <h2>Stay Ahead. Get Weekly Insights.</h2>

              <p>
                Join 2,500+ developers getting practical tips, tutorials, and
                resources delivered to their inbox every week.
              </p>
            </div>

            <div className="newsletter-form">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email address"
              />

              <button id="newsletter-submit" type="button">
                Subscribe
              </button>
            </div>

            <small>No spam. Unsubscribe anytime.</small>

            <p className="newsletter-message" aria-live="polite"></p>
          </section>

          <section className="sidebar-card explore-sidebar-card">
            <span className="explore-icon" aria-hidden="true">&lt;/&gt;</span>

            <h2>Build Better. Ship Faster.</h2>

            <p>
              Explore practical tutorials, in-depth guides, and real-world
              insights on modern front-end development.
            </p>

            <a className="sidebar-text-link" href="#">
              Explore All Articles
              <span aria-hidden="true">→</span>
            </a>
          </section>
        </div>
      </aside>
    </div>
  </div>

  <div className="toast-message" id="toast-message" aria-live="polite"></div>
</main>
</div>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: post.title,
    description: `Article by Riad Kilani: ${post.title}.`
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleContent />;
}
