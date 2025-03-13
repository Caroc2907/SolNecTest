import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
      gcTime: 1000 * 60 * 10, // Evita eliminar la caché por 10 minutos
    },
  },
});

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
};

export function useUsers(initialUsers?: User[]) {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
    initialData: initialUsers ?? [],
    enabled: initialUsers === undefined,
  });
}

export function useUser(id: string) {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
}
