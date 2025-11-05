import React, { useMemo, memo } from "react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "../../components/ui/ThreeDScrollTriggerRow";
import quote from "../../assets/icons/quot.svg";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";

// Extracted testimonial card component to avoid duplication
const TestimonialCard = memo(
  ({ testimonial, index, theme, lightBgs, isRtl }) => (
    <div
      className={`flex gap-[23px] h-[180px] md:h-[300px] w-[320px] md:w-[600px] ml-[20px] p-2 md:p-7 rounded-xl text-[var(--foreground)] border border-white/15 dark:bg-white/10 backdrop-blur-md shadow-xl ${
        isRtl ? "flex-row-reverse" : ""
      }`}
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
          className={`user flex items-center ${
            isRtl ? "flex-row-reverse" : ""
          }`}
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
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const lightBgs = ["#D4E6F4", "#E0DFFA", "#E8DCFD", "#F5D8ED"];

  const testimonials = useMemo(
    () =>
      t("home.reviews.testimonials", {
        returnObjects: true,
      }).map((testimonial) => ({
        ...testimonial,
        avatar:
          "https://i.pinimg.com/736x/84/8f/3b/848f3b92a3e2a6040faccad5888f851e.jpg",
      })),
    [t]
  );

  return (
    <div
      className={`reviews relative w-full md:min-h-screen py-10 md:py-20 ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <ThreeDScrollTriggerContainer>
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
      <ThreeDScrollTriggerContainer>
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
