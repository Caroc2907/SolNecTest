"use client";
import { useParams } from "next/navigation";
import UserDetails from "./UserDetails";
import { useUser } from "@/hooks/useUsers";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const { data: user, error, isLoading } = useUser(id as string);

  if (isLoading) return <p>Cargando usuario...</p>;
  if (error) return <p>Error al cargar usuario.</p>;

  return <UserDetails user={user} />;
}
