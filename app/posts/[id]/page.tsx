"use client";
import { useParams } from "next/navigation";
import { usePost } from "@/hooks/usePosts";
import Comments from "./Comments";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: post, error } = usePost(id as string);

  if (error) return <p>Error al cargar publicación.</p>;

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <Comments postId={id as string} />
    </div>
  );
}
