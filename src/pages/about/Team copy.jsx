import { useEffect, useRef } from "react";
import { useTheme } from "../../store/ThemeContext";
import { useTeamStore } from "../../store/teamStore";
import {
  FaTwitter,
  FaYoutube,
  FaSnapchat,
  FaPinterest,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaGlobe,
  FaBehance,
} from "react-icons/fa";

const TYPE_STYLES = {
  default: {
    badge: "bg-black/40 border border-white/30 text-white opacity-80",
    name: "text-white",
    specialist: "text-white/90",
  },
  "web development department": {
    badge: "bg-gradient-to-br from-[#d64c28] to-[#f1aa92] border border-orange-300/50 text-white ",
    name: "text-orange-50",
    specialist: "text-orange-100/90",
  },
  "social media department": {
    badge: "bg-gradient-to-br from-[#d882c1] to-[#f6e1f0] border border-pink-300/50 text-white ",
    name: "text-teal-50",
    specialist: "text-teal-100/90",
  },
  "graphic design department": {
    badge: "bg-gradient-to-br from-[#4b0058] to-[#f4a0fe] border border-purple-300/50 text-white ",
    name: "text-orange-50",
    specialist: "text-orange-100/90",
  },
  "photography department": {
    badge: "bg-gradient-to-br from-[#78e3d8] to-[#cffff5] border border-cyan-300/50 text-white",
    name: "text-cyan-50",
    specialist: "text-cyan-100/90",
  },
  "management department": {
    badge: "bg-gradient-to-br from-[#045d6d] to-[#16eee7] border border-cyan-300/50 text-white ",
    name: "text-blue-50",
    specialist: "text-blue-100/90",
  },
  "director": {
    badge: "bg-gradient-to-br from-[#616161] to-[#ffffff] border border-white/30 text-white ",
    name: "text-white",
    specialist: "text-white/90",
  },
};

const Team = () => {
  const { theme } = useTheme();
  const { teamMembers, loading, error, loadTeamMembers } = useTeamStore();

  const sectionRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const topTrackRef = useRef(null);
  const bottomTrackRef = useRef(null);

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
    facebook: <FaFacebook />,
    fb: <FaFacebook />,
    behance: <FaBehance />,
    website: <FaGlobe />,
  };

  // Vanilla JS Horizontal Scroll Effect
  useEffect(() => {
    if (!teamMembers || teamMembers.length === 0) return;
    if (
      !sectionRef.current ||
      !topTrackRef.current ||
      !bottomTrackRef.current ||
      !stickyContainerRef.current
    )
      return;

    // Skip horizontal behavior on mobile
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const topTrack = topTrackRef.current;
    const bottomTrack = bottomTrackRef.current;
    const stickyContainer = stickyContainerRef.current;

    // Scroll geometry
    let scrollDistance = 0; // max distance any track moves
    let maxTranslateTop = 0;
    let maxTranslateBottom = 0;
    let sectionTop = 0;
    let sectionHeight = 0; 
    let resizeTimer;
    let imageLoadHandlers = new Set();

    let cachedViewportHeight = window.innerHeight;
    let rafId = 0;

    const calculate = () => {
      // READ phase — batch all layout reads
      const topTrackWidth = topTrack.scrollWidth;
      const bottomTrackWidth = bottomTrack.scrollWidth;
      const viewportWidth = window.innerWidth;
      cachedViewportHeight = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const currentScrollY = window.scrollY;

      // COMPUTE
      maxTranslateTop = Math.max(0, topTrackWidth - viewportWidth);
      maxTranslateBottom = Math.max(0, bottomTrackWidth - viewportWidth);
      
      // Determine overall scroll section height by the longest track
      scrollDistance = Math.max(maxTranslateTop, maxTranslateBottom);
      sectionHeight = cachedViewportHeight + scrollDistance;
      sectionTop = rect.top + currentScrollY;

      // WRITE phase
      section.style.height = `${sectionHeight}px`;
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const sectionStart = sectionTop;
      const sectionEnd = sectionTop + sectionHeight - cachedViewportHeight;

      if (scrollDistance <= 0 || scrollY < sectionStart) {
        stickyContainer.style.position = "relative";
        stickyContainer.style.top = "";
        stickyContainer.style.left = "";
        stickyContainer.style.width = "";
        
        // Reset top moving left, bottom starts fully moved left to slide right
        topTrack.style.transform = "translate3d(0, 0, 0)";
        bottomTrack.style.transform = `translate3d(-${maxTranslateBottom}px, 0, 0)`;
        return;
      }

      if (scrollY > sectionEnd) {
        stickyContainer.style.position = "absolute";
        stickyContainer.style.top = `${sectionHeight - cachedViewportHeight}px`;
        stickyContainer.style.left = "0";
        stickyContainer.style.width = "100%";
        
        // Top is fully moved left, bottom is reset to 0 (moved fully right)
        topTrack.style.transform = `translate3d(-${maxTranslateTop}px, 0, 0)`;
        bottomTrack.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      stickyContainer.style.position = "fixed";
      stickyContainer.style.top = "0";
      stickyContainer.style.left = "0";
      stickyContainer.style.width = "100%";

      const progress =
        sectionEnd === sectionStart
          ? 0
          : (scrollY - sectionStart) / (sectionEnd - sectionStart);

      // Top track moves normally (leftwards)
      topTrack.style.transform = `translate3d(${-(progress * maxTranslateTop)}px, 0, 0)`;
      // Bottom track moves reverse (rightwards)
      bottomTrack.style.transform = `translate3d(${-( (1 - progress) * maxTranslateBottom )}px, 0, 0)`;
    };

    const onScrollThrottled = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        onScroll();
      });
    };

    const attachImageLoadListeners = () => {
      const imgs = Array.from(stickyContainer.querySelectorAll("img"));
      
      imgs.forEach((img) => {
        if (imageLoadHandlers.has(img)) return;
        
        const handleImageLoad = () => {
          requestAnimationFrame(() => {
            calculate();
            onScroll();
          });
        };

        if (img.complete && img.naturalHeight !== 0) {
          handleImageLoad();
        } else {
          img.addEventListener("load", handleImageLoad, { once: true });
          img.addEventListener("error", handleImageLoad, { once: true });
        }
        
        imageLoadHandlers.add(img);
      });
    };

    let mutationObserver = null;
    let imageCheckTimeout = null;

    const handleImageLoadEvent = () => {
      requestAnimationFrame(() => {
        calculate();
        onScroll();
      });
    };

    const init = () => {
      window.addEventListener("teamImageLoaded", handleImageLoadEvent);
      
      requestAnimationFrame(() => {
        calculate();
        onScroll();
        
        attachImageLoadListeners();
        
        imageCheckTimeout = setTimeout(() => {
          attachImageLoadListeners();
          calculate();
          onScroll();
        }, 100);
        
        mutationObserver = new MutationObserver(() => {
          attachImageLoadListeners();
          requestAnimationFrame(() => {
            calculate();
            onScroll();
          });
        });
        
        mutationObserver.observe(stickyContainer, {
          childList: true,
          subtree: true,
        });
        
        window.addEventListener("scroll", onScrollThrottled, { passive: true });
      });
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth < 768) {
          section.style.height = "";
          stickyContainer.style.position = "";
          stickyContainer.style.top = "";
          stickyContainer.style.left = "";
          stickyContainer.style.width = "";
          topTrack.style.transform = "";
          bottomTrack.style.transform = "";
          window.removeEventListener("scroll", onScrollThrottled);
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
      clearTimeout(imageCheckTimeout);
      window.removeEventListener("scroll", onScrollThrottled);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("teamImageLoaded", handleImageLoadEvent);
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      if (section) section.style.height = "";
      if (stickyContainer) {
        stickyContainer.style.position = "";
        stickyContainer.style.top = "";
      }
      if (topTrack) topTrack.style.transform = "";
      if (bottomTrack) bottomTrack.style.transform = "";
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

  // Split Data for Top and Bottom Tracks
  const midIndex = Math.ceil(teamMembers.length / 2);
  const topRowMembers = teamMembers.slice(0, midIndex);
  const bottomRowMembers = teamMembers.slice(midIndex);

  // Reusable card renderer
  const renderMemberCard = (member, index, isDesktop = true) => {
    const typeKey = member.type?.toLowerCase?.();
    const styles = TYPE_STYLES[typeKey] || TYPE_STYLES.default;

    if (!isDesktop) {
      // Mobile Layout Return
      return (
        <div
          key={member.id ? `mobile-${member.id}` : `mobile-${index}`}
          data-scroll
          className="mobile-team-card relative w-full h-[450px] rounded-[20px] overflow-hidden shadow-lg border border-white/10"
        >
          <img
            src={member.image}
            alt={member.name || `team-${index + 1}`}
            width={200}
            height={250}
            className="h-full w-full object-cover select-none absolute inset-0"
            loading="lazy"
            draggable={false}
          />
          <div className="relative h-full flex flex-col justify-end items-center gap-2 p-2 md:p-6">
            <span
              className={` inline-flex items-center rounded-full px-4 py-2 text-xs tracking-[0.25em] uppercase font-semibold  ${styles.badge}`}
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

              {/* Social Icons - Mobile */}
              {member.social_links?.length > 0 && (
                <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-white/10">
                  {member.social_links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[20px] p-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/20"
                      aria-label={`${member.name}'s ${link.link_type || "social media"} profile`}
                    >
                      <span aria-hidden="true">
                        {iconMap[link.link_type] || <FaGlobe />}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Desktop Layout Return (Half Height)
    return (
      <div
        key={member.id || index}
        className="relative group flex flex-col justify-end rounded-[10px] transition-all duration-500 w-[450px] h-[310px] shrink-0 overflow-hidden border border-white/20 opacity-90 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:shadow-[0_0_55px_rgba(255,255,255,0.25)]"
      >
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={member.image}
            alt={member.name || `team-${index + 1}`}
            width={320}
            loading="lazy"
            decoding="async"
            height={310}
            className="absolute w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 will-change-transform"
            draggable={false}
            onLoad={() => {
              const event = new CustomEvent("teamImageLoaded");
              window.dispatchEvent(event);
            }}
            onError={() => {
              const event = new CustomEvent("teamImageLoaded");
              window.dispatchEvent(event);
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 p-5 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          {/* Type badge */}
          <div className="flex justify-start">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] md:text-xs tracking-[0.22em] uppercase font-semibold opacity-90 ${styles.badge}`}
            >
              {member.type}
            </span>
          </div>

          {/* Name + Specialist */}
          <div className="text-center md:text-left space-y-1.5 bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10 shadow-inner">
            <h2
              className={`text-xl md:text-2xl font-bold tracking-[0.28em] uppercase drop-shadow ${styles.name}`}
            >
              {member.name}
            </h2>
            <p
              className={`text-xs md:text-sm capitalize tracking-[0.25em] ${styles.specialist}`}
            >
              {member.specialist}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center md:justify-start gap-2">
            {member.social_links?.length > 0 ? (
              member.social_links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[18px] p-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/20"
                  aria-label={`${member.name}'s ${link.link_type || "social media"} profile`}
                >
                  <span aria-hidden="true">
                    {iconMap[link.link_type] || <FaGlobe />}
                  </span>
                </a>
              ))
            ) : (
              <span className="text-white/90 text-xs tracking-[0.2em] uppercase">
                No social links
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

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
          <h1 className="font-antonio text-[var(--foreground)] font-bold md:text-[65px] lg:text-[85px] xl:text-[95px] leading-[1.1]">
            Our <span className="tikit-gradient">creative team</span>
          </h1>
        </div>

        {/* Horizontal Scrolling Tracks (Split into two rows) */}
        <div className="relative z-0 flex flex-col justify-center gap-6 flex-1 h-screen pl-[30%] w-full overflow-hidden">
          
          {/* Top Row (Scrolls Left) */}
          <div
            ref={topTrackRef}
            className="flex flex-row items-center gap-6 py-0 pr-[30vw] w-max will-change-transform"
          >
            <div className="relative w-[30px] h-[310px] shrink-0 overflow-hidden"></div>
            {topRowMembers.map((member, index) => renderMemberCard(member, index, true))}
            <div className="relative w-[450px] h-[310px] shrink-0 overflow-hidden"></div>
          </div>

          {/* Bottom Row (Scrolls Right / Reverse) */}
          <div
            ref={bottomTrackRef}
            className="flex flex-row items-center gap-6 py-0 pr-[30vw] w-max will-change-transform"
          >
            <div className="relative w-[30px] h-[310px] shrink-0 overflow-hidden"></div>
            {bottomRowMembers.map((member, index) => renderMemberCard(member, index, true))}
            <div className="relative w-[450px] h-[310px] shrink-0 overflow-hidden"></div>
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
          {teamMembers.map((member, index) => renderMemberCard(member, index, false))}
        </div>
      </div>
    </div>
  );
};

export default Team;