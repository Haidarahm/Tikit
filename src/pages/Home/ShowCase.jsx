import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import img1 from "../../assets/test/hidden.webp";
import img2 from "../../assets/test/porsche.webp";
import img3 from "../../assets/test/the-reve.webp";

gsap.registerPlugin(ScrollTrigger);

const showcaseData = [
  {
    id: 1,
    img: img1,
    title: "Hidden",
    subtitle: "Marketing",
    size: "small", // small = 1 col, large = 2 col
  },
  {
    id: 2,
    img: img2,
    title: "Porsche",
    subtitle: "Branding",
    size: "small",
  },
  {
    id: 3,
    img: img3,
    title: "The Reve",
    subtitle: "Creative",
    size: "large",
  },
];

const ShowCase = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".showcase-card");
      if (!cards.length) return;

      const clipVariants = [
        "inset(0% 100% 0% 0% round 160px)", // first: left -> right
        "inset(0% 0% 0% 100% round 160px)", // second: right -> left
        "inset(100% 0% 0% 0% round 140px)", // third: bottom -> top
      ];

      cards.forEach((card, index) => {
        const media = card.querySelector(".showcase-card_media");
        const content = card.querySelector(".action-content");
        const seed =
          clipVariants[index] || clipVariants[clipVariants.length - 1];

        gsap.set(card, {
          clipPath: seed,
          opacity: 0.35,
        });
        if (media) {
          gsap.set(media, {
            scale: 1.22,
            rotate: index % 2 === 0 ? -3 : 3,
          });
        }
        if (content) {
          gsap.set(content, { autoAlpha: 0, y: 45 });
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 5%",
              scrub: 2.6,
              onRefresh: () => ScrollTrigger.update(),
            },
          })
          .to(
            card,
            {
              clipPath: "inset(0% 0% 0% 0% round 18px)",
              opacity: 1,
              duration: 6,
              ease: "power4.out",
            },
            0
          )
          .to(
            media,
            {
              scale: 1,
              rotate: 0,
              duration: 6,
              ease: "power3.out",
            },
            0
          )
          .to(
            content,
            {
              autoAlpha: 1,
              y: 0,
              duration: 4.2,
              ease: "power2.out",
            },
            "-=1.2"
          );
      });

      gsap.to(".showcase-card_media", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
        yPercent: 12,
        ease: "none",
      });

      ScrollTrigger.refresh(true);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col w-[98vw] mt-[30px] sm:w-[96vw] md:w-[95vw] gap-4 md:gap-8 md:h-[1400px] h-[1000px] mx-auto"
    >
      {/* TITLE */}
      <div className="title text-[var(--foreground)] flex flex-col w-full justify-center items-center min-h-[200px] px-4 text-center gap-4">
        <h1 className="tikit-title">
          {t("home.showcase.title")}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-[24px] max-w-4xl">
          {t("home.showcase.description")}
        </p>
      </div>

      {/* GRID */}
      <div className="md:h-[1200px] h-[800px] w-full grid grid-cols-2 gap-4 grid-rows-2">
        {showcaseData.map((item) => (
          <div
            key={item.id}
            className={`
              relative showcase-card rounded-[10px] overflow-hidden md:rounded-[15px]
              ${item.size === "large" ? "col-span-2" : "col-span-1"}
            `}
          >
            <div
              className="showcase-card_media h-full w-full absolute rounded-[10px] inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${item.img})` }}
              role="img"
              aria-label={item.title}
            />

            {/* CONTENT */}
            <div className="absolute py-[13px] bg-white/10 rounded-[10px] backdrop-blur-md flex justify-center w-[80%] md:w-[60%] bottom-[35px] z-10 left-1/2 translate-x-[-50%]">
              <div className="action-content items-center justify-center text-white flex gap-[25px] flex-col">
                <div className="title-subtitle flex flex-col items-center">
                  <h2 className="text-[30px] md:text-[40px] font-[700] font-antonio">
                    {item.title}
                  </h2>
                  <h3 className="text-[15px] md:text-[20px] font-[200]">{item.subtitle}</h3>
                </div>

                <button className="text-[15px] md:text-[20px] bg-transparent px-[10px] py-[5px] border border-white rounded-[10px] transition-all duration-300 ease-out hover:bg-white hover:text-black hover:-translate-y-[3px] hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
                  View Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCase;
