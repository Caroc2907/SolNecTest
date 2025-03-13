"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePosts, Post } from "@/hooks/usePosts";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";

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
    <div>
      <input
        type="text"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Ordenar: {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>

      <table
        border={1}
        width="100%"
        style={{ marginTop: "10px", borderCollapse: "collapse" }}
      >
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
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.body.substring(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Evita hacer múltiples llamadas innecesarias */}
      <div ref={ref} style={{ height: "20px", marginBottom: "50px" }}></div>
      {isFetchingNextPage && <p>Cargando más publicaciones...</p>}
    </div>
  );
}
