"use client";
import { useState, useEffect } from "react";

import "@/styles/darkMode.css";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
    </button>
  );
}
