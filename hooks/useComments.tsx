import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Comment {
  id: string;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const fetchComments = async (postId: string): Promise<Comment[]> => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return data;
};

export function useComments(postId: string) {
  return useQuery<Comment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, Omit<Comment, "id">>({
    mutationFn: async (newComment) => {
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        newComment
      );
      return data;
    },
    onSuccess: (newComment, variables) => {
      queryClient.setQueryData<Comment[]>(
        ["comments", String(variables.postId)],
        (oldData) =>
          oldData
            ? [...oldData, { ...newComment, id: crypto.randomUUID() }]
            : [{ ...newComment, id: crypto.randomUUID() }]
      );
    },
  });
}
