import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getPosts, getPostById } from "@/lib/api";
import { Post } from "@/types/types";

// 🔹 Hook para obtener un solo post por ID
export function usePost(postId: string) {
  return useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => getPostById(Number(postId)),
    enabled: !!postId,
    staleTime: 1000 * 60 * 10,
  });
}

// 🔹 Hook para obtener publicaciones con búsqueda y paginación infinita
export function usePosts(searchQuery: string, initialPosts?: Post[]) {
  return useInfiniteQuery({
    queryKey: ["posts", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      return await getPosts(pageParam, searchQuery);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,

    initialData: initialPosts
      ? {
          pages: [initialPosts],
          pageParams: [1],
        }
      : undefined,
  });
}
