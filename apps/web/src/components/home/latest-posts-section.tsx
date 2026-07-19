import Link from "next/link";
import { homeLatestPosts } from "@/data/home-latest-posts";

export function LatestPostsSection() {
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

          <Link className="text-link section-link" href="#">
            View all articles
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="article-grid">
          {homeLatestPosts.map((post) => (
            <article className="article-card" key={post.title}>
              <Link className="article-image" href="#">
                <img src={post.imageSrc} alt={post.imageAlt} />
              </Link>

              <div className="article-body">
                <time dateTime={post.datetime}>{post.date}</time>

                <h3>
                  <Link href="#">{post.title}</Link>
                </h3>

                <p>{post.excerpt}</p>

                <footer className="article-footer">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
