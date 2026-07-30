"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Language = "en" | "ar" | "it" | "fr";

const content: Record<Language, {
  previous: string;
  next: string;
  goTo: string;
  slides: { image: string; alt: string; title: string; text: string }[];
}> = {
  en: {
    previous: "Previous slide",
    next: "Next slide",
    goTo: "Go to slide",
    slides: [
      {
        image: "/images/theatre-performance-1.jpg",
        alt: "Two actors performing under dramatic stage lighting",
        title: "Stories take flight.",
        text: "AnQa creates bold theatre that moves between languages, places, and people.",
      },
      {
        image: "/images/theatre-performance-2.jpg",
        alt: "Actor in silhouette under blue stage light",
        title: "The stage is a meeting place.",
        text: "Artists and audiences come together through live, immediate storytelling.",
      },
      {
        image: "/images/theatre-stage-lights.jpg",
        alt: "Stage lights crossing above a theatre audience",
        title: "The next chapter begins here.",
        text: "New performances, collaborations, and encounters are taking shape.",
      },
    ],
  },
  ar: {
    previous: "الشريحة السابقة",
    next: "الشريحة التالية",
    goTo: "انتقل إلى الشريحة",
    slides: [
      {
        image: "/images/theatre-performance-1.jpg",
        alt: "ممثلان يؤديان تحت إضاءة مسرحية درامية",
        title: "حين تحلّق الحكايات.",
        text: "تصنع عنقاء مسرحاً جريئاً يعبر بين اللغات والأماكن والناس.",
      },
      {
        image: "/images/theatre-performance-2.jpg",
        alt: "ممثل تحت ضوء مسرحي أزرق",
        title: "المسرح مساحة للقاء.",
        text: "يجتمع الفنانون والجمهور من خلال حكايات حيّة ومباشرة.",
      },
      {
        image: "/images/theatre-stage-lights.jpg",
        alt: "أضواء مسرحية تتقاطع فوق الجمهور",
        title: "الفصل القادم يبدأ هنا.",
        text: "عروض وشراكات ولقاءات جديدة قيد التشكّل.",
      },
    ],
  },
  it: {
    previous: "Slide precedente",
    next: "Slide successiva",
    goTo: "Vai alla slide",
    slides: [
      {
        image: "/images/theatre-performance-1.jpg",
        alt: "Due attori in scena sotto una luce teatrale",
        title: "Le storie prendono il volo.",
        text: "AnQa crea un teatro audace che attraversa lingue, luoghi e persone.",
      },
      {
        image: "/images/theatre-performance-2.jpg",
        alt: "Attore in silhouette sotto una luce blu",
        title: "Il palco è un luogo d’incontro.",
        text: "Artisti e pubblico si incontrano attraverso storie vive e immediate.",
      },
      {
        image: "/images/theatre-stage-lights.jpg",
        alt: "Fasci di luce sopra il pubblico di un teatro",
        title: "Il prossimo capitolo inizia qui.",
        text: "Nuovi spettacoli, collaborazioni e incontri stanno prendendo forma.",
      },
    ],
  },
  fr: {
    previous: "Diapositive précédente",
    next: "Diapositive suivante",
    goTo: "Aller à la diapositive",
    slides: [
      {
        image: "/images/theatre-performance-1.jpg",
        alt: "Deux comédiens sous un éclairage de scène",
        title: "Les histoires prennent leur envol.",
        text: "AnQa crée un théâtre audacieux qui traverse les langues, les lieux et les publics.",
      },
      {
        image: "/images/theatre-performance-2.jpg",
        alt: "Comédien en silhouette sous une lumière bleue",
        title: "La scène est un lieu de rencontre.",
        text: "Artistes et publics se retrouvent autour de récits vivants et immédiats.",
      },
      {
        image: "/images/theatre-stage-lights.jpg",
        alt: "Faisceaux lumineux au-dessus d’un public",
        title: "Le prochain chapitre commence ici.",
        text: "De nouveaux spectacles, collaborations et rencontres prennent forme.",
      },
    ],
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
      className="carousel"
      aria-roledescription="carousel"
      aria-label="AnQa highlights"
      dir={direction}
    >
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container">
          {t.slides.map((slide, index) => (
            <article
              className="carousel-slide"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${t.slides.length}`}
              key={slide.image}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
              />
              <div className="carousel-shade" aria-hidden="true" />
              <div className="carousel-copy">
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button type="button" onClick={scrollPrevious} aria-label={t.previous}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <div className="carousel-dots" role="group" aria-label="Slides">
          {t.slides.map((slide, index) => (
            <button
              type="button"
              key={slide.image}
              aria-label={`${t.goTo} ${index + 1}`}
              aria-current={selectedIndex === index ? "true" : undefined}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <button type="button" onClick={scrollNext} aria-label={t.next}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
