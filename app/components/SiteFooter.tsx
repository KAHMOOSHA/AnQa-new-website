import Image from "next/image";
import Link from "next/link";
import { AnimatedFooterCanvas } from "./AnimatedFooterCanvas";
import styles from "./SiteFooter.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

type FooterLink = {
  href: string;
  label: string;
};

type FooterCopy = {
  action: string;
  contact: string;
  explore: string;
  navigationLabel: string;
  copyright: string;
};

const footerCopy: Record<Language, FooterCopy> = {
  en: {
    action: "How to join",
    contact: "Contact",
    explore: "Explore",
    navigationLabel: "Footer navigation",
    copyright: "AnQa Theatre Company",
  },
  ar: {
    action: "كيفية المشاركة",
    contact: "تواصل معنا",
    explore: "استكشف",
    navigationLabel: "روابط التذييل",
    copyright: "فرقة عنقاء المسرحية",
  },
  it: {
    action: "Come partecipare",
    contact: "Contatti",
    explore: "Esplora",
    navigationLabel: "Navigazione a piè di pagina",
    copyright: "Compagnia teatrale AnQa",
  },
  fr: {
    action: "Comment participer",
    contact: "Contact",
    explore: "Explorer",
    navigationLabel: "Navigation du pied de page",
    copyright: "Compagnie théâtrale AnQa",
  },
  tr: {
    action: "Nasıl katılabilirsiniz",
    contact: "İletişim",
    explore: "Keşfet",
    navigationLabel: "Alt bilgi gezinmesi",
    copyright: "AnQa Tiyatro Topluluğu",
  },
};

type SiteFooterProps = {
  language: Language;
  links: FooterLink[];
  year: number;
};

export function SiteFooter({ language, links, year }: SiteFooterProps) {
  const t = footerCopy[language];
  const howToJoinHref = `/${language}/join#how-to-join`;

  return (
    <footer className={styles.footer}>
      <AnimatedFooterCanvas />

      <div className={styles.content}>
        <div className={styles.information}>
          <div className={styles.identity}>
            <Link className={styles.logoLink} href={`/${language}`}>
              <span className={styles.logoFrame}>
                <Image
                  className={styles.logoImage}
                  src="/images/anqa-logo.png"
                  alt="AnQa"
                  width={842}
                  height={594}
                />
              </span>
            </Link>
          </div>

          <nav aria-label={t.navigationLabel}>
            <h3>{t.explore}</h3>
            <div className={styles.linkList}>
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href={howToJoinHref}>{t.action}</Link>
            </div>
          </nav>

          <div className={styles.contact}>
            <h3>{t.contact}</h3>
            <a href="mailto:info@anqa.group">info@anqa.group</a>
            <a href="mailto:progettorec.palestina@gmail.com">
              progettorec.palestina@gmail.com
            </a>
          </div>

          <div>
            <a
              className={styles.socialLink}
              href="https://www.instagram.com/the.anqa.group/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Image
                className={styles.instagramIcon}
                src="/icons/instagram.svg"
                alt=""
                width={30}
                height={30}
              />
            </a>
          </div>
        </div>

        <div className={styles.bottomLine}>
          <span>© {year} {t.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
