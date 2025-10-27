import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TextChanger = ({
  texts = ["My Hero", "Yes Man", "My Dream"],
  duration = 2, // time between text changes
  yMove = 80, // distance to move text vertically
  diagonal = false, // if true, moves diagonally
  textClassName = "",
}) => {
  const textRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Timeline for out + in animation
    const tl = gsap.timeline({ paused: true });

    // OUT animation
    tl.to(el, {
      y: diagonal ? yMove : yMove, // vertical or diagonal
      x: diagonal ? yMove / 2 : 0,
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
    });

    // IN animation
    tl.to(el, {
      y: 0,
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.inOut",
      onStart: () => {
        // Change the text before animating back in
        setIndex((prev) => (prev + 1) % texts.length);
      },
    });

    const interval = setInterval(() => {
      tl.restart();
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [texts, duration, yMove, diagonal]);

  return (
    <div
      className="relative overflow-hidden inline-block"
      style={{ display: "inline-block" }}
    >
      <span
        ref={textRef}
        className={`block ${textClassName}`}
        style={{
          transform: "translateY(0)",
          willChange: "transform, opacity",
        }}
      >
        {texts[index]}
      </span>
    </div>
  );
};

export default TextChanger;
