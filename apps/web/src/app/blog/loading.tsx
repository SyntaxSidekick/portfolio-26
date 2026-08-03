import "@/styles/pages/blog.css";

export default function Loading() {
  return (
    <main id="blog-index" className="page blog">
      <section className="blog-page" aria-labelledby="blog-loading-title">
        <div className="container">
          <header className="blog-hero">
            <p className="blog-eyebrow">SyntaxSidekick Insights</p>
            <h1 id="blog-loading-title">Insights &amp; Articles</h1>
          </header>

          <div className="article-empty-state blog-empty-state" role="status">
            <h2>Loading articles...</h2>
          </div>
        </div>
      </section>
    </main>
  );
}
