"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "dark" | "light";
type Language = "en" | "ar" | "it" | "fr" | "tr";

const labels = {
  en: { light: "Switch to light theme", dark: "Switch to dark theme" },
  ar: { light: "التبديل إلى المظهر الفاتح", dark: "التبديل إلى المظهر الداكن" },
  it: { light: "Passa al tema chiaro", dark: "Passa al tema scuro" },
  fr: { light: "Passer au thème clair", dark: "Passer au thème sombre" },
  tr: { light: "Açık temaya geç", dark: "Koyu temaya geç" },
} as const;

export function ThemeToggle({ language }: { language: Language }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const followDeviceTheme = () => {
      const nextTheme: Theme = deviceTheme.matches ? "dark" : "light";
      document.documentElement.dataset.theme = nextTheme;
      setTheme(nextTheme);
    };

    followDeviceTheme();
    deviceTheme.addEventListener("change", followDeviceTheme);
    return () => deviceTheme.removeEventListener("change", followDeviceTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }

  const label = theme === "dark" ? labels[language].light : labels[language].dark;

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
