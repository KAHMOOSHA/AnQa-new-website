"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const activeTheme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(activeTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("anqa-theme", nextTheme);
    setTheme(nextTheme);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-label={label}
      aria-pressed={theme === "light"}
      title={label}
      onClick={toggleTheme}
    >
      <span className={styles.icon} aria-hidden="true">
        <Sun className={styles.sun} strokeWidth={1.8} />
        <Moon className={styles.moon} strokeWidth={1.8} />
      </span>
    </button>
  );
}
