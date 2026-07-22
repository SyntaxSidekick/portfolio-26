import Link from "next/link";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import {
  getSyntaxSidekickArticles,
  HOME_ARTICLE_LIMIT
} from "@/lib/syntax-sidekick";

export async function LatestPostsSection() {
  const articles = await getSyntaxSidekickArticles(HOME_ARTICLE_LIMIT);

  return (
    <section className="section articles" aria-labelledby="articles-title">
      <div className="container">
        <div className="section-header-row">
          <header className="section-header">
            <p className="eyebrow">Latest Articles</p>

            <h2 id="articles-title">
              Insights on <span>front-end, design, and performance.</span>
            </h2>
          </header>

          <Link className="text-link section-link" href="/blog">
            View all articles
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <ArticleGrid articles={articles} variant="home" />
      </div>
    </section>
  );
}
