"use client";

import { motion } from "motion/react";
import {
  fadeRise,
  revealTransition,
  revealViewport,
} from "../lib/motion";
import styles from "./TeamCreditsSection.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

const authors = [
  {
    name: "Ibrahim Alhelou",
    works: ["The Mother Poem", "The Pawn"],
  },
  {
    name: "Dalal Elswerky",
    works: ["Under an Olive-Green Sky", "A Pillar in the Concrete"],
  },
  {
    name: "Fatma Yousef",
    works: ["First Lesson"],
  },
  {
    name: "Ala’a Sbaih",
    works: ["Anqa Maghrib"],
  },
] as const;

const tutors = [
  { name: "Simon Gusman", hasCoordinatorRole: true },
  { name: "Giulia Borghi" },
  { name: "Stefania Buraschi" },
  { name: "Donato Loiacono" },
  { name: "Mattia Majerna" },
  { name: "Mario Valenti" },
] as const;

const production = ["Karam Jad", "Matteo Schiatti", "Filippo Barone"] as const;

const content = {
  en: {
    heading: "The team",
    authors: "Authors",
    tutors: "Tutors",
    production: "Production",
    coordinator: "Coordinator",
    works: {
      "The Mother Poem": "The Mother Poem",
      "The Pawn": "The Pawn",
      "Under an Olive-Green Sky": "Under an Olive-Green Sky",
      "A Pillar in the Concrete": "A Pillar in the Concrete",
      "First Lesson": "First Lesson",
      "Anqa Maghrib": "Anqa Maghrib",
    },
  },
  ar: {
    heading: "فريق العمل",
    authors: "المؤلفون",
    tutors: "المشرفون",
    production: "الإنتاج",
    coordinator: "المنسق",
    works: {
      "The Mother Poem": "أم القصائد",
      "The Pawn": "البيدق",
      "Under an Olive-Green Sky": "تحت سماء خضراء زيتونية",
      "A Pillar in the Concrete": "عمود في الخرسانة",
      "First Lesson": "الدرس الأول",
      "Anqa Maghrib": "عنقاء مغرب",
    },
  },
  it: {
    heading: "La squadra",
    authors: "Autori",
    tutors: "Tutor",
    production: "Produzione",
    coordinator: "Coordinatore",
    works: {
      "The Mother Poem": "La poesia madre",
      "The Pawn": "Il pedone",
      "Under an Olive-Green Sky": "Sotto un cielo verde oliva",
      "A Pillar in the Concrete": "Un pilastro nel cemento",
      "First Lesson": "Prima lezione",
      "Anqa Maghrib": "Anqa Maghrib",
    },
  },
  fr: {
    heading: "L’équipe",
    authors: "Auteurs",
    tutors: "Tuteurs",
    production: "Production",
    coordinator: "Coordinateur",
    works: {
      "The Mother Poem": "Le poème mère",
      "The Pawn": "Le pion",
      "Under an Olive-Green Sky": "Sous un ciel vert olive",
      "A Pillar in the Concrete": "Un pilier dans le béton",
      "First Lesson": "Première leçon",
      "Anqa Maghrib": "Anqa Maghrib",
    },
  },
  tr: {
    heading: "Ekip",
    authors: "Yazarlar",
    tutors: "Eğitmenler",
    production: "Yapım",
    coordinator: "Koordinatör",
    works: {
      "The Mother Poem": "Anne Şiiri",
      "The Pawn": "Piyon",
      "Under an Olive-Green Sky": "Zeytin Yeşili Bir Göğün Altında",
      "A Pillar in the Concrete": "Betondaki Bir Sütun",
      "First Lesson": "İlk Ders",
      "Anqa Maghrib": "Anqa Maghrib",
    },
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
      </motion.header>

      <div className={styles.programme}>
        <motion.section className={styles.authors} {...revealProps}>
          <h3>{t.authors}</h3>
          <ul className={styles.authorList}>
            {authors.map((author) => (
              <li key={author.name}>
                <strong>{author.name}</strong>
                <span>
                  {author.works.map((work, index) => (
                    <span key={work}>
                      <cite>{t.works[work]}</cite>
                      {index < author.works.length - 1 && (
                        <span className={styles.separator} aria-hidden="true">
                          {" "}·{" "}
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section className={styles.tutors} {...revealProps}>
          <h3>{t.tutors}</h3>
          <ul className={styles.tutorList}>
            {tutors.map((tutor) => (
              <li key={tutor.name}>
                <strong>{tutor.name}</strong>
                {"hasCoordinatorRole" in tutor && (
                  <span className={styles.role}>{t.coordinator}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section className={styles.production} {...revealProps}>
          <h3>{t.production}</h3>
          <ul>
            {production.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </motion.section>
      </div>
    </section>
  );
}
