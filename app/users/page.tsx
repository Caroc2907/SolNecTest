import { User } from "@/types/types";
import UsersList from "./UsersList";
import axios from "axios";

async function fetchInitialUsers(): Promise<User[]> {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
}

export default async function UsersPage() {
  const initialUsers = await fetchInitialUsers();

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {initialUsers.length === 0 ? (
        <p>Error al cargar usuarios.</p>
      ) : (
        <UsersList initialUsers={initialUsers} />
      )}
    </div>
  );
}
