import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SyntaxSidekickArticle } from "@/types/syntax-sidekick";
import { formatArticleDate } from "@/lib/syntax-sidekick";

type ArticleCardProps = {
  article: SyntaxSidekickArticle;
  variant?: "featured" | "listing" | "home";
};

export function ArticleCard({ article, variant = "listing" }: ArticleCardProps) {
  if (variant === "featured") {
    return <FeaturedArticleCard article={article} />;
  }

  if (variant === "home") {
    return <HomeArticleCard article={article} />;
  }

  return <ListingArticleCard article={article} />;
}

function HomeArticleCard({ article }: Pick<ArticleCardProps, "article">) {
  return (
    <article className="article-card">
      <ArticleImage article={article} className="article-image" width={900} height={480} />

      <div className="article-body">
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>

        <h3>
          <ArticleLink article={article} />
        </h3>

        <p>{article.excerpt}</p>

        <footer className="article-footer">
          <span>{article.categories[0] ?? "Article"}</span>
          {article.author ? <span>{article.author}</span> : null}
        </footer>
      </div>
    </article>
  );
}

function ListingArticleCard({ article }: Pick<ArticleCardProps, "article">) {
  return (
    <article className="article-card">
      <ArticleImage
        article={article}
        className="article-card-media"
        imageClassName="article-card-image"
        width={800}
        height={450}
      />

      <div className="article-card-content">
        <ArticleMeta article={article} />

        <h3>
          <ArticleLink article={article} />
        </h3>

        <p className="article-card-description">{article.excerpt}</p>

        <div className="article-card-tags">
          <ArticleTags article={article} />
        </div>

        <footer className="article-card-footer">
          <Link className="article-card-cta" href={article.path}>
            Read More
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </Link>
        </footer>
      </div>
    </article>
  );
}

function FeaturedArticleCard({ article }: Pick<ArticleCardProps, "article">) {
  return (
    <article className="featured-post" aria-labelledby={`article-${article.id}-title`}>
      <div className="featured-post-media">
        <span className="featured-label">Featured</span>
        <ArticleImage
          article={article}
          className="featured-post-image-link"
          imageClassName="featured-post-image"
          width={1200}
          height={675}
        />
      </div>

      <div className="featured-post-content">
        <ArticleMeta article={article} />

        <h2 id={`article-${article.id}-title`}>
          <ArticleLink article={article} />
        </h2>

        <p className="featured-post-description">{article.excerpt}</p>

        <div className="featured-post-footer">
          <ArticleTags article={article} />

          <Link className="article-link" href={article.path}>
            Read More
            <span className="sr-only"> about {article.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function ArticleImage({
  article,
  className,
  imageClassName,
  width,
  height
}: {
  article: SyntaxSidekickArticle;
  className: string;
  imageClassName?: string;
  width: number;
  height: number;
}) {
  const image = article.featuredImage;

  if (!image) {
    return <span className={className} aria-hidden="true" />;
  }

  return (
    <Link
      className={className}
      href={article.path}
      aria-label={`Read ${article.title}`}
    >
      <Image
        className={imageClassName}
        src={image.src}
        alt={image.alt}
        width={image.width ?? width}
        height={image.height ?? height}
      />
    </Link>
  );
}

function ArticleLink({ article }: Pick<ArticleCardProps, "article">) {
  return <Link href={article.path}>{article.title}</Link>;
}

function ArticleMeta({ article }: Pick<ArticleCardProps, "article">) {
  return (
    <p className="article-meta">
      <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
      {article.author ? <span>{article.author}</span> : null}
    </p>
  );
}

function ArticleTags({ article }: Pick<ArticleCardProps, "article">) {
  if (article.categories.length === 0) {
    return null;
  }

  return (
    <ul className="article-tags" aria-label="Article topics">
      {article.categories.map((category) => (
        <li className="article-tag" key={category}>
          {category}
        </li>
      ))}
    </ul>
  );
}
