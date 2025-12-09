import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const Hero = ({ caseData, loading }) => {
    const { isRtl } = useI18nLanguage();
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const imgRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    // Get first image from images array
    const firstImage = caseData?.images && Array.isArray(caseData.images) && caseData.images.length > 0
      ? caseData.images[0]
      : null;
    
    // Get title and subtitle from caseData or use defaults
    const title = caseData?.title || "";
    const subtitle = caseData?.subtitle || "";

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

    // Simple fade-in animation
    useEffect(() => {
      let tl;
      
      // Wait for next frame to ensure DOM is painted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          tl = gsap.timeline();
          
          tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out"
          }).to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          }, "-=0.8");
        });
      });

      return () => {
        if (tl) tl.kill();
      };
    }, []);
    
  return (
    <div data-nav-color="white" className="relative overflow-hidden min-h-[60vh] w-full  md:min-h-screen">
      {/* Skeleton background */}
      <div 
        className={`absolute w-full h-full z-0 bg-gray-300 animate-pulse transition-opacity duration-500 ${
          imageLoaded && firstImage ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Actual image */}
      {firstImage && (
        <img
          ref={imgRef}
          className={`absolute w-full h-full object-cover blur-sm z-0 transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={firstImage}
          alt=""
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
      )}
      
      <div dir={isRtl ? "rtl" : "ltr"} className="absolute  z-20 flex flex-col justify-center items-center md:items-start w-full h-full mx-auto  container">
        <h1
          ref={titleRef}
          style={{
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
            fontFamily: isRtl ? "" : "Antonio",
            opacity: 0,
            transform: "translateY(30px)",
          }}
          className="tikit-title md:mx-22"
        >
          {title}
        </h1>
        <h3
          ref={subtitleRef}
          style={{
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
            fontFamily: isRtl ? "" : "Antonio",
            opacity: 0,
            transform: "translateY(30px)",
          }}
          className="subtitle md:mx-22 font-[700] text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--foreground)]"
        >
          {subtitle}
        </h3>
      </div>
    </div>
  );
};

export default Hero;
