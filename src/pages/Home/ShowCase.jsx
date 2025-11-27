import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".showcase-card");
      if (!cards.length) return;

      const clipSeeds = [
        "inset(70% 30% 20% 30% round 80px)",
        "inset(25% 35% 55% 35% round 120px)",
        "inset(50% 10% 10% 10% round 60px)",
      ];

      cards.forEach((card, index) => {
        const media = card.querySelector(".showcase-card_media");
        const content = card.querySelector(".action-content");
        const seed = clipSeeds[index % clipSeeds.length];

        gsap.set(card, {
          clipPath: seed,
          opacity: 0.45,
        });
        if (media) {
          gsap.set(media, {
            scale: 1.18,
            rotate: index % 2 === 0 ? -2 : 2,
          });
        }
        if (content) {
          gsap.set(content, { autoAlpha: 0, y: 35 });
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 1.2,
              onRefresh: () => ScrollTrigger.update(),
            },
          })
          .to(
            card,
            {
              clipPath: "inset(0% 0% 0% 0% round 15px)",
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            0
          )
          .to(
            media,
            {
              scale: 1,
              rotate: 0,
              duration: 1.2,
              ease: "power2.out",
            },
            0
          )
          .to(
            content,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
            },
            "-=0.4"
          );
      });

      gsap.to(".showcase-card_media", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        yPercent: 18,
        ease: "none",
      });

      ScrollTrigger.refresh(true);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col w-[98vw] mt-[30px] sm:w-[96vw] md:w-[95vw] gap-8 h-[1400px] mx-auto"
    >
      {/* TITLE */}
      <div className="title text-[var(--foreground)] flex flex-col w-full justify-center items-center h-[200px]">
        <h1 className="font-antonio font-[600] text-[64px]">
          Fueling brands with influence
        </h1>
        <p className="text-center text-[24px]">
          Tikit is an award-winning global influencer marketing agency. Whether
          you want to shift perceptions or create scroll-stopping content, we do
          it better than anyone.
        </p>
      </div>

      {/* GRID */}
      <div className="h-[1200px] w-full grid grid-cols-2 gap-4 grid-rows-2">
        {showcaseData.map((item) => (
          <div
            key={item.id}
            className={`
              relative showcase-card rounded-[10px] overflow-hidden md:rounded-[15px]
              ${item.size === "large" ? "col-span-2" : "col-span-1"}
            `}
          >
            <div
              className="showcase-card_media h-full w-full absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${item.img})` }}
              role="img"
              aria-label={item.title}
            />

            {/* CONTENT */}
            <div className="absolute py-[13px] bg-white/10 rounded-[10px] backdrop-blur-md flex justify-center w-[60%] bottom-[35px] z-10 left-1/2 translate-x-[-50%]">
              <div className="action-content items-center justify-center text-white flex gap-[25px] flex-col">
                <div className="title-subtitle flex flex-col items-center">
                  <h2 className="text-[40px] font-[700] font-antonio">
                    {item.title}
                  </h2>
                  <h3 className="text-[20px] font-[200]">{item.subtitle}</h3>
                </div>

                <button className="bg-transparent px-[10px] py-[5px] border border-white rounded-[10px]">
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
