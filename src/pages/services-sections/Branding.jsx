import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import {
  HiColorSwatch,
  HiLightBulb,
  HiTemplate,
  HiBookOpen,
  HiCube,
  HiRefresh,
} from "react-icons/hi";
import {
  MdBrush,
  MdPalette,
  MdTextFields,
  MdDashboard,
  MdCreditCard,
  MdDescription,
  MdEmail,
  MdPhoneIphone,
  MdCardGiftcard,
  MdLocalMall,
  MdDirectionsCar,
  MdStorefront,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Branding = () => {
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const elementsRef = useRef(null);

  useEffect(() => {
    let ctx;
    
    // Small delay to ensure DOM is ready
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
          const processItems = processRef.current.querySelectorAll(".process-item");
          if (processItems.length > 0) {
            gsap.fromTo(
              processItems,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
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

        // Elements animation
        if (elementsRef.current) {
          const elementCards = elementsRef.current.querySelectorAll(".element-card");
          if (elementCards.length > 0) {
            gsap.fromTo(
              elementCards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: elementsRef.current,
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
          <div className="absolute inset-0 bg-gradient-to-tr from-[#52C3C5]/30 via-transparent to-[#1C6F6C]/30" />
        </div>

        <div className="relative mt-10 z-10 max-w-6xl mx-auto text-center">
          <span className="hero-animate inline-block px-6 py-2 mb-6 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-semibold uppercase tracking-wider">
            Branding & Identity
          </span>
          <h1 className={`hero-animate text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            Build A Brand{" "}
            <span className="bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
              That Stands Out
            </span>
          </h1>
          <p className="hero-animate text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed">
            We create distinctive brand identities that resonate with your
            audience, communicate your values, and set you apart in a crowded
            marketplace with memorable design and strategic positioning.
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
            Branding Services
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            Complete branding solutions to establish and elevate your brand
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiColorSwatch className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Brand Strategy
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Comprehensive brand strategy development including positioning,
                messaging, values, and market differentiation to guide all brand
                communications.
              </p>
            </div>

            {/* Service 2 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightBulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Logo Design
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Custom logo design that captures your brand essence with
                memorable, scalable, and timeless visual marks that work across
                all applications.
              </p>
            </div>

            {/* Service 3 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiTemplate className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Visual Identity
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Complete visual identity systems including color palettes,
                typography, imagery style, and design patterns for cohesive
                brand expression.
              </p>
            </div>

            {/* Service 4 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiBookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Brand Guidelines
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Comprehensive brand guidelines documentation ensuring consistent
                brand application across all touchpoints and teams.
              </p>
            </div>

            {/* Service 5 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiCube className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Packaging Design
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Eye-catching packaging design that protects your product while
                attracting customers and communicating brand value on the shelf.
              </p>
            </div>

            {/* Service 6 */}
            <div className="service-card group p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiRefresh className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                Brand Refresh
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Modernize and revitalize existing brands to stay relevant,
                appeal to new audiences, and reflect business evolution while
                maintaining brand equity.
              </p>
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
            Our Branding Process
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            A strategic approach to creating powerful brand identities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Research",
                desc: "Deep dive into your business, competitors, target audience, and market landscape to inform strategy.",
              },
              {
                step: "02",
                title: "Strategy Development",
                desc: "Define brand positioning, personality, values, and messaging that differentiate you in the market.",
              },
              {
                step: "03",
                title: "Visual Exploration",
                desc: "Create multiple design directions exploring different visual approaches to your brand identity.",
              },
              {
                step: "04",
                title: "Design Refinement",
                desc: "Refine chosen direction with careful attention to every detail for perfect execution.",
              },
              {
                step: "05",
                title: "Brand System Creation",
                desc: "Develop complete brand system with all visual elements, patterns, and applications.",
              },
              {
                step: "06",
                title: "Guidelines & Launch",
                desc: "Deliver comprehensive brand guidelines and support successful brand launch and rollout.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="process-item relative p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#52C3C5] to-[#1C6F6C] flex items-center justify-center text-white font-bold shadow-lg shadow-[#52C3C5]/30 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 mt-4">
                  {item.title}
                </h3>
                <p className="text-[var(--foreground)]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Brand Elements Section */}
      <section ref={elementsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            Brand Identity Elements
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            Everything you need for a complete and cohesive brand presence
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: MdBrush, title: "Logo Design" },
              { icon: MdPalette, title: "Color Palette" },
              { icon: MdTextFields, title: "Typography" },
              { icon: MdDashboard, title: "Design System" },
              { icon: MdCreditCard, title: "Business Cards" },
              { icon: MdDescription, title: "Letterhead" },
              { icon: MdEmail, title: "Email Templates" },
              { icon: MdPhoneIphone, title: "Social Media Templates" },
              { icon: MdCardGiftcard, title: "Packaging" },
              { icon: MdLocalMall, title: "Merchandise" },
              { icon: MdDirectionsCar, title: "Vehicle Wraps" },
              { icon: MdStorefront, title: "Signage" },
            ].map((element, idx) => {
              const IconComponent = element.icon;
              return (
                <div
                  key={idx}
                  className="element-card group text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#52C3C5]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-[#52C3C5]" />
                  </div>
                  <p className="text-[var(--foreground)] font-semibold text-sm">
                    {element.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                300+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                Brands Created
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                15+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                Years Experience
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                25+
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                Industry Awards
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10">
              <h3 className="text-4xl md:text-5xl font-bold text-[#52C3C5] mb-2">
                98%
              </h3>
              <p className="text-[var(--foreground)]/70 text-sm md:text-base">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            Ready To Build Your Brand?
          </h2>
          <p className="text-[var(--foreground)]/70 text-lg mb-8">
            Let's create a brand identity that makes a lasting impression
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#52C3C5] rounded-full hover:bg-[#1C6F6C] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#52C3C5]/30"
          >
            Let's Talk
          </a>
        </div>
      </section>
    </div>
  );
};

export default Branding;

