import { Globe2 } from "lucide-react";
import Link from "next/link";

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
    <details className="language-menu">
      <summary aria-label="Choose language" title="Choose language">
        <Globe2 aria-hidden="true" size={21} strokeWidth={1.8} />
        <span className="sr-only">Choose language</span>
      </summary>
      <div className="language-dropdown">
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
            <span className="language-code">{language.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
