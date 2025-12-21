import React, { useEffect, useRef } from "react";
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

const TYPE_STYLES = {
  default: {
    gradient: "from-[#ffffff] to-[#808285]",
    badge: "bg-black/40 border border-white/30 text-white opacity-80",
    name: "text-white",
    specialist: "text-white/70",
  },
  "web development": {
    gradient: "from-[#dd9272] to-[#d54a25]",
    badge: "bg-black/50 border border-orange-300/50 text-orange-100 opacity-80",
    name: "text-orange-50",
    specialist: "text-orange-100/90",
  },
  "social media team": {
    gradient: "from-[#ffffff] to-[#35d4cf]",
    badge: "bg-teal-900/60 border border-teal-300/50 text-teal-50 opacity-80",
    name: "text-teal-50",
    specialist: "text-teal-100/90",
  },
  monitor: {
    gradient: "from-[#808285] to-[#000000]",
    badge: "bg-white/20 border border-gray-300/40 text-gray-100 opacity-80",
    name: "text-gray-50",
    specialist: "text-gray-200/90",
  },
  "graphic design": {
    gradient: "from-[#ffffff] to-[#dd9272]",
    badge: "bg-orange-900/50 border border-orange-300/50 text-orange-50 opacity-80",
    name: "text-orange-50",
    specialist: "text-orange-100/90",
  },
  photographers: {
    gradient: "from-[#35d4cf] to-[#006073]",
    badge: "bg-cyan-900/60 border border-cyan-300/50 text-cyan-50 opacity-80",
    name: "text-cyan-50",
    specialist: "text-cyan-100/90",
  },
  ceo: {
    gradient: "from-[#006073] to-[#000000]",
    badge: "bg-blue-200/20 border border-blue-300/40 text-blue-50 opacity-80",
    name: "text-blue-50",
    specialist: "text-blue-100/90",
  },
  presenter: {
    gradient: "from-[#ffffff] to-[#808285]",
    badge: "bg-black/40 border border-white/30 text-white opacity-80",
    name: "text-white",
    specialist: "text-white/70",
  },
};

const Team = () => {
  const { theme } = useTheme();
  const { teamMembers, loading, error, loadTeamMembers } = useTeamStore();

  const sectionRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    loadTeamMembers();
  }, [loadTeamMembers]);

  const iconMap = {
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    youtube: <FaYoutube />,
    snapchat: <FaSnapchat />,
    pinterest: <FaPinterest />,
    website: <FaGlobe />,
  };

  // Vanilla JS Horizontal Scroll Effect
  useEffect(() => {
    let isActive = false;

    if (!teamMembers || teamMembers.length === 0) return;
    if (!sectionRef.current || !trackRef.current || !stickyContainerRef.current)
      return;

    // Skip horizontal behavior on mobile
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const stickyContainer = stickyContainerRef.current;
    const imgs = Array.from(track.querySelectorAll("img"));

    // Scroll geometry
    let scrollDistance = 0; // horizontal distance the track moves
    let maxTranslate = 0;
    let sectionTop = 0;
    let sectionHeight = 0; // vertical space allocated for the horizontal scroll
    let resizeTimer;

    const calculate = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Horizontal distance: full track width minus full viewport
      scrollDistance = Math.max(0, trackWidth - viewportWidth);
      maxTranslate = scrollDistance;

      // Vertical scroll area: viewport height + horizontal distance
      sectionHeight = viewportHeight + scrollDistance;

      // Compute section top relative to page each time we recalc
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;

      // Set section height to create scroll space
      section.style.height = `${sectionHeight}px`;
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const sectionStart = sectionTop;
      // End when bottom of viewport reaches end of section
      const sectionEnd = sectionTop + sectionHeight - viewportHeight;

      if (scrollDistance <= 0) {
        // Nothing to scroll horizontally; just ensure default layout
        stickyContainer.style.position = "relative";
        stickyContainer.style.top = "";
        stickyContainer.style.left = "";
        stickyContainer.style.width = "";
        track.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      // Before section
      if (scrollY < sectionStart) {
        stickyContainer.style.position = "relative";
        stickyContainer.style.top = "";
        stickyContainer.style.left = "";
        stickyContainer.style.width = "";
        track.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      // After section - lock at final position
      if (scrollY > sectionEnd) {
        stickyContainer.style.position = "absolute";
        stickyContainer.style.top = `${sectionHeight - viewportHeight}px`;
        stickyContainer.style.left = "0";
        stickyContainer.style.width = "100%";
        track.style.transform = `translate3d(-${maxTranslate}px, 0, 0)`;
        return;
      }

      // Within the horizontal scroll range → pin & translate
      stickyContainer.style.position = "fixed";
      stickyContainer.style.top = "0";
      stickyContainer.style.left = "0";
      stickyContainer.style.width = "100%";

      const progress =
        sectionEnd === sectionStart
          ? 0
          : (scrollY - sectionStart) / (sectionEnd - sectionStart);

      const translateX = -(progress * maxTranslate);
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    };

    const init = () => {
      // Initial calculation immediately
      calculate();
      onScroll();
    
      window.addEventListener("scroll", onScroll, { passive: true });
    
      // Recalculate again after images load (non-blocking)
      imgs.forEach((img) => {
        if (!img.complete) {
          img.addEventListener(
            "load",
            () => {
              calculate();
              onScroll();
            },
            { once: true }
          );
        }
      });
    };
    

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth < 768) {
          // Cleanup on mobile
          section.style.height = "";
          stickyContainer.style.position = "";
          stickyContainer.style.top = "";
          stickyContainer.style.left = "";
          stickyContainer.style.width = "";
          track.style.transform = "";
          window.removeEventListener("scroll", onScroll);
          return;
        }

        calculate();
        onScroll();
      }, 200);
    };

    init();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      // Cleanup styles
      if (section) section.style.height = "";
      if (stickyContainer) {
        stickyContainer.style.position = "";
        stickyContainer.style.top = "";
      }
      if (track) track.style.transform = "";
    };
  }, [teamMembers]);

  // Mobile reveal effect
  useEffect(() => {
    if (!teamMembers || teamMembers.length === 0) return;

    const cards = document.querySelectorAll(
      "[data-scroll].loco-reveal-card.mobile-team-card"
    );
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
          } else {
            entry.target.classList.remove("is-inview");
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    cards.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
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
            className="flex flex-row items-center gap-6  py-0 pr-[30vw]"
          >
            <div className="relative w-[30px] h-[650px] shrink-0 overflow-hidden"></div>
            {teamMembers.map((member, index) => {
              const typeKey = member.type?.toLowerCase?.();
              const styles = TYPE_STYLES[typeKey] || TYPE_STYLES.default;

              return (
                <div
                  key={member.id || index}
                  className={`relative group flex flex-col justify-end rounded-[10px] transition-all duration-500 w-[450px] h-[650px] shrink-0 overflow-hidden border border-white/20 bg-gradient-to-br ${styles.gradient} opacity-90 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:shadow-[0_0_55px_rgba(255,255,255,0.25)]`}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={member.image}
                      alt={member.name || `team-${index + 1}`}
                      width={320}
                      loading="lazy"
                      decoding="async"
                      height={400}
                      className="absolute w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                      draggable={false}
                    />

                    {/* Enhanced Soft Gradient */}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-6 p-6 md:p-8">
                    {/* Type badge */}
                    <div className="flex justify-start">
                      <span
                        className={`inline-flex items-center rounded-full px-4 py-2 text-xs tracking-[0.22em] uppercase font-semibold opacity-90 ${styles.badge}`}
                      >
                        {member.type}
                      </span>
                    </div>

                    {/* Name + Specialist */}
                    <div className="text-center md:text-left space-y-3 bg-black/30 rounded-xl p-4  border border-white/10 shadow-inner">
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
                            className="text-[22px] p-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/20"
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

      {/* Mobile View Cards */}
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
                data-scroll
                className={`mobile-team-card  relative w-full h-[400px] rounded-[20px] overflow-hidden shadow-lg border border-white/10 bg-gradient-to-br ${styles.gradient} `}
              >
                <img
                  src={member.image}
                  alt={member.name || `team-${index + 1}`}
                  width={200}
                  height={250}
                  className="h-full w-full object-cover select-none absolute inset-0"
                  draggable={false}
                />
                <div className="relative h-full flex flex-col justify-end items-center gap-2 p-6">
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-2 text-xs tracking-[0.25em] uppercase font-semibold  ${styles.badge}`}
                  >
                    {member.type}
                  </span>
                  <div className="bg-black/20 border border-white/10 rounded-[16px] w-full p-5 text-center space-y-2">
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
