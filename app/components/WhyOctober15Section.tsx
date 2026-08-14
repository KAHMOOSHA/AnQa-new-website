"use client";

import { motion } from "motion/react";
import {
  revealViewport,
  softFadeRise,
  softRevealTransition,
} from "../lib/motion";
import styles from "./WhyOctober15Section.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

const content = {
  en: {
    heading: "Why October 15",
    first:
      "October 15 is not just a date on the calendar, but an open wound in the history of our company. On that day in 2023, while rehearsals were supposed to begin in Milan for an Italian tour that never took place, news arrived of the death of Abraham Saidam, a young performer killed by Israeli bombings.",
    secondBeforeTitle:
      "To honor his memory and transform grief into cultural resistance, on October 15, 2026,",
    title: "Palestinians Are Your Eyes",
    secondAfterTitle:
      "will be staged—a distributed theatrical reading that will simultaneously involve theaters, associations, bookstores, and schools throughout Italy, Europe, Jordan, and Gaza. A chorus of voices to break the silence and tear down the fences of indifference.",
  },
  ar: {
    heading: "لماذا 15 أكتوبر؟",
    first:
      "ليس 15 أكتوبر مجرد تاريخ في التقويم، بل جرح مفتوح في تاريخ فرقتنا. ففي ذلك اليوم من عام 2023، وبينما كان من المفترض أن تبدأ التدريبات في ميلانو لجولة إيطالية لم تُقم أبداً، وصل خبر وفاة أبراهام صيدم، الفنان الشاب الذي قُتل في القصف الإسرائيلي.",
    secondBeforeTitle:
      "تكريماً لذكراه وتحويلاً للحزن إلى مقاومة ثقافية، سيُقدَّم في 15 أكتوبر 2026 عرض",
    title: "الفلسطينيون هم عيناك",
    secondAfterTitle:
      "وهو قراءة مسرحية موزعة تشارك فيها بالتزامن مسارح وجمعيات ومكتبات ومدارس في أنحاء إيطاليا وأوروبا والأردن وغزة. جوقة من الأصوات لكسر الصمت وهدم أسوار اللامبالاة.",
  },
  it: {
    heading: "Perché il 15 ottobre",
    first:
      "Il 15 ottobre non è soltanto una data sul calendario, ma una ferita aperta nella storia della nostra compagnia. Quel giorno del 2023, mentre a Milano sarebbero dovute iniziare le prove di una tournée italiana che non ebbe mai luogo, arrivò la notizia della morte di Abraham Saidam, un giovane interprete ucciso dai bombardamenti israeliani.",
    secondBeforeTitle:
      "Per onorarne la memoria e trasformare il dolore in resistenza culturale, il 15 ottobre 2026 andrà in scena",
    title: "I palestinesi sono i tuoi occhi",
    secondAfterTitle:
      "una lettura teatrale diffusa che coinvolgerà simultaneamente teatri, associazioni, librerie e scuole in Italia, Europa, Giordania e Gaza. Un coro di voci per rompere il silenzio e abbattere le barriere dell’indifferenza.",
  },
  fr: {
    heading: "Pourquoi le 15 octobre",
    first:
      "Le 15 octobre n’est pas une simple date du calendrier, mais une blessure ouverte dans l’histoire de notre compagnie. Ce jour-là, en 2023, alors que les répétitions d’une tournée italienne qui n’eut jamais lieu devaient commencer à Milan, nous avons appris la mort d’Abraham Saidam, un jeune interprète tué par les bombardements israéliens.",
    secondBeforeTitle:
      "Pour honorer sa mémoire et transformer le deuil en résistance culturelle, le 15 octobre 2026 sera présenté",
    title: "Les Palestiniens sont tes yeux",
    secondAfterTitle:
      "une lecture théâtrale décentralisée qui réunira simultanément des théâtres, des associations, des librairies et des écoles en Italie, en Europe, en Jordanie et à Gaza. Un chœur de voix pour rompre le silence et abattre les barrières de l’indifférence.",
  },
  tr: {
    heading: "Neden 15 Ekim?",
    first:
      "15 Ekim yalnızca takvimdeki bir tarih değil, topluluğumuzun tarihinde açık bir yaradır. 2023’te o gün, Milano’da hiçbir zaman gerçekleşemeyen bir İtalya turnesinin provaları başlayacakken, İsrail bombardımanında öldürülen genç oyuncu Abraham Saidam’ın ölüm haberi geldi.",
    secondBeforeTitle:
      "Onun anısını yaşatmak ve acıyı kültürel direnişe dönüştürmek için 15 Ekim 2026’da",
    title: "Filistinliler Senin Gözlerindir",
    secondAfterTitle:
      "sahnelenecek. Bu dağıtık tiyatro okuması; İtalya, Avrupa, Ürdün ve Gazze genelindeki tiyatroları, dernekleri, kitabevlerini ve okulları aynı anda bir araya getirecek. Sessizliği bozmak ve kayıtsızlığın duvarlarını yıkmak için yükselen bir sesler korosu.",
  },
} as const satisfies Record<Language, Record<string, string>>;

const revealProps = {
  initial: "hidden",
  variants: softFadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

export function WhyOctober15Section({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section className={styles.section} aria-labelledby="why-october-heading">
      <motion.h2
        id="why-october-heading"
        transition={softRevealTransition}
        {...revealProps}
      >
        {t.heading}
      </motion.h2>

      <motion.div
        className={styles.copy}
        transition={{ ...softRevealTransition, delay: 0.08 }}
        {...revealProps}
      >
        <p>{t.first}</p>

        <p>
          {t.secondBeforeTitle} <cite>{t.title}</cite>{" "}
          {t.secondAfterTitle}
        </p>
      </motion.div>
    </section>
  );
}
