"use client";

import { Mail } from "lucide-react";
import { motion } from "motion/react";
import {
  revealViewport,
  softFadeRise,
  softRevealTransition,
} from "../lib/motion";
import styles from "./HowToJoinSection.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

type Requirement = { title: string; description: string };

type HowToJoinCopy = {
  heading: string;
  premiere: readonly [string, string];
  month: string;
  introduction: string;
  confirmation: string;
  requirementsIntroduction: string;
  requirements: readonly Requirement[];
  noteLabel: string;
  note: string;
  synergiesHeading: string;
  synergiesBeforeTitle: string;
  projectTitle: string;
  synergiesAfterTitle: string;
};

const content: Record<Language, HowToJoinCopy> = {
  en: {
    heading: "How to join",
    premiere: ["Global", "Premiere"],
    month: "October",
    introduction:
      "Participating in the distributed staging project on October 15, 2026, is simple. The initiative aims to unite diverse voices into a single, great collective narrative.",
    confirmation: "Confirm your participation by email.",
    requirementsIntroduction: "In your application request, please specify:",
    requirements: [
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
    ],
    noteLabel: "Please note:",
    note:
      "It is not necessary to provide all technical details and collaborators’ names at the time of the first contact; the important thing is to communicate them as soon as they are finalized, so we can properly include every participant in the project’s final credits.",
    synergiesHeading: "Managing applications and synergies.",
    synergiesBeforeTitle:
      "Should multiple applications arrive for the same area, priority will be given to the first request received. However, the spirit of this project is deeply collaborative: our goal will be to foster synergies and collaborations among different entities operating in the same territories, joining forces for an even more significant impact. Once your application is accepted, you will officially become part of the network of organizations committed to staging",
    projectTitle: "Palestinians Are Your Eyes",
    synergiesAfterTitle: "on October 15, 2026.",
  },
  ar: {
    heading: "كيفية المشاركة",
    premiere: ["العرض العالمي", "الأول"],
    month: "أكتوبر",
    introduction:
      "المشاركة في مشروع العرض المسرحي الموزع في 15 أكتوبر 2026 بسيطة. تهدف المبادرة إلى توحيد أصوات متنوعة في سردية جماعية واحدة وكبيرة.",
    confirmation: "أكّد مشاركتك عبر البريد الإلكتروني.",
    requirementsIntroduction: "يرجى توضيح ما يلي في طلب المشاركة:",
    requirements: [
      {
        title: "هوية الجهة المنظمة",
        description:
          "الاسم الذي ستُقدَّم القراءة تحته (فرقة مسرحية، جمعية، مجموعة فنية، مجموعة غير رسمية، وغيرها)، مع ذكر الموقع الإلكتروني وحسابات التواصل الاجتماعي إن أمكن.",
      },
      {
        title: "المنطقة",
        description: "المحافظة والبلدية اللتان تنوون تنظيم الفعالية فيهما.",
      },
      {
        title: "التفاصيل اللوجستية",
        description: "مكان العرض (مسرح، نادٍ، حديقة، أو غير ذلك).",
      },
      {
        title: "طاقم التمثيل والعمل",
        description: "أسماء المؤدين والفنيين والمخرجين المشاركين.",
      },
    ],
    noteLabel: "ملاحظة:",
    note:
      "ليس من الضروري تقديم جميع التفاصيل التقنية وأسماء المتعاونين عند التواصل الأول؛ المهم هو إرسالها فور اعتمادها حتى نتمكن من إدراج جميع المشاركين كما ينبغي في الشارة الختامية للمشروع.",
    synergiesHeading: "إدارة الطلبات وبناء أوجه التعاون.",
    synergiesBeforeTitle:
      "إذا وردت عدة طلبات من المنطقة نفسها، فستُمنح الأولوية للطلب الذي وصل أولاً. ومع ذلك، تقوم روح هذا المشروع على التعاون العميق؛ وسنعمل على تعزيز أوجه التكامل والتعاون بين الجهات المختلفة العاملة في المناطق نفسها وتوحيد الجهود لتحقيق أثر أكبر. بعد قبول طلبكم، ستصبحون رسمياً جزءاً من شبكة الجهات الملتزمة بتقديم",
    projectTitle: "الفلسطينيون هم عيناك",
    synergiesAfterTitle: "في 15 أكتوبر 2026.",
  },
  it: {
    heading: "Come partecipare",
    premiere: ["Prima", "mondiale"],
    month: "ottobre",
    introduction:
      "Partecipare al progetto di messa in scena diffusa del 15 ottobre 2026 è semplice. L’iniziativa mira a riunire voci diverse in un’unica, grande narrazione collettiva.",
    confirmation: "Conferma la partecipazione via e-mail.",
    requirementsIntroduction: "Nella richiesta di partecipazione, specifica:",
    requirements: [
      {
        title: "Identità dell’organizzazione",
        description:
          "Il nome con cui verrà presentata la lettura (compagnia teatrale, associazione, collettivo, gruppo informale, ecc.), indicando, se possibile, il sito web e i canali social.",
      },
      {
        title: "Territorio",
        description:
          "La provincia e il comune in cui si intende organizzare l’evento.",
      },
      {
        title: "Dettagli logistici",
        description:
          "Il luogo della rappresentazione (teatro, circolo, parco, ecc.).",
      },
      {
        title: "Cast e troupe",
        description:
          "I nomi di interpreti, tecnici e responsabili della regia coinvolti.",
      },
    ],
    noteLabel: "Nota:",
    note:
      "Non è necessario fornire tutti i dettagli tecnici e i nomi dei collaboratori al primo contatto; l’importante è comunicarli non appena saranno definiti, così da poter inserire correttamente ogni partecipante nei crediti finali del progetto.",
    synergiesHeading: "Gestione delle candidature e sinergie.",
    synergiesBeforeTitle:
      "Qualora arrivassero più candidature dalla stessa area, verrà data priorità alla prima richiesta ricevuta. Lo spirito del progetto, tuttavia, è profondamente collaborativo: il nostro obiettivo sarà favorire sinergie e collaborazioni tra realtà diverse attive negli stessi territori, unendo le forze per ottenere un impatto ancora più significativo. Una volta accettata la candidatura, entrerete ufficialmente nella rete delle organizzazioni impegnate a mettere in scena",
    projectTitle: "I palestinesi sono i tuoi occhi",
    synergiesAfterTitle: "il 15 ottobre 2026.",
  },
  fr: {
    heading: "Comment participer",
    premiere: ["Première", "mondiale"],
    month: "octobre",
    introduction:
      "Participer au projet de mise en scène décentralisée du 15 octobre 2026 est simple. L’initiative vise à réunir des voix diverses au sein d’un grand récit collectif.",
    confirmation: "Confirmez votre participation par e-mail.",
    requirementsIntroduction:
      "Dans votre demande de participation, veuillez préciser :",
    requirements: [
      {
        title: "Identité de l’organisation",
        description:
          "Le nom sous lequel la lecture sera présentée (compagnie théâtrale, association, collectif, groupe informel, etc.), en indiquant si possible un site web et les réseaux sociaux.",
      },
      {
        title: "Territoire",
        description:
          "La province et la commune où vous souhaitez organiser l’événement.",
      },
      {
        title: "Détails logistiques",
        description:
          "Le lieu de la représentation (théâtre, club, parc, etc.).",
      },
      {
        title: "Distribution et équipe technique",
        description:
          "Les noms des interprètes, techniciens et responsables de la mise en scène.",
      },
    ],
    noteLabel: "À noter :",
    note:
      "Il n’est pas nécessaire de fournir tous les détails techniques ni les noms des collaborateurs lors du premier contact ; l’essentiel est de les communiquer dès qu’ils seront confirmés, afin que chaque participant puisse figurer correctement au générique final du projet.",
    synergiesHeading: "Gestion des candidatures et synergies.",
    synergiesBeforeTitle:
      "Si plusieurs candidatures proviennent d’une même zone, la priorité sera donnée à la première demande reçue. L’esprit de ce projet est toutefois profondément collaboratif : notre objectif sera de favoriser les synergies et les collaborations entre les différentes structures actives sur un même territoire, afin d’unir les forces pour un impact encore plus important. Une fois votre candidature acceptée, vous rejoindrez officiellement le réseau des organisations qui s’engagent à présenter",
    projectTitle: "Les Palestiniens sont tes yeux",
    synergiesAfterTitle: "le 15 octobre 2026.",
  },
  tr: {
    heading: "Nasıl katılabilirsiniz",
    premiere: ["Dünya", "Prömiyeri"],
    month: "Ekim",
    introduction:
      "15 Ekim 2026’daki dağıtık sahneleme projesine katılmak çok kolay. Bu girişim, farklı sesleri tek ve güçlü bir kolektif anlatıda buluşturmayı amaçlıyor.",
    confirmation: "Katılımınızı e-posta ile onaylayın.",
    requirementsIntroduction: "Başvurunuzda lütfen şunları belirtin:",
    requirements: [
      {
        title: "Kuruluşun kimliği",
        description:
          "Okumanın hangi ad altında sahneleneceği (tiyatro topluluğu, dernek, kolektif, bağımsız grup vb.); mümkünse web sitesi ve sosyal medya hesaplarıyla birlikte.",
      },
      {
        title: "Bölge",
        description:
          "Etkinliği düzenlemeyi planladığınız il ve belediye.",
      },
      {
        title: "Lojistik ayrıntılar",
        description:
          "Gösterinin yapılacağı mekân (tiyatro, kulüp, park vb.).",
      },
      {
        title: "Oyuncular ve ekip",
        description:
          "Projede yer alan oyuncuların, teknisyenlerin ve yönetmenlerin adları.",
      },
    ],
    noteLabel: "Lütfen unutmayın:",
    note:
      "İlk iletişim sırasında tüm teknik ayrıntıları ve ekipte yer alan kişilerin adlarını vermeniz gerekmez; önemli olan, kesinleştikleri anda bize iletmenizdir. Böylece her katılımcıyı projenin son jeneriğine doğru biçimde ekleyebiliriz.",
    synergiesHeading: "Başvuruların ve iş birliklerinin yönetimi.",
    synergiesBeforeTitle:
      "Aynı bölgeden birden fazla başvuru gelmesi durumunda öncelik ilk ulaşan talebe verilecektir. Bununla birlikte, bu projenin ruhu derinlemesine iş birliğine dayanır: amacımız aynı bölgelerde faaliyet gösteren farklı kuruluşlar arasında ortaklıkları ve dayanışmayı güçlendirmek, daha büyük bir etki için güçleri birleştirmektir. Başvurunuz kabul edildiğinde,",
    projectTitle: "Filistinliler Senin Gözlerindir",
    synergiesAfterTitle:
      "okumasını 15 Ekim 2026’da sahnelemeyi taahhüt eden kuruluşlar ağına resmen katılacaksınız.",
  },
};

const revealProps = {
  initial: "hidden",
  transition: softRevealTransition,
  variants: softFadeRise,
  viewport: revealViewport,
  whileInView: "visible",
} as const;

const openingRevealProps = {
  animate: "visible",
  initial: "hidden",
  transition: softRevealTransition,
  variants: softFadeRise,
} as const;

export function HowToJoinSection({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section
      className={styles.section}
      id="how-to-join"
      aria-labelledby="how-to-join-heading"
    >
      <motion.div className={styles.header} {...openingRevealProps}>
        <div>
          <p className={styles.premiereStatement}>
            <span>{t.premiere[0]}</span>
            <span>{t.premiere[1]}</span>
          </p>
          <h2 id="how-to-join-heading">{t.heading}</h2>
        </div>
        <time className={styles.eventDate} dateTime="2026-10-15">
          <span className={styles.dateMonth}>{t.month}</span>
          <strong className={styles.dateDay}>15</strong>
          <span className={styles.dateYear}>2026</span>
        </time>
      </motion.div>

      <motion.p
        className={styles.introduction}
        {...openingRevealProps}
        transition={{ ...softRevealTransition, delay: 0.08 }}
      >
        {t.introduction}
      </motion.p>

      <motion.div className={styles.applicationProcess} {...revealProps}>
        <div className={styles.applicationHeading}>
          <h3>{t.confirmation}</h3>
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
            {t.requirementsIntroduction}
          </p>
          <ul className={styles.requirements}>
            {t.requirements.map((requirement, index) => (
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
        <strong>{t.noteLabel} </strong>
        {t.note}
      </motion.aside>

      <motion.p className={styles.applicationSynergies} {...revealProps}>
        <strong>{t.synergiesHeading}</strong> {t.synergiesBeforeTitle}{" "}
        <cite>{t.projectTitle}</cite> {t.synergiesAfterTitle}
      </motion.p>
    </section>
  );
}
