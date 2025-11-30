import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../store/ThemeContext";
import { useTeamStore } from "../../store/teamStore";
import {
  FaTwitter,
  FaYoutube,
  FaSnapchat,
  FaPinterest,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const TYPE_STYLES = {
  default: {
    gradient: "from-white/15 via-white/5 to-white/5",
    badge: "bg-white/20 border border-white/25 text-white/80",
    name: "text-white",
    specialist: "text-white/70",
  },
  "web development": {
    gradient: "from-blue-500/25 via-blue-500/10 to-blue-400/10",
    badge: "bg-blue-500/25 border border-blue-400/30 text-blue-100",
    name: "text-blue-100",
    specialist: "text-blue-200/80",
  },
  "social media team": {
    gradient: "from-fuchsia-500/30 via-purple-500/15 to-purple-400/10",
    badge: "bg-fuchsia-500/25 border border-fuchsia-400/40 text-fuchsia-100",
    name: "text-fuchsia-100",
    specialist: "text-fuchsia-200/80",
  },
  monitor: {
    gradient: "from-emerald-500/25 via-lime-500/15 to-emerald-400/10",
    badge: "bg-emerald-500/25 border border-emerald-400/40 text-emerald-100",
    name: "text-emerald-100",
    specialist: "text-emerald-200/80",
  },
  "graphic design": {
    gradient: "from-orange-500/30 via-amber-500/15 to-orange-400/10",
    badge: "bg-orange-500/25 border border-orange-400/40 text-orange-100",
    name: "text-orange-100",
    specialist: "text-orange-200/80",
  },
  photographers: {
    gradient: "from-amber-500/25 via-yellow-500/15 to-amber-300/10",
    badge: "bg-amber-500/25 border border-amber-400/40 text-amber-100",
    name: "text-amber-100",
    specialist: "text-amber-200/80",
  },
  ceo: {
    gradient: "from-sky-500/30 via-sky-400/15 to-cyan-400/10",
    badge: "bg-sky-500/25 border border-sky-400/40 text-sky-100",
    name: "text-sky-100",
    specialist: "text-sky-200/80",
  },
  presenter: {
    gradient: "from-rose-500/30 via-pink-500/15 to-rose-300/10",
    badge: "bg-rose-500/25 border border-rose-400/40 text-rose-100",
    name: "text-rose-100",
    specialist: "text-rose-200/80",
  },
};

const Team = () => {
  const { theme } = useTheme();
  const { teamMembers, loading, error, loadTeamMembers } = useTeamStore();

  const sectionRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    loadTeamMembers();
  }, [loadTeamMembers]);

  // Refresh ScrollTrigger when team data loads
  useEffect(() => {
    if (teamMembers && teamMembers.length > 0) {
      setTimeout(() => ScrollTrigger.refresh(), 200);
    }
  }, [teamMembers]);

  const iconMap = {
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    snapchat: <FaSnapchat />,
    pinterest: <FaPinterest />,
    website: <FaGlobe />,
  };

  // Horizontal scroll using GSAP ScrollTrigger (works with Lenis)
  useEffect(() => {
    if (!teamMembers || teamMembers.length === 0) return;
    if (!sectionRef.current || !trackRef.current) return;

    // Skip on mobile
    if (window.innerWidth < 768) {
      setScrollHeight(0);
      return;
    }

    const track = trackRef.current;
    const section = sectionRef.current;
    const imgs = Array.from(track.querySelectorAll("img"));

    let ctx;
    let resizeTimer;

    const initHorizontalScroll = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // The scrollable distance is the track width minus the visible area (70% of viewport)
      const scrollDistance = trackWidth - viewportWidth * 0.7;
      const maxTranslate = scrollDistance;

      // Set the section height: viewport height + scroll distance
      setScrollHeight(viewportHeight + scrollDistance);

      // Kill previous context if exists
      if (ctx) ctx.revert();

      // Create GSAP context for cleanup
      ctx = gsap.context(() => {
        // Use ScrollTrigger for horizontal scroll - works with Lenis
        gsap.to(track, {
          x: -maxTranslate,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1,
            pin: stickyContainerRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      // Refresh ScrollTrigger after setup
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    // Preload images then init
    Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve();
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          })
      )
    ).then(() => {
      // Wait for DOM to be ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(initHorizontalScroll, 150);
        });
      });
    });

    // Handle resize
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth < 768) {
          if (ctx) ctx.revert();
          setScrollHeight(0);
          return;
        }
        initHorizontalScroll();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, [teamMembers]);

  // GSAP animations for mobile cards
  useEffect(() => {
    if (!teamMembers || teamMembers.length === 0) return;

    const mobileCards = document.querySelectorAll(".mobile-team-card");
    if (mobileCards.length === 0) return;

    const ctx = gsap.context(() => {
      mobileCards.forEach((card, index) => {
        gsap.set(card, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            gsap.to(card, {
              scaleX: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: "power2.inOut",
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, [teamMembers]);

  if (loading) {
    return (
      <div className="relative overflow-visible md:overflow-hidden mt-[50px] text-white font-hero-light flex items-center justify-center min-h-[50vh]">
        <p className="text-[var(--foreground)]">Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative overflow-visible md:overflow-hidden mt-[50px] text-white font-hero-light flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500">Error loading team members: {error}</p>
      </div>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="relative overflow-visible md:overflow-hidden mt-[50px] text-white font-hero-light flex items-center justify-center min-h-[50vh]">
        <p className="text-[var(--foreground)]">No team members available</p>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      dir="ltr"
      id="team-section"
      className="relative mt-[50px] text-white font-hero-light"
      style={{ height: scrollHeight > 0 ? `${scrollHeight}px` : "auto" }}
    >
      {/* Desktop Horizontal Scroll */}
      <div
        ref={stickyContainerRef}
        className="hidden md:flex flex-row h-screen overflow-hidden"
      >
        {/* Fixed Left Title Section */}
        <div
          className={`${
            theme === "light" ? "light" : "dark"
          } left-section z-50 absolute left-0 top-0 w-[30%] h-full flex items-center px-6 md:px-[50px] py-6 md:py-0 text-[28px] sm:text-[40px] md:text-[64px] bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundColor: theme === "light" ? "#f7f9fa" : "#000",
          }}
        >
          <h1 className="font-antonio text-[var(--foreground)] font-bold md:text-[95px] leading-[1.1]">
            Our <span className="tikit-gradient">creative team</span>
          </h1>
        </div>

        {/* Horizontal Scrolling Track */}
        <div className="relative z-0 flex flex-row flex-1 h-screen pl-[30%] w-full">
          <div
            ref={trackRef}
            className="flex flex-row items-center gap-6 will-change-transform py-0 pr-[30vw]"
          >
            <div className="relative w-[30px] h-[650px] shrink-0 overflow-hidden"></div>
            {teamMembers.map((member, index) => {
              const typeKey = member.type?.toLowerCase?.();
              const styles = TYPE_STYLES[typeKey] || TYPE_STYLES.default;

              return (
                <div
                  key={member.id || index}
                  className={`relative group flex flex-col justify-end rounded-[10px] transition-all duration-500 w-[450px] h-[650px] shrink-0 overflow-hidden border border-white/20 bg-gradient-to-br ${styles.gradient} backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:shadow-[0_0_55px_rgba(255,255,255,0.25)]`}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={member.image}
                      alt={member.name || `team-${index + 1}`}
                      className="absolute w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 "
                      draggable={false}
                    />

                    {/* Enhanced Soft Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/65" />

                    {/* Glow edges */}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-6 p-6 md:p-8">
                    {/* Type badge */}
                    <div className="flex justify-start">
                      <span
                        className={`inline-flex items-center rounded-full px-4 py-2 text-xs tracking-[0.22em] uppercase font-semibold backdrop-blur-xl ${styles.badge}`}
                      >
                        {member.type}
                      </span>
                    </div>

                    {/* Name + Specialist */}
                    <div className="text-center md:text-left space-y-3 bg-black/20 rounded-xl p-4 backdrop-blur-md border border-white/10 shadow-inner">
                      <h3
                        className={`text-2xl md:text-3xl font-bold tracking-[0.28em] uppercase drop-shadow ${styles.name}`}
                      >
                        {member.name}
                      </h3>
                      <p
                        className={`text-sm md:text-base capitalize tracking-[0.25em] ${styles.specialist}`}
                      >
                        {member.specialist}
                      </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      {member.social_links?.length > 0 ? (
                        member.social_links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[22px]  p-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/20"
                          >
                            {iconMap[link.link_type] || <FaGlobe />}
                          </a>
                        ))
                      ) : (
                        <span className="text-white/60 text-sm tracking-[0.2em] uppercase">
                          No social links
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="relative w-[450px] h-[650px] shrink-0 overflow-hidden"></div>
          </div>
        </div>
      </div>

      {/* Mobile View Cards - separate from sticky scroll */}
      <div className="block md:hidden mt-8 min-h-[1400px] relative">
        <div className="text-center mb-8 px-4">
          <h2 className="text-[var(--foreground)] text-[28px] font-bold leading-[1.2]">
            Our Creative Team
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4">
          {teamMembers.map((member, index) => {
            const typeKey = member.type?.toLowerCase?.();
            const styles = TYPE_STYLES[typeKey] || TYPE_STYLES.default;

            return (
              <div
                key={member.id ? `mobile-${member.id}` : `mobile-${index}`}
                className={`mobile-team-card relative w-full h-[320px] rounded-[20px] overflow-hidden shadow-lg loco-reveal-card border border-white/10 bg-gradient-to-br ${styles.gradient} backdrop-blur`}
              >
                <img
                  src={member.image}
                  alt={member.name || `team-${index + 1}`}
                  className="h-full w-full object-cover select-none absolute inset-0  mix-blend-luminosity"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/90" />
                <div className="relative h-full flex flex-col justify-end items-center gap-4 p-6">
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-2 text-xs tracking-[0.25em] uppercase font-semibold backdrop-blur ${styles.badge}`}
                  >
                    {member.type}
                  </span>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[16px] w-full p-5 text-center space-y-2">
                    <div
                      className={`text-xl font-semibold tracking-[0.3em] uppercase ${styles.name}`}
                    >
                      {member.name}
                    </div>
                    <div
                      className={`text-sm tracking-[0.3em] uppercase ${styles.specialist}`}
                    >
                      {member.specialist}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;
