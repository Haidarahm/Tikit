import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
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

gsap.registerPlugin(ScrollTrigger);

const Production = () => {
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const equipmentRef = useRef(null);

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
            Production Services
          </span>
          <h1 className={`hero-animate text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            Bring Your Vision{" "}
            <span className="bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
              To Life
            </span>
          </h1>
          <p className="hero-animate text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed">
            From concept to final cut, we produce high-quality video content,
            photography, and multimedia that captivates audiences and tells your
            brand's story with cinematic excellence.
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
            Production Services
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            Full-service production capabilities for all your content needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiVideoCamera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Video Production
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                Commercial videos, corporate films, documentaries, and branded
                content produced with cinematic quality.
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  4K & 8K Resolution
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Drone Cinematography
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Professional Crew
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiCamera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Photography
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                Professional photography for products, events, portraits, and
                lifestyle content that captures perfect moments.
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Studio & On-Location
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Product Photography
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Event Coverage
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiPlay className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Post-Production
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                Expert editing, color grading, motion graphics, and visual
                effects to polish your content to perfection.
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Professional Editing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Color Grading
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  VFX & Animation
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiMicrophone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Audio Production
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                Professional audio recording, mixing, and sound design for
                pristine audio quality in all productions.
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Voice-Over Recording
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Sound Mixing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Music Composition
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiDesktopComputer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Live Streaming
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                Professional live streaming services for events, webinars, and
                broadcasts with multi-camera setups.
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Multi-Platform Streaming
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Live Switching
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Graphics Overlay
                </li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightBulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Creative Direction
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed mb-4">
                Concept development, storyboarding, and creative strategy to
                ensure your vision is perfectly realized.
              </p>
              <ul className="space-y-2 text-[var(--foreground)]/60 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Concept Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Storyboarding
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52C3C5]" />
                  Art Direction
                </li>
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
            Production Process
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            A streamlined workflow that ensures quality at every stage
          </p>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#52C3C5] to-[#1C6F6C] transform -translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  phase: "Pre-Production",
                  title: "Planning & Preparation",
                  desc: "Concept development, scriptwriting, location scouting, casting, and scheduling.",
                },
                {
                  phase: "Production",
                  title: "Filming & Recording",
                  desc: "Professional crew captures your content with state-of-the-art equipment.",
                },
                {
                  phase: "Post-Production",
                  title: "Editing & Finishing",
                  desc: "Editing, color grading, sound design, and final touches bring it all together.",
                },
                {
                  phase: "Delivery",
                  title: "Final Output",
                  desc: "Optimized deliverables in all required formats for your platforms.",
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
            Professional Equipment
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            Industry-leading tools and technology for exceptional results
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Cinema Cameras", icon: MdCameraEnhance },
              { name: "Drones (4K & 8K)", icon: MdFlightTakeoff },
              { name: "Professional Lighting", icon: MdLightMode },
              { name: "Gimbal Stabilizers", icon: MdSlowMotionVideo },
              { name: "Studio Setup", icon: MdMeetingRoom },
              { name: "Audio Equipment", icon: MdHeadphones },
              { name: "Editing Suites", icon: MdComputer },
              { name: "Color Grading Tools", icon: MdColorLens },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="equipment-item p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#52C3C5]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-[#52C3C5]" />
                  </div>
                  <p className="text-[var(--foreground)] font-semibold">
                    {item.name}
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
            Ready To Create Something Amazing?
          </h2>
          <p className="text-[var(--foreground)]/70 text-lg mb-8">
            Let's bring your creative vision to life with professional
            production
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#52C3C5] rounded-full hover:bg-[#1C6F6C] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#52C3C5]/30"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
};

export default Production;

