import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import TikitTitle from "../../../components/TikitTitle";

const WorkHero = ({  t, isRtl }) => {
  const titleContainerRef = useRef(null);
  const titleRef = useRef(null);
  const descTitleWrapRef = useRef(null);
  const descTitleRef = useRef(null);
  const descParaWrapRef = useRef(null);
  const descParaRef = useRef(null);
  const paragraphContainerRef = useRef(null);
  const paragraphRef = useRef(null);

  useLayoutEffect(() => {
    if (!titleContainerRef.current || !titleRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.1 }
      );
    }, titleContainerRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!descTitleRef.current || !descParaRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        descTitleRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );
      gsap.fromTo(
        descParaRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.55 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!paragraphContainerRef.current || !paragraphRef.current) return;
    gsap.set(paragraphRef.current, { yPercent: 100, opacity: 1 });
    gsap.to(paragraphRef.current, {
      yPercent: 0,
      duration: 0.9,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div className="h-[50vh] md:h-[70vh] flex flex-col justify-around items-center w-full description  mt-[104px]">
      <div className="w-full"></div>
      <div ref={titleContainerRef} className="overflow-hidden">
        <div
          ref={titleRef}
          className="title will-change-transform translate-y-full"
        >
          <TikitTitle
           title={t("work.title")}
          />
        </div>
      </div>
      <div
        className={`description  w-full relative z-30 flex md:flex-row flex-col text-[var(--foreground)] px-[20px] md:px-[30px] gap-4 md:gap-12 justify-center items-center ${
          isRtl
            ? "text-center md:text-end "
            : " text-center md:text-start"
        }`}
      >
        <div ref={descTitleWrapRef} className="overflow-hidden  md:w-[20%]">
          <div
            ref={descTitleRef}
            style={{fontFamily: isRtl ? "Cairo" : "Antonio"}}
            className="title text-start  font-bold mt-4 md:mt-0 text-[20px] md:text-[34px] will-change-transform translate-y-full"
          >
            {t("work.specialTitle")}
          </div>
        </div>
        <div ref={descParaWrapRef} className="overflow-hidden">
          <div
            ref={descParaRef}
            className="paragraph text-center md:text-start text-[16px] md:text-[22px] will-change-transform  translate-y-full"
          >
            {t("work.specialDescription")}
          </div>
        </div>
      </div>
      {/* <div ref={paragraphContainerRef} className="overflow-hidden">
        <p
          ref={paragraphRef}
          className="paragraph font-light text-[16px] md:text-[32px] md:w-[900px] text-center leading-[40px]"
        >
          We take a similar approach to design commercial we do impactfully
          approache, over the flowchart of user friendly wireframe.
        </p>
      </div> */}
    </div>
  );
};

export default WorkHero;
