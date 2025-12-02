import React, { useLayoutEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTheme } from "../../store/ThemeContext";
import LogoLoop from "../../components/LogoLoop";
import LightRays from "../../components/LightRays";

// Import all influencer images
import abdullahBinDfna from "../../assets/influencers/Abdullah Bin Dfna.webp";
import ahmedBenChaibah from "../../assets/influencers/Ahmed ben chaibah.webp";
import amiraMohamed from "../../assets/influencers/amira mohamed.webp";
import hazzaAlSheryani from "../../assets/influencers/hazza al sheryani.webp";
import helalAljaberi from "../../assets/influencers/Helal Aljaberi.webp";
import hessaAlfalasi from "../../assets/influencers/hessa alfalasi.webp";
import husseinBinMahfooz from "../../assets/influencers/hussein bin mahfooz.webp";
import huthaifaBinHussein from "../../assets/influencers/Huthaifa Bin Hussein.webp";
import jamalAlMulla from "../../assets/influencers/jamal al mulla.webp";
import muhammadAlBadea from "../../assets/influencers/Muhammad al badea.webp";
import muhammedAlnuaimi from "../../assets/influencers/muhammed alnuaimi.webp";
import mundirAlmuzaki from "../../assets/influencers/Mundir Almuzaki.webp";
import naemaAlshehi from "../../assets/influencers/Naema Alshehi.webp";
import noufAlabd from "../../assets/influencers/nouf alabd.webp";
import saeedAlshamsi from "../../assets/influencers/Saeed Alshamsi.webp";
import salamahAlmuheri from "../../assets/influencers/Salamah Almuheri.webp";
import saraGazioglu from "../../assets/influencers/sara Gazioglu.webp";
import sultanAlsuwaidi from "../../assets/influencers/Sultan Alsuwaidi.webp";
import thaerAlTurkmani from "../../assets/influencers/thaer al turkmani.webp";
import yousifAlhammadi from "../../assets/influencers/Yousif Alhammadi.webp";
import yousufSaleh from "../../assets/influencers/Yousuf Saleh.webp";
import InfiniteScroller from "./InfiniteScroller";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const h1WrapRef = useRef(null);
  const h1Ref = useRef(null);
  const h2WrapRef = useRef(null);
  const h2Ref = useRef(null);
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  // Create influencers images array
  const influencersImages = useMemo(
    () => [
      { src: abdullahBinDfna, alt: "Abdullah Bin Dfna" },
      { src: ahmedBenChaibah, alt: "Ahmed ben chaibah" },
      { src: amiraMohamed, alt: "Amira Mohamed" },
      { src: hazzaAlSheryani, alt: "Hazza Al Sheryani" },
      { src: helalAljaberi, alt: "Helal Aljaberi" },
      { src: hessaAlfalasi, alt: "Hessa Alfalasi" },
      { src: husseinBinMahfooz, alt: "Hussein Bin Mahfooz" },
      { src: huthaifaBinHussein, alt: "Huthaifa Bin Hussein" },
      { src: jamalAlMulla, alt: "Jamal Al Mulla" },
      { src: muhammadAlBadea, alt: "Muhammad al badea" },
      { src: muhammedAlnuaimi, alt: "Muhammed Alnuaimi" },
      { src: mundirAlmuzaki, alt: "Mundir Almuzaki" },
      { src: naemaAlshehi, alt: "Naema Alshehi" },
      { src: noufAlabd, alt: "Nouf Alabd" },
      { src: saeedAlshamsi, alt: "Saeed Alshamsi" },
      { src: salamahAlmuheri, alt: "Salamah Almuheri" },
      { src: saraGazioglu, alt: "Sara Gazioglu" },
      { src: sultanAlsuwaidi, alt: "Sultan Alsuwaidi" },
      { src: thaerAlTurkmani, alt: "Thaer Al Turkmani" },
      { src: yousifAlhammadi, alt: "Yousif Alhammadi" },
      { src: yousufSaleh, alt: "Yousuf Saleh" },
    ],
    []
  );

  useLayoutEffect(() => {
    if (!h1Ref.current || !h2Ref.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        h1Ref.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.1 }
      );

      // Subtitle animation with same effect, starts after title completes
      gsap.fromTo(
        h2Ref.current,
        { y: "150%", autoAlpha: 1 },
        {
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.4, // title delay + title duration + smaller gap
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-nav-color="black"
      className={` text-[var(--foreground)] mt-[104px] md:mt-2 relative overflow-hidden h-[50vh] md:h-screen w-full flex flex-col items-center justify-center ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
       <div className="absolute w-full h-full -translate-x-1/2 left-1/2 top-0">
        {theme === "dark" && (
          <LightRays
            raysOrigin="top-center"
            raysColor="#52C3C5"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            className="custom-rays"
          />
        )}
      </div>
      <div className="top-section text-center md:mt-16 2xl:mt-12">
        <div ref={h1WrapRef} className="overflow-hidden">
          <h1
            ref={h1Ref}
            style={{fontFamily: isRtl ? "" : "Antonio"}}
            className="text-[32px] leading-tight md:text-[50px] xl:text-[70px] 2xl:text-[80px] capitalize  will-change-transform"
          >
            {t("influencer.hero.title")}
          </h1>
        </div>
        <div ref={h2WrapRef} className="overflow-hidden">
          <h1
            ref={h2Ref}
            style={{fontFamily: isRtl ? "" : "Caveat"}}
            className="text-[32px] leading-tight  font-[700] mx-auto md:text-[50px]  xl:text-[80px] 2xl:text-[90px] mb-8 capitalize  tikit-gradient will-change-transform"
          >
            {t("influencer.hero.subtitle")}
          </h1>
        </div>
      </div>
      <div className="bottom-section w-full flex flex-col gap-4 md:gap-6 2xl:gap-12">
        <div className="help-text text-center text-[var(--foreground)]/30 font-bold">
          {t("influencer.hero.meetClients")}
        </div>
        <InfiniteScroller
          items={influencersImages}
          speed={45}
          imageWidth={100}
          imageHeight={110}
          gap={35}
        />
        <div className="register-button text-[var(--foreground)] flex justify-center">
          <button
            className="inline-flex items-center
           gap-2 px-2 py-2 lg:px-6 lg:py-2 xl:py-3 xl:px-8 rounded-full 
           border border-[#52C3C5] text-[#52C3C5] 
           font-semibold tracking-wide uppercase text-[10px] md:text-[12px] xl:text-[14px]
            transition-all duration-300
             hover:bg-[#52C3C5] hover:text-white
              shadow-lg shadow-[#52C3C5]/30"
            onClick={() => navigate("/influencer-register")}
          >
            {t("influencer.hero.registerNow")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
