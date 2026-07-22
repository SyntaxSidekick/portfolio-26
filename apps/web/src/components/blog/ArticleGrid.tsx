import type { SyntaxSidekickArticle } from "@/types/syntax-sidekick";
import { ArticleCard } from "@/components/blog/ArticleCard";

type ArticleGridProps = {
  articles: SyntaxSidekickArticle[];
  variant?: "listing" | "home";
};

export function ArticleGrid({ articles, variant = "listing" }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="blog-empty-state">
        <h2>Articles are temporarily unavailable.</h2>
      </div>
    );
  }

  return (
    <div className="article-grid">
      {articles.map((article) => (
        <ArticleCard article={article} key={article.id} variant={variant} />
      ))}
    </div>
  );
}
