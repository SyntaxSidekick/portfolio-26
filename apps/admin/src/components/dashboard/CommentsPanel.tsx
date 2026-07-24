import type { CommentSummary } from "../../types/admin";

export function CommentsPanel({ comments }: { comments: CommentSummary[] }) {
  return (
    <article className="panel comments-panel" id="comments">
      <div className="panel-header">
        <h2>Recent Comments</h2>
        <a href="#all-comments">View all</a>
      </div>
      <div className="comment-list">
        {comments.map((comment) => (
          <article className="comment" key={comment.id}>
            <span className="avatar">{comment.initials}</span>
            <div>
              <strong>{comment.author}</strong>
              <p>{comment.excerpt}</p>
            </div>
            <time dateTime={comment.receivedAt}>{comment.relativeTime}</time>
            {comment.unread ? <span className="unread-dot" /> : null}
          </article>
        ))}
      </div>
    </article>
  );
}
