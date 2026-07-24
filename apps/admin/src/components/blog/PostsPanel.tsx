import { NavLink } from "react-router-dom";
import type { BlogPostSummary } from "../../types/admin";

export function PostsPanel({ posts }: { posts: BlogPostSummary[] }) {
  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Recent Blog Posts</h2>
        <NavLink to="/blog">View all posts</NavLink>
      </div>
      <div className="post-list">
        {posts.map((post, index) => (
          <article className="post-row" key={post.id}>
            <span className={`thumbnail thumb-${index}`}>{post.category.slice(0, 2).toUpperCase()}</span>
            <div className="row-main">
              <strong>{post.title}</strong>
              <span className="tag blue-tag">{post.category}</span>
            </div>
            <div className="row-meta">
              <span className={post.status === "Published" ? "published" : "draft"}>{"\u25cf"} {post.status}</span>
              <span>
                {post.date} {"\u00b7"} {post.views ?? "\u2014"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
