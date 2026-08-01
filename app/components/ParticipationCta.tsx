import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./ParticipationCta.module.css";

type Language = "en" | "ar" | "it" | "fr";

const content: Record<
  Language,
  {
    heading: string;
    action: string;
    howToJoin: string;
    placeholder: string;
  }
> = {
  en: {
    heading: "Let's do theater together",
    action: "Host a Performance on October 15th — Join the Global Premiere",
    howToJoin: "How to join",
    placeholder:
      "Participation details for hosting a performance on October 15th will be added here.",
  },
  ar: {
    heading: "لنصنع المسرح معاً",
    action: "استضف عرضاً في 15 أكتوبر — انضم إلى العرض العالمي الأول",
    howToJoin: "كيفية المشاركة",
    placeholder: "ستُضاف هنا تفاصيل استضافة عرض في 15 أكتوبر.",
  },
  it: {
    heading: "Facciamo teatro insieme",
    action:
      "Ospita uno spettacolo il 15 ottobre — Unisciti alla première mondiale",
    howToJoin: "Come partecipare",
    placeholder:
      "Qui verranno aggiunti i dettagli per ospitare uno spettacolo il 15 ottobre.",
  },
  fr: {
    heading: "Faisons du théâtre ensemble",
    action:
      "Accueillez une représentation le 15 octobre — Rejoignez la première mondiale",
    howToJoin: "Comment participer",
    placeholder:
      "Les modalités pour accueillir une représentation le 15 octobre seront ajoutées ici.",
  },
};

export function ParticipationCta({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section className={styles.cta} aria-labelledby="participation-heading">
      <h2 id="participation-heading">{t.heading}</h2>
      <Link className={styles.link} href={`/${language}/support#how-to-join`}>
        <span>{t.action}</span>
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </section>
  );
}

export function HowToJoinSection({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section
      className={styles.howToJoin}
      id="how-to-join"
      aria-labelledby="how-to-join-heading"
    >
      <p className="eyebrow">October 15</p>
      <h2 id="how-to-join-heading">{t.howToJoin}</h2>
      <p>{t.placeholder}</p>
    </section>
  );
}
