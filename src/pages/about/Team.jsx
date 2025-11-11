import React, { useEffect, useRef } from "react";
import background from "../../assets/backgrounds/Team.png";
import { useTheme } from "../../store/ThemeContext";
import { useTeamStore } from "../../store/teamStore";
import {
  FaTwitter,
  FaYoutube,
  FaSnapchat,
  FaFacebookF,
  FaPinterest,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

const Team = () => {
  const { theme } = useTheme();
  const { teamMembers, loading, error, loadTeamMembers } = useTeamStore();

  const containerRef = useRef(null);
  const rightRef = useRef(null);
  const trackRef = useRef(null);
  const sectionHeightRef = useRef(0);
  const horizontalDistanceRef = useRef(0);

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
  useEffect(() => {
    const container = containerRef.current;
    const right = rightRef.current;
    const track = trackRef.current;
    if (!container || !right || !track) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      container.style.minHeight = "";
      return;
    }

    const compute = () => {
      const rightWidth = right.clientWidth;
      const trackWidth = track.scrollWidth;
      const paddingLeftPx = parseFloat(
        window.getComputedStyle(right).paddingLeft || "0"
      );
      const effectiveViewport = Math.max(1, rightWidth - paddingLeftPx);
      const horizontalDistance = Math.max(0, trackWidth - effectiveViewport);
      horizontalDistanceRef.current = horizontalDistance;

      const viewportH = window.innerHeight;
      sectionHeightRef.current = Math.ceil(viewportH + horizontalDistance + 16);
      container.style.minHeight = `${sectionHeightRef.current}px`;

      // helps reflow sticky behavior on resize
      window.dispatchEvent(new Event("resize"));
    };

    let rafId = null;
    let lastTranslate = 0;

    const loop = () => {
      const rect = container.getBoundingClientRect();
      const totalScroll = Math.max(
        1,
        sectionHeightRef.current - window.innerHeight
      );
      const raw = -rect.top / totalScroll;
      const progress = Math.min(1, Math.max(0, raw));

      let clamped;
      if (progress <= 0) {
        clamped = 0;
        lastTranslate = 0;
      } else if (progress >= 1) {
        clamped = -horizontalDistanceRef.current;
        lastTranslate = clamped;
      } else {
        const targetTranslate = -progress * horizontalDistanceRef.current;
        const eased = lastTranslate + (targetTranslate - lastTranslate) * 0.2;
        lastTranslate = eased;
        clamped = Math.max(-horizontalDistanceRef.current, Math.min(0, eased));
      }

      track.style.transform = `translate3d(${clamped}px, 0, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    const preloadImages = async () => {
      const imgs = Array.from(track.querySelectorAll("img"));
      await Promise.all(
        imgs.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) return resolve();
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
        )
      );
    };

    preloadImages().then(() => {
      compute();
      if (!rafId) rafId = requestAnimationFrame(loop);
    });

    window.addEventListener("resize", compute, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", compute);
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
      ref={containerRef}
      data-scroll-section
      id="team-section"
      className="relative overflow-visible md:overflow-hidden mt-[50px] text-white font-hero-light"
    >
      {/* Desktop Horizontal Scroll */}
      <div
        className="hidden md:flex flex-col md:flex-row relative md:h-[100vh]"
        data-scroll
        data-scroll-sticky
        data-scroll-target="#team-section"
      >
        <div
          className={`${
            theme === "light" ? "light" : "dark"
          } left-section rounded-[10px] z-20 md:z-50 md:absolute md:left-0 md:top-0 w-full md:w-[30%] md:h-full sticky top-0 flex items-center px-6 md:px-[50px] py-6 md:py-0 text-[28px] sm:text-[40px] md:text-[64px] bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: theme === "light" ? "none" : `url(${background})`,
            backgroundColor: theme === "light" ? "#fff" : "transparent",
          }}
        >
          <h1 className="text-[var(--foreground)] leading-[1.1]">
            Our <br /> creative team
          </h1>
        </div>

        <div
          ref={rightRef}
          className="relative z-0 flex flex-col md:flex-row flex-1 overflow-visible md:overflow-hidden h-auto md:h-screen md:pl-[30%] gap-4 md:gap-0 w-full"
        >
          <div
            ref={trackRef}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6 will-change-transform py-0 w-full pr-4"
          >
            {teamMembers.map((member, index) => (
              <div
                key={member.id || index}
                className="card-container-member relative hover:scale-105 transition-all duration-500 w-full md:w-[450px] h-[220px] sm:h-[320px] md:h-[650px] rounded-[10px] shrink-0 overflow-hidden "
              >
                <div className="role absolute top-12 left-0">
                  <h1>{member.type_id}</h1>
                   </div>
                <img
                  src={member.image}
                  alt={member.name || `team-${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover  group-hover:opacity-100 transition-all duration-500"
                  draggable={false}
                />

                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end text-center p-5 md:p-8 z-10">
                  <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base mb-4 capitalize">
                    {member.specialist}
                  </p>

                  {/* Social Icons */}
                  <div className="flex items-center justify-center gap-4">
                    {member.social_links?.length > 0 ? (
                      member.social_links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-[#00bcd4] text-[22px] transition-all transform hover:scale-125"
                        >
                          {iconMap[link.link_type] || <FaGlobe />}
                        </a>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No social links
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View Cards */}
      <div className="block md:hidden mt-8">
        <div className="text-center mb-8 px-4">
          <h2 className="text-[var(--foreground)] text-[28px] font-bold leading-[1.2]">
            Our Creative Team
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4">
          {teamMembers.map((member, index) => (
            <div
              key={member.id ? `mobile-${member.id}` : `mobile-${index}`}
              className="relative w-full h-[280px] rounded-[15px] overflow-hidden bg-[#111] shadow-lg loco-reveal-card"
              data-scroll
              data-scroll-class="is-inview"
              data-scroll-repeat
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <img
                src={member.image}
                alt={member.name || `team-${index + 1}`}
                className="h-full w-full object-cover select-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="details flex flex-col justify-end items-center absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/10 backdrop-blur-md rounded-[12px] w-full p-4 text-center">
                  <div className="name text-white text-[20px] font-semibold mb-1">
                    {member.name}
                  </div>
                  <div className="job text-white/80 text-[14px] font-light">
                    {member.specialist}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
