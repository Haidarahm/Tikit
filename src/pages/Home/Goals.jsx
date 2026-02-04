import React, { useMemo, memo } from "react";
import ScrollStack, { ScrollStackItem } from "../../components/ScrollStackItem";
import image1 from "../../assets/images/goal-image-1.webp";
import image2 from "../../assets/images/goal-image-2.webp";
import image3 from "../../assets/images/goal-image-3.webp";
import image4 from "../../assets/images/goal-image-4.webp";
import { useTheme } from "../../store/ThemeContext.jsx";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import TikitTitle from "../../components/TikitTitle.jsx";

const Goals = memo(() => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const fallback = [
    {
      title: "Amplify your brand's reach",
      description:
        "Reach real audiences with meaningful content. We grow traffic that actually converts.",
      image: image1,
      backgroundColor: "bg-[#35D5D0]/28",
      backgroundColorLight: "bg-[#35D5D0]/28",
    },
    {
      title: "Boost campaign performance",
      description:
        "Track results in real time and optimize every move — all managed on one smart platform.",
      image: image2,
      backgroundColor: "bg-[#E84B43]/28",
      backgroundColorLight: "bg-[#E84B43]/28",
    },
    {
      title: "Create with Purpose",
      description:
        "From concept to final cut, we bring bold ideas to life with quality storytelling.",
      image: image3,
      backgroundColor: "bg-[#252525]/28",
      backgroundColorLight: "bg-[#252525]/28",
    },
    {
      title: "Drive real engagement",
      description:
        "Reach real audiences with meaningful content. We grow traffic that actually converts.",
      image: image4,
      backgroundColor: "bg-[#F3A67A]/28",
      backgroundColorLight: "bg-[#F3A67A]/28",
    },
  ];

  const goalsData = useMemo(() => {
    const items = t("home.goals.items", { returnObjects: true }) || fallback;
    return items.map((it, idx) => ({
      id: idx + 1,
      title: it.title || fallback[idx].title,
      description: it.description || fallback[idx].description,
      image: it.image || fallback[idx].image,
      backgroundColor: it.backgroundColor || fallback[idx].backgroundColor,
      backgroundColorLight: it.backgroundColorLight || fallback[idx].backgroundColorLight,
    }));
  }, [t]);

  const getBackgroundClass = (goal) =>
    theme === "dark" ? goal.backgroundColor : goal.backgroundColorLight;

  return (
    <div
      data-nav-color="black"
      className={`section ${isRtl ? "font-cairo" : "font-hero-light"} flex flex-col md:flex-row mx-auto goals-section md:h-[2000px] z-10 w-full md:w-6/7`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Desktop ScrollStack */}
      <ScrollStack
        useWindowScroll={true}
        itemDistance={0}
        itemStackDistance={10}
        stackPosition="0%"
        scaleEndPosition="40%"
        className="hidden md:block"
      >
        {goalsData.map((goal) => (
          <ScrollStackItem
            key={goal.id}
            itemClassName={`flex backdrop-blur-lg relative items-center overflow-hidden ${getBackgroundClass(goal)}`}
          >
            <div className="text w-2/3">
              <TikitTitle title={goal.title} />
              <p className="font-light text-[var(--foreground)] text-[14px] md:text-[32px] leading-[20px] md:leading-[45px]">
                {goal.description}
              </p>
            </div>
            <div className="img h-full rounded-[15px] w-1/3 px-4 overflow-hidden">
              <img
                src={goal.image}
                alt={goal.title}
                className="w-full h-full rounded-[15px] object-cover"
                loading="lazy"
              />
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      {/* Mobile / small screens */}
      <div className="container-goals w-full overflow-hidden block md:hidden">
        {goalsData.map((goal, index) => {
          const animationDirection = isRtl
            ? index % 2 === 0
              ? "fade-left"
              : "fade-right"
            : index % 2 === 0
            ? "fade-right"
            : "fade-left";
          const animationDelay = index * 200;

          return (
            <div
              key={goal.id}
              className={`flex my-6 md:my-12 mx-[4px] p-4 rounded-[10px] items-center overflow-hidden ${getBackgroundClass(goal)}`}
              data-aos={animationDirection}
              data-aos-delay={animationDelay}
              data-aos-duration="800"
              data-aos-easing="ease-out-cubic"
              data-aos-once="false"
              data-aos-mirror="true"
            >
              <div className="text">
                <h2
                  style={{ fontFamily: isRtl ? "Cairo" : "Antonio" }}
                  className="tikit-title w-full"
                >
                  {goal.title}
                </h2>
                <p className="text-[var(--foreground)] text-[14px] font-light leading-[20px]">
                  {goal.description}
                </p>
              </div>
              <img
                src={goal.image}
                alt={goal.title}
                className="rounded-[15px] md:rounded-[39px] w-[120px] md:w-[500px] object-cover"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

Goals.displayName = "Goals";

export default Goals;
