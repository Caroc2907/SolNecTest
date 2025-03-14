import { getUserById, getUsers } from "@/lib/api";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { User } from "@/types/types";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

//  Hook para obtener la lista de usuarios
export function useUsers(initialUsers?: User[]) {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
    initialData: initialUsers ?? [],
    enabled: initialUsers === undefined,
  });
}

// Hook para obtener un usuario por ID
export function useUser(id: string) {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => getUserById(Number(id)),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
}
