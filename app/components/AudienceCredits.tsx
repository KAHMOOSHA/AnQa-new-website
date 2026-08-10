"use client";

import { motion } from "motion/react";
import {
  fadeRise,
  revealTransition,
  revealViewport,
} from "../lib/motion";
import styles from "./AudienceCredits.module.css";

export function AudienceCredits({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={fadeRise}
          transition={{
            ...revealTransition,
            delay: Math.min(index * 0.04, 0.2),
          }}
          key={item}
        >
          <strong>{item}</strong>
        </motion.li>
      ))}
    </ul>
  );
}
