import React, { useMemo, memo } from "react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "../../components/ui/ThreeDScrollTriggerRow";
import quote from "../../assets/icons/quot.svg";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";

const FALLBACK_TESTIMONIALS = [
  {
    name: "Sophia Martinez",
    company: "Global Enterprises Ltd.",
    text: "AtomWallet has completely transformed how we manage international payments. Transactions are fast, secure, and effortless.",
  },
  {
    name: "David Lee",
    company: "TechBridge Solutions",
    text: "Sending money to partners abroad has never been this smooth. AtomWallet's real-time tracking gives us complete peace of mind.",
  },
  {
    name: "Amira Hassan",
    company: "FinEdge Capital",
    text: "The security features are outstanding. Multi-layer protection ensures our business transactions remain private and protected.",
  },
  {
    name: "Liam Anderson",
    company: "Anderson Trading Co.",
    text: "With AtomWallet, I can pay vendors and receive funds globally without worrying about hidden fees. Transparent and reliable!",
  },
  {
    name: "Chen Wei",
    company: "BrightPath Logistics",
    text: "The interface is so intuitive. Within minutes, my team was making international payments without any training required.",
  },
];

// Extracted testimonial card component to avoid duplication
const TestimonialCard = memo(
  ({ testimonial, index, theme, lightBgs, isRtl }) => (
    <div
      className={`flex gap-[23px] h-[180px] md:h-[300px] w-[320px] md:w-[600px] p-2 md:p-7 rounded-xl text-[var(--foreground)] border border-white/15 dark:bg-white/10 backdrop-blur-md shadow-xl ${
        isRtl ? "flex-row-reverse mr-[20px]" : "ml-[20px]"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
      lang={isRtl ? "ar" : undefined}
      style={
        theme === "dark"
          ? undefined
          : { backgroundColor: lightBgs[index % lightBgs.length] }
      }
    >
      <div className="icon h-full">
        <img
          src={quote}
          alt="Quote icon"
          className="mh-[20px] d:h-[40px] w-[20px] md:w-[40px]"
        />
      </div>

      <div className="content flex-col flex-1 justify-between w-full flex">
        <p
          className={`relative block text-wrap text-[14px] md:text-[24px] font-light ${
            isRtl ? "text-right" : "text-left"
          }`}
        >
          {testimonial.text}
        </p>
        <div
          className={`user flex items-center `}
        >
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-[31px] md:w-[75px] h-[31px] md:h-[75px] rounded-full"
          />
          <div
            className={`name-specialist flex flex-col ${
              isRtl ? "mr-[20px] text-right" : "ml-[20px] text-left"
            }`}
          >
            <div className="text-[16px] md:text-[20px]">{testimonial.name}</div>
            <div className="specialist text-[12px] md:text-[18px] text-gray-400">
              {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

TestimonialCard.displayName = "TestimonialCard";

const Reviews = memo(() => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const lightBgs = ["#daf4f4", "#ede8fb", "#f0f2f3"];

  const testimonials = useMemo(() => {
    const data =
      t("home.reviews.testimonials", {
        returnObjects: true,
      }) || [];

    const normalized = Array.isArray(data) ? data : [];
    const source = normalized.length > 0 ? normalized : FALLBACK_TESTIMONIALS;

    return source.map((testimonial) => ({
      ...testimonial,
      avatar:
        "https://i.pinimg.com/736x/84/8f/3b/848f3b92a3e2a6040faccad5888f851e.jpg",
    }));
  }, [t, i18n.language]);

  return (
    <div
      className={`reviews relative w-full md:min-h-screen py-10 md:py-20 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <h2
       
          className="text-[18px] font-antonio text-[var(--foreground)] text-center md:text-4xl font-bold mb-2 md:mb-4"
        >
         Clients Review
        </h2>
      <ThreeDScrollTriggerContainer dir="ltr">
        <ThreeDScrollTriggerRow baseVelocity={3} direction={1}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${index}-row1`}
              testimonial={testimonial}
              index={index}
              theme={theme}
              lightBgs={lightBgs}
              isRtl={isRtl}
            />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
      <ThreeDScrollTriggerContainer dir="ltr">
        <ThreeDScrollTriggerRow baseVelocity={3} direction={-1}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${index}-row2`}
              testimonial={testimonial}
              index={index}
              theme={theme}
              lightBgs={lightBgs}
              isRtl={isRtl}
            />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
    </div>
  );
});

Reviews.displayName = "Reviews";

export default Reviews;
