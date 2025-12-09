import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import socialHero from "../../assets/services/Social-Media.webp";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import {
  HiDocumentText,
  HiCalendar,
  HiUserGroup,
  HiChartBar,
  HiCurrencyDollar,
  HiLightningBolt,
  HiCheckCircle,
} from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

const SocialMediaManagement = () => {
  const { isRtl, language } = useI18nLanguage();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const platformsRef = useRef(null);
  const benefitsRef = useRef(null);

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

        // Platforms animation
        if (platformsRef.current) {
          const platformCards = platformsRef.current.querySelectorAll(".platform-card");
          if (platformCards.length > 0) {
            gsap.fromTo(
              platformCards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: platformsRef.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }

        // Benefits animation
        if (benefitsRef.current) {
          const benefitItems = benefitsRef.current.querySelectorAll(".benefit-item");
          if (benefitItems.length > 0) {
            gsap.fromTo(
              benefitItems,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: benefitsRef.current,
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

  const platforms = [
    { name: "Instagram", icon: FaInstagram, color: "#E4405F" },
    { name: "Facebook", icon: FaFacebook, color: "#1877F2" },
    { name: "Twitter", icon: FaTwitter, color: "#1DA1F2" },
    { name: "LinkedIn", icon: FaLinkedin, color: "#0A66C2" },
    { name: "TikTok", icon: FaTiktok, color: "#000000" },
    { name: "YouTube", icon: FaYoutube, color: "#FF0000" },
  ];

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
        <div className="absolute inset-0 opacity-20">
          <img
            src={socialHero}
            alt="Social Media Management"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/60 to-[var(--background)]" />
        </div>

        <div className="relative mt-10 z-10 max-w-6xl mx-auto text-center">
          <span className="hero-animate inline-block px-6 py-2 mb-6 rounded-full bg-[#52C3C5]/10 text-[#52C3C5] text-sm font-semibold uppercase tracking-wider">
            Social Media Management
          </span>
          <h1 className={`hero-animate text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            Elevate Your{" "}
            <span className="bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
              Social Presence
            </span>
          </h1>
          <p className="hero-animate text-lg md:text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto leading-relaxed">
            We craft compelling social media strategies that build communities,
            drive engagement, and transform followers into loyal customers
            across all major platforms.
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
            What We Offer
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            Comprehensive social media management services tailored to your
            brand
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiDocumentText className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Content Creation
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Professional content creation including graphics, videos, and
                copywriting that resonates with your audience and reflects your
                brand identity.
              </p>
            </div>

            {/* Service 2 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiCalendar className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Content Planning
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Strategic content calendars and scheduling to ensure consistent
                posting and optimal timing for maximum reach and engagement.
              </p>
            </div>

            {/* Service 3 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiUserGroup className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Community Management
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Active engagement with your audience through comments, messages,
                and interactions to build a loyal community around your brand.
              </p>
            </div>

            {/* Service 4 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiChartBar className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Analytics & Insights
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Detailed performance tracking and reporting with actionable
                insights to continuously improve your social media strategy.
              </p>
            </div>

            {/* Service 5 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiCurrencyDollar className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Paid Advertising
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Targeted ad campaigns across social platforms to amplify reach,
                drive conversions, and maximize your marketing ROI.
              </p>
            </div>

            {/* Service 6 */}
            <div className="service-card p-8 rounded-3xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-[#52C3C5]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiLightningBolt className="w-7 h-7 text-[#52C3C5]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                Crisis Management
              </h3>
              <p className="text-[var(--foreground)]/70 leading-relaxed">
                Rapid response and strategic handling of negative feedback or
                PR situations to protect your brand reputation online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--foreground)]/20 to-transparent" />
      </div>

      {/* Platforms Section */}
      <section ref={platformsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            Platforms We Master
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            Expert management across all major social media platforms
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="platform-card group relative p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 hover:border-[#52C3C5]/50 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
              >
                <platform.icon className="w-12 h-12 md:w-16 md:h-16 text-[var(--foreground)] group-hover:text-[#52C3C5] transition-colors duration-300 mb-3" />
                <p className="text-sm font-semibold text-[var(--foreground)] text-center">
                  {platform.name}
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

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] text-center mb-4 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            Why Choose Us?
          </h2>
          <p className="text-[var(--foreground)]/60 text-center mb-16 max-w-2xl mx-auto">
            We deliver results that matter to your business
          </p>

          <div className="space-y-6">
            {[
              {
                title: "Data-Driven Strategy",
                desc: "Every decision backed by analytics and performance metrics",
              },
              {
                title: "Creative Excellence",
                desc: "Award-winning content that stands out and engages",
              },
              {
                title: "24/7 Monitoring",
                desc: "Round-the-clock social media monitoring and rapid response",
              },
              {
                title: "Transparent Reporting",
                desc: "Clear, detailed reports showing exactly what's working",
              },
              {
                title: "Industry Expertise",
                desc: "Years of experience across diverse industries and markets",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="benefit-item flex items-start gap-4 p-6 rounded-2xl bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#52C3C5] flex items-center justify-center">
                  <HiCheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--foreground)]/70">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-6 ${language === "ar" ? "font-cairo" : "font-antonio"}`}>
            Let's Grow Your Social Media Together
          </h2>
          <p className="text-[var(--foreground)]/70 text-lg mb-8">
            Partner with us to transform your social media into a powerful
            business asset
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#52C3C5] rounded-full hover:bg-[#1C6F6C] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#52C3C5]/30"
          >
            Start Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaManagement;

