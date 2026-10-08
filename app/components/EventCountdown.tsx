"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COUNTDOWN_TARGET, getCountdown } from "../lib/countdown";
import styles from "./EventCountdown.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";
const copy = {
  en: {
    title: "Countdown to October 15 - Global premiere",
    date: "October 15, 2026",
    zone: "Rome time",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    ended: "The countdown has ended.",
    near: "Look for the reading nearest to you",
    nearLink: "View venues",
  },
  ar: {
    title: "العد التنازلي إلى 15 أكتوبر - العرض الأول العالمي",
    date: "15 أكتوبر 2026",
    zone: "بتوقيت روما",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثوانٍ",
    ended: "انتهى العد التنازلي.",
    near: "ابحث عن القراءة الأقرب إليك",
    nearLink: "عرض الأماكن",
  },
  it: {
    title: "Conto alla rovescia al 15 ottobre - Anteprima mondiale",
    date: "15 ottobre 2026",
    zone: "Ora di Roma",
    days: "Giorni",
    hours: "Ore",
    minutes: "Minuti",
    seconds: "Secondi",
    ended: "Il conto alla rovescia è terminato.",
    near: "Cerca la lettura più vicina a te",
    nearLink: "Vedi i luoghi",
  },
  fr: {
    title: "Compte à rebours jusqu’au 15 octobre - Première mondiale",
    date: "15 octobre 2026",
    zone: "Heure de Rome",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    ended: "Le compte à rebours est terminé.",
    near: "Trouvez la lecture la plus proche de chez vous",
    nearLink: "Voir les lieux",
  },
  tr: {
    title: "15 Ekim’e geri sayım - Dünya prömiyeri",
    date: "15 Ekim 2026",
    zone: "Roma saati",
    days: "Gün",
    hours: "Saat",
    minutes: "Dakika",
    seconds: "Saniye",
    ended: "Geri sayım sona erdi.",
    near: "En yakın okumayı bulun",
    nearLink: "Mekânları görün",
  },
} as const;

const units = ["days", "hours", "minutes", "seconds"] as const;

export function EventCountdown({ language }: { language: Language }) {
  // A stable initial render keeps statically generated pages hydration-safe.
  const [remaining, setRemaining] = useState<ReturnType<
    typeof getCountdown
  > | null>(null);
  const t = copy[language];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      const next = getCountdown(Date.now());
      setRemaining(next);
      if (next.ended && interval !== undefined) clearInterval(interval);
      return next.ended;
    };
    if (!update()) interval = setInterval(update, 1000);
    // Recalculate after a background tab resumes; never count interval ticks.
    const onVisibilityChange = () => {
      if (!document.hidden) update();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <section className={styles.section} aria-label={t.title}>
      <div className={styles.date}>
        <time dateTime={COUNTDOWN_TARGET}>{t.date}</time>
        <span>{t.zone}</span>
      </div>
      <div role="timer" aria-label={t.title} aria-live="off">
        <dl className={styles.units}>
          {units.map((unit) => (
            <div className={styles.unit} key={unit}>
              <dt>{t[unit]}</dt>
              <dd>
                {remaining ? String(remaining[unit]).padStart(2, "0") : "—"}
              </dd>
            </div>
          ))}
        </dl>
        {remaining?.ended && <p className={styles.ended}>{t.ended}</p>}
      </div>
      <h3 className={styles.venuesPrompt}>
        <span>{t.near}</span>
        <Link className={styles.venuesLink} href={`/${language}/venues`}>
          {t.nearLink}
          <span aria-hidden="true">→</span>
        </Link>
      </h3>
    </section>
  );
}
