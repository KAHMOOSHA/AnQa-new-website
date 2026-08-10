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

type MobileNavigationProps = {
  links: NavigationLink[];
};

export function MobileNavigation({ links }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
        <nav className={styles.navigation} aria-label="Mobile navigation">
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
          <span>Follow AnQa on Instagram</span>
        </a>
      </div>
    </div>
  );
}
