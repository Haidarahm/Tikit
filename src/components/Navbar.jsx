import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SVGComponent from "../assets/logo";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import TikitButton from "./TikitButton";
import { useI18nLanguage } from "../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import { useTheme } from "../store/ThemeContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const navRef = useRef();
  const logoRef = useRef();
  const mobileMenuRef = useRef();
  const hamburgerRef = useRef();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const hidden = useRef(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const langMenuRef = useRef(null);

  const links = [
    { to: "/home", key: "nav.home" },
    { to: "/work", key: "nav.work" },
    { to: "/about", key: "nav.about" },
    { to: "/services", key: "nav.services" },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animate hamburger icon
  const animateHamburger = (isOpen) => {
    const lines = hamburgerRef.current?.querySelectorAll(".hamburger-line");
    if (!lines) return;

    if (isOpen) {
      gsap.to(lines[0], {
        rotation: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(lines[1], { opacity: 0, duration: 0.2, ease: "power2.out" });
      gsap.to(lines[2], {
        rotation: -45,
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(lines[0], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(lines[1], {
        opacity: 1,
        duration: 0.2,
        delay: 0.1,
        ease: "power2.out",
      });
      gsap.to(lines[2], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Animate mobile menu
  const animateMobileMenu = (isOpen) => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );

      const menuItems =
        mobileMenuRef.current.querySelectorAll(".mobile-nav-item");
      gsap.fromTo(
        menuItems,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
        },
      });
    }
  };

  // Handle mobile menu animations
  useEffect(() => {
    animateHamburger(isMobileMenuOpen);
    animateMobileMenu(isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  // Handle click outside to close language menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLangOpen]);

  useEffect(() => {
    AOS.init({ duration: 750, once: true });

    // timeline: logo appears first, then nav items stagger
    const queryNavItems = () =>
      navRef.current ? navRef.current.querySelectorAll(".nav-item") : [];

    // Removed resize intro effect

    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.8,
        ease: "back.out(1.7)",
      }
    ).fromTo(
      queryNavItems(),
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        delay: 0.8,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.35"
    );

    // logo part hover: make only the marked path jump
    const logoNode = logoRef.current;
    if (logoNode) {
      const jumpTarget = logoNode.querySelector(".logo-jump");
      if (jumpTarget) {
        const onEnterLogoPart = () => {
          gsap.fromTo(
            jumpTarget,
            { y: 0 },
            {
              y: -16,
              duration: 0.24,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            }
          );
        };
        logoNode.addEventListener("mouseenter", onEnterLogoPart);
        logoNode._onEnterLogoPart = onEnterLogoPart;
      }
    }

    // underline hover animations using GSAP
    const items = queryNavItems();
    const enter = (underline) => {
      gsap.to(underline, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.28,
        ease: "power2.out",
      });
    };
    const leave = (underline) => {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.26,
        ease: "power2.in",
      });
    };
    // attach listeners
    items.forEach((el) => {
      const underline = el.querySelector(".nav-underline");
      if (!underline) return;
      // set initial state
      gsap.set(underline, { scaleX: 0, transformOrigin: "left" });
      const onEnter = () => enter(underline);
      const onLeave = () => leave(underline);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      // store for cleanup
      el._onEnter = onEnter;
      el._onLeave = onLeave;
    });

    // scroll handler: hide on scroll down, show on scroll up (desktop only)
    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      // small threshold to avoid jitter
      if (Math.abs(currentY - lastScrollY.current) < 6) {
        ticking.current = false;
        return;
      }

      // Only apply scroll hide effect on desktop (lg breakpoint and above)
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint in Tailwind

      if (isDesktop && currentY > lastScrollY.current && currentY > 80) {
        // scrolling down -> hide (desktop only)
        if (!hidden.current && navRef.current) {
          gsap.to(navRef.current, {
            y: -120,
            duration: 0.35,
            ease: "power2.out",
          });
          hidden.current = true;
        }
      } else if (isDesktop || (!isDesktop && hidden.current)) {
        // scrolling up -> show (always show on mobile, show on desktop when scrolling up)
        if (hidden.current && navRef.current) {
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });
          hidden.current = false;
        }
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(handleScroll);
      }
    };

    // Handle window resize to ensure navbar is visible on mobile
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop && hidden.current && navRef.current) {
        // Ensure navbar is visible on mobile
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });
        hidden.current = false;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      tl.kill();
      // cleanup hover listeners
      const cleanupItems = queryNavItems();
      cleanupItems.forEach((el) => {
        if (el._onEnter) el.removeEventListener("mouseenter", el._onEnter);
        if (el._onLeave) el.removeEventListener("mouseleave", el._onLeave);
        delete el._onEnter;
        delete el._onLeave;
      });
      // cleanup logo part hover
      if (logoNode && logoNode._onEnterLogoPart) {
        logoNode.removeEventListener("mouseenter", logoNode._onEnterLogoPart);
        delete logoNode._onEnterLogoPart;
      }
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 md:top-10 inset-x-0 z-50 gpu-transform ${
          language === "ar" ? "font-cairo" : ""
        }`}
        style={{ transform: "translateY(0)" }}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div
          className={`${
            isRtl ? "flex-row-reverse" : ""
          } w-[95%] md:w-6/7 mx-auto rounded-full h-14 md:h-16 justify-between flex items-center px-4 md:px-6 py-2 bg-white/5 backdrop-blur-md shadow-sm text-white`}
        >
          {/* Logo */}
          <div
            className={`h-10 md:h-12 flex items-center justify-center ${
              language === "ar" ? "order-4" : ""
            }`}
          >
            <div
              ref={logoRef}
              className="h-10  md:h-12 transform-gpu"
            >
              <SVGComponent
                color={theme === "dark" ? "#FFFFFF" : "#363737"}
                logoJumpColor={theme === "dark" ? "#FFFFFF" : "#52C3C5"}
                className="p-1 md:p-2 h-full overflow-visible"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex justify-end ${
              language === "ar" ? "order-2" : ""
            }`}
          >
            <div className="flex gap-6 items-center">
              {links.map(({ to, key }) => (
                <Link
                  key={to}
                  to={to}
                  className="nav-item text-[var(--foreground)]  uppercase  text-sm opacity-0  relative inline-block"
                >
                  <span className="relative inline-block">
                    {t(key)}
                    <span
                      className="nav-underline"
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -2,
                        height: 1,
                        backgroundColor: "currentColor",
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        display: "block",
                      }}
                    />
                  </span>
                </Link>
              ))}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setIsLangOpen((v) => !v)}
                  className="nav-item uppercase font-light text-sm opacity-0 text-[var(--foreground)] relative inline-flex items-center gap-2"
                  aria-haspopup="listbox"
                  aria-expanded={isLangOpen}
                >
                  <span className="relative inline-block">
                    {language === "en" ? "En" : language === "fr" ? "Fr" : "Ar"}
                    <span
                      className="nav-underline"
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -2,
                        height: 1,
                        backgroundColor: "currentColor",
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        display: "block",
                      }}
                    />
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: isLangOpen ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path
                      d="M8 5l8 7-8 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isLangOpen && (
                  <div
                    className={`absolute right-0 mt-3 min-w-[120px] rounded-lg shadow-lg border z-50 ${
                      theme === "dark"
                        ? "bg-gray-900/95 backdrop-blur-md border-gray-700/50"
                        : "bg-white/95 backdrop-blur-md border-gray-200/50"
                    }`}
                    role="listbox"
                  >
                    {[
                      { value: "en", label: "En" },
                      { value: "fr", label: "Fr" },
                      { value: "ar", label: "Ar" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        className={`block w-full text-left px-4 py-3 text-sm uppercase transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          language === opt.value
                            ? theme === "dark"
                              ? "bg-blue-600/20 text-blue-300 border-l-2 border-blue-400"
                              : "bg-blue-100/50 text-[#52C3C5] border-l-2 border-[#52C3C5]/80"
                            : theme === "dark"
                            ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                        }`}
                        onClick={() => {
                          setLanguage(opt.value);
                          setIsLangOpen(false);
                        }}
                        role="option"
                        aria-selected={language === opt.value}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Right Controls */}
          <div
            className={`hidden lg:flex items-center gap-3 ${
              language === "ar" ? "order-1" : ""
            }`}
          >
            <button
              onClick={toggleTheme}
              className="h-10 w-10 rounded-full border border-white/15 bg-[var(--secondary)] text-[var(--background)] flex items-center justify-center shadow-sm hover:ring-2 ring-primary/40 transition"
              aria-label="Toggle theme"
              aria-pressed={theme === "dark"}
              role="switch"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                >
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 7h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM3 12H2a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Zm15.657 7.071-0.707-0.707a1 1 0 0 1 1.414-1.414l0.707 0.707a1 1 0 1 1-1.414 1.414ZM4.636 6.343 3.929 5.636A1 1 0 1 1 5.343 4.222l0.707 0.707A1 1 0 1 1 4.636 6.343Zm13.435-2.121-0.707 0.707A1 1 0 1 1 15.95 3.515l0.707-0.707a1 1 0 1 1 1.414 1.414ZM6.05 19.778l-0.707-0.707a1 1 0 1 1 1.414-1.414l0.707 0.707A1 1 0 0 1 6.05 19.778Z" />
                </svg>
              )}
            </button>
            <TikitButton
              text={t("nav.contact") || "Contact Us"}
              onClick={() => navigate("/contact")}
            />
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            className={`lg:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 focus:outline-none ${
              language === "ar" ? "order-3" : ""
            }`}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300"></span>
            <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300"></span>
            <span className="hamburger-line w-6 h-0.5 bg-[var(--foreground)] transform transition-all duration-300"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center lg:hidden bg-[var(--container-bg)]"
        style={{ display: "none" }}
      >
        <div className="flex flex-col items-center space-y-8">
          {links.map(({ to, key }, index) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-item text-[var(--foreground)] text-3xl md:text-4xl  uppercase tracking-wider hover:opacity-70 transition-colors duration-300"
            >
              {t(key)}
            </Link>
          ))}

          {/* Mobile Theme Toggle */}
          <div className="mobile-nav-item">
            <button
              onClick={toggleTheme}
              className="h-12 w-12 rounded-full border border-white/15 bg-[var(--secondary)] text-[var(--background)] flex items-center justify-center shadow-sm hover:ring-2 ring-primary/40 transition"
              aria-label="Toggle theme"
              aria-pressed={theme === "dark"}
              role="switch"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                >
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 7h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM3 12H2a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Zm15.657 7.071-0.707-0.707a1 1 0 0 1 1.414-1.414l0.707 0.707a1 1 0 1 1-1.414 1.414ZM4.636 6.343 3.929 5.636A1 1 0 1 1 5.343 4.222l0.707 0.707A1 1 0 1 1 4.636 6.343Zm13.435-2.121-0.707 0.707A1 1 0 1 1 15.95 3.515l0.707-0.707a1 1 0 1 1 1.414 1.414ZM6.05 19.778l-0.707-0.707a1 1 0 1 1 1.414-1.414l0.707 0.707A1 1 0 0 1 6.05 19.778Z" />
                </svg>
              )}
            </button>
          </div>

          <div className="mobile-nav-item mt-8">
            <TikitButton
              text={t("nav.contact") || "Contact Us"}
              onClick={() => {
                navigate("/contact");
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
          {/* Mobile Language selector */}
          <div className="mobile-nav-item w-full px-6 mt-6">
            <button
              onClick={() => setIsLangOpen((v) => !v)}
              className="w-full flex items-center justify-between text-[var(--foreground)] text-2xl md:text-3xl font-light uppercase tracking-wider"
            >
              <span>
                {language === "en" ? "En" : language === "fr" ? "Fr" : "Ar"}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isLangOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path
                  d="M8 5l8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isLangOpen && (
              <div className="mt-4 flex flex-col gap-3">
                {[
                  { value: "en", label: "En" },
                  { value: "fr", label: "Fr" },
                  { value: "ar", label: "Ar" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    className={`text-xl md:text-2xl font-light uppercase tracking-wider transition-all duration-200 py-2 px-4 rounded-lg ${
                      language === opt.value
                        ? theme === "dark"
                          ? "bg-blue-600/20 text-blue-300 border-l-4 border-blue-400"
                          : "bg-blue-100/50 text-blue-700 border-l-4 border-blue-500"
                        : theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-800/30"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    }`}
                    onClick={() => {
                      setLanguage(opt.value);
                      setIsLangOpen(false);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
