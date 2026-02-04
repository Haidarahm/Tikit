import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export default function InfiniteScroll({
  width = "30rem",
  maxHeight = "100%",
  items = [],
  itemMinHeight = 150,
  isTilted = false,
  tiltDirection = "left",
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "down",
}) {
  const containerRef = useRef(null);

  const getTiltTransform = () => {
    if (!isTilted) return "none";
    return tiltDirection === "left"
      ? "rotateX(20deg) rotateZ(-20deg) skewX(20deg)"
      : "rotateX(20deg) rotateZ(20deg) skewX(-20deg)";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    const cards = gsap.utils.toArray(container.children);
    if (!cards.length) return;

    let observer;
    let rafId;
    let isMounted = true;
    let isUserInteracting = false;

    requestAnimationFrame(() => {
      if (!isMounted) return;

      const itemHeight = cards[0].offsetHeight;
      const totalItems = cards.length;
      const halfHeight = itemHeight * (totalItems / 2);

      // wrap exactly at half
      const wrapY = gsap.utils.wrap(0, halfHeight);

      // position items evenly
      cards.forEach((card, i) => {
        gsap.set(card, { y: i * itemHeight });
      });

      const move = (delta) => {
        cards.forEach((card) => {
          const y = parseFloat(gsap.getProperty(card, "y")) || 0;
          gsap.set(card, { y: wrapY(y + delta), immediateRender: true });
        });
      };

      observer = Observer.create({
        target: container,
        type: "wheel,touch,pointer",
        preventDefault: false,
        onPress: () => {
          isUserInteracting = true;
          if (rafId) cancelAnimationFrame(rafId);
        },
        onRelease: () => {
          isUserInteracting = false;
          if (autoplay) startAutoplay();
        },
        onChange: ({ deltaY, isDragging }) => {
          const distance = (isDragging ? deltaY : deltaY * 2) * -1;
          move(distance);
        },
      });

      const startAutoplay = () => {
        if (rafId) cancelAnimationFrame(rafId);

        const dir = autoplayDirection === "down" ? 1 : -1;
        const speed = autoplaySpeed * dir;

        const tick = () => {
          if (!isMounted || isUserInteracting) return;
          move(speed);
          rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
      };

      if (autoplay) startAutoplay();
    });

    return () => {
      isMounted = false;
      if (observer) observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
      cards.forEach((card) => gsap.killTweensOf(card));
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    isTilted,
    tiltDirection,
  ]);

  return (
    <div
      className="relative flex items-center justify-end w-full overflow-hidden"
      style={{ maxHeight }}
    >
      <div
        ref={containerRef}
        className="flex flex-col px-4 cursor-grab origin-center"
        style={{
          width,
          transform: getTiltTransform(),
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center text-xl font-semibold
                       text-center border-2 border-[var(--foreground)]
                       rounded-[15px] select-none box-border"
            style={{ height: itemMinHeight }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
