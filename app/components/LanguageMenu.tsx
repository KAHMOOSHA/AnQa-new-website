import { Globe2 } from "lucide-react";
import Link from "next/link";
import styles from "./LanguageMenu.module.css";

const languageNames = {
  en: "English",
  ar: "العربية",
  it: "Italiano",
  fr: "Français",
} as const;

type Language = keyof typeof languageNames;

export function LanguageMenu({
  currentLanguage,
  pagePath,
}: {
  currentLanguage: Language;
  pagePath: string;
}) {
  return (
    <details className={styles.menu}>
      <summary aria-label="Choose language" title="Choose language">
        <Globe2 aria-hidden="true" size={21} strokeWidth={1.8} />
        <span className={styles.srOnly}>Choose language</span>
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
          >
            <span>{languageNames[language]}</span>
            <span className={styles.code}>{language.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
