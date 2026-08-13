"use client";

import { motion } from "motion/react";
import {
  fadeRise,
  revealTransition,
  revealViewport,
} from "../lib/motion";
import styles from "./TeamCreditsSection.module.css";

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
  { name: "Simon Gusman", role: "Coordinator" },
  { name: "Giulia Borghi" },
  { name: "Stefania Buraschi" },
  { name: "Donato Loiacono" },
  { name: "Mattia Majerna" },
  { name: "Mario Valenti" },
] as const;

const production = ["Karam Jad", "Matteo Schiatti", "Filippo Barone"] as const;

const revealProps = {
  initial: "hidden",
  transition: revealTransition,
  variants: fadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

export function TeamCreditsSection() {
  return (
    <section className={styles.section} aria-labelledby="team-credits-heading">
      <motion.header className={styles.header} {...revealProps}>
        <h2 id="team-credits-heading">The team</h2>
      </motion.header>

      <div className={styles.programme}>
        <motion.section className={styles.authors} {...revealProps}>
          <h3>Authors</h3>
          <ul className={styles.authorList}>
            {authors.map((author) => (
              <li key={author.name}>
                <strong>{author.name}</strong>
                <span>
                  {author.works.map((work, index) => (
                    <span key={work}>
                      <cite>{work}</cite>
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
          <h3>Tutors</h3>
          <ul className={styles.tutorList}>
            {tutors.map((tutor) => (
              <li key={tutor.name}>
                <strong>{tutor.name}</strong>
                {"role" in tutor && (
                  <span className={styles.role}>{tutor.role}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section className={styles.production} {...revealProps}>
          <h3>Production</h3>
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
