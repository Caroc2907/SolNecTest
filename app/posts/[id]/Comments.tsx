"use client";
import { useComments } from "@/hooks/useComments";
import AddComment from "./AddComment";

export default function Comments({ postId }: { postId: string }) {
  const { data: comments, error } = useComments(postId);

  if (error) return <p>Error al cargar comentarios.</p>;

  return (
    <div>
      <h2>Comentarios</h2>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>: {comment.body}
          </li>
        ))}
      </ul>
      <AddComment postId={postId} />
    </div>
  );
}
