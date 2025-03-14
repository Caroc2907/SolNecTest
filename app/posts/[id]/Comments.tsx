"use client";
import { useComments } from "@/hooks/useComments";
import AddComment from "./AddComment";
import "@/styles/comments.scss";

export default function Comments({ postId }: { postId: string }) {
  const { data: comments, error } = useComments(postId);

  if (error) return <p className="error-text">Error al cargar comentarios.</p>;

  return (
    <div className="comments-section">
      <div className="comments-container">
        <h2>Comentarios</h2>
        <ul className="comments-list">
          {comments?.map((comment) => (
            <li key={comment.id} className="comment-item">
              <strong>{comment.name}</strong>: {comment.body}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-comment-container">
        <AddComment postId={postId} />
      </div>
    </div>
  );
}
