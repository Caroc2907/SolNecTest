"use client";

import "@/styles/darkMode.scss";

export default function ThemeToggle() {
  const isDarkMode =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark-mode");

  const toggleDarkMode = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark-mode");
    }
  };

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      {isDarkMode ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
    </button>
  );
}
