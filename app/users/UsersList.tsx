"use client";
import Link from "next/link";
import { useState } from "react";
import { User } from "@/hooks/useUsers";
import { useDebounce } from "use-debounce";

interface UsersListProps {
  initialUsers: User[];
}

export default function UsersList({ initialUsers }: UsersListProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const filteredUsers = initialUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.username.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre o usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.length ? (
          filteredUsers.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>
                <h3>
                  {user.name} (@{user.username})
                </h3>
                <p>{user.email}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </ul>
    </div>
  );
}
