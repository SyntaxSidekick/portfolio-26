import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Share2 } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import {
  formatArticleDate,
  getAllSyntaxSidekickArticles,
  getSyntaxSidekickArticleBySlug
} from "@/lib/syntax-sidekick";
import { WordPressTocController } from "@/components/blog/wordpress-toc-controller";
import type { SyntaxSidekickArticle } from "@/types/syntax-sidekick";
import "@/styles/pages/blog-single.css";

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export async function generateStaticParams() {
  const articles = await getAllSyntaxSidekickArticles();

  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getSyntaxSidekickArticleBySlug(slug);

  if (!article) {
    return { title: "Not Found" };
  }

  return {
    title: `${article.title} | Riad Kilani`,
    description: article.excerpt
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = await getSyntaxSidekickArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articles = await getAllSyntaxSidekickArticles();
  const relatedPosts = articles
    .filter((relatedArticle) => relatedArticle.slug !== article.slug)
    .slice(0, 3);
  const category = article.categories[0] ?? "Article";
  const content = highlightCodeBlocks(
    article.contentHtml ?? `<p>${escapeHtml(article.excerpt)}</p>`
  );

  return (
    <BlogSingle
      article={article}
      authorImage="/assets/images/riad-kilani-main-profile-pic.png"
      authorName={article.author ?? "Riad Kilani"}
      authorRole="Front-End Engineer"
      canonicalUrl={article.url}
      category={category}
      content={content}
      publishedDate={formatArticleDate(article.publishedAt)}
      readingTime={getReadingTime(content)}
      relatedPosts={relatedPosts}
    />
  );
}

function BlogSingle({
  article,
  authorImage,
  authorName,
  authorRole,
  canonicalUrl,
  category,
  content,
  publishedDate,
  readingTime,
  relatedPosts
}: {
  article: SyntaxSidekickArticle;
  authorImage: string;
  authorName: string;
  authorRole: string;
  canonicalUrl: string;
  category: string;
  content: string;
  publishedDate: string;
  readingTime: string;
  relatedPosts: SyntaxSidekickArticle[];
}) {
  return (
    <main className="page blog-single">
      <WordPressTocController />

      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span>{category}</span>
        </nav>

        <div className="article-layout">
          <article className="article">
            <header className="article-header">
              <div className="article-details">
                <Link
                  className="article-category"
                  href={`/blog?category=${encodeURIComponent(category)}`}
                >
                  {category}
                </Link>

                <span>{publishedDate}</span>
                <span aria-hidden="true">&bull;</span>
                <span>{readingTime}</span>
              </div>
              <h1>{article.title}</h1>

              <p className="article-excerpt">{article.excerpt}</p>

              <div className="article-meta">
                <div className="article-author">
                  <Image src={authorImage} alt="" width={48} height={48} />

                  <div>
                    <strong>{authorName}</strong>
                    <span>{authorRole}</span>
                  </div>
                </div>

                <div className="article-share">
                  <span>Share</span>

                  <div>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                      aria-label="Share on X"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Share2 aria-hidden="true" size={16} strokeWidth={1.8} />
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                      aria-label="Share on LinkedIn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink aria-hidden="true" size={16} strokeWidth={1.8} />
                    </a>
                  </div>
                </div>
              </div>
            </header>

            {article.featuredImage ? (
              <figure className="article-featured-image">
                <Image
                  src={article.featuredImage.src}
                  alt={article.featuredImage.alt}
                  width={article.featuredImage.width ?? 1200}
                  height={article.featuredImage.height ?? 675}
                  priority
                  sizes="(max-width: 960px) 100vw, 900px"
                />
              </figure>
            ) : null}

            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: content
              }}
            />

            <footer className="article-footer">
              <Link className="button button-secondary" href="/blog">
                View more articles
              </Link>
            </footer>
          </article>

          <aside className="article-sidebar" aria-label="Article sidebar">
            <div className="sidebar-content">
              <div className="desktop-toc-position">
                <ArticleToc items={article.tableOfContents} />
              </div>

              {relatedPosts.length > 0 ? (
                <section className="sidebar-card">
                  <h2>Popular posts</h2>

                  <div className="related-posts">
                    {relatedPosts.map((post) => (
                      <Link
                        className="related-post"
                        href={post.path}
                        key={post.slug}
                      >
                        {post.featuredImage ? (
                          <Image
                            src={post.featuredImage.src}
                            alt=""
                            width={88}
                            height={66}
                          />
                        ) : (
                          <span className="related-post-image" aria-hidden="true" />
                        )}

                        <span>
                          <strong>{post.title}</strong>
                          <small>{formatArticleDate(post.publishedAt)}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="sidebar-card newsletter-card">
                <span className="newsletter-label">Newsletter</span>

                <h2>Stay current with modern front-end development</h2>

                <p>
                  Get the latest articles, tutorials, and practical development
                  guides.
                </p>

                <form>
                  <label className="screen-reader-text" htmlFor="article-email">
                    Email address
                  </label>

                  <input
                    id="article-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />

                  <button className="button button-primary" type="submit">
                    Subscribe
                  </button>
                </form>

                <small>No spam. Unsubscribe at any time.</small>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ArticleToc({
  items
}: {
  items: SyntaxSidekickArticle["tableOfContents"];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="article-toc sidebar-card" aria-label="Table of contents">
      <h2>On this page</h2>

      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function getReadingTime(content: string) {
  const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlightCodeBlocks(html: string) {
  if (!/<pre[\s>]/i.test(html)) {
    return html;
  }

  return html.replace(
    /<pre[^>]*>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_match, codeAttributes: string, rawCode: string) => {
      const fencedCode = getFencedCode(rawCode);
      const language = normalizeCodeLanguage(
        getCodeLanguage(codeAttributes) ?? fencedCode.language
      );
      const code = fencedCode.code ?? rawCode;

      return `<pre class="code-block" data-language="${getLanguageLabel(language)}"><code class="language-${language}">${highlightCode(code, language)}</code></pre>`;
    }
  );
}

function highlightCode(code: string, language: string) {
  const prismLanguage = getPrismLanguage(language);
  const grammar = Prism.languages[prismLanguage];

  if (!grammar) {
    return code;
  }

  return Prism.highlight(decodeCodeEntities(code), grammar, prismLanguage);
}

function getCodeLanguage(attributes: string) {
  return attributes.match(/\blanguage-([\w-]+)/i)?.[1];
}

function getFencedCode(code: string) {
  const match = code.match(/^\s*```([\w-]+)?\s*\n([\s\S]*?)\n```\s*$/);

  if (!match) {
    return { code: null, language: null };
  }

  return {
    code: match[2],
    language: match[1] ?? null
  };
}

function normalizeCodeLanguage(language: string | null) {
  const normalized = (language ?? "text").toLowerCase();
  const aliases: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    markup: "html",
    react: "jsx",
    sh: "bash",
    shell: "bash",
    md: "markdown",
    plaintext: "text",
    plain: "text"
  };

  return aliases[normalized] ?? normalized;
}

function decodeCodeEntities(code: string) {
  return code
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&");
}

function getPrismLanguage(language: string) {
  if (language === "vue") {
    return "markup";
  }

  return language;
}

function getLanguageLabel(language: string) {
  const labels: Record<string, string> = {
    bash: "Bash",
    css: "CSS",
    html: "HTML",
    js: "JS",
    json: "JSON",
    jsx: "React",
    markdown: "Markdown",
    php: "PHP",
    scss: "SCSS",
    sql: "SQL",
    ts: "TS",
    tsx: "TSX",
    vue: "Vue"
  };

  return labels[language] ?? "Code";
}
