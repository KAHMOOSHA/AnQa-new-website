"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { fadeRise, revealTransition, revealViewport } from "../lib/motion";
import styles from "./AboutProjectSection.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";
type Detail = { title: string; description: string };

type AboutProjectCopy = {
  title: string;
  imageAlt: string;
  operationalTitle: string;
  operationalIntroduction: string;
  operationalGuidelines: readonly Detail[];
  resourcesTitle: string;
  resourcesIntroduction: string;
  providedResources: readonly Detail[];
  communicationTitle: string;
  communication: string;
  solidarityTitle: string;
  solidarityIntroduction: string;
  solidarityUse: string;
  noteLabel: string;
  note: string;
};

const content: Record<Language, AboutProjectCopy> = {
  en: {
    title: "About the project",
    imageAlt: "AnQa performers preparing backstage",
    operationalTitle: "Operational Guidelines",
    operationalIntroduction:
      "Each participating organization operates with full organizational and artistic autonomy, with the freedom to define:",
    operationalGuidelines: [
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
    ],
    resourcesTitle: "Provided Resources",
    resourcesIntroduction:
      "Progetto REC will provide participating entities with the necessary materials to stage the reading:",
    providedResources: [
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
    ],
    communicationTitle: "Communication and Documentary Project",
    communication:
      "All events will receive visibility through our official channels based on the information provided by the participating entities. Furthermore, organizations that choose to document their evening with video can send us the filmed footage: the recordings will merge into a documentary project dedicated to the choral narration of this initiative.",
    solidarityTitle: "Solidarity Initiatives",
    solidarityIntroduction:
      "Participating entities, where possible, can donate a portion of the proceeds or collected donations to Progetto REC.Palestina.",
    solidarityUse:
      "These funds will be used partly to support the activities of the AnQa theatre company—providing a contribution to the Gazan authors of the texts and investing in future projects—and partly for the humanitarian interventions of Emergenza Gaza.",
    noteLabel: "Please note:",
    note:
      "The contribution to Progetto REC remains optional and at the discretion of individual organizers.",
  },
  ar: {
    title: "حول المشروع",
    imageAlt: "مؤدو فرقة عنقاء يستعدون خلف الكواليس",
    operationalTitle: "الإرشادات التشغيلية",
    operationalIntroduction:
      "تعمل كل جهة مشاركة باستقلال تنظيمي وفني كامل، ولها حرية تحديد:",
    operationalGuidelines: [
      {
        title: "مكان الفعالية",
        description:
          "المسارح والمراكز الثقافية والمكتبات أو المساحات غير التقليدية.",
      },
      {
        title: "طاقم التمثيل",
        description: "إشراك مؤدين محترفين أو غير محترفين.",
      },
      {
        title: "تصميم العرض",
        description:
          "حرية دمج العرض مع مساهمات موسيقية أو عروض فيديو أو تصميمات إضاءة خاصة.",
      },
    ],
    resourcesTitle: "الموارد المقدمة",
    resourcesIntroduction:
      "سيوفر مشروع REC للجهات المشاركة المواد اللازمة لتقديم القراءة:",
    providedResources: [
      {
        title: "النص الكامل",
        description:
          "ست حكايات غير منشورة تستكشف واقع غزة. سيوزَّع النص بموجب رخصة المشاع الإبداعي لتشجيع أوسع انتشار مجاني، مع اشتراط نسب العمل إلى أصحابه فقط.",
      },
      {
        title: "المساهمات الصوتية (اختيارية)",
        description:
          "تسجيلات أصلية لمؤلفي النصوص من غزة يمكن استخدامها كمشهد صوتي أثناء الفعالية.",
      },
    ],
    communicationTitle: "التواصل والمشروع الوثائقي",
    communication:
      "ستحظى جميع الفعاليات بالتغطية عبر قنواتنا الرسمية استناداً إلى المعلومات التي تقدمها الجهات المشاركة. ويمكن للجهات التي تختار توثيق أمسيتها بالفيديو أن ترسل إلينا المواد المصورة؛ إذ ستندمج التسجيلات في مشروع وثائقي مكرس للسرد الجماعي لهذه المبادرة.",
    solidarityTitle: "مبادرات التضامن",
    solidarityIntroduction:
      "يمكن للجهات المشاركة، حيثما أمكن، التبرع بجزء من العائدات أو التبرعات المجموعة إلى Progetto REC.Palestina.",
    solidarityUse:
      "ستُستخدم هذه الأموال جزئياً لدعم أنشطة فرقة عنقاء المسرحية، بما في ذلك تقديم مساهمة لمؤلفي النصوص من غزة والاستثمار في مشاريع مستقبلية، وجزئياً لدعم التدخلات الإنسانية التي تنفذها Emergenza Gaza.",
    noteLabel: "ملاحظة:",
    note:
      "تبقى المساهمة في Progetto REC اختيارية ومتروكة لتقدير كل جهة منظمة.",
  },
  it: {
    title: "Il progetto",
    imageAlt: "Gli interpreti di AnQa si preparano dietro le quinte",
    operationalTitle: "Linee guida operative",
    operationalIntroduction:
      "Ogni organizzazione partecipante opera in piena autonomia organizzativa e artistica, con la libertà di definire:",
    operationalGuidelines: [
      {
        title: "Luogo dell’evento",
        description:
          "Teatri, centri culturali, librerie o spazi non convenzionali.",
      },
      {
        title: "Cast",
        description:
          "Coinvolgimento di interpreti professionisti o non professionisti.",
      },
      {
        title: "Allestimento scenico",
        description:
          "Libertà di integrare la rappresentazione con contributi musicali, videoproiezioni o specifici disegni luce.",
      },
    ],
    resourcesTitle: "Materiali forniti",
    resourcesIntroduction:
      "Progetto REC metterà a disposizione delle realtà partecipanti i materiali necessari per realizzare la lettura:",
    providedResources: [
      {
        title: "Testo completo",
        description:
          "I sei racconti inediti che esplorano la realtà di Gaza. Il testo sarà distribuito con licenza Creative Commons per favorirne la massima diffusione gratuita, richiedendo unicamente il diritto di attribuzione.",
      },
      {
        title: "Contributi audio (facoltativi)",
        description:
          "Registrazioni originali degli autori gazawi, utilizzabili come paesaggio sonoro durante l’evento.",
      },
    ],
    communicationTitle: "Comunicazione e progetto documentario",
    communication:
      "Tutti gli eventi riceveranno visibilità attraverso i nostri canali ufficiali sulla base delle informazioni fornite dalle realtà partecipanti. Le organizzazioni che sceglieranno di documentare la propria serata in video potranno inoltre inviarci le riprese: le registrazioni confluiranno in un progetto documentario dedicato alla narrazione corale dell’iniziativa.",
    solidarityTitle: "Iniziative di solidarietà",
    solidarityIntroduction:
      "Le realtà partecipanti, ove possibile, potranno devolvere una parte degli incassi o delle donazioni raccolte a Progetto REC.Palestina.",
    solidarityUse:
      "Questi fondi saranno utilizzati in parte per sostenere le attività della compagnia teatrale AnQa—offrendo un contributo agli autori gazawi dei testi e investendo in progetti futuri—e in parte per gli interventi umanitari di Emergenza Gaza.",
    noteLabel: "Nota:",
    note:
      "Il contributo a Progetto REC resta facoltativo ed è lasciato alla discrezione dei singoli organizzatori.",
  },
  fr: {
    title: "À propos du projet",
    imageAlt: "Les interprètes d’AnQa se préparent en coulisses",
    operationalTitle: "Principes d’organisation",
    operationalIntroduction:
      "Chaque organisation participante agit en toute autonomie organisationnelle et artistique, avec la liberté de définir :",
    operationalGuidelines: [
      {
        title: "Lieu de l’événement",
        description:
          "Théâtres, centres culturels, librairies ou espaces non conventionnels.",
      },
      {
        title: "Distribution",
        description:
          "Participation d’interprètes professionnels ou non professionnels.",
      },
      {
        title: "Conception scénique",
        description:
          "Liberté d’enrichir la représentation avec des contributions musicales, des projections vidéo ou une création lumière spécifique.",
      },
    ],
    resourcesTitle: "Ressources fournies",
    resourcesIntroduction:
      "Progetto REC fournira aux structures participantes le matériel nécessaire à la mise en scène de la lecture :",
    providedResources: [
      {
        title: "Texte intégral",
        description:
          "Les six récits inédits qui explorent la réalité de Gaza. Le texte sera diffusé sous licence Creative Commons afin d’en favoriser la plus large circulation gratuite, sous la seule condition de l’attribution.",
      },
      {
        title: "Contributions audio (facultatives)",
        description:
          "Des enregistrements originaux des auteurs gazaouis, qui pourront servir de paysage sonore pendant l’événement.",
      },
    ],
    communicationTitle: "Communication et projet documentaire",
    communication:
      "Tous les événements bénéficieront d’une visibilité sur nos canaux officiels, à partir des informations transmises par les structures participantes. Les organisations qui choisiront de documenter leur soirée en vidéo pourront également nous envoyer leurs images : les enregistrements seront réunis dans un projet documentaire consacré au récit choral de cette initiative.",
    solidarityTitle: "Initiatives de solidarité",
    solidarityIntroduction:
      "Les structures participantes pourront, lorsque cela est possible, reverser une partie des recettes ou des dons collectés à Progetto REC.Palestina.",
    solidarityUse:
      "Ces fonds serviront en partie à soutenir les activités de la compagnie théâtrale AnQa—en apportant une contribution aux auteurs gazaouis des textes et en investissant dans de futurs projets—et en partie aux interventions humanitaires d’Emergenza Gaza.",
    noteLabel: "À noter :",
    note:
      "La contribution à Progetto REC reste facultative et relève de la décision de chaque organisateur.",
  },
  tr: {
    title: "Proje hakkında",
    imageAlt: "AnQa oyuncuları kuliste hazırlanırken",
    operationalTitle: "Uygulama esasları",
    operationalIntroduction:
      "Her katılımcı kuruluş, aşağıdaki konuları belirleme özgürlüğüyle tam bir organizasyonel ve sanatsal özerklik içinde çalışır:",
    operationalGuidelines: [
      {
        title: "Etkinlik mekânı",
        description:
          "Tiyatrolar, kültür merkezleri, kitabevleri veya alışılmadık mekânlar.",
      },
      {
        title: "Oyuncu kadrosu",
        description:
          "Profesyonel veya profesyonel olmayan oyuncuların katılımı.",
      },
      {
        title: "Sahne tasarımı",
        description:
          "Gösteriyi müzik katkıları, video projeksiyonları veya özel ışık tasarımlarıyla zenginleştirme özgürlüğü.",
      },
    ],
    resourcesTitle: "Sağlanan kaynaklar",
    resourcesIntroduction:
      "Progetto REC, okumayı sahnelemek için gerekli malzemeleri katılımcı kuruluşlara sağlayacaktır:",
    providedResources: [
      {
        title: "Tam metin",
        description:
          "Gazze’nin gerçekliğini ele alan, yayımlanmamış altı hikâye. Metin, mümkün olan en geniş ücretsiz dağıtımı teşvik etmek amacıyla Creative Commons lisansı altında, yalnızca kaynak gösterme koşuluyla paylaşılacaktır.",
      },
      {
        title: "Ses kayıtları (isteğe bağlı)",
        description:
          "Gazzeli yazarların etkinlik sırasında ses ortamı olarak kullanılabilecek özgün kayıtları.",
      },
    ],
    communicationTitle: "İletişim ve belgesel projesi",
    communication:
      "Tüm etkinlikler, katılımcı kuruluşların sağladığı bilgiler doğrultusunda resmî kanallarımızda görünürlük kazanacaktır. Gecelerini videoyla belgelemeyi seçen kuruluşlar görüntüleri bize gönderebilir; bu kayıtlar, girişimin kolektif anlatısına adanmış bir belgesel projede bir araya getirilecektir.",
    solidarityTitle: "Dayanışma girişimleri",
    solidarityIntroduction:
      "Katılımcı kuruluşlar, mümkün olduğu durumlarda, gelirlerin veya toplanan bağışların bir bölümünü Progetto REC.Palestina’ya aktarabilir.",
    solidarityUse:
      "Bu fonların bir bölümü AnQa tiyatro topluluğunun çalışmalarını desteklemek—metinlerin Gazzeli yazarlarına katkı sağlamak ve gelecekteki projelere yatırım yapmak—için, bir bölümü ise Emergenza Gaza’nın insani yardım faaliyetleri için kullanılacaktır.",
    noteLabel: "Lütfen unutmayın:",
    note:
      "Progetto REC’e katkı isteğe bağlıdır ve her organizatörün kendi takdirine bırakılmıştır.",
  },
};

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

export function AboutProjectSection({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section className={styles.section} aria-labelledby="about-project-heading">
      <motion.header className={styles.header} {...revealProps}>
        <div className={styles.headerImageFrame}>
          <Image
            className={styles.headerImage}
            src="/images/anqa-backstage-16.jpeg"
            alt={t.imageAlt}
            fill
            sizes="100vw"
          />
        </div>
        <h2 id="about-project-heading">{t.title}</h2>
      </motion.header>

      <div className={styles.content}>
        <motion.article className={styles.chapter} {...revealProps}>
          <div className={styles.chapterHeading}>
            <h3>{t.operationalTitle}</h3>
          </div>
          <div className={styles.chapterBody}>
            <p>{t.operationalIntroduction}</p>
            <DetailList items={t.operationalGuidelines} />
          </div>
        </motion.article>

        <motion.article
          className={`${styles.chapter} ${styles.resourcesChapter}`}
          {...revealProps}
        >
          <div className={styles.chapterHeading}>
            <h3>{t.resourcesTitle}</h3>
          </div>
          <div className={styles.chapterBody}>
            <p>{t.resourcesIntroduction}</p>
            <DetailList items={t.providedResources} />
          </div>
        </motion.article>

        <motion.article className={styles.chapter} {...revealProps}>
          <div className={styles.chapterHeading}>
            <h3>{t.communicationTitle}</h3>
          </div>
          <div className={styles.chapterBody}>
            <p>{t.communication}</p>
          </div>
        </motion.article>

        <motion.article className={styles.chapter} {...revealProps}>
          <div className={styles.chapterHeading}>
            <h3>{t.solidarityTitle}</h3>
          </div>
          <div className={styles.chapterBody}>
            <p>{t.solidarityIntroduction}</p>
            <p>{t.solidarityUse}</p>
            <p className={styles.optionalNote}>
              <strong>{t.noteLabel}</strong> {t.note}
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
