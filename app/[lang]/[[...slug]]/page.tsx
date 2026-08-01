import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AutoHideHeader } from "../../components/AutoHideHeader";
import { HeroCarousel } from "../../components/HeroCarousel";
import { LanguageMenu } from "../../components/LanguageMenu";
import {
  HowToJoinSection,
  ParticipationCta,
} from "../../components/ParticipationCta";
import styles from "./page.module.css";

const languages = ["en", "ar", "it", "fr"] as const;
type Language = (typeof languages)[number];
type Page = "home" | "about" | "history" | "partnerships" | "support";

const pageSlugs: Record<Page, string> = {
  home: "",
  about: "about",
  history: "history",
  partnerships: "partnerships",
  support: "support",
};

const copy: Record<
  Language,
  {
    nav: Record<Page, string>;
    eyebrow: string;
    hero: string;
    intro: string;
    action: string;
    eventLabel: string;
    eventName: string;
    eventStatus: string;
    pageIntro: Record<Exclude<Page, "home">, string>;
    footer: string;
  }
> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      history: "History",
      partnerships: "Partnerships",
      support: "Support",
    },
    eyebrow: "Theatre across cultures",
    hero: "Stories take flight.",
    intro:
      "AnQa brings artists and audiences together through bold, multilingual theatre.",
    action: "Discover our next event",
    eventLabel: "Upcoming event",
    eventName: "A new performance is taking shape",
    eventStatus: "Details coming soon",
    pageIntro: {
      about: "Meet the people, purpose, and artistic vision behind AnQa.",
      history:
        "Follow the journey, productions, and moments that shaped our company.",
      partnerships:
        "Discover how cultural organizations and creative partners can work with AnQa.",
      support:
        "Help independent, multilingual theatre reach more people and places.",
    },
    footer: "Independent multilingual theatre",
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن عنقاء",
      history: "تاريخنا",
      partnerships: "الشراكات",
      support: "ادعمنا",
    },
    eyebrow: "مسرح يعبر الثقافات",
    hero: "حين تحلّق الحكايات.",
    intro: "تجمع عنقاء الفنانين والجمهور من خلال مسرح جريء ومتعدد اللغات.",
    action: "اكتشف عرضنا القادم",
    eventLabel: "الفعالية القادمة",
    eventName: "عرض جديد قيد التشكّل",
    eventStatus: "التفاصيل قريباً",
    pageIntro: {
      about: "تعرّفوا إلى الأشخاص والرسالة والرؤية الفنية وراء عنقاء.",
      history: "تابعوا الرحلة والعروض واللحظات التي شكّلت فرقتنا.",
      partnerships:
        "اكتشفوا سبل التعاون بين عنقاء والمؤسسات الثقافية والشركاء المبدعين.",
      support:
        "ساعدوا المسرح المستقل متعدد اللغات على الوصول إلى جمهور وأماكن أكثر.",
    },
    footer: "مسرح مستقل متعدد اللغات",
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi siamo",
      history: "Storia",
      partnerships: "Partnership",
      support: "Sostienici",
    },
    eyebrow: "Teatro tra culture",
    hero: "Le storie prendono il volo.",
    intro:
      "AnQa unisce artisti e pubblico attraverso un teatro audace e multilingue.",
    action: "Scopri il prossimo evento",
    eventLabel: "Prossimo evento",
    eventName: "Un nuovo spettacolo sta prendendo forma",
    eventStatus: "Dettagli in arrivo",
    pageIntro: {
      about: "Conosci le persone, la missione e la visione artistica di AnQa.",
      history:
        "Ripercorri il viaggio, le produzioni e i momenti che hanno formato la compagnia.",
      partnerships:
        "Scopri come le organizzazioni culturali e i partner creativi possono collaborare con AnQa.",
      support:
        "Aiuta il teatro indipendente e multilingue a raggiungere più persone e luoghi.",
    },
    footer: "Teatro indipendente multilingue",
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      history: "Histoire",
      partnerships: "Partenariats",
      support: "Soutenir",
    },
    eyebrow: "Le théâtre entre les cultures",
    hero: "Les histoires prennent leur envol.",
    intro:
      "AnQa réunit artistes et publics autour d’un théâtre audacieux et multilingue.",
    action: "Découvrir notre prochain événement",
    eventLabel: "Prochain événement",
    eventName: "Un nouveau spectacle prend forme",
    eventStatus: "Détails à venir",
    pageIntro: {
      about:
        "Découvrez les personnes, la mission et la vision artistique qui animent AnQa.",
      history:
        "Parcourez le chemin, les créations et les moments qui ont façonné la compagnie.",
      partnerships:
        "Découvrez comment les organisations culturelles et partenaires créatifs peuvent collaborer avec AnQa.",
      support:
        "Aidez le théâtre indépendant et multilingue à toucher davantage de publics et de territoires.",
    },
    footer: "Théâtre indépendant multilingue",
  },
};

function resolvePage(slug?: string[]): Page | null {
  if (!slug?.length) return "home";
  const match = Object.entries(pageSlugs).find(
    ([, value]) => value === slug[0],
  );
  return slug.length === 1 && match ? (match[0] as Page) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!languages.includes(lang as Language)) return {};
  const page = resolvePage(slug);
  if (!page) return {};
  const t = copy[lang as Language];
  return {
    title: page === "home" ? "AnQa Theatre" : t.nav[page],
    description: page === "home" ? t.intro : t.pageIntro[page],
  };
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang: rawLang, slug } = await params;
  if (!languages.includes(rawLang as Language)) notFound();
  const lang = rawLang as Language;
  const page = resolvePage(slug);
  if (!page) notFound();
  const t = copy[lang];
  const direction = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className={styles.siteShell} lang={lang} dir={direction}>
      <AutoHideHeader
        className={styles.siteHeader}
        hiddenClassName={styles.headerHidden}
      >
        <Link className={styles.brand} href={`/${lang}`}>
          <span className={styles.brandLogoFrame}>
            <Image
              className={styles.brandLogoImage}
              src="/images/anqa-logo.png"
              alt="AnQa"
              width={842}
              height={594}
              priority
            />
          </span>
        </Link>
        <nav className={styles.mainNav} aria-label="Main navigation">
          {(Object.keys(pageSlugs) as Page[]).map((item) => (
            <Link
              key={item}
              href={`/${lang}${pageSlugs[item] ? `/${pageSlugs[item]}` : ""}`}
              aria-current={item === page ? "page" : undefined}
            >
              {t.nav[item]}
            </Link>
          ))}
        </nav>
        <LanguageMenu currentLanguage={lang} pagePath={pageSlugs[page]} />
      </AutoHideHeader>

      <main>
        {page === "home" ? (
          <>
            <HeroCarousel language={lang} />
            <section className={styles.hero}>
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.hero}</h1>
              <div className={styles.heroCopy}>
                <p>{t.intro}</p>
                <a className={styles.primaryLink} href="#upcoming-event">
                  {t.action}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>
            <section className={styles.placeholderCard} id="upcoming-event">
              <div>
                <span className={styles.eventLabel}>{t.eventLabel}</span>
                <h2>{t.eventName}</h2>
              </div>
              <span className={styles.eventStatus}>{t.eventStatus}</span>
            </section>
            <ParticipationCta language={lang} />
          </>
        ) : (
          <>
            <section className={styles.pageHero}>
              <p className="eyebrow">AnQa Theatre</p>
              <h1>{t.nav[page]}</h1>
              <p className={styles.pageIntro}>{t.pageIntro[page]}</p>
            </section>
            {page === "support" && <HowToJoinSection language={lang} />}
          </>
        )}
      </main>

      <footer className={styles.siteFooter}>
        <span>© {new Date().getFullYear()} AnQa</span>
        <span>{t.footer}</span>
      </footer>
    </div>
  );
}
