"use client";
import Link from "next/link";
import "@/styles/home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Prueba Técnica - Next.js 14</h1>
      <p className="home-description">
        Explora la lista de usuarios y publicaciones de manera dinámica e
        interactiva.
      </p>

      <div className="home-buttons">
        <Link href="/users" className="home-button">
          👥 Usuarios
        </Link>
        <Link href="/posts" className="home-button">
          📝 Publicaciones
        </Link>
      </div>
    </div>
  );
}
