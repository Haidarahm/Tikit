import React, { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTheme } from "../../store/ThemeContext";
import { FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";
import influencer from "../../assets/influncer/1.png";
import overlay from "../../assets/tick-overlay.png";
import overlayDark from "../../assets/tick-overlay-dark.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Social Media Icons Component with Simple Magnetic Cursor Effect
const SocialIcon = ({ icon: Icon, href }) => {
  const buttonRef = useRef(null);
  const magneticArea = 120;
  const magneticStrength = 0.6;
  const scaleOnHover = 1.15;
  const lerpSpeed = 0.25;

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Set initial transform
    button.style.transformOrigin = "center center";
    button.style.transform = "translate3d(0, 0, 0) scale(1)";
    button.style.willChange = "transform";

    // Current and target values
    let currentX = 0;
    let currentY = 0;
    let currentScale = 1;
    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;

    // Animation loop
    let rafId = null;
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      // Smooth linear interpolation - no easing, just smooth following
      currentX += (targetX - currentX) * lerpSpeed;
      currentY += (targetY - currentY) * lerpSpeed;
      currentScale += (targetScale - currentScale) * lerpSpeed;

      // Direct transform update - smooth linear movement
      button.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;
      button.style.transformOrigin = "center center";

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < magneticArea) {
        // Simple linear calculation
        const normalizedDistance = distance / magneticArea;
        const strength = (1 - normalizedDistance) * magneticStrength;

        // Direct calculation - smooth linear following
        targetX = deltaX * strength;
        targetY = deltaY * strength;
        targetScale = 1 + (1 - normalizedDistance) * (scaleOnHover - 1);
      } else {
        targetX = 0;
        targetY = 0;
        targetScale = 1;
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      targetScale = 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      isAnimating = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);

      // Smooth linear return to original position
      const returnToOrigin = () => {
        const targetX = 0;
        const targetY = 0;
        const targetScale = 1;
        let currentX = parseFloat(
          button.style.transform.match(/translate3d\(([^,]+)/)?.[1] || 0
        );
        let currentY = parseFloat(
          button.style.transform.match(/translate3d\([^,]+,([^,]+)/)?.[1] || 0
        );
        let currentScale = parseFloat(
          button.style.transform.match(/scale\(([^)]+)/)?.[1] || 1
        );

        const returnAnimate = () => {
          currentX += (targetX - currentX) * 0.2;
          currentY += (targetY - currentY) * 0.2;
          currentScale += (targetScale - currentScale) * 0.2;

          button.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;

          if (
            Math.abs(currentX) > 0.1 ||
            Math.abs(currentY) > 0.1 ||
            Math.abs(currentScale - 1) > 0.01
          ) {
            requestAnimationFrame(returnAnimate);
          } else {
            button.style.transform = "";
          }
        };
        requestAnimationFrame(returnAnimate);
      };
      returnToOrigin();
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-14 h-14 rounded-full bg-[var(--secondary)]/10 hover:bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 relative overflow-hidden"
      style={{
        willChange: "transform",
      }}
    >
      <Icon className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-10" />
    </a>
  );
};

export const InfluencerDetails = ({
  name = "Sarah Johnson",
  primarySubtitle = "Digital Content Creator",
  secondarySubtitle = "Lifestyle & Fashion Influencer",
  image = influencer,
  socialLinks = [
    { platform: "instagram", href: "https://instagram.com/sarahjohnson" },
    { platform: "youtube", href: "https://youtube.com/@sarahjohnson" },
    { platform: "tiktok", href: "https://tiktok.com/@sarahjohnson" },
    { platform: "twitter", href: "https://twitter.com/sarahjohnson" },
  ],
  isReversed = false,
}) => {
  const { isRtl } = useI18nLanguage();
  const { theme } = useTheme();

  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const socialRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states based on isReversed
      gsap.set(nameRef.current, {
        opacity: 0,
        x: isReversed ? 100 : -100,
        rotation: isReversed ? 10 : -10,
      });
      gsap.set([subtitleRef.current, socialRef.current, imageRef.current], {
        opacity: 0,
        y: 50,
        scale: 0.8,
      });

      // Create timeline for animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // Animate elements in sequence
      tl.to(nameRef.current, {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      })
        .to(
          imageRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [theme, isReversed]);

  return (
    <section
      ref={sectionRef}
      className={`overflow-hidden w-full min-h-screen flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24 xl:gap-32 py-8 md:py-12 px-4 md:px-8 lg:px-14 ${
        isRtl ? "font-cairo" : "font-hero-light"
      } ${isReversed ? "lg:flex-row-reverse" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10">
        {/* Name */}
        <div className="space-y-2">
          <h1
            ref={nameRef}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--foreground)] leading-tight"
          >
            {name}
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="space-y-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-[var(--secondary)] font-medium">
            {primarySubtitle}
          </h2>
          <h3 className="text-lg md:text-xl lg:text-2xl text-[var(--foreground)]/80 font-light">
            {secondarySubtitle}
          </h3>
        </div>

        {/* Social Media Links */}
        <div ref={socialRef} className="flex flex-wrap gap-4 md:gap-6">
          {socialLinks.map((social, index) => {
            const getIcon = (platform) => {
              switch (platform) {
                case "instagram":
                  return FaInstagram;
                case "youtube":
                  return FaYoutube;
                case "tiktok":
                  return FaTiktok;
                case "twitter":
                  return FaTwitter;
                default:
                  return FaInstagram;
              }
            };

            return (
              <SocialIcon
                key={social.platform}
                icon={getIcon(social.platform)}
                href={social.href}
              />
            );
          })}
        </div>
      </div>

      {/* Image Section */}
      <div
        ref={imageRef}
        className={`relative flex flex-1 h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] rounded-2xl ${
          isReversed ? "justify-start" : "justify-end"
        }`}
      >
        <img
          src={image}
          alt={`${name} - ${primarySubtitle}`}
          className="w-[90%] h-full px-8"
          loading="lazy"
        />
        <img
          src={theme === "dark" ? overlayDark : overlay}
          alt="overlay"
          className={`absolute bottom-4 md:-bottom-2 md:h-2/3 w-[90%] ${
            isReversed ? "left-0" : "right-0"
          }`}
        />
      </div>
    </section>
  );
};
