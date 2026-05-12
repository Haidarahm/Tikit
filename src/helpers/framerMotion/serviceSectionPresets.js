/**
 * Framer Motion props used across service pages (Digital Marketing hub + shared sections).
 * Spread onto `motion` / `Motion.*` components or pass `framerHero` to `ServiceHeroSection`.
 */

import {
  EASE_COUNTER,
  EASE_HERO_ENTRANCE,
  EASE_OVERSHOOT,
  EASE_SMOOTH,
} from "./easing.js";
import {
  VIEWPORT_BENEFITS,
  VIEWPORT_CASE_STUDY,
  VIEWPORT_FAQ,
  VIEWPORT_MULTI_CTA,
  VIEWPORT_ONCE,
  VIEWPORT_PROBLEMS,
  VIEWPORT_PROCESS,
  VIEWPORT_SUB_SERVICES,
  VIEWPORT_WHY_US,
} from "./viewports.js";

/** `ServiceHeroSection` — inner hero content mount */
export const serviceHeroFramerHero = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.05, ease: EASE_HERO_ENTRANCE, delay: 0.12 },
};

/** FAQ wrapper on hub pages */
export const faqSectionReveal = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_FAQ,
  transition: { duration: 0.65, ease: EASE_SMOOTH },
};

/** Animated stat counter — `animate()` from framer-motion */
export const statCounterTween = {
  duration: 1.85,
  ease: EASE_COUNTER,
};

export const problemsSection = {
  viewport: VIEWPORT_PROBLEMS,
  header: {
    initial: { opacity: 0, y: 32, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: VIEWPORT_PROBLEMS,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
  gridPerspectivePx: 1000,
  card: (index) => ({
    initial: { opacity: 0, y: 56, rotateX: 8 },
    whileInView: { opacity: 1, y: 0, rotateX: 0 },
    viewport: VIEWPORT_PROBLEMS,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 20,
      delay: index * 0.09,
    },
    style: { transformStyle: "preserve-3d" },
    whileHover: {
      y: -4,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  }),
};

export const processSection = {
  viewport: VIEWPORT_PROCESS,
  header: {
    initial: { opacity: 0, x: -28, skewX: -2 },
    whileInView: { opacity: 1, x: 0, skewX: 0 },
    viewport: VIEWPORT_PROCESS,
    transition: { duration: 0.65, ease: EASE_OVERSHOOT },
  },
  stepCard: (index) => ({
    initial: { opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.94 },
    whileInView: { opacity: 1, x: 0, scale: 1 },
    viewport: VIEWPORT_PROCESS,
    transition: {
      type: "spring",
      stiffness: 95,
      damping: 18,
      delay: index * 0.08,
    },
  }),
  stepNumber: (index) => ({
    initial: { scale: 0 },
    whileInView: { scale: 1 },
    viewport: VIEWPORT_ONCE,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 16,
      delay: 0.15 + index * 0.08,
    },
  }),
};

export const benefitsSection = {
  viewport: VIEWPORT_BENEFITS,
  headerWrap: {
    initial: { opacity: 0, y: 36, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: VIEWPORT_BENEFITS,
    transition: { duration: 0.72, ease: EASE_SMOOTH },
  },
  label: {
    initial: { opacity: 0, letterSpacing: "0.32em" },
    whileInView: { opacity: 1, letterSpacing: "0.18em" },
    viewport: VIEWPORT_BENEFITS,
    transition: { duration: 0.65 },
  },
  item: (index) => ({
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_BENEFITS,
    transition: {
      duration: 0.55,
      delay: index * 0.1,
      ease: EASE_SMOOTH,
    },
  }),
  itemIcon: (index) => ({
    initial: { rotate: -12, scale: 0.85 },
    whileInView: { rotate: 0, scale: 1 },
    viewport: VIEWPORT_ONCE,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2 + index * 0.08,
    },
  }),
};

export const caseStudySection = {
  viewport: VIEWPORT_CASE_STUDY,
  heading: {
    initial: { opacity: 0, scale: 0.97 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: VIEWPORT_CASE_STUDY,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
  panel: {
    initial: { opacity: 0, x: -56, scale: 0.985 },
    whileInView: { opacity: 1, x: 0, scale: 1 },
    viewport: VIEWPORT_CASE_STUDY,
    transition: { type: "spring", stiffness: 82, damping: 21 },
  },
  statPlain: {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: { duration: 0.45 },
  },
  statMotion: {
    initial: { opacity: 0.25, y: 16 },
    transition: { duration: 0.45 },
  },
};

export const whyUsSection = {
  viewport: VIEWPORT_WHY_US,
  headerContainer: {
    initial: "hidden",
    whileInView: "visible",
    viewport: VIEWPORT_WHY_US,
    variants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.04 },
      },
    },
  },
  labelVariants: {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_SMOOTH },
    },
  },
  titleVariants: {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE_SMOOTH },
    },
  },
  card: (index) => ({
    initial: { opacity: 0, y: 44 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_WHY_US,
    transition: {
      duration: 0.55,
      delay: index * 0.08,
      ease: EASE_OVERSHOOT,
    },
  }),
  cardIcon: (index) => ({
    initial: { scale: 0.6, rotate: -25 },
    whileInView: { scale: 1, rotate: 0 },
    viewport: VIEWPORT_ONCE,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
      delay: 0.12 + index * 0.06,
    },
  }),
  footer: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: VIEWPORT_WHY_US,
    transition: { duration: 0.55, delay: 0.15 },
  },
};

export const subServicesSection = {
  viewport: VIEWPORT_SUB_SERVICES,
  header: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_SUB_SERVICES,
    transition: { duration: 0.68, ease: EASE_SMOOTH },
  },
  description: {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_SUB_SERVICES,
    transition: { duration: 0.5, delay: 0.08 },
  },
  gridPerspectivePx: 1400,
  card: (index) => ({
    initial: { opacity: 0, y: 52, rotateX: 12, z: -40 },
    whileInView: { opacity: 1, y: 0, rotateX: 0, z: 0 },
    viewport: VIEWPORT_SUB_SERVICES,
    transition: {
      type: "spring",
      stiffness: 76,
      damping: 19,
      delay: index * 0.07,
    },
    style: { transformStyle: "preserve-3d" },
  }),
};

export const multiCtaSection = {
  viewport: VIEWPORT_MULTI_CTA,
  title: {
    initial: { opacity: 0, y: 36, filter: "blur(12px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: VIEWPORT_MULTI_CTA,
    transition: { duration: 0.75, ease: EASE_SMOOTH },
  },
  card: (index) => ({
    initial: { opacity: 0, y: 48, scale: 0.94 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: VIEWPORT_MULTI_CTA,
    transition: {
      type: "spring",
      stiffness: 88,
      damping: 17,
      delay: index * 0.12,
    },
    whileHover: {
      y: -6,
      transition: { type: "spring", stiffness: 400, damping: 22 },
    },
  }),
  finalLine: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: VIEWPORT_MULTI_CTA,
    transition: { duration: 0.6, delay: 0.35 },
  },
};

/**
 * DM SEO / Performance / Paid Ads pages — hero inner stagger (mount, replaces GSAP `.hero-animate`).
 */
export const seoServicesHeroContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

export const seoServicesHeroChildVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_SMOOTH },
  },
};

/** DM subpages — stagger `whileInView` variants (replaces former `dmMotion.jsx`). */
export const dmSubpageContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export const dmSubpageItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

/**
 * `DMRelatedServices` link cards — matches former GSAP stagger on `.dm-link-card`.
 */
export const dmRelatedLinkCard = (index) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_PROBLEMS,
  transition: {
    duration: 0.6,
    ease: EASE_SMOOTH,
    delay: index * 0.1,
  },
});
