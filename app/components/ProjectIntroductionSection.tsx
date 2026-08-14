"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  revealViewport,
  softFadeRise,
  softRevealTransition,
} from "../lib/motion";
import styles from "./ProjectIntroductionSection.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

const content = {
  en: {
    title: "Palestinians Are Your Eyes",
    alt: "AnQa performers during All That’s Left to Me",
    introduction: "is a theatrical reading composed of",
    emphasis: "six unpublished texts",
    conclusion:
      "written by Gazan authors from the Italian-Palestinian theatre company Anqa, established in 2023 under the impulse of Progetto REC.Palestina.",
  },
  ar: {
    title: "الفلسطينيون هم عيناك",
    alt: "مؤدو فرقة عنقاء خلال عرض كل ما تبقى لي",
    introduction: "قراءة مسرحية تتألف من",
    emphasis: "ستة نصوص غير منشورة",
    conclusion:
      "كتبها مؤلفون من غزة ينتمون إلى فرقة عنقاء المسرحية الإيطالية الفلسطينية، التي تأسست عام 2023 بدافع من مشروع REC.Palestina.",
  },
  it: {
    title: "I palestinesi sono i tuoi occhi",
    alt: "Gli interpreti di AnQa durante Tutto ciò che mi resta",
    introduction: "è una lettura teatrale composta da",
    emphasis: "sei testi inediti",
    conclusion:
      "scritti da autori gazawi della compagnia teatrale italo-palestinese Anqa, nata nel 2023 su impulso di Progetto REC.Palestina.",
  },
  fr: {
    title: "Les Palestiniens sont tes yeux",
    alt: "Les interprètes d’AnQa pendant Tout ce qu’il me reste",
    introduction: "est une lecture théâtrale composée de",
    emphasis: "six textes inédits",
    conclusion:
      "écrits par des auteurs gazaouis de la compagnie théâtrale italo-palestinienne Anqa, fondée en 2023 à l’initiative de Progetto REC.Palestina.",
  },
  tr: {
    title: "Filistinliler Senin Gözlerindir",
    alt: "AnQa oyuncuları All That’s Left to Me gösterisi sırasında",
    introduction: "şunlardan oluşan bir tiyatro okumasıdır:",
    emphasis: "yayımlanmamış altı metin",
    conclusion:
      "2023 yılında Progetto REC.Palestina’nın girişimiyle kurulan İtalyan-Filistinli tiyatro topluluğu Anqa’nın Gazzeli yazarları tarafından kaleme alınmıştır.",
  },
} as const satisfies Record<Language, Record<string, string>>;

const revealProps = {
  initial: "hidden",
  variants: softFadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

export function ProjectIntroductionSection({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section className={styles.section} aria-label={t.title}>
      <motion.div
        className={styles.imageFrame}
        transition={softRevealTransition}
        {...revealProps}
      >
        <Image
          className={styles.image}
          src="/images/All thats left to me - Queen 01.jpg"
          alt={t.alt}
          fill
          sizes="(max-width: 700px) calc(100vw - 40px), 55vw"
        />
      </motion.div>

      <motion.p
        className={styles.introduction}
        transition={{ ...softRevealTransition, delay: 0.1 }}
        {...revealProps}
      >
        <cite>{t.title}</cite> {t.introduction}{" "}
        <strong>{t.emphasis}</strong> {t.conclusion}
      </motion.p>
    </section>
  );
}
