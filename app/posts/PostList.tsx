"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePosts } from "@/hooks/usePosts";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { Post } from "@/types/types";
import "@/styles/table.scss";

interface PostsListProps {
  initialPosts: Post[];
}

export default function PostsList({ initialPosts }: PostsListProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts(
    debouncedSearch,
    initialPosts
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flat() ?? [];

  const sortedPosts = [...allPosts].sort((a, b) =>
    sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  return (
    <div className="posts-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="sort-button"
        >
          {sortOrder === "asc" ? "🔼 A-Z" : "🔽 Z-A"}
        </button>
      </div>

      <table className="posts-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Contenido</th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link href={`/posts/${post.id}`} className="post-link">
                  {post.title}
                </Link>
              </td>
              <td>{post.body.substring(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div ref={ref} style={{ height: "20px", marginBottom: "50px" }}></div>
      {isFetchingNextPage && (
        <p className="loading-text">Cargando más publicaciones...</p>
      )}
    </div>
  );
}
