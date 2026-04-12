import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiBarChart2,
  FiGlobe,
  FiLayers,
  FiTarget,
  FiZap,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useFontClass } from "../../hooks/useFontClass";

const ICON_MAP = {
  target: FiTarget,
  zap: FiZap,
  globe: FiGlobe,
  barChart: FiBarChart2,
  layers: FiLayers,
  award: FiAward,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function WhyTikitSection() {
  const { t, i18n } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const { fontBody, fontHeading } = useFontClass();

  const title = t("home.whyTikit.title");
  const subtitle = t("home.whyTikit.subtitle");

  const cards = useMemo(() => {
    const raw = t("home.whyTikit.cards", { returnObjects: true });
    if (!Array.isArray(raw)) return [];
    return raw.filter(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.title === "string" &&
        typeof item.description === "string"
    );
  }, [t, i18n.language]);

  return (
    <section
      data-nav-color="black"
      dir={isRtl ? "rtl" : "ltr"}
      className={`${fontBody} relative w-[98%] sm:w-[95%] md:w-6/7 mx-auto px-4 md:px-0 py-14 md:py-20`}
      aria-labelledby="why-tikit-heading"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2
            id="why-tikit-heading"
            className={`text-3xl sm:text-4xl md:text-[42px] font-bold text-[var(--foreground)] tracking-tight ${fontHeading} ${isRtl ? "font-cairo" : "font-antonio"}`}
          >
            {title}
          </h2>
          {subtitle?.trim() ? (
            <p className="mt-4 text-sm sm:text-base md:text-lg text-[var(--foreground)]/70 font-light leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const iconKey =
              typeof card.iconKey === "string" ? card.iconKey : "target";
            const Icon = ICON_MAP[iconKey] ?? FiTarget;
            return (
              <motion.article
                key={`${iconKey}-${index}`}
                variants={itemVariants}
                className="
                  group relative rounded-2xl md:rounded-[20px]
                  border border-[var(--foreground)]/10
                  bg-[var(--container-bg)]/40 dark:bg-[var(--container-bg)]/20
                  backdrop-blur-sm
                  p-6 sm:p-7 md:p-8
                  shadow-sm
                  transition-[transform,box-shadow] duration-300 ease-out
                  hover:scale-[1.02] hover:shadow-xl hover:border-[var(--secondary)]/25
                "
              >
                <div
                  className="
                    mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl
                    bg-[var(--secondary)]/15 text-[var(--secondary)]
                    transition-transform duration-300 group-hover:scale-105
                  "
                  aria-hidden
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3
                  className={`text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-3 ${fontHeading} ${isRtl ? "font-cairo" : ""}`}
                >
                  {card.title}
                </h3>
                <p className="text-sm sm:text-[15px] leading-relaxed text-[var(--foreground)]/65 font-light">
                  {card.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default WhyTikitSection;
