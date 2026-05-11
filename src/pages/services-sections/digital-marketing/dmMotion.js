import { motion } from "framer-motion";

export const MotionDiv = motion.div;
export const MotionP = motion.p;
export const MotionH2 = motion.h2;
export const MotionLi = motion.li;
export const MotionSection = motion.section;

export const dmContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export const dmItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const dmViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
};
