"use client";
import { useParams } from "next/navigation";
import UserDetails from "./UserDetails";
import { useUser } from "@/hooks/useUsers";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, error } = useUser(id as string);

  if (error) return <p>Error al cargar usuario.</p>;

  return <UserDetails user={user} />;
}
