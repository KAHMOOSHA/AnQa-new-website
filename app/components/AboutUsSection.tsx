"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  fadeRise,
  revealTransition,
  revealViewport,
} from "../lib/motion";
import styles from "./AboutUsSection.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

type AboutUsCopy = {
  heading: string;
  imageAlt: string;
  storyHeading: string;
  storyFirstBeforeTitle: string;
  productionTitle: string;
  storyFirstBetweenTitles: string;
  sourceTitle: string;
  storyFirstAfterTitle: string;
  storySecond: string;
  projectPrefix: string;
  projectTitle: string;
  projectFirst: string;
  projectSecond: string;
};

const content: Record<Language, AboutUsCopy> = {
  en: {
    heading: "About us",
    imageAlt: "Odysseus and Telemachus on stage during All That’s Left to Me",
    storyHeading: "Anqa: The Story of the Company",
    storyFirstBeforeTitle:
      "Between late 2022 and early 2023, a group of Italian operators from Progetto REC.Palestina traveled to the Gaza Strip to found the Anqa Theater Company alongside local youth. Together, they created the production",
    productionTitle: "All That’s Left to Me",
    storyFirstBetweenTitles: "(a title paraphrasing Ghassan Kanafani’s",
    sourceTitle: "All That’s Left to You",
    storyFirstAfterTitle: ").",
    storySecond:
      "The play premiered at Ayyam Al Masrah (Theatre Day Productions) in Gaza City on January 7, 2023. Inspired by the Odyssey, it served as a metaphor for an infinite journey—the painful narrative of Palestine, a land where refugees cannot return and from which the youth cannot leave.",
    projectPrefix: "About our new project:",
    projectTitle: "Palestinians are your eyes",
    projectFirst:
      "The reading gathers six texts written by Gazan authors of the Anqa company. They are heterogeneous narratives, blending raw realism and allegory, offering a pluralistic testimony of life in the Gaza Strip, marked by years of segregation. For those living through the horror, writing becomes poiesis: a space of freedom where pain is transfigured into living words.",
    projectSecond:
      "The initiative stems from the urgent need to tell the tragedy of a people beyond the filters of propaganda. If bombs prevent Gazan actors from stepping onto physical stages, nothing can stop their stories. The project, whose title pays homage to the poet Mahmoud Darwish, aspires to become a collective memory and a bridge between distant worlds.",
  },
  ar: {
    heading: "من نحن",
    imageAlt: "أوديسيوس وتليماخوس على خشبة المسرح خلال عرض كل ما تبقى لي",
    storyHeading: "عنقاء: حكاية الفرقة",
    storyFirstBeforeTitle:
      "بين أواخر عام 2022 وبداية عام 2023، سافرت مجموعة من العاملين الإيطاليين في Progetto REC.Palestina إلى قطاع غزة لتأسيس فرقة عنقاء المسرحية مع شباب من غزة. وأنجزوا معاً عرض",
    productionTitle: "كل ما تبقى لي",
    storyFirstBetweenTitles: "(وهو عنوان يحاكي عنوان غسان كنفاني",
    sourceTitle: "ما تبقى لكم",
    storyFirstAfterTitle: ").",
    storySecond:
      "عُرضت المسرحية للمرة الأولى في مؤسسة أيام المسرح (Theatre Day Productions) بمدينة غزة في 7 يناير 2023. واستلهمت الأوديسة لتجعل منها استعارة لرحلة لا تنتهي؛ حكاية فلسطين المؤلمة، الأرض التي لا يستطيع اللاجئون العودة إليها ولا يستطيع شبابها مغادرتها.",
    projectPrefix: "حول مشروعنا الجديد:",
    projectTitle: "الفلسطينيون هم عيناك",
    projectFirst:
      "تجمع القراءة ستة نصوص كتبها مؤلفون من غزة ينتمون إلى فرقة عنقاء. وهي سرديات متنوعة تمزج بين الواقعية الخام والمجاز، وتقدم شهادة متعددة الأصوات عن الحياة في قطاع غزة بعد سنوات من العزل. بالنسبة إلى من يعيشون هذا الرعب، تصبح الكتابة فعل خلق؛ مساحة للحرية يتحول فيها الألم إلى كلمات حية.",
    projectSecond:
      "تنبع المبادرة من الحاجة الملحة إلى رواية مأساة شعب بعيداً عن مرشحات الدعاية. وإذا كانت القنابل تمنع ممثلي غزة من الصعود إلى خشبات المسرح الحقيقية، فلا شيء يستطيع إيقاف حكاياتهم. يطمح المشروع، الذي يحيّي في عنوانه الشاعر محمود درويش، إلى أن يصبح ذاكرة جماعية وجسراً بين عوالم متباعدة.",
  },
  it: {
    heading: "Chi siamo",
    imageAlt:
      "Odisseo e Telemaco in scena durante All That’s Left to Me",
    storyHeading: "Anqa: la storia della compagnia",
    storyFirstBeforeTitle:
      "Tra la fine del 2022 e l’inizio del 2023, un gruppo di operatori italiani di Progetto REC.Palestina si è recato nella Striscia di Gaza per fondare, insieme a giovani del luogo, la compagnia teatrale Anqa. Insieme hanno creato lo spettacolo",
    productionTitle: "All That’s Left to Me",
    storyFirstBetweenTitles:
      "(un titolo che parafrasa l’opera di Ghassan Kanafani",
    sourceTitle: "All That’s Left to You",
    storyFirstAfterTitle: ").",
    storySecond:
      "Lo spettacolo ha debuttato ad Ayyam Al Masrah (Theatre Day Productions), a Gaza City, il 7 gennaio 2023. Ispirato all’Odissea, è diventato la metafora di un viaggio infinito: la dolorosa narrazione della Palestina, una terra in cui i rifugiati non possono tornare e da cui i giovani non possono partire.",
    projectPrefix: "Il nostro nuovo progetto:",
    projectTitle: "I palestinesi sono i tuoi occhi",
    projectFirst:
      "La lettura riunisce sei testi scritti dagli autori gazawi della compagnia Anqa. Sono narrazioni eterogenee che intrecciano realismo crudo e allegoria, offrendo una testimonianza plurale della vita nella Striscia di Gaza, segnata da anni di segregazione. Per chi vive l’orrore, la scrittura diventa poiesis: uno spazio di libertà in cui il dolore si trasfigura in parole vive.",
    projectSecond:
      "L’iniziativa nasce dall’urgenza di raccontare la tragedia di un popolo oltre i filtri della propaganda. Se le bombe impediscono agli attori gazawi di salire sui palcoscenici fisici, nulla può fermare le loro storie. Il progetto, il cui titolo rende omaggio al poeta Mahmoud Darwish, aspira a diventare una memoria collettiva e un ponte tra mondi lontani.",
  },
  fr: {
    heading: "À propos de nous",
    imageAlt:
      "Ulysse et Télémaque sur scène pendant All That’s Left to Me",
    storyHeading: "Anqa : l’histoire de la compagnie",
    storyFirstBeforeTitle:
      "Entre la fin de l’année 2022 et le début de l’année 2023, un groupe d’intervenants italiens de Progetto REC.Palestina s’est rendu dans la bande de Gaza afin de fonder la compagnie théâtrale Anqa avec de jeunes Gazaouis. Ensemble, ils ont créé le spectacle",
    productionTitle: "All That’s Left to Me",
    storyFirstBetweenTitles:
      "(un titre qui paraphrase l’œuvre de Ghassan Kanafani",
    sourceTitle: "All That’s Left to You",
    storyFirstAfterTitle: ").",
    storySecond:
      "Le spectacle a été créé à Ayyam Al Masrah (Theatre Day Productions), à Gaza, le 7 janvier 2023. Inspiré de l’Odyssée, il est devenu la métaphore d’un voyage infini : le récit douloureux de la Palestine, une terre où les réfugiés ne peuvent revenir et que les jeunes ne peuvent quitter.",
    projectPrefix: "Notre nouveau projet :",
    projectTitle: "Les Palestiniens sont tes yeux",
    projectFirst:
      "La lecture réunit six textes écrits par les auteurs gazaouis de la compagnie Anqa. Ces récits hétérogènes mêlent réalisme brut et allégorie, offrant un témoignage pluriel de la vie dans la bande de Gaza, marquée par des années de ségrégation. Pour celles et ceux qui vivent l’horreur, l’écriture devient poiesis : un espace de liberté où la douleur se transforme en paroles vivantes.",
    projectSecond:
      "L’initiative naît de l’urgence de raconter la tragédie d’un peuple au-delà des filtres de la propagande. Si les bombes empêchent les acteurs gazaouis de monter sur des scènes physiques, rien ne peut arrêter leurs histoires. Le projet, dont le titre rend hommage au poète Mahmoud Darwish, aspire à devenir une mémoire collective et un pont entre des mondes éloignés.",
  },
  tr: {
    heading: "Hakkımızda",
    imageAlt:
      "Odysseus ve Telemakhos, All That’s Left to Me gösterisi sırasında sahnede",
    storyHeading: "Anqa: Topluluğun hikâyesi",
    storyFirstBeforeTitle:
      "2022’nin sonları ile 2023’ün başları arasında Progetto REC.Palestina’dan bir grup İtalyan kültür çalışanı, yerel gençlerle birlikte Anqa Tiyatro Topluluğu’nu kurmak üzere Gazze Şeridi’ne gitti. Birlikte",
    productionTitle: "All That’s Left to Me",
    storyFirstBetweenTitles: "(adı, Ghassan Kanafani’nin",
    sourceTitle: "All That’s Left to You",
    storyFirstAfterTitle: "eserinin başlığını yeniden yorumlar) gösterisini yarattılar.",
    storySecond:
      "Oyun, 7 Ocak 2023’te Gazze kentindeki Ayyam Al Masrah’ta (Theatre Day Productions) prömiyer yaptı. Odysseia’dan esinlenen yapım, sonsuz bir yolculuğun metaforuna dönüştü: mültecilerin geri dönemediği, gençlerin ise ayrılamadığı bir ülke olan Filistin’in acılı anlatısı.",
    projectPrefix: "Yeni projemiz:",
    projectTitle: "Filistinliler Senin Gözlerindir",
    projectFirst:
      "Okuma, Anqa topluluğunun Gazzeli yazarları tarafından kaleme alınan altı metni bir araya getiriyor. Ham gerçekçilik ile alegoriyi buluşturan bu farklı anlatılar, yıllarca süren ayrımcılığın damgasını vurduğu Gazze Şeridi’ndeki yaşama çoğulcu bir tanıklık sunuyor. Dehşetin içinde yaşayanlar için yazmak poiesis’e dönüşüyor: acının canlı sözcüklere dönüştüğü bir özgürlük alanı.",
    projectSecond:
      "Bu girişim, bir halkın trajedisini propaganda filtrelerinin ötesinde anlatma yönündeki acil ihtiyaçtan doğuyor. Bombalar Gazzeli oyuncuların fiziksel sahnelere çıkmasını engellese de hiçbir şey onların hikâyelerini durduramaz. Adıyla şair Mahmud Derviş’e saygı duruşunda bulunan proje, kolektif bir hafızaya ve uzak dünyalar arasında bir köprüye dönüşmeyi amaçlıyor.",
  },
};

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

export function AboutUsSection({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section className={styles.section} aria-labelledby="about-us-heading">
      <motion.header className={styles.header} {...openingRevealProps}>
        <h2 id="about-us-heading">{t.heading}</h2>
      </motion.header>

      <motion.figure
        className={styles.imageFrame}
        {...openingRevealProps}
        transition={{ ...revealTransition, delay: 0.08 }}
      >
        <Image
          className={styles.image}
          src="/images/All thats left to me - Odysseus Telemachus 02.jpg"
          alt={t.imageAlt}
          fill
          loading="eager"
          sizes="(max-width: 600px) 100vw, 90vw"
        />
      </motion.figure>

      <motion.article className={styles.story} {...revealProps}>
        <h3>{t.storyHeading}</h3>
        <div className={styles.copy}>
          <p>
            {t.storyFirstBeforeTitle} <cite>{t.productionTitle}</cite>{" "}
            {t.storyFirstBetweenTitles} <cite>{t.sourceTitle}</cite>
            {t.storyFirstAfterTitle}
          </p>
          <p>{t.storySecond}</p>
        </div>
      </motion.article>

      <motion.article className={styles.newProject} {...revealProps}>
        <h3>
          <span>{t.projectPrefix}</span> {t.projectTitle}
        </h3>
        <div className={styles.copy}>
          <p>{t.projectFirst}</p>
          <p>{t.projectSecond}</p>
        </div>
      </motion.article>
    </section>
  );
}
