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
        src: "/reels/reel-1.mp4",
        label: "Creative Campaign",
        type: "video/mp4",
      },
      {
        src: "/reels/reel-2.mp4",
        label: "Brand Storytelling",
        type: "video/mp4",
      },
      {
        src: "/reels/reel-3.mp4",
        label: "Social Impact",
        type: "video/mp4",
      },
      {
        src: "/reels/reel-4.mp4",
        label: "Digital Innovation",
        type: "video/mp4",
      },
      {
        src: "/reels/reel-5.mp4",
        label: "Community Building",
        type: "video/mp4",
      },
      {
        src: "/reels/reel-6.mp4",
        label: "Growth Strategy",
        type: "video/mp4",
      },
      {
        src: "/reels/reel-7.mp4",
        label: "Content Creation",
        type: "video/mp4",
      },
      {
        src: "/reels/reel-8.mp4",
        label: "Influencer Marketing",
        type: "video/mp4",
      },
    ];
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    
    // Check if elements are still connected to DOM
    if (!section.isConnected || !container.isConnected) return;

    // Clean up any existing ScrollTrigger instances for this section BEFORE creating new ones
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        try {
          trigger.kill();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    });

    const ctx = gsap.context(() => {
      const containerWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalDistance = containerWidth - viewportWidth;

      if (totalDistance <= 0) return;

      // Get the first card width to calculate initial position
      const firstCard = container.querySelector('div');
      const firstCardWidth = firstCard?.offsetWidth || 300;
      const padding = 32; // Account for px-8 padding (md:px-8 = 32px)
      
      // Calculate initial position: start with first card's right edge at viewport's right edge
      // This makes the first card appear from the right and scroll left
      const initialX = viewportWidth - firstCardWidth - padding;

      // Set initial position so first card starts visible from right
      gsap.set(container, { x: initialX });

      // Animate from right to left: 
      // Start with first card visible at right edge
      // End at -totalDistance (last cards visible at left)
      const tween = gsap.fromTo(container, 
        {
          x: initialX, // Start with first reel visible from right
        },
        {
          x: -totalDistance, // Scroll left to show all cards, ending at left
          ease: "none",
        }
      );

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
        refreshPriority: 1, // Higher priority for pinned sections (refresh first)
      });
      
      // Don't refresh immediately - let ScrollTrigger handle it naturally
      // Pinned sections should refresh first due to refreshPriority: 1

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

      // Get current section reference (may have changed)
      const currentSection = sectionRef.current;

      // Kill this section's ScrollTrigger FIRST
      if (scrollTriggerRef.current) {
        try {
          scrollTriggerRef.current.kill();
        } catch {}
        scrollTriggerRef.current = null;
      }

      // As an extra safety, kill any remaining triggers for this section
      // Use both the captured section and current ref to catch all instances
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.trigger;
        if (triggerElement === section || triggerElement === currentSection) {
          try {
            trigger.kill();
          } catch {}
        }
      });

      // Revert GSAP context AFTER ScrollTrigger is killed to restore DOM
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
      style={{ 
        minHeight: "100vh",
      }}
    >
      <div className="sticky top-0 flex items-center justify-start h-screen">
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
                preload="none"
                playsInline
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