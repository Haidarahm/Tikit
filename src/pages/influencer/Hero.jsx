import React, { useLayoutEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTheme } from "../../store/ThemeContext";
import LogoLoop from "../../components/LogoLoop";

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

const Hero = () => {
  const h1WrapRef = useRef(null);
  const h1Ref = useRef(null);
  const h2WrapRef = useRef(null);
  const h2Ref = useRef(null);
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const { theme } = useTheme();

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
      className={`text-[var(--foreground)] relative overflow-hidden h-[50vh] md:h-screen w-full flex flex-col items-center justify-center ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="top-section text-center">
        <div ref={h1WrapRef} className="overflow-hidden">
          <h1
            ref={h1Ref}
            className="text-[32px] font-antonio md:text-[97px] capitalize  will-change-transform"
          >
            {t("influencer.hero.title")}
          </h1>
        </div>
        <div ref={h2WrapRef} className="overflow-hidden">
          <h1
            ref={h2Ref}
            className="text-[32px] font-antonio font-[700] mx-auto md:text-[96px] mb-8 capitalize tikit-gradient will-change-transform"
          >
            {t("influencer.hero.subtitle")}
          </h1>
        </div>
      </div>
      <div className="bottom-section w-full">
        <div className="help-text text-center text-[var(--foreground)]/30 font-bold">
          meet our happy clients
        </div>
        <InfiniteScroller
          items={influencersImages}
          speed={40}
          imageWidth={100}
          imageHeight={100}
          gap={35}
        />
        <div className="register-button text-[var(--foreground)] flex justify-center">
          <button className="font-bold text-[24px]">Register Now</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
