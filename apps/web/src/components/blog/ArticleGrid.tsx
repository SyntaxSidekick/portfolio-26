import type { SyntaxSidekickArticle } from "@/types/syntax-sidekick";
import { ArticleCard } from "@/components/blog/ArticleCard";

type ArticleGridProps = {
  articles: SyntaxSidekickArticle[];
  variant?: "blog-index" | "home";
};

export function ArticleGrid({ articles, variant = "blog-index" }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="article-empty-state">
        <h2>Articles are temporarily unavailable.</h2>
      </div>
    );
  }

  return (
    <ul className="article-grid" data-variant={variant}>
      {articles.map((article) => (
        <li className="article-item" key={article.id}>
          <ArticleCard article={article} variant={variant} />
        </li>
      ))}
    </ul>
  );
}
