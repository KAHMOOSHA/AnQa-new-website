"use client";

import { Mail } from "lucide-react";
import { motion } from "motion/react";
import {
  revealViewport,
  softFadeRise,
  softRevealTransition,
} from "../lib/motion";
import styles from "./HowToJoinSection.module.css";

type Language = "en" | "ar" | "it" | "fr";

const headings: Record<Language, string> = {
  en: "How to join",
  ar: "كيفية المشاركة",
  it: "Come partecipare",
  fr: "Comment participer",
};

const applicationRequirements = [
  {
    title: "Identity of the Organization",
    description:
      "The name under which the reading will be staged (theatre company, association, collective, informal group, etc.), indicating, if possible, a website and social media channels.",
  },
  {
    title: "Territory",
    description:
      "The province and municipality where you intend to organize the event.",
  },
  {
    title: "Logistical Details",
    description: "The venue of the performance (theater, club, park, etc.).",
  },
  {
    title: "Cast and Crew",
    description:
      "The names of the performers, technicians, and directors involved.",
  },
] as const;

const revealProps = {
  initial: "hidden",
  transition: softRevealTransition,
  variants: softFadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

export function HowToJoinSection({ language }: { language: Language }) {
  return (
    <section
      className={styles.section}
      id="how-to-join"
      aria-labelledby="how-to-join-heading"
    >
      <motion.div className={styles.header} {...revealProps}>
        <div>
          <p className={styles.premiereStatement}>
            <span>Global</span>
            <span>Premiere</span>
          </p>
          <h2 id="how-to-join-heading">{headings[language]}</h2>
        </div>
        <time className={styles.eventDate} dateTime="2026-10-15">
          <span className={styles.dateMonth}>October</span>
          <strong className={styles.dateDay}>15</strong>
          <span className={styles.dateYear}>2026</span>
        </time>
      </motion.div>

      <motion.p className={styles.introduction} {...revealProps}>
        Participating in the distributed staging project on October 15, 2026, is
        simple. The initiative aims to unite diverse voices into a single, great
        collective narrative.
      </motion.p>

      <motion.div className={styles.applicationProcess} {...revealProps}>
        <div className={styles.applicationHeading}>
          <h3>Confirm your participation by email.</h3>
          <div className={styles.emailLinks}>
            <a
              className={styles.emailLink}
              href="mailto:progettorec.palestina@gmail.com"
            >
              progettorec.palestina@gmail.com
              <Mail aria-hidden="true" />
            </a>
            <a className={styles.emailLink} href="mailto:info@anqa.group">
              info@anqa.group
              <Mail aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <p className={styles.requirementsIntro}>
            In your application request, please specify:
          </p>
          <ul className={styles.requirements}>
            {applicationRequirements.map((requirement, index) => (
              <li key={requirement.title}>
                <span className={styles.requirementNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong>{requirement.title}</strong>
                  <p>{requirement.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.aside className={styles.note} {...revealProps}>
        <strong>Please note: </strong>It is not necessary to provide all
        technical details and collaborators&apos; names at the time of the first
        contact; the important thing is to communicate them as soon as they are
        finalized, so we can properly include every participant in the
        project&apos;s final credits.
      </motion.aside>

      <motion.p className={styles.applicationSynergies} {...revealProps}>
        <strong>Managing applications and synergies.</strong> Should multiple
        applications arrive for the same area, priority will be given to the
        first request received. However, the spirit of this project is deeply
        collaborative: our goal will be to foster synergies and collaborations
        among different entities operating in the same territories, joining
        forces for an even more significant impact. Once your application is
        accepted, you will officially become part of the network of
        organizations committed to staging{" "}
        <cite>Palestinians Are Your Eyes</cite> on October 15, 2026.
      </motion.p>
    </section>
  );
}
