import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IComment } from "@/types/types";
import { getCommentsByPostId, addComment } from "@/lib/api";

// 🔹 Hook para obtener comentarios de un post
export function useComments(postId: string) {
  return useQuery<IComment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId),
    staleTime: 1000 * 60 * 5,
  });
}

// ✅ Hook para añadir un nuevo comentario
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation<IComment, Error, Omit<IComment, "id">>({
    mutationFn: async (newComment) => {
      return addComment(newComment);
    },

    onSuccess: (newComment, variables) => {
      queryClient.setQueryData<IComment[]>(
        ["comments", String(variables.postId)],
        (oldData = []) => [...oldData, { ...newComment, id: `${Date.now()}` }]
      );
    },
  });
}
