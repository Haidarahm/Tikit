import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTheme } from "../../store/ThemeContext";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaSnapchatGhost,
} from "react-icons/fa";
import influencer from "../../assets/influncer/1.png";
import overlay from "../../assets/tick-overlay.webp";
import overlayDark from "../../assets/tick-overlay-dark.webp";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Social Media Icons Component with Simple Magnetic Cursor Effect
const SOCIAL_ICON_MAP = {
  instagram: FaInstagram,
  ig: FaInstagram,
  youtube: FaYoutube,
  yt: FaYoutube,
  tiktok: FaTiktok,
  tik_tok: FaTiktok,
  twitter: FaTwitter,
  x: FaTwitter,
  facebook: FaFacebookF,
  fb: FaFacebookF,
  linkedin: FaLinkedinIn,
  snapchat: FaSnapchatGhost,
  snap: FaSnapchatGhost,
};

const SocialIcon = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group flex items-center justify-center w-14 h-14 rounded-full bg-[var(--secondary)]/10 hover:bg-[var(--secondary)] text-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 relative overflow-hidden"
  >
    <Icon className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full z-10" />
  </a>
);

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
      className={`overflow-hidden justify-between w-full min-h-[80vh] flex flex-col lg:flex-row items-center md:gap-4 lg:gap-8 xl:gap-12  ${
        isRtl ? "font-cairo" : "font-hero-light"
      } ${isReversed ? "lg:flex-row-reverse" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Content Section */}
      <div className=" w-1/2 flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-10">
        {/* Name */}
        <div className="space-y-2">
          <h2
            ref={nameRef}
            className={`text-4xl md:text-6xl lg:text-7xl  font-bold text-[var(--foreground)] leading-tight ${isRtl ? "font-cairo" : "font-antonio"}`}
          >
            {name}
          </h2>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="space-y-4">
          <h3 className="text-xl md:text-2xl lg:text-3xl text-[var(--secondary)] font-medium">
            {primarySubtitle}
          </h3>
          <h4 className="text-lg md:text-xl lg:text-2xl text-[var(--foreground)]/80 font-light">
            {secondarySubtitle}
          </h4>
        </div>

        {/* Social Media Links */}
        <div ref={socialRef} className="flex flex-wrap gap-4 md:gap-6">
          {socialLinks.map((social) => {
            const platform = social?.platform || social?.link_type || "";
            const resolvedPlatform = String(platform).toLowerCase();
            const Icon = SOCIAL_ICON_MAP[resolvedPlatform] || FaInstagram;
            if (!social?.href && !social?.link) return null;
            const href = social.href || social.link;
            return (
              <SocialIcon
                key={social.platform}
                icon={Icon}
                href={href}
                label={resolvedPlatform}
              />
            );
          })}
        </div>
      </div>

      {/* Image Section */}
      <div
        ref={imageRef}
        className={`relative flex  h-[200px] md:h-[300px] lg:h-[400px] w-[200px] md:w-[300px] lg:w-[400px]  rounded-2xl ${
          isReversed ? "justify-start" : "justify-end"
        }`}
      >
        <img
          src={image}
          alt={`${name} - ${primarySubtitle}`}
          width={400}
          height={400}
          className=" w-full h-full px-[1px] lg:px-[2px]"
          loading="lazy"
        />
        <img
          src={theme === "dark" ? overlayDark : overlay}
          alt="overlay"
          width={400}
          height={267}
          className={`absolute w-full bottom-4 md:-bottom-2 md:h-2/3  ${
            isReversed ? "left-0" : "right-0"
          }`}
        />
      </div>
    </section>
  );
};
