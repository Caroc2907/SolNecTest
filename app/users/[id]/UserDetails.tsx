import { User } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import "@/styles/userCard.css";

export default function UserCard({ user }: { user: User | undefined }) {
  const router = useRouter();

  if (!user) return <p className="loading-text">Cargando...</p>;

  return (
    <div className="user-card">
      <img
        className="user-avatar"
        src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff&size=128`}
        alt={`Avatar de ${user.name}`}
      />

      <h2>{user.name}</h2>
      <p className="user-email">{user.email}</p>
      <p className="user-email">{user.phone}</p>

      <div className="social-icons">
        <a
          href={`https://${user.website}`}
          target="_blank"
          className="website-container"
        >
          <span className="icon-bg">🌍</span>
          <span className="website-text">{user.website}</span>
        </a>
      </div>

      <button className="back-button" onClick={() => router.back()}>
        ⬅ Volver
      </button>
    </div>
  );
}
