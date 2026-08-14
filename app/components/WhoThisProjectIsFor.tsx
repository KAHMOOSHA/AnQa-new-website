import { AudienceCredits } from "./AudienceCredits";
import styles from "./WhoThisProjectIsFor.module.css";

type Language = "en" | "ar" | "it" | "fr" | "tr";

const content = {
  en: {
    heading: "Who this project is for",
    audiences: [
      "Theatrical institutions",
      "Associations",
      "Schools",
      "Bookstores",
      "Collectives",
      "Clubs",
    ],
    beforeEmphasis: "The proposal has been designed to ensure",
    emphasis: "maximum production sustainability",
    afterEmphasis:
      "requiring minimal technical setups: the staging can be achieved even through a simple reading of the texts.",
  },
  ar: {
    heading: "لمن صُمم هذا المشروع؟",
    audiences: [
      "المؤسسات المسرحية",
      "الجمعيات",
      "المدارس",
      "المكتبات",
      "المجموعات الفنية",
      "النوادي",
    ],
    beforeEmphasis: "صُمم المقترح لضمان",
    emphasis: "أقصى قدر من استدامة الإنتاج",
    afterEmphasis:
      "مع الحد الأدنى من المتطلبات التقنية؛ إذ يمكن تقديم العرض حتى من خلال قراءة بسيطة للنصوص.",
  },
  it: {
    heading: "A chi si rivolge il progetto",
    audiences: [
      "Istituzioni teatrali",
      "Associazioni",
      "Scuole",
      "Librerie",
      "Collettivi",
      "Circoli",
    ],
    beforeEmphasis: "La proposta è stata concepita per garantire la",
    emphasis: "massima sostenibilità produttiva",
    afterEmphasis:
      "richiedendo allestimenti tecnici minimi: la messa in scena può essere realizzata anche attraverso una semplice lettura dei testi.",
  },
  fr: {
    heading: "À qui s’adresse ce projet",
    audiences: [
      "Institutions théâtrales",
      "Associations",
      "Écoles",
      "Librairies",
      "Collectifs",
      "Clubs",
    ],
    beforeEmphasis: "La proposition a été conçue pour garantir une",
    emphasis: "durabilité maximale de la production",
    afterEmphasis:
      "avec des besoins techniques minimaux : la mise en scène peut même prendre la forme d’une simple lecture des textes.",
  },
  tr: {
    heading: "Bu proje kimler için?",
    audiences: [
      "Tiyatro kurumları",
      "Dernekler",
      "Okullar",
      "Kitabevleri",
      "Kolektifler",
      "Kulüpler",
    ],
    beforeEmphasis: "Bu öneri,",
    emphasis: "en yüksek üretim sürdürülebilirliğini",
    afterEmphasis:
      "sağlayacak biçimde ve en az teknik gereksinimle tasarlanmıştır: sahneleme, metinlerin yalın bir okumasıyla bile gerçekleştirilebilir.",
  },
} as const satisfies Record<
  Language,
  {
    heading: string;
    audiences: readonly string[];
    beforeEmphasis: string;
    emphasis: string;
    afterEmphasis: string;
  }
>;

export function WhoThisProjectIsFor({ language }: { language: Language }) {
  const t = content[language];

  return (
    <section
      className={styles.section}
      aria-labelledby="project-audience-heading"
    >
      <h2 id="project-audience-heading">{t.heading}</h2>

      <AudienceCredits items={t.audiences} />

      <p className={styles.sustainabilityNote}>
        {t.beforeEmphasis} <strong>{t.emphasis}</strong>, {t.afterEmphasis}
      </p>
    </section>
  );
}
