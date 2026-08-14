"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  revealViewport,
  softFadeRise,
  softRevealTransition,
} from "../lib/motion";
import styles from "./ProjectIntroductionSection.module.css";

const revealProps = {
  initial: "hidden",
  variants: softFadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

export function ProjectIntroductionSection() {
  return (
    <section className={styles.section} aria-label="Palestinians Are Your Eyes">
      <motion.div
        className={styles.imageFrame}
        transition={softRevealTransition}
        {...revealProps}
      >
        <Image
          className={styles.image}
          src="/images/All thats left to me - Queen 01.jpg"
          alt="AnQa performers during All That’s Left to Me"
          fill
          sizes="(max-width: 700px) calc(100vw - 40px), 55vw"
        />
      </motion.div>

      <motion.p
        className={styles.introduction}
        transition={{ ...softRevealTransition, delay: 0.1 }}
        {...revealProps}
      >
        <cite>Palestinians Are Your Eyes</cite> is a theatrical reading composed
        of <strong>six unpublished texts</strong> written by Gazan authors from
        the Italian-Palestinian theatre company Anqa, established in 2023 under
        the impulse of Progetto REC.Palestina.
      </motion.p>
    </section>
  );
}
