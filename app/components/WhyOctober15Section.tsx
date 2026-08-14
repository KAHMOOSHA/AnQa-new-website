"use client";

import { motion } from "motion/react";
import {
  revealViewport,
  softFadeRise,
  softRevealTransition,
} from "../lib/motion";
import styles from "./WhyOctober15Section.module.css";

const revealProps = {
  initial: "hidden",
  variants: softFadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

export function WhyOctober15Section() {
  return (
    <section className={styles.section} aria-labelledby="why-october-heading">
      <motion.h2
        id="why-october-heading"
        transition={softRevealTransition}
        {...revealProps}
      >
        Why October 15
      </motion.h2>

      <motion.div
        className={styles.copy}
        transition={{ ...softRevealTransition, delay: 0.08 }}
        {...revealProps}
      >
        <p>
          October 15 is not just a date on the calendar, but an open wound in
          the history of our company. On that day in 2023, while rehearsals
          were supposed to begin in Milan for an Italian tour that never took
          place, news arrived of the death of Abraham Saidam, a young performer
          killed by Israeli bombings.
        </p>

        <p>
          To honor his memory and transform grief into cultural resistance, on
          October 15, 2026, <cite>Palestinians Are Your Eyes</cite> will be
          staged—a distributed theatrical reading that will simultaneously
          involve theaters, associations, bookstores, and schools throughout
          Italy, Europe, Jordan, and Gaza. A chorus of voices to break the
          silence and tear down the fences of indifference.
        </p>
      </motion.div>
    </section>
  );
}
