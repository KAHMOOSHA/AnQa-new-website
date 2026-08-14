import type { Transition, Variants } from "motion/react";

export const motionTiming = {
  fast: 0.2,
  standard: 0.35,
  reveal: 0.6,
} as const;

export const editorialEase = [0.22, 1, 0.36, 1] as const;

export const revealTransition: Transition = {
  duration: motionTiming.reveal,
  ease: editorialEase,
};

export const fadeRise: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const softFadeRise: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const softRevealTransition: Transition = {
  duration: 0.72,
  ease: editorialEase,
};

export const revealViewport = {
  amount: 0.1,
  margin: "0px 0px 12% 0px",
  once: true,
} as const;
