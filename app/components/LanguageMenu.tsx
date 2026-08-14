"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./LanguageMenu.module.css";

const languageNames = {
  en: "English",
  ar: "العربية",
  it: "Italiano",
  fr: "Français",
  tr: "Türkçe",
} as const;

type Language = keyof typeof languageNames;

const menuLabels: Record<Language, string> = {
  en: "Choose language",
  ar: "اختر اللغة",
  it: "Scegli la lingua",
  fr: "Choisir la langue",
  tr: "Dil seçin",
};

export function LanguageMenu({
  currentLanguage,
  pagePath,
}: {
  currentLanguage: Language;
  pagePath: string;
}) {
  const label = menuLabels[currentLanguage];
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    menuRef.current?.removeAttribute("open");
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) closeMenu();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <details className={styles.menu} ref={menuRef}>
      <summary aria-label={label} title={label}>
        <Globe aria-hidden="true" size={21} strokeWidth={1.8} />
        <span className={styles.srOnly}>{label}</span>
      </summary>
      <div className={styles.dropdown}>
        {(Object.keys(languageNames) as Language[]).map((language) => (
          <Link
            key={language}
            href={`/${language}${pagePath ? `/${pagePath}` : ""}`}
            hrefLang={language}
            lang={language}
            dir={language === "ar" ? "rtl" : "ltr"}
            aria-current={language === currentLanguage ? "true" : undefined}
            onClick={closeMenu}
          >
            <span>{languageNames[language]}</span>
            <span className={styles.code}>{language.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
