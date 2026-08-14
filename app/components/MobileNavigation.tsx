"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./MobileNavigation.module.css";

type NavigationLink = {
  current: boolean;
  href: string;
  label: string;
};

type Language = "en" | "ar" | "it" | "fr" | "tr";

type MobileNavigationProps = {
  language: Language;
  links: NavigationLink[];
};

const labels = {
  en: {
    open: "Open navigation menu",
    close: "Close navigation menu",
    navigation: "Mobile navigation",
    instagram: "Follow AnQa on Instagram",
  },
  ar: {
    open: "افتح قائمة التنقل",
    close: "أغلق قائمة التنقل",
    navigation: "التنقل على الهاتف",
    instagram: "تابع عنقاء على إنستغرام",
  },
  it: {
    open: "Apri il menu di navigazione",
    close: "Chiudi il menu di navigazione",
    navigation: "Navigazione mobile",
    instagram: "Segui AnQa su Instagram",
  },
  fr: {
    open: "Ouvrir le menu de navigation",
    close: "Fermer le menu de navigation",
    navigation: "Navigation mobile",
    instagram: "Suivez AnQa sur Instagram",
  },
  tr: {
    open: "Gezinme menüsünü aç",
    close: "Gezinme menüsünü kapat",
    navigation: "Mobil gezinme",
    instagram: "AnQa’yı Instagram’da takip edin",
  },
} as const;

export function MobileNavigation({ language, links }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = labels[language];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const desktopQuery = window.matchMedia("(min-width: 901px)");

    function closeMenu() {
      setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) closeMenu();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [isOpen]);

  return (
    <div className={`${styles.root} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.toggle}
        type="button"
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? t.close : t.open}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.icon} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <div
        className={styles.panel}
        id="mobile-navigation-panel"
        aria-hidden={!isOpen}
      >
        <nav className={styles.navigation} aria-label={t.navigation}>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={link.current ? "page" : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          className={styles.instagram}
          href="https://www.instagram.com/the.anqa.group/"
          target="_blank"
          rel="noreferrer"
        >
          <ArrowUpRight aria-hidden="true" />
          <span>{t.instagram}</span>
        </a>
      </div>
    </div>
  );
}
