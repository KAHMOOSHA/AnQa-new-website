"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./HeroCarousel.module.css";

type Language = "en" | "ar" | "it" | "fr";

const slides = [
  {
    id: "palestinians",
    image: "/images/All thats-left-to-me-Odysseus-Telemachus 01.jpg",
  },
  {
    id: "meeting-place",
    image: "/images/Anqa - All that's left to me - Backstage 06.jpeg",
  },
  {
    id: "next-chapter",
    image: "/images/All thats left to me - Antinous.JPG",
  },
] as const;

type SlideId = (typeof slides)[number]["id"];
type SlideCopy = { alt: string; title: string; text: string };
type CarouselCopy = {
  label: string;
  slidesLabel: string;
  previous: string;
  next: string;
  goTo: string;
  slides: Record<SlideId, SlideCopy>;
};

const content: Record<Language, CarouselCopy> = {
  en: {
    label: "AnQa highlights",
    slidesLabel: "Carousel slides",
    previous: "Previous slide",
    next: "Next slide",
    goTo: "Go to slide",
    slides: {
      palestinians: {
        alt: "Actors performing All That's Left to Me on stage",
        title: "Palestinians are your eyes",
        text: '"Palestinians are your eyes, your tattoo. Palestinians are your name, your dreams, your thoughts, and your scarf."',
      },
      "meeting-place": {
        alt: "Actor in silhouette under blue stage light",
        title: "And We need your help.",
        text: "Artists and audiences come together through live, immediate storytelling.",
      },
      "next-chapter": {
        alt: "Stage lights crossing above a theatre audience",
        title: "The next chapter begins here.",
        text: "New performances, collaborations, and encounters are taking shape.",
      },
    },
  },
  ar: {
    label: "أبرز أعمال عنقاء",
    slidesLabel: "شرائح العرض",
    previous: "الشريحة السابقة",
    next: "الشريحة التالية",
    goTo: "انتقل إلى الشريحة",
    slides: {
      palestinians: {
        alt: "ممثلون يؤدون عرض كل ما تبقى لي على المسرح",
        title: "الفلسطينيون هم عيناك",
        text: "تصنع عنقاء مسرحاً جريئاً يعبر بين اللغات والأماكن والناس.",
      },
      "meeting-place": {
        alt: "ممثل تحت ضوء مسرحي أزرق",
        title: "المسرح مساحة للقاء.",
        text: "يجتمع الفنانون والجمهور من خلال حكايات حيّة ومباشرة.",
      },
      "next-chapter": {
        alt: "أضواء مسرحية تتقاطع فوق الجمهور",
        title: "الفصل القادم يبدأ هنا.",
        text: "عروض وشراكات ولقاءات جديدة قيد التشكّل.",
      },
    },
  },
  it: {
    label: "In primo piano da AnQa",
    slidesLabel: "Diapositive del carosello",
    previous: "Slide precedente",
    next: "Slide successiva",
    goTo: "Vai alla slide",
    slides: {
      palestinians: {
        alt: "Attori in scena nello spettacolo All That's Left to Me",
        title: "I palestinesi sono i tuoi occhi",
        text: "AnQa crea un teatro audace che attraversa lingue, luoghi e persone.",
      },
      "meeting-place": {
        alt: "Attore in silhouette sotto una luce blu",
        title: "Il palco è un luogo d’incontro.",
        text: "Artisti e pubblico si incontrano attraverso storie vive e immediate.",
      },
      "next-chapter": {
        alt: "Fasci di luce sopra il pubblico di un teatro",
        title: "Il prossimo capitolo inizia qui.",
        text: "Nuovi spettacoli, collaborazioni e incontri stanno prendendo forma.",
      },
    },
  },
  fr: {
    label: "À la une chez AnQa",
    slidesLabel: "Diapositives du carrousel",
    previous: "Diapositive précédente",
    next: "Diapositive suivante",
    goTo: "Aller à la diapositive",
    slides: {
      palestinians: {
        alt: "Des comédiens jouent All That's Left to Me sur scène",
        title: "Les Palestiniens sont tes yeux",
        text: "AnQa crée un théâtre audacieux qui traverse les langues, les lieux et les publics.",
      },
      "meeting-place": {
        alt: "Comédien en silhouette sous une lumière bleue",
        title: "La scène est un lieu de rencontre.",
        text: "Artistes et publics se retrouvent autour de récits vivants et immédiats.",
      },
      "next-chapter": {
        alt: "Faisceaux lumineux au-dessus d’un public",
        title: "Le prochain chapitre commence ici.",
        text: "De nouveaux spectacles, collaborations et rencontres prennent forme.",
      },
    },
  },
};

export function HeroCarousel({ language }: { language: Language }) {
  const direction = language === "ar" ? "rtl" : "ltr";
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction,
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const t = content[language];

  const scrollPrevious = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const updateSelectedIndex = () =>
      setSelectedIndex(emblaApi.selectedScrollSnap());

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label={t.label}
      dir={direction}
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, index) => {
            const translatedSlide = t.slides[slide.id];

            return (
              <article
                className={styles.slide}
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${slides.length}`}
                key={slide.id}
              >
                <Image
                  src={slide.image}
                  alt={translatedSlide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className={styles.shade} aria-hidden="true" />
                <div className={styles.copy}>
                  <h1>{translatedSlide.title}</h1>
                  <p>{translatedSlide.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={scrollPrevious} aria-label={t.previous}>
          {direction === "rtl" ? (
            <ChevronRight aria-hidden="true" />
          ) : (
            <ChevronLeft aria-hidden="true" />
          )}
        </button>
        <div className={styles.dots} role="group" aria-label={t.slidesLabel}>
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              aria-label={`${t.goTo} ${index + 1}`}
              aria-current={selectedIndex === index ? "true" : undefined}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <button type="button" onClick={scrollNext} aria-label={t.next}>
          {direction === "rtl" ? (
            <ChevronLeft aria-hidden="true" />
          ) : (
            <ChevronRight aria-hidden="true" />
          )}
        </button>
      </div>
    </section>
  );
}
