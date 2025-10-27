import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const sectionRef = useRef(null);

  // Drive progress by window scroll relative to this section lifecycle
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map(
      (_, index) => index / Math.max(cardLength - 1, 1)
    );
    const closest = cardsBreakpoints.reduce(
      (acc, bp, idx) =>
        Math.abs(latest - bp) < Math.abs(latest - cardsBreakpoints[acc])
          ? idx
          : acc,
      0
    );
    setActiveCard(closest);
  });

  const backgroundColors = ["#0f172a", "#000000", "#171717"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  // Pin the section until the sequence ends
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const endDistance = window.innerHeight * (cardLength * 1.5);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: `+=${endDistance}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    return () => st.kill();
  }, [cardLength]);

  // Translate the left column based on progress to simulate scrolling text
  const maxShift = (cardLength - 1) * 200; // px per step
  const textY = useTransform(scrollYProgress, [0, 1], [0, -maxShift]);

  return (
    <div ref={sectionRef} className="relative w-full">
      <motion.div
        animate={{
          backgroundColor:
            backgroundColors[activeCard % backgroundColors.length],
        }}
        className="flex h-screen items-start justify-center space-x-10 rounded-md p-10"
      >
        <div className="relative flex h-full w-full max-w-6xl items-start gap-10 px-4">
          {/* Left scroll text column (clipped) */}
          <div className="relative h-[70vh] max-w-2xl overflow-hidden">
            <motion.div style={{ y: textY }}>
              {content.map((item, index) => (
                <div key={item.title + index} className="my-20">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                    className="text-2xl font-bold text-slate-100"
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                    className="text-kg mt-6 max-w-sm text-slate-300"
                  >
                    {item.description}
                  </motion.p>
                </div>
              ))}
              <div className="h-40" />
            </motion.div>
          </div>

          {/* Right sticky image panel */}
          <div
            style={{ background: backgroundGradient }}
            className={cn(
              "sticky top-10 h-[70vh] w-[28rem] flex-shrink-0 overflow-hidden rounded-md bg-white",
              contentClassName
            )}
          >
            <div className="h-full w-full">
              {content[activeCard].content ?? null}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
