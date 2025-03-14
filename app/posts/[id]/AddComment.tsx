"use client";
import { useState } from "react";
import { useAddComment } from "@/hooks/useComments";
import "@/styles/addComment.scss";

export default function AddComment({ postId }: { postId: string }) {
  const addCommentMutation = useAddComment();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) return;

    addCommentMutation.mutate(
      { postId: Number(postId), name, email, body: comment },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setComment("");
        },
      }
    );
  };

  return (
    <form className="comment-form-container" onSubmit={handleSubmit}>
      <h3>Añadir Comentario</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Comentario"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" disabled={addCommentMutation.isPending}>
        {addCommentMutation.isPending ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
