import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AutoHideHeader } from "../../components/AutoHideHeader";
import { AboutProjectSection } from "../../components/AboutProjectSection";
import { AboutUsSection } from "../../components/AboutUsSection";
import { HeroCarousel } from "../../components/HeroCarousel";
import { EventCountdown } from "../../components/EventCountdown";
import { HowToJoinSection } from "../../components/HowToJoinSection";
import { LanguageMenu } from "../../components/LanguageMenu";
import { MobileNavigation } from "../../components/MobileNavigation";
import { ParticipationCta } from "../../components/ParticipationCta";
// The original scrolling Partnerships section is intentionally kept in
// app/components/ParticipatingVenuesCredits.tsx while the Venues page is developed.
// import { ParticipatingVenuesCredits } from "../../components/ParticipatingVenuesCredits";
import { ProjectIntroductionSection } from "../../components/ProjectIntroductionSection";
import { SiteFooter } from "../../components/SiteFooter";
import { TeamCreditsSection } from "../../components/TeamCreditsSection";
import { ThemeToggle } from "../../components/ThemeToggle";
import { WhoThisProjectIsFor } from "../../components/WhoThisProjectIsFor";
import { WhyOctober15Section } from "../../components/WhyOctober15Section";
import { VenuesSection } from "../../components/VenuesSection";
import styles from "./page.module.css";

const languages = ["en", "ar", "it", "fr", "tr"] as const;
type Language = (typeof languages)[number];
type Page = "home" | "about" | "venues" | "join";

const pageSlugs: Record<Page, string> = {
  home: "",
  about: "about",
  venues: "venues",
  join: "join",
};

export function generateStaticParams() {
  return languages.flatMap((lang) => [
    { lang, slug: [] },
    ...(["about", "venues", "join"] as const).map((slug) => ({
      lang,
      slug: [slug],
    })),
  ]);
}

const mainNavigationLabels: Record<Language, string> = {
  en: "Main navigation",
  ar: "التنقل الرئيسي",
  it: "Navigazione principale",
  fr: "Navigation principale",
  tr: "Ana gezinme",
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
      venues: "Venues",
      join: "Join",
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
      venues:
        "Explore the theatres, organizations, and cities participating with AnQa.",
      join:
        "Help independent, multilingual theatre reach more people and places.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن عنقاء",
      venues: "المساحات المشاركة",
      join: "انضم إلينا",
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
      venues:
        "اكتشفوا المسارح والمنظمات والمدن المشاركة مع عنقاء.",
      join:
        "ساعدوا المسرح المستقل متعدد اللغات على الوصول إلى جمهور وأماكن أكثر.",
    },
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi siamo",
      venues: "Luoghi",
      join: "Partecipa",
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
      venues:
        "Esplora i teatri, le organizzazioni e le città che partecipano con AnQa.",
      join:
        "Aiuta il teatro indipendente e multilingue a raggiungere più persone e luoghi.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      venues: "Lieux",
      join: "Participer",
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
      venues:
        "Découvrez les théâtres, les organisations et les villes qui participent avec AnQa.",
      join:
        "Aidez le théâtre indépendant et multilingue à toucher davantage de publics et de territoires.",
    },
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımızda",
      venues: "Mekânlar",
      join: "Katıl",
    },
    eyebrow: "Kültürler arasında tiyatro",
    hero: "Hikâyeler kanatlanıyor.",
    intro:
      "AnQa, cesur ve çok dilli tiyatro aracılığıyla sanatçıları ve izleyicileri bir araya getirir.",
    action: "Bir sonraki etkinliğimizi keşfedin",
    eventLabel: "Yaklaşan etkinlik",
    eventName: "Yeni bir gösteri şekilleniyor",
    eventStatus: "Ayrıntılar yakında",
    pageIntro: {
      about:
        "AnQa’nın ardındaki insanları, amacı ve sanatsal vizyonu tanıyın.",
      venues:
        "AnQa ile katılan tiyatroları, kuruluşları ve şehirleri keşfedin.",
      join:
        "Bağımsız, çok dilli tiyatronun daha fazla insana ve yere ulaşmasına yardımcı olun.",
    },
  },
};

function resolvePage(slug?: string[]): Page | null {
  if (!slug?.length) return "home";
  if (slug.length === 1 && slug[0] === "support") return "join";
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
  if (slug?.length === 1 && slug[0] === "support") {
    redirect(`/${lang}/join`);
  }
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
        <nav
          className={styles.mainNav}
          aria-label={mainNavigationLabels[lang]}
        >
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
          <ThemeToggle language={lang} />
          <LanguageMenu currentLanguage={lang} pagePath={pageSlugs[page]} />
          <MobileNavigation
            language={lang}
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
            <EventCountdown language={lang} />
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
            <ProjectIntroductionSection language={lang} />
            <WhyOctober15Section language={lang} />
            <ParticipationCta language={lang} />
          </>
        ) : (
          <>
            {page !== "join" &&
              page !== "about" &&
              page !== "venues" && (
              <section className={styles.pageHero}>
                <p className="eyebrow">AnQa Theatre</p>
                <h1>{t.nav[page]}</h1>
                <p className={styles.pageIntro}>{t.pageIntro[page]}</p>
              </section>
            )}
            {page === "about" && (
              <>
                <AboutUsSection language={lang} />
                <TeamCreditsSection language={lang} />
              </>
            )}
            {page === "join" && (
              <>
                <HowToJoinSection language={lang} />
                <WhoThisProjectIsFor language={lang} />
                <AboutProjectSection language={lang} />
              </>
            )}
            {page === "venues" && <VenuesSection language={lang} />}
            {/* The former Partnerships page remains available as a component for
                reference while its replacement is finalized.
            {page === "partnerships" && (
              <ParticipatingVenuesCredits language={lang} />
            )} */}
          </>
        )}
      </main>

      <SiteFooter
        language={lang}
        links={(["about", "venues", "join"] as Page[]).map((item) => ({
          href: `/${lang}/${pageSlugs[item]}`,
          label: t.nav[item],
        }))}
        year={new Date().getFullYear()}
      />
    </div>
  );
}
