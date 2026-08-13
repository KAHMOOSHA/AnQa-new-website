"use client";

import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  participatingVenues,
  type ParticipatingVenue,
} from "../data/participatingVenues";
import styles from "./ParticipatingVenuesCredits.module.css";

type Language = "en" | "ar" | "it" | "fr";

const translations = {
  en: {
    title: "Participating venues",
    date: "October 15, 2026",
    international: "International",
    italy: "Italy",
    venuePending: "Venue to be announced",
    locationPending: "Location to be announced",
    paused: "Credits paused",
    playing: "Credits playing",
    scrollLabel: "Participating venues credits. Scroll to explore every venue.",
  },
  ar: {
    title: "المساحات المشاركة",
    date: "15 أكتوبر 2026",
    international: "دولياً",
    italy: "إيطاليا",
    venuePending: "سيُعلن عن المكان قريباً",
    locationPending: "سيُعلن عن الموقع قريباً",
    paused: "تم إيقاف القائمة مؤقتاً",
    playing: "القائمة قيد التشغيل",
    scrollLabel: "قائمة المساحات المشاركة. مرّر لاستكشاف جميع الأماكن.",
  },
  it: {
    title: "Spazi partecipanti",
    date: "15 ottobre 2026",
    international: "Internazionale",
    italy: "Italia",
    venuePending: "Sede da annunciare",
    locationPending: "Località da annunciare",
    paused: "Titoli in pausa",
    playing: "Titoli in riproduzione",
    scrollLabel: "Titoli degli spazi partecipanti. Scorri per vedere tutte le sedi.",
  },
  fr: {
    title: "Lieux participants",
    date: "15 octobre 2026",
    international: "International",
    italy: "Italie",
    venuePending: "Lieu à confirmer",
    locationPending: "Localité à confirmer",
    paused: "Générique en pause",
    playing: "Générique en lecture",
    scrollLabel: "Générique des lieux participants. Faites défiler pour tous les découvrir.",
  },
} as const;

const countryNames: Record<Language, Record<string, string>> = {
  en: {
    Francia: "France",
    Cipro: "Cyprus",
    Irlanda: "Ireland",
    Grecia: "Greece",
    Spagna: "Spain",
    Cile: "Chile",
    Messico: "Mexico",
    Svizzera: "Switzerland",
  },
  ar: {
    Francia: "فرنسا",
    Cipro: "قبرص",
    Irlanda: "إيرلندا",
    Grecia: "اليونان",
    Spagna: "إسبانيا",
    Cile: "تشيلي",
    Messico: "المكسيك",
    Svizzera: "سويسرا",
  },
  it: {
    Francia: "Francia",
    Cipro: "Cipro",
    Irlanda: "Irlanda",
    Grecia: "Grecia",
    Spagna: "Spagna",
    Cile: "Cile",
    Messico: "Messico",
    Svizzera: "Svizzera",
  },
  fr: {
    Francia: "France",
    Cipro: "Chypre",
    Irlanda: "Irlande",
    Grecia: "Grèce",
    Spagna: "Espagne",
    Cile: "Chili",
    Messico: "Mexique",
    Svizzera: "Suisse",
  },
};

function groupBy<T>(items: readonly T[], key: (item: T) => string) {
  return items.reduce<Map<string, T[]>>((groups, item) => {
    const groupKey = key(item);
    const group = groups.get(groupKey) ?? [];
    group.push(item);
    groups.set(groupKey, group);
    return groups;
  }, new Map());
}

function formatLocation(
  venue: ParticipatingVenue,
  fallback: string,
): string {
  const parts = [venue.municipality, venue.province].filter(
    (part, index, values): part is string =>
      Boolean(part) && values.findIndex((value) => value === part) === index,
  );

  return parts.length ? parts.join(" · ") : fallback;
}

function CreditRow({
  venue,
  venuePending,
  locationPending,
}: {
  venue: ParticipatingVenue;
  venuePending: string;
  locationPending: string;
}) {
  return (
    <div className={styles.creditRow}>
      <strong className={!venue.name ? styles.pending : undefined}>
        {venue.name ?? venuePending}
      </strong>
      <span>{formatLocation(venue, locationPending)}</span>
    </div>
  );
}

export function ParticipatingVenuesCredits({ language }: { language: Language }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const feedbackTimerRef = useRef<number | undefined>(undefined);
  const pausedRef = useRef(false);
  const pointerStartRef = useRef<{
    id: number;
    x: number;
    y: number;
  } | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [playbackFeedback, setPlaybackFeedback] = useState<
    "paused" | "playing" | null
  >(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const t = translations[language];

  const { internationalGroups, italianGroups } = useMemo(() => {
    const international = participatingVenues.filter(
      (venue) => venue.country !== "Italia",
    );
    const italian = participatingVenues.filter(
      (venue) => venue.country === "Italia",
    );

    return {
      internationalGroups: groupBy(international, (venue) => venue.country),
      italianGroups: groupBy(italian, (venue) => venue.region ?? t.italy),
    };
  }, [t.italy]);

  const togglePlayback = useCallback(() => {
    const nextPaused = !pausedRef.current;
    pausedRef.current = nextPaused;
    setIsPaused(nextPaused);
    setPlaybackFeedback(nextPaused ? "paused" : "playing");

    window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(
      () => setPlaybackFeedback(null),
      1300,
    );
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (
      !viewport ||
      prefersReducedMotion ||
      isPaused ||
      !isVisible ||
      hasEnded
    ) {
      return;
    }

    let frame = 0;
    let previousTime: number | null = null;

    const advance = (time: number) => {
      if (previousTime !== null) {
        viewport.scrollTop += ((time - previousTime) / 1000) * 24;
      }
      previousTime = time;

      const remaining =
        viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop;
      if (remaining <= 1) {
        setHasEnded(true);
        return;
      }

      frame = window.requestAnimationFrame(advance);
    };

    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, [hasEnded, isPaused, isVisible, prefersReducedMotion]);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
          target?.tagName ?? "",
        );

      if (event.code !== "Space" || event.repeat || isTyping) return;
      event.preventDefault();
      togglePlayback();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, togglePlayback]);

  useEffect(
    () => () => window.clearTimeout(feedbackTimerRef.current),
    [],
  );

  return (
    <section className={styles.section} aria-labelledby="venues-credit-title">
      <div className={styles.stage}>
        <div
          className={styles.viewport}
          ref={viewportRef}
          tabIndex={0}
          aria-label={t.scrollLabel}
          onPointerDown={(event) => {
            pointerStartRef.current = {
              id: event.pointerId,
              x: event.clientX,
              y: event.clientY,
            };
          }}
          onPointerUp={(event) => {
            const start = pointerStartRef.current;
            pointerStartRef.current = null;
            if (!start || start.id !== event.pointerId) return;

            const distance = Math.hypot(
              event.clientX - start.x,
              event.clientY - start.y,
            );
            if (distance <= 10) togglePlayback();
          }}
          onPointerCancel={() => {
            pointerStartRef.current = null;
          }}
          onScroll={() => {
            const viewport = viewportRef.current;
            if (!viewport) return;
            const remaining =
              viewport.scrollHeight - viewport.clientHeight - viewport.scrollTop;
            if (remaining > 2 && hasEnded) setHasEnded(false);
          }}
        >
          <div className={styles.roll}>
            <div className={styles.titleCard}>
              <span>{t.date}</span>
              <strong id="venues-credit-title">{t.title}</strong>
            </div>

            <section className={styles.creditChapter}>
              <h3>{t.international}</h3>
              {[...internationalGroups].map(([country, venues]) => (
                <div className={styles.creditGroup} key={country}>
                  <h4>{countryNames[language][country] ?? country}</h4>
                  {venues.map((venue) => (
                    <CreditRow
                      key={venue.id}
                      venue={venue}
                      venuePending={t.venuePending}
                      locationPending={t.locationPending}
                    />
                  ))}
                </div>
              ))}
            </section>

            <section className={styles.creditChapter}>
              <h3>{t.italy}</h3>
              {[...italianGroups].map(([region, venues]) => (
                <div className={styles.creditGroup} key={region}>
                  <h4>{region}</h4>
                  {venues.map((venue) => (
                    <CreditRow
                      key={venue.id}
                      venue={venue}
                      venuePending={t.venuePending}
                      locationPending={t.locationPending}
                    />
                  ))}
                </div>
              ))}
            </section>

            <div className={styles.endMark} aria-hidden="true">
              AnQa
            </div>
          </div>
        </div>

        {playbackFeedback && (
          <div
            className={styles.playbackFeedback}
            role="status"
            aria-label={
              playbackFeedback === "paused" ? t.paused : t.playing
            }
          >
            {playbackFeedback === "paused" ? (
              <Pause aria-hidden="true" />
            ) : (
              <Play aria-hidden="true" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
