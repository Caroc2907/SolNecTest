"use client";
import { useParams, useRouter } from "next/navigation";
import { usePost } from "@/hooks/usePosts";
import Comments from "./Comments";

import "@/styles/postDetails.css";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: post, error } = usePost(id as string);
  const router = useRouter(); // 🏠 Hook para navegar a la ruta anterior

  if (error) return <p className="error-text">Error al cargar publicación.</p>;

  return (
    <div className="post-detail-container">
      <h1>{post?.title}</h1>
      <p className="post-content">{post?.body}</p>

      <Comments postId={id as string} />
      <button className="back-button" onClick={() => router.back()}>
        ⬅️ Volver
      </button>
    </div>
  );
}
