"use client";

import { motion } from "motion/react";
import { fadeRise, revealTransition, revealViewport } from "../lib/motion";
import styles from "./TeamCreditsSection.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

const credits = [
  { role: "authors", names: ["Ibrahim Alhelou", "Dalal Elswerky", "Fatma Yousef", "Ala’a Sbaih"] },
  { role: "supervisor", names: ["Simon Gusman"] },
  { role: "tutors", names: ["Giulia Borghi", "Stefania Buraschi", "Donato Loiacono", "Mattia Majerna"] },
  { role: "productionManagers", names: ["Karam Jad", "Marco Stefani", "Gaetano Zamboni"] },
  { role: "communicationsManagers", names: ["Gaetano Zamboni", "Maryam Ciccone"] },
  { role: "production", names: ["Fatma Yousef", "Filippo Barone", "Antonella Lamparelli", "Mario Valenti"] },
] as const;

const content = {
  en: {
    heading: "The team",
    authors: "Authors",
    supervisor: "Supervisor",
    tutors: "Tutors",
    productionManagers: "Production Managers",
    communicationsManagers: "Communications Managers",
    production: "Production",
  },
  ar: {
    heading: "فريق العمل",
    authors: "المؤلفون",
    supervisor: "المشرف",
    tutors: "المرشدون",
    productionManagers: "مديرو الإنتاج",
    communicationsManagers: "مديرو التواصل",
    production: "الإنتاج",
  },
  it: {
    heading: "La squadra",
    authors: "Autori",
    supervisor: "Supervisore",
    tutors: "Tutor",
    productionManagers: "Responsabili di produzione",
    communicationsManagers: "Responsabili della comunicazione",
    production: "Produzione",
  },
  fr: {
    heading: "L’équipe",
    authors: "Auteurs",
    supervisor: "Superviseur",
    tutors: "Tuteurs",
    productionManagers: "Responsables de production",
    communicationsManagers: "Responsables de la communication",
    production: "Production",
  },
  tr: {
    heading: "Ekip",
    authors: "Yazarlar",
    supervisor: "Danışman",
    tutors: "Eğitmenler",
    productionManagers: "Yapım Sorumluları",
    communicationsManagers: "İletişim Sorumluları",
    production: "Yapım",
  },
} as const;

const revealProps = {
  initial: "hidden",
  transition: revealTransition,
  variants: fadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

export function TeamCreditsSection({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section className={styles.section} aria-labelledby="team-credits-heading">
      <motion.header className={styles.header} {...revealProps}>
        <h2 id="team-credits-heading">{t.heading}</h2>
        <p dir="auto">Palestinians Are Your Eyes</p>
      </motion.header>

      <div className={styles.programme}>
        {credits.map(({ role, names }) => (
          <motion.section key={role} {...revealProps}>
            <h3>{t[role]}</h3>
            <ul className={styles.creditList}>
              {names.map((name) => (
                <li key={name}><bdi>{name}</bdi></li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </section>
  );
}
