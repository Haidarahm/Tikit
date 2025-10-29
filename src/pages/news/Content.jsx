import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Content = () => {
  const containerRef = useRef(null);

  const newsItems = [
    {
      id: 1,
      title: "How to Scale Your Influencer Campaigns",
      description:
        "A deep dive into proven strategies for scaling influencer partnerships across platforms.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "7 Creative Patterns That Drive Results",
      description:
        "Discover the visual and messaging patterns that consistently outperform in social campaigns.",
      image:
        "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=800&h=500&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Attribution in 2025: What Actually Matters",
      description:
        "How modern marketers measure success in an era of signal loss and privacy changes.",
      image:
        "https://images.unsplash.com/photo-1554252116-17f33f0d2536?w=800&h=500&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "The Future of Influencer Marketing",
      description:
        "Exploring emerging trends and technologies shaping the influencer marketing landscape.",
      image:
        "https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=800&h=500&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Building Authentic Brand Connections",
      description:
        "How to create genuine relationships between brands and their audiences through influencers.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".news-item");

    // Horizontal scroll animation
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: `+=${sections.length * window.innerWidth}`,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="horizontal-scroll-container overflow-hidden relative w-full h-screen "
    >
      <div className="flex flex-nowrap  h-full">
        {newsItems.map((item) => (
          <section
            key={item.id}
            className="news-item min-w-[100vw] h-full relative flex-shrink-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-12 text-white">
              <h2 className="text-5xl font-bold">{item.title}</h2>
              <p className="text-lg max-w-xl">{item.description}</p>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Content;
