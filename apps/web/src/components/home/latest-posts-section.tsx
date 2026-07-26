import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { HomeSectionCta } from "@/components/home/home-section-cta";
import { homeLatestPosts } from "@/data/home-latest-posts";
import {
  getSyntaxSidekickArticles,
  HOME_ARTICLE_LIMIT
} from "@/lib/syntax-sidekick";
import type { SyntaxSidekickArticle } from "@/types/syntax-sidekick";

const fallbackArticles: SyntaxSidekickArticle[] = homeLatestPosts.map((post, index) => ({
  id: index + 1,
  slug: post.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-"),
  title: post.title,
  excerpt: post.excerpt,
  publishedAt: post.datetime,
  url: "#",
  path: "/blog",
  tableOfContents: [],
  featuredImage: {
    src: post.imageSrc,
    alt: post.imageAlt || post.title,
  },
  categories: [post.category],
}));

export async function LatestPostsSection() {
  const liveArticles = await getSyntaxSidekickArticles(HOME_ARTICLE_LIMIT);
  const articles = liveArticles.length ? liveArticles : fallbackArticles;

  return (
    <section className="section articles" aria-labelledby="articles-title">
      <div className="container">
        <header className="section-header">
          <p className="eyebrow">Latest Articles</p>

          <h2 id="articles-title">
            Insights on <span>front-end, design, and performance.</span>
          </h2>
        </header>

        <ArticleGrid articles={articles} variant="home" />

        <HomeSectionCta href="/blog" label="View all articles" />
      </div>
    </section>
  );
}
