import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { getAllSyntaxSidekickArticles } from "@/lib/syntax-sidekick";
import type { SyntaxSidekickArticle } from "@/types/syntax-sidekick";
import "@/styles/pages/blog/index.css";
import { Mail } from "lucide-react";

const ARTICLES_PER_PAGE = 9;

const blogTypes = [
  {
    key: "all",
    label: "All",
    href: "/blog"
  },
  {
    key: "articles",
    label: "Articles",
    href: "/blog?type=articles"
  },
  {
    key: "tutorials",
    label: "Tutorials",
    href: "/blog?type=tutorials"
  },
  {
    key: "guides",
    label: "Guides",
    href: "/blog?type=guides"
  },
  {
    key: "resources",
    label: "Resources",
    href: "/blog?type=resources"
  }
] as const;

type BlogType = (typeof blogTypes)[number]["key"];
type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

type PageProps = Readonly<{
  searchParams?: Promise<{
    type?: string | string[];
    page?: string | string[];
  }>;
}>;

export const metadata: Metadata = {
  title: "Blog | Riad Kilani",
  description:
    "Articles and resources about front-end development, UX engineering, accessibility, and design systems."
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const activeType = getActiveType(resolvedSearchParams?.type);
  const requestedPage = getRequestedPage(resolvedSearchParams?.page);
  const articles = await getAllSyntaxSidekickArticles();
  const filteredArticles = filterArticlesByType(articles, activeType);
  const [featuredArticle, ...gridArticles] = filteredArticles;
  const totalPages = Math.ceil(gridArticles.length / ARTICLES_PER_PAGE);
  const currentPage = clampPage(requestedPage, totalPages);
  const paginatedArticles = gridArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <main id="blog-index" className="page blog">
      <section className="blog-page" aria-labelledby="blog-page-title">
        <div className="container">
          <header className="blog-hero">
            <p className="blog-eyebrow">SyntaxSidekick Insights</p>

            <h1 id="blog-page-title">Insights &amp; Articles</h1>

            <p className="blog-hero-description">
              Practical tutorials, in-depth guides, and real-world insights on
              modern front-end development, design, and technology.
            </p>

            <span className="blog-hero-accent" aria-hidden="true"></span>
          </header>

          <BlogTypeNav activeType={activeType} />

          {featuredArticle ? (
            <ArticleCard article={featuredArticle} variant="featured" />
          ) : null}

          <section className="articles-section" aria-labelledby="articles-title">
            <h2 id="articles-title" className="sr-only">
              Latest articles
            </h2>

            {paginatedArticles.length > 0 || !featuredArticle ? (
              <ArticleGrid articles={paginatedArticles} />
            ) : null}
          </section>

          <BlogPagination
            activeType={activeType}
            currentPage={currentPage}
            totalPages={totalPages}
          />

          <aside className="newsletter" aria-labelledby="newsletter-title">
            <div className="newsletter-icon" aria-hidden="true">
              <Mail aria-hidden="true" width={34} height={34} />
            </div>

            <div className="newsletter-content">
              <h2 id="newsletter-title">Stay Ahead. Get Weekly Insights.</h2>

              <p>
                Join developers receiving practical tips, tutorials, and
                resources delivered to their inbox every week.
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

              <p className="newsletter-note">No spam. Unsubscribe anytime.</p>

              <p
                id="newsletter-message"
                className="newsletter-message"
                role="status"
                aria-live="polite"
              ></p>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}

function BlogTypeNav({ activeType }: { activeType: BlogType }) {
  return (
    <nav className="blog-nav" aria-label="Blog content types">
      <ul className="blog-nav-list">
        {blogTypes.map((type) => {
          const isActive = type.key === activeType;

          return (
            <li key={type.key}>
              <Link
                className={
                  isActive ? "blog-nav-link blog-nav-active" : "blog-nav-link"
                }
                href={type.href}
                aria-current={isActive ? "page" : undefined}
              >
                {type.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function BlogPagination({
  activeType,
  currentPage,
  totalPages
}: {
  activeType: BlogType;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className="blog-pagination" aria-label="Blog pagination">
      {currentPage > 1 ? (
        <Link
          className="blog-pagination-control"
          href={createBlogHref(activeType, previousPage)}
          aria-label="Go to previous page"
        >
          <span aria-hidden="true">&larr;</span>
          <span className="blog-pagination-label">Previous</span>
        </Link>
      ) : (
        <span
          className="blog-pagination-control blog-pagination-disabled"
          aria-disabled="true"
        >
          <span aria-hidden="true">&larr;</span>
          <span className="blog-pagination-label">Previous</span>
        </span>
      )}

      <ol className="blog-pagination-pages">
        {getPaginationItems(currentPage, totalPages).map((item) => {
          if (typeof item !== "number") {
            return (
              <li key={item}>
                <span className="blog-pagination-ellipsis" aria-hidden="true">
                  &hellip;
                </span>
              </li>
            );
          }

          const isActive = item === currentPage;

          return (
            <li key={item}>
              <Link
                className={
                  isActive
                    ? "blog-pagination-link blog-pagination-current"
                    : "blog-pagination-link"
                }
                href={createBlogHref(activeType, item)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Page ${item}`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ol>

      {currentPage < totalPages ? (
        <Link
          className="blog-pagination-control"
          href={createBlogHref(activeType, nextPage)}
          aria-label="Go to next page"
        >
          <span className="blog-pagination-label">Next</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      ) : (
        <span
          className="blog-pagination-control blog-pagination-disabled"
          aria-disabled="true"
        >
          <span className="blog-pagination-label">Next</span>
          <span aria-hidden="true">&rarr;</span>
        </span>
      )}
    </nav>
  );
}

function getActiveType(type: string | string[] | undefined): BlogType {
  const value = typeof type === "string" ? type : "all";

  return blogTypes.some((blogType) => blogType.key === value)
    ? (value as BlogType)
    : "all";
}

function getRequestedPage(page: string | string[] | undefined) {
  const value = typeof page === "string" ? Number(page) : 1;

  return Number.isInteger(value) && value > 0 ? value : 1;
}

function clampPage(page: number, totalPages: number) {
  if (totalPages <= 1) {
    return 1;
  }

  return Math.min(page, totalPages);
}

function filterArticlesByType(
  articles: SyntaxSidekickArticle[],
  type: BlogType
) {
  if (type === "all") {
    return articles;
  }

  const categoryNames = getCategoryNamesForType(type);

  return articles.filter((article) =>
    article.categories.some((category) =>
      categoryNames.includes(normalizeCategoryName(category))
    )
  );
}

function getCategoryNamesForType(type: Exclude<BlogType, "all">) {
  return {
    articles: ["article", "articles"],
    tutorials: ["tutorial", "tutorials"],
    guides: ["guide", "guides"],
    resources: ["resource", "resources"]
  }[type];
}

function normalizeCategoryName(category: string) {
  return category.toLowerCase().trim();
}

function createBlogHref(type: BlogType, page: number): string {
  const params = new URLSearchParams();

  if (type !== "all") {
    params.set("type", type);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/blog?${query}` : "/blog";
}

function getPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PaginationItem[] = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    items.push("ellipsis-start");
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < totalPages - 1) {
    items.push("ellipsis-end");
  }

  items.push(totalPages);

  return items;
}
