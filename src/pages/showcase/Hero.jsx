import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Hero = ({ caseData, loading }) => {
    const { isRtl } = useI18nLanguage();
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const badgeRef = useRef(null);
    const buttonRef = useRef(null);
    const imgRef = useRef(null);
    const heroRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    // Get first image from images array
    const firstImage = caseData?.images && Array.isArray(caseData.images) && caseData.images.length > 0
      ? caseData.images[0]
      : null;

    // Prefer a meaningful badge label if present
    const heroBadge = caseData?.category || caseData?.client || "Featured project";
    const meta = caseData?.year ? `${caseData.year}` : null;

    // Get title and subtitle from caseData or use defaults
    const title = caseData?.title || "";
    const subtitle = caseData?.subtitle || "";

    // Handle scroll down
    const handleScrollDown = (e) => {
      e.preventDefault();
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        window.scrollTo({
          top: heroHeight,
          behavior: "smooth"
        });
      }
    };

    // Handle image loading (including cached images)
    useEffect(() => {
      if (!firstImage) {
        setImageLoaded(false);
        return;
      }

      // Reset and check after render
      setImageLoaded(false);
      
      // Use requestAnimationFrame to check after DOM update
      const checkImage = () => {
        if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
          setImageLoaded(true);
        }
      };
      
      requestAnimationFrame(checkImage);
    }, [firstImage]);

    // Enhanced fade-in animation with stagger
    useEffect(() => {
      let tl;
      
      // Wait for next frame to ensure DOM is painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          tl = gsap.timeline();
          
          // Animate badge first
          if (badgeRef.current) {
            tl.from(badgeRef.current, {
              opacity: 0,
              scale: 0.8,
              y: 20,
              duration: 0.8,
              ease: "back.out(1.7)"
            });
          }
          
          // Animate title
          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
          }, "-=0.4");
          
          // Animate subtitle
          tl.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          }, "-=0.8");
          
          // Animate button
          if (buttonRef.current) {
            tl.to(buttonRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.2)"
            }, "-=0.6");
          }
        });
      });

      return () => {
        if (tl) tl.kill();
      };
    }, []);
    
  return (
    <div 
      ref={heroRef}
      data-nav-color="white" 
      className="relative overflow-hidden min-h-[60vh] w-full md:min-h-screen"
    >
      {/* Skeleton background */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 animate-pulse transition-opacity duration-700 ${
          imageLoaded && firstImage ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Actual image with parallax effect */}
      {firstImage && (
        <img
          ref={imgRef}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={firstImage}
          alt={title || "Project hero"}
          width={1920}
          height={1080}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
      )}

      {/* Multi-layer gradient overlay for depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      

      {/* Content container */}
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="absolute z-20 flex flex-col justify-center items-center md:items-start w-full h-full mx-auto container px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20"
      >
        <div className="max-w-4xl w-full md:mx-22 space-y-6 md:space-y-8">
          {/* Badge and meta */}
          <div 
            ref={badgeRef}
            className="flex items-center gap-4 flex-wrap"
            style={{ opacity: 0 }}
          >
            <span className="group inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2.5 text-sm font-medium tracking-wider uppercase text-white/90 shadow-lg shadow-black/20 hover:bg-white/15 transition-all duration-300">
              <span className="relative h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[var(--primary,#f97316)] animate-ping opacity-75" />
                <span className="relative block h-2 w-2 rounded-full bg-[var(--primary,#f97316)]" />
              </span>
              {heroBadge}
            </span>
            {meta && (
              <span className="text-sm font-medium text-white/70 tracking-wide">
                {meta}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            style={{
              color: "#fff",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",
              fontFamily: isRtl ? "" : "Antonio",
              opacity: 0,
              transform: "translateY(30px)",
            }}
            className="text-[35px] md:text-[50px] lg:text-[70px] text-center md:text-start leading-[1.1] tracking-tight"
          >
            {title}
          </h1>

          {/* Subtitle */}
          <h3
            ref={subtitleRef}
            style={{
              color: "#fff",
              textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
              fontFamily: isRtl ? "" : "Antonio",
              opacity: 0,
              transform: "translateY(30px)",
            }}
            className="subtitle text-center md:text-start font-[700] text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white/95 max-w-3xl"
          >
            {subtitle}
          </h3>

          {/* CTA Button */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <button
              ref={buttonRef}
              onClick={handleScrollDown}
              style={{
                opacity: 0,
                transform: "translateY(20px) scale(0.95)",
              }}
              className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--primary,#f97316)] px-8 py-4 text-base font-semibold text-black shadow-2xl shadow-[var(--primary,#f97316)]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--primary,#f97316)]/50 hover:scale-105 active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Explore case</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden>
                ↓
              </span>
            </button>
            
            {/* Scroll indicator */}
            <div className="flex items-center gap-3 text-white/60 text-sm font-medium">
              <div className="flex flex-col gap-1.5">
                <span className="h-[2px] w-8 bg-white/30 rounded-full" aria-hidden />
                <span className="h-[2px] w-6 bg-white/20 rounded-full" aria-hidden />
              </div>
              <span className="tracking-wide">Scroll to discover</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 hidden md:block -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-white/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
