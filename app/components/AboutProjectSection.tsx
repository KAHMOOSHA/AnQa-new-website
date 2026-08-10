"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  fadeRise,
  revealTransition,
  revealViewport,
} from "../lib/motion";
import styles from "./AboutProjectSection.module.css";

const operationalGuidelines = [
  {
    title: "Event Location",
    description:
      "Theaters, cultural centers, bookstores, or unconventional spaces.",
  },
  {
    title: "Cast",
    description:
      "Involvement of professionals or non-professional performers.",
  },
  {
    title: "Stage Design",
    description:
      "The freedom to integrate the performance with musical contributions, video projections, or specific lighting designs.",
  },
] as const;

const providedResources = [
  {
    title: "Complete Script",
    description:
      "The six unpublished stories exploring the reality of Gaza. The text will be distributed under a Creative Commons license to encourage maximum free distribution, requiring only the right of attribution.",
  },
  {
    title: "Audio Contributions (optional)",
    description:
      "Original recordings by the Gazan authors, which can be used as a soundscape during the event.",
  },
] as const;

function DetailList({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  return (
    <dl className={styles.detailList}>
      {items.map((item) => (
        <div key={item.title}>
          <dt>{item.title}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}

const revealProps = {
  initial: "hidden",
  transition: revealTransition,
  variants: fadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

export function AboutProjectSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-project-heading"
    >
      <motion.header className={styles.header} {...revealProps}>
        <div className={styles.headerImageFrame}>
          <Image
            className={styles.headerImage}
            src="/images/anqa-backstage-16.jpeg"
            alt="AnQa performers preparing backstage"
            fill
            sizes="(max-width: 900px) 90vw, 42vw"
          />
        </div>
        <h2 id="about-project-heading">About the project</h2>
      </motion.header>

      <motion.article className={styles.chapter} {...revealProps}>
        <div className={styles.chapterHeading}>
          <h3>Operational Guidelines</h3>
        </div>
        <div className={styles.chapterBody}>
          <p>
            Each participating organization operates with full organizational
            and artistic autonomy, with the freedom to define:
          </p>
          <DetailList items={operationalGuidelines} />
        </div>
      </motion.article>

      <motion.article
        className={`${styles.chapter} ${styles.resourcesChapter}`}
        {...revealProps}
      >
        <div className={styles.chapterHeading}>
          <h3>Provided Resources</h3>
          <p>Digital Kit</p>
        </div>
        <div className={styles.chapterBody}>
          <p>
            Progetto REC will provide participating entities with the necessary
            materials to stage the reading:
          </p>
          <DetailList items={providedResources} />
        </div>
      </motion.article>

      <motion.article className={styles.chapter} {...revealProps}>
        <div className={styles.chapterHeading}>
          <h3>Communication and Documentary Project</h3>
        </div>
        <div className={styles.chapterBody}>
          <p>
            All events will receive visibility through our official channels
            based on the information provided by the participating entities.
            Furthermore, organizations that choose to document their evening
            with video can send us the filmed footage: the recordings will
            merge into a documentary project dedicated to the choral narration
            of this initiative.
          </p>
        </div>
      </motion.article>

      <motion.article className={styles.chapter} {...revealProps}>
        <div className={styles.chapterHeading}>
          <h3>Solidarity Initiatives</h3>
        </div>
        <div className={styles.chapterBody}>
          <p>
            Participating entities, where possible, can donate a portion of the
            proceeds or collected donations to Progetto REC.Palestina.
          </p>
          <p>
            These funds will be used partly to support the activities of the
            AnQa theatre company—providing a contribution to the Gazan authors
            of the texts and investing in future projects—and partly for the
            humanitarian interventions of Emergenza Gaza.
          </p>
          <p className={styles.optionalNote}>
            <strong>Please note:</strong> The contribution to Progetto REC
            remains optional and at the discretion of individual organizers.
          </p>
        </div>
      </motion.article>
    </section>
  );
}
