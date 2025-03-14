"use client";
import Link from "next/link";
import { useState } from "react";
import { User } from "@/types/types";
import { useDebounce } from "use-debounce";

import "@/styles/users.scss";

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
        className="user-search"
        type="text"
        placeholder="Buscar por nombre o usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="user-grid">
        {filteredUsers.length ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <Link href={`/users/${user.id}`}>
                <h3>{user.name}</h3>
                <p>@{user.username}</p>
                <p>{user.email}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
}
