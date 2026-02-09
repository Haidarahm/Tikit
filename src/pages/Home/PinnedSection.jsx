import React, { useLayoutEffect , useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PinnedSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const videoObserverRef = useRef(null);
  const contextRef = useRef(null);

  // Sample video data - replace with actual video URLs
  const videos = useMemo(() => {
    return [
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        label: "Creative Campaign",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        label: "Brand Storytelling",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        label: "Social Impact",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        label: "Digital Innovation",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        label: "Community Building",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        label: "Growth Strategy",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        label: "Content Creation",
        type: "video/mp4",
      },
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        label: "Influencer Marketing",
        type: "video/mp4",
      },
    ];
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;

    // Clean up any existing ScrollTrigger instances for this section
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      const containerWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalDistance = containerWidth - viewportWidth;

      if (totalDistance <= 0) return;

      const tween = gsap.to(container, {
        x: -totalDistance,
        ease: "none",
      });

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        animation: tween,
        invalidateOnRefresh: true,
        pinSpacing: true,
      });

      videoObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (!video || !video.isConnected) return;
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      container.querySelectorAll("video").forEach((video) => {
        if (videoObserverRef.current) {
          videoObserverRef.current.observe(video);
        }
      });
    }, sectionRef);

    // store context for cleanup
    contextRef.current = ctx;

    return () => {
      // Disconnect video observers
      if (videoObserverRef.current) {
        try {
          videoObserverRef.current.disconnect();
        } catch {}
        videoObserverRef.current = null;
      }

      // Kill this section's ScrollTrigger
      if (scrollTriggerRef.current) {
        try {
          scrollTriggerRef.current.kill();
        } catch {}
        scrollTriggerRef.current = null;
      }

      // As an extra safety, kill any remaining triggers for this section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          try {
            trigger.kill();
          } catch {}
        }
      });

      // Revert GSAP context to restore DOM to React-owned state
      if (contextRef.current) {
        try {
          contextRef.current.revert();
        } catch {}
        contextRef.current = null;
      }
    };
  }, []);
  

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden hidden md:block"
      style={{ minHeight: "100vh" }}
    >
      <div className="sticky top-0 flex items-center justify-center h-screen">
        <div 
          ref={containerRef}
          className="flex items-center h-full gap-4 md:gap-6 px-4 md:px-8"
          style={{ 
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {videos.map((video, index) => (
            <div 
              key={index}
              className="relative flex-shrink-0 bg-gray-900 rounded-lg overflow-hidden"
              style={{
                width: 'clamp(280px, 30vw, 440px)',
                height: 'clamp(420px, 45vw, 650px)',
                minWidth: '280px',
                minHeight: '420px'
              }}
            >
              <video
                className="w-full h-full object-cover"
                src={video.src}
                type={video.type}
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium text-sm md:text-base">
                  {video.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PinnedSection;