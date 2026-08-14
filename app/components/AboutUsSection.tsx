"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  fadeRise,
  revealTransition,
  revealViewport,
} from "../lib/motion";
import styles from "./AboutUsSection.module.css";

const revealProps = {
  initial: "hidden",
  transition: revealTransition,
  variants: fadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

const openingRevealProps = {
  animate: "visible",
  initial: "hidden",
  transition: revealTransition,
  variants: fadeRise,
} as const;

export function AboutUsSection() {
  return (
    <section className={styles.section} aria-labelledby="about-us-heading">
      <motion.header className={styles.header} {...openingRevealProps}>
        <h2 id="about-us-heading">About us</h2>
      </motion.header>

      <motion.figure
        className={styles.imageFrame}
        {...openingRevealProps}
        transition={{ ...revealTransition, delay: 0.08 }}
      >
        <Image
          className={styles.image}
          src="/images/All thats left to me - Odysseus Telemachus 02.jpg"
          alt="Odysseus and Telemachus on stage during All That’s Left to Me"
          fill
          loading="eager"
          sizes="(max-width: 600px) 100vw, 90vw"
        />
      </motion.figure>

      <motion.article className={styles.story} {...revealProps}>
        <h3>Anqa: The Story of the Company</h3>
        <div className={styles.copy}>
          <p>
            Between late 2022 and early 2023, a group of Italian operators from
            Progetto REC.Palestina traveled to the Gaza Strip to found the Anqa
            Theater Company alongside local youth. Together, they created the
            production <cite>All That&apos;s Left to Me</cite>{" "}(a title
            paraphrasing Ghassan Kanafani&apos;s <cite>All That&apos;s Left to You</cite>).
          </p>
          <p>
            The play premiered at Ayyam Al Masrah (Theatre Day Productions) in
            Gaza City on January 7, 2023. Inspired by the Odyssey, it served as
            a metaphor for an infinite journey—the painful narrative of
            Palestine, a land where refugees cannot return and from which the
            youth cannot leave.
          </p>
        </div>
      </motion.article>

      <motion.article className={styles.newProject} {...revealProps}>
        <h3>
          <span>About our new project:</span> Palestinians are your eyes
        </h3>
        <div className={styles.copy}>
          <p>
            The reading gathers six texts written by Gazan authors of the Anqa
            company. They are heterogeneous narratives, blending raw realism
            and allegory, offering a pluralistic testimony of life in the Gaza
            Strip, marked by years of segregation. For those living through
            the horror, writing becomes <em>poiesis</em>: a space of freedom
            where pain is transfigured into living words.
          </p>
          <p>
            The initiative stems from the urgent need to tell the tragedy of a
            people beyond the filters of propaganda. If bombs prevent Gazan
            actors from stepping onto physical stages, nothing can stop their
            stories. The project, whose title pays homage to the poet Mahmoud
            Darwish, aspires to become a collective memory and a bridge between
            distant worlds.
          </p>
        </div>
      </motion.article>
    </section>
  );
}
