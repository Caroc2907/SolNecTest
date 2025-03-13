"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkMode from "./DarkMode";

import "@/styles/sidebar.css";
export default function Sidebar() {
  const pathname = usePathname(); // Obtiene la ruta actual

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Inicio 🚀
          </Link>
        </li>
        <li>
          <Link href="/users" className={pathname === "/users" ? "active" : ""}>
            Usuarios 👥
          </Link>
        </li>
        <li>
          <Link href="/posts" className={pathname === "/posts" ? "active" : ""}>
            Publicaciones 📚
          </Link>
        </li>
      </ul>
      <DarkMode />
    </nav>
  );
}
