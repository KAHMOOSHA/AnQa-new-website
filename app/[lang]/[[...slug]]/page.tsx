import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AutoHideHeader } from "../../components/AutoHideHeader";
import { AboutProjectSection } from "../../components/AboutProjectSection";
import { AboutUsSection } from "../../components/AboutUsSection";
import { HeroCarousel } from "../../components/HeroCarousel";
import { HowToJoinSection } from "../../components/HowToJoinSection";
import { LanguageMenu } from "../../components/LanguageMenu";
import { MobileNavigation } from "../../components/MobileNavigation";
import { ParticipationCta } from "../../components/ParticipationCta";
import { ParticipatingVenuesCredits } from "../../components/ParticipatingVenuesCredits";
import { SiteFooter } from "../../components/SiteFooter";
import { TeamCreditsSection } from "../../components/TeamCreditsSection";
import { ThemeToggle } from "../../components/ThemeToggle";
import { WhoThisProjectIsFor } from "../../components/WhoThisProjectIsFor";
import styles from "./page.module.css";

const languages = ["en", "ar", "it", "fr"] as const;
type Language = (typeof languages)[number];
type Page = "home" | "about" | "partnerships" | "support";

const pageSlugs: Record<Page, string> = {
  home: "",
  about: "about",
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
  }
> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
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
      partnerships:
        "Discover how cultural organizations and creative partners can work with AnQa.",
      support:
        "Help independent, multilingual theatre reach more people and places.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن عنقاء",
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
      partnerships:
        "اكتشفوا سبل التعاون بين عنقاء والمؤسسات الثقافية والشركاء المبدعين.",
      support:
        "ساعدوا المسرح المستقل متعدد اللغات على الوصول إلى جمهور وأماكن أكثر.",
    },
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi siamo",
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
      partnerships:
        "Scopri come le organizzazioni culturali e i partner creativi possono collaborare con AnQa.",
      support:
        "Aiuta il teatro indipendente e multilingue a raggiungere più persone e luoghi.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
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
      partnerships:
        "Découvrez comment les organisations culturelles et partenaires créatifs peuvent collaborer avec AnQa.",
      support:
        "Aidez le théâtre indépendant et multilingue à toucher davantage de publics et de territoires.",
    },
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
        scrolledClassName={styles.headerScrolled}
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
        <div className={styles.headerActions}>
          <ThemeToggle />
          <LanguageMenu currentLanguage={lang} pagePath={pageSlugs[page]} />
          <MobileNavigation
            links={(Object.keys(pageSlugs) as Page[]).map((item) => ({
              current: item === page,
              href: `/${lang}${pageSlugs[item] ? `/${pageSlugs[item]}` : ""}`,
              label: t.nav[item],
            }))}
          />
        </div>
      </AutoHideHeader>

      <main>
        {page === "home" ? (
          <>
            <HeroCarousel language={lang} />
            {/* Original homepage introduction — parked until its content is finalized.
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
            */}
            {/* Original upcoming-event placeholder — parked until event details are finalized.
            <section className={styles.placeholderCard} id="upcoming-event">
              <div>
                <span className={styles.eventLabel}>{t.eventLabel}</span>
                <h2>{t.eventName}</h2>
              </div>
              <span className={styles.eventStatus}>{t.eventStatus}</span>
            </section>
            */}
            <ParticipationCta language={lang} />
          </>
        ) : (
          <>
            {page !== "support" &&
              page !== "about" &&
              page !== "partnerships" && (
              <section className={styles.pageHero}>
                <p className="eyebrow">AnQa Theatre</p>
                <h1>{t.nav[page]}</h1>
                <p className={styles.pageIntro}>{t.pageIntro[page]}</p>
              </section>
            )}
            {page === "about" && (
              <>
                <AboutUsSection />
                <TeamCreditsSection />
                <AboutProjectSection />
              </>
            )}
            {page === "support" && (
              <>
                <HowToJoinSection language={lang} />
                <WhoThisProjectIsFor />
              </>
            )}
            {page === "partnerships" && (
              <ParticipatingVenuesCredits language={lang} />
            )}
          </>
        )}
      </main>

      {page !== "partnerships" && (
        <SiteFooter
          language={lang}
          links={(["about", "partnerships", "support"] as Page[]).map(
            (item) => ({
              href: `/${lang}/${pageSlugs[item]}`,
              label: t.nav[item],
            }),
          )}
          year={new Date().getFullYear()}
        />
      )}
    </div>
  );
}
