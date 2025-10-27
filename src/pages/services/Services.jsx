import React, { useEffect, useRef, useMemo } from "react";
import Hero from "./Hero";
import "./services.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import { useTheme } from "../../store/ThemeContext"; // Import the theme context
import { useServicesStore } from "../../store/servicesStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";

const splitTextToSpans = (element, isArabic = false) => {
  if (!element || element.dataset.splitDone === "true") return;
  const originalText = element.textContent || "";
  element.innerHTML = "";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isArabic) {
    // For Arabic, don't split into letters - keep as whole text
    element.textContent = originalText;
    element.style.opacity = "0";
    element.style.transform = "translateX(-100px)";
    element.style.willChange = "transform, opacity";
  } else if (isMobile) {
    const tokens = originalText.split(/(\s+)/);
    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        element.appendChild(document.createTextNode(token));
      } else if (token.length > 0) {
        const span = document.createElement("span");
        span.textContent = token;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(100%)";
        span.style.willChange = "transform, opacity";
        element.appendChild(span);
      }
    });
  } else {
    originalText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(100%)";
      span.style.willChange = "transform, opacity";
      element.appendChild(span);
    });
  }
  element.dataset.splitDone = "true";
};

const Services = () => {
  const sectionRefs = useRef([]);
  const { theme } = useTheme(); // Get current theme
  const { services, loadServices, loading } = useServicesStore();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    loadServices({ lang: language, page: 1, per_page: 10 });
  }, [language, loadServices]);

  useEffect(() => {
    if (loading || !sections || sections.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const snapSections = gsap.utils.toArray(".snap-section");
    if (snapSections.length < 2) return;

    const scrollTriggers = [];

    sectionRefs.current.forEach((section) => {
      if (!section) return;

      const title = section.querySelector("h2");
      const descPara = section.querySelector(".section-desc");

      if (!title) return;

      // Reset the split text flag to allow re-splitting
      title.dataset.splitDone = "false";
      splitTextToSpans(title, isRtl);
      const titleSpans = title.querySelectorAll("span");

      const animateIn = () => {
        if (isRtl) {
          // Arabic animation: slide in from left with fade and scale
          gsap.to(title, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          });
        } else {
          // English/French animation: character by character
          titleSpans.forEach((s) => s.classList.add("char"));
          gsap.to(titleSpans, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: { each: 0.01, from: 0 },
            ease: "ease-in-out",
          });
        }

        if (descPara) {
          gsap.fromTo(
            descPara,
            { y: 20, autoAlpha: 0, filter: "blur(4px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power2.out",
              delay: 0.2,
            }
          );
        }
      };

      const animateOut = () => {
        if (isRtl) {
          // Arabic animation: slide out to left with fade and scale
          gsap.to(title, {
            opacity: 0,
            x: "-100px",
            scale: 0.8,
            duration: 0.3,
            ease: "power3.in",
          });
        } else {
          // English/French animation: character by character
          gsap.killTweensOf(titleSpans);
          gsap.to(titleSpans, {
            opacity: 0,
            y: "100%",
            duration: 0.2,
            ease: "power3.in",
          });
        }

        if (descPara) gsap.killTweensOf(descPara);
        if (descPara) {
          gsap.to(descPara, {
            autoAlpha: 0,
            y: 20,
            filter: "blur(4px)",
            duration: 0.2,
            ease: "power3.in",
          });
        }
      };

      // Initial state
      animateOut();

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: animateIn,
        onLeave: animateOut,
        onEnterBack: animateIn,
        onLeaveBack: animateOut,
      });

      scrollTriggers.push(trigger);
    });

    return () => {
      scrollTriggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger &&
          trigger.trigger.classList.contains("snap-section")
        ) {
          trigger.kill();
        }
      });
    };
  }, [services, loading]);

  const sections = useMemo(() => {
    const list = Array.isArray(services) ? services : [];
    return list.map((s) => ({
      id: s.id,
      title: s.title ?? "",
      description: s.description ?? "",
      image: s.media ?? "",
    }));
  }, [services]);

  // Calculate overlay based on theme
  const getSectionStyle = (image) => ({
    backgroundImage: `url(${image})`,
    backgroundBlendMode: theme === "dark" ? "multiply" : "overlay",
    backgroundColor:
      theme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
  });

  return (
    <div
      className={`services-section w-full ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <Hero />
      <div>
        {sections.map((section, index) => (
          <section
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="snap-section h-screen w-full flex items-center justify-center"
            style={getSectionStyle(section.image)}
            aria-label={`${section.title} service`}
          >
            <div
              className={`relative z-10 w-full text-center px-2 md:px-6 ${
                theme === "dark" ? "text-white" : "text-[var(--foreground)]"
              }`}
            >
              <h2 className="section-title text-[40px] md:text-8xl font-extrabold mb-8 leading-[5.9rem]">
                {section.title}
              </h2>
              <p className="section-desc max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed opacity-0 will-change-transform">
                {section.description}
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  className="font-light bg-[var(--secondary)] text-[var(--background)] rounded-full border border-[var(--secondary)] dark:border-white px-4 md:px-5 py-1.5 md:py-2 text-[12px] md:text-[14px] transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-md hover:ring-1 hover:ring-[var(--secondary)] dark:hover:ring-white hover:brightness-105"
                  type="button"
                >
                  {t("home.services.explore") || "Explore Service"}
                </button>
              </div>
            </div>
          </section>
        ))}
        {!loading && (!sections || sections.length === 0) ? (
          <div className="text-center py-10 opacity-70">
            {t("home.services.noServices") || "No services found."}
          </div>
        ) : null}
      </div>
      <ContactUs className="snap-section snap-start h-screen flex items-center justify-center" />
      <Footer className="snap-section snap-start h-screen flex items-center" />
    </div>
  );
};

export default Services;
