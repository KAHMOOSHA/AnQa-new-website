import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./ParticipationCta.module.css";

type Language = "en" | "ar" | "it" | "fr";

const content: Record<Language, { heading: string; action: string }> = {
  en: {
    heading: "Let's do theater together",
    action: "Host a Performance on October 15th — Join the Global Premiere",
  },
  ar: {
    heading: "لنصنع المسرح معاً",
    action: "استضف عرضاً في 15 أكتوبر — انضم إلى العرض العالمي الأول",
  },
  it: {
    heading: "Facciamo teatro insieme",
    action:
      "Ospita uno spettacolo il 15 ottobre — Unisciti alla première mondiale",
  },
  fr: {
    heading: "Faisons du théâtre ensemble",
    action:
      "Accueillez une représentation le 15 octobre — Rejoignez la première mondiale",
  },
};

export function ParticipationCta({ language }: { language: Language }) {
  const t = content[language];

  /* Previous 50/50 split layout. Keep this block so it can be restored later.
  return (
    <section className={styles.splitCta} aria-labelledby="participation-heading">
      <div className={styles.splitImage} aria-hidden="true" />
      <div className={styles.splitContent}>
        <h2 id="participation-heading">{t.heading}</h2>
        <Link className={styles.link} href={`/${language}/join#how-to-join`}>
          <span>{t.action}</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
  */

  return (
    <section
      className={styles.fullBleedCta}
      aria-labelledby="participation-heading"
    >
      <div className={styles.fullBleedContent}>
        <h2 id="participation-heading">{t.heading}</h2>
        <Link className={styles.link} href={`/${language}/join#how-to-join`}>
          <span>{t.action}</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
