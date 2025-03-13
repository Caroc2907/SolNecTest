import { User } from "@/hooks/useUsers";

export default function UserDetails({ user }: { user: User | undefined }) {
  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>
        <strong>Usuario:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Teléfono:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={`https://${user.website}`} target="_blank">
          {user.website}
        </a>
      </p>
    </div>
  );
}
