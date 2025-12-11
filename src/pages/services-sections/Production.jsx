import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import {
  HiVideoCamera,
  HiCamera,
  HiPlay,
  HiMicrophone,
  HiDesktopComputer,
  HiLightBulb,
} from "react-icons/hi";
import {
  MdCameraEnhance,
  MdFlightTakeoff,
  MdLightMode,
  MdSlowMotionVideo,
  MdMeetingRoom,
  MdHeadphones,
  MdComputer,
  MdColorLens,
} from "react-icons/md";
import TikitTitle from "../../components/TikitTitle";

gsap.registerPlugin(ScrollTrigger);

const Production = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const equipmentRef = useRef(null);

  // Scroll to top on mount
  useScrollToTop();

  useEffect(() => {
    let ctx;
    
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        // Hero animation
        if (heroRef.current) {
          const heroElements = heroRef.current.querySelectorAll(".hero-animate");
          if (heroElements.length > 0) {
            gsap.fromTo(
              heroElements,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Services animation
        if (servicesRef.current) {
          const serviceCards = servicesRef.current.querySelectorAll(".service-card");
          if (serviceCards.length > 0) {
            gsap.fromTo(
              serviceCards,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: servicesRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Process animation
        if (processRef.current) {
          const processSteps = processRef.current.querySelectorAll(".process-step");
          if (processSteps.length > 0) {
            gsap.fromTo(
              processSteps,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: processRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Equipment animation
        if (equipmentRef.current) {
          const equipmentItems = equipmentRef.current.querySelectorAll(".equipment-item");
          if (equipmentItems.length > 0) {
            gsap.fromTo(
              equipmentItems,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: equipmentRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
    data-nav-color="black"
      className={`min-h-screen bg-[var(--background)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-6"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#52C3C5]/20 via-transparent to-[#1C6F6C]/20" />
        </div>

        <div className="relative z-10 max-w-6xl mt-10 mx-auto text-center">
          <span className="hero-animate inline-block px-6 py-2 mb-6 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-semibold uppercase tracking-wider">
            {t("serviceSections.production.badge")}
          </span>
          <TikitTitle title={t("serviceSections.production.hero.title")} mainWord={t("serviceSections.production.hero.mainWord")} />
          <p className="hero-animate text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed">
            {t("serviceSections.production.hero.description")}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.production.services.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.production.services.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiVideoCamera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.production.services.items.videoProduction.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                {t("serviceSections.production.services.items.videoProduction.description")}
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                {t("serviceSections.production.services.items.videoProduction.features", { returnObjects: true }).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service 2 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiCamera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.production.services.items.photography.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                {t("serviceSections.production.services.items.photography.description")}
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                {t("serviceSections.production.services.items.photography.features", { returnObjects: true }).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service 3 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiPlay className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.production.services.items.postProduction.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                {t("serviceSections.production.services.items.postProduction.description")}
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                {t("serviceSections.production.services.items.postProduction.features", { returnObjects: true }).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service 4 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiMicrophone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.production.services.items.audioProduction.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                {t("serviceSections.production.services.items.audioProduction.description")}
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                {t("serviceSections.production.services.items.audioProduction.features", { returnObjects: true }).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service 5 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiDesktopComputer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.production.services.items.liveStreaming.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                {t("serviceSections.production.services.items.liveStreaming.description")}
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                {t("serviceSections.production.services.items.liveStreaming.features", { returnObjects: true }).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service 6 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightBulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                {t("serviceSections.production.services.items.creativeDirection.title")}
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                {t("serviceSections.production.services.items.creativeDirection.description")}
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                {t("serviceSections.production.services.items.creativeDirection.features", { returnObjects: true }).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Process Section */}
      <section ref={processRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.production.process.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.production.process.description")}
          </p>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#52C3C5] to-[#1C6F6C] transform -translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  phase: t("serviceSections.production.process.steps.preProduction.phase"),
                  title: t("serviceSections.production.process.steps.preProduction.title"),
                  desc: t("serviceSections.production.process.steps.preProduction.description"),
                },
                {
                  phase: t("serviceSections.production.process.steps.production.phase"),
                  title: t("serviceSections.production.process.steps.production.title"),
                  desc: t("serviceSections.production.process.steps.production.description"),
                },
                {
                  phase: t("serviceSections.production.process.steps.postProduction.phase"),
                  title: t("serviceSections.production.process.steps.postProduction.title"),
                  desc: t("serviceSections.production.process.steps.postProduction.description"),
                },
                {
                  phase: t("serviceSections.production.process.steps.delivery.phase"),
                  title: t("serviceSections.production.process.steps.delivery.title"),
                  desc: t("serviceSections.production.process.steps.delivery.description"),
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`process-step relative flex items-center gap-8 ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      idx % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div className="p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
                      <span className="text-[#52C3C5] text-sm font-semibold uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <h3 className="text-2xl font-bold text-[var(--foreground)] mt-2 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[var(--foreground)]/70">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#52C3C5] items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#52C3C5]/30 z-10">
                    {idx + 1}
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Equipment Section */}
      <section ref={equipmentRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.production.equipment.title")}
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            {t("serviceSections.production.equipment.description")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t("serviceSections.production.equipment.items", { returnObjects: true }).map((itemName, idx) => {
              const equipmentIcons = [
                MdCameraEnhance,
                MdFlightTakeoff,
                MdLightMode,
                MdSlowMotionVideo,
                MdMeetingRoom,
                MdHeadphones,
                MdComputer,
                MdColorLens,
              ];
              const IconComponent = equipmentIcons[idx];
              return (
                <div
                  key={idx}
                  className="equipment-item p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#52C3C5]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-[#52C3C5]" />
                  </div>
                  <p className="text-[var(--foreground)] font-semibold">
                    {itemName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            {t("serviceSections.production.cta.title")}
          </h2>
          <p className="text-[var(--foreground)]/70 text-lg mb-8">
            {t("serviceSections.production.cta.description")}
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#52C3C5] rounded-full hover:bg-[#1C6F6C] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#52C3C5]/30"
          >
            {t("serviceSections.production.cta.button")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Production;

