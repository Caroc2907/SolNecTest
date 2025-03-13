import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async ({
  pageParam = 1,
  search = "",
}: {
  pageParam?: number;
  search?: string;
}): Promise<Post[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
    {
      params: {
        _limit: 10,
        _page: pageParam ?? 1,
        q: search?.trim().length ? search : undefined,
      },
    }
  );
  return data;
};

export function usePosts(search: string, initialPosts: Post[]) {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", search],
    queryFn: ({ pageParam = 1 }) =>
      fetchPosts({ pageParam: pageParam as number, search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
    staleTime: 60000,
    initialData: {
      pages: [initialPosts],
      pageParams: [1],
    },
  });
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export function usePost(id: string) {
  return useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return data;
    },
    enabled: !!id,
  });
}
