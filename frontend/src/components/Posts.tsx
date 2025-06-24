import { Link } from "react-router-dom";
import { type PostType } from "../pages/Home";

function Posts({ post }: { post: PostType }) {
  const formatRelativeTime = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInSecs = Math.floor(diffInMs / 1000);

      if (diffInSecs < 60) return "just now";
      if (diffInSecs < 3600)
        return `${Math.floor(diffInSecs / 60)} minutes ago`;
      if (diffInSecs < 86400)
        return `${Math.floor(diffInSecs / 3600)} hours ago`;
      if (diffInSecs < 604800)
        return `${Math.floor(diffInSecs / 86400)} days ago`;

      return date.toLocaleDateString();
    } catch (e) {
      return timestamp || "";
    }
  }
  return (
    <div className="container my-4">
      <div className="post-card d-flex p-3">
        <div className="flex-grow-1">
          <div className="post-meta mb-1">
            Posted by <span className="fw-bold">{post.user}</span> {" | "}
{formatRelativeTime(post.created_at)}{" "}
            <span className="badge rounded-pill text-bg-success">
              {post.category}
            </span>
          </div>{" "}
          <div className="post-title">
            <Link to={`post?id=${post.id}`} className="text-decoration-none">
              {post.title}
            </Link>
          </div>
          <div className="d-flex gap-3 text-muted mt-2">
            <div>
              <i className="bi bi-chat-left-text"></i> Discuss
            </div>
            <div>
              <i className="bi bi-share"></i> Share
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
