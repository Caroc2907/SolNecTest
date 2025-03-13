"use client";
import { useState } from "react";
import { useAddComment } from "@/hooks/useComments";

export default function AddComment({ postId }: { postId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const { mutate } = useAddComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) return;

    mutate({ postId: Number(postId), name, email, body: comment });

    // Limpiar inputs
    setName("");
    setEmail("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Enviar</button>
    </form>
  );
}
