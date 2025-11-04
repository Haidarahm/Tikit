import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Hero from "./Hero";
import { InfluencerDetails } from "./InfluencerDetails";
import influencer1 from "../../assets/influncer/1.png";
import influencer2 from "../../assets/influncer/2.png";
import SEOHead from "../../components/SEOHead";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const Influencer = () => {
  const lenisRef = useRef(null);
  // Fake data array for influencers
  const influencersData = [
    {
      id: 1,
      name: "Sarah Johnson",
      primarySubtitle: "Digital Content Creator",
      secondarySubtitle: "Lifestyle & Fashion Influencer",
      image: influencer1,
      socialLinks: [
        { platform: "instagram", href: "https://instagram.com/sarahjohnson" },
        { platform: "youtube", href: "https://youtube.com/@sarahjohnson" },
        { platform: "tiktok", href: "https://tiktok.com/@sarahjohnson" },
        { platform: "twitter", href: "https://twitter.com/sarahjohnson" },
      ],
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      primarySubtitle: "Beauty & Wellness Expert",
      secondarySubtitle: "Skincare & Makeup Artist",
      image: influencer2,
      socialLinks: [
        { platform: "instagram", href: "https://instagram.com/emmarodriguez" },
        { platform: "youtube", href: "https://youtube.com/@emmarodriguez" },
        { platform: "tiktok", href: "https://tiktok.com/@emmarodriguez" },
        { platform: "twitter", href: "https://twitter.com/emmarodriguez" },
      ],
    },
    {
      id: 3,
      name: "Marcus Chen",
      primarySubtitle: "Tech Reviewer & Entrepreneur",
      secondarySubtitle: "Gadgets & Innovation Expert",
      image: influencer1, // Using same image for demo
      socialLinks: [
        { platform: "instagram", href: "https://instagram.com/marcuschen" },
        { platform: "youtube", href: "https://youtube.com/@marcuschen" },
        { platform: "twitter", href: "https://twitter.com/marcuschen" },
      ],
    },
    {
      id: 4,
      name: "Zara Ahmed",
      primarySubtitle: "Travel & Adventure Blogger",
      secondarySubtitle: "Sustainable Tourism Advocate",
      image: influencer2, // Using same image for demo
      socialLinks: [
        { platform: "instagram", href: "https://instagram.com/zaraahmed" },
        { platform: "youtube", href: "https://youtube.com/@zaraahmed" },
        { platform: "tiktok", href: "https://tiktok.com/@zaraahmed" },
      ],
    },
  ];

  useEffect(() => {
    // Safety: ensure no leftover locomotive-scroll styles block scrolling
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      wrapper: window,
      content: document.documentElement,
    });

    // Connect Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add a small delay to ensure all components are mounted before ScrollTrigger refresh
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // RAF loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current = lenis;

    // Handle window resize for responsive animations
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Refresh ScrollTrigger after Lenis is initialized
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="influencers-section w-full">
      <SEOHead
        title="Influencer Network"
        description="Discover Tikit Agency's network of talented influencers and content creators. Connect with top influencers across various niches including lifestyle, beauty, tech, and travel."
        keywords="influencer network, content creators, social media influencers, influencer marketing, brand partnerships, influencer collaboration, UAE influencers"
        canonicalUrl="/influencer"
      />
      <Hero />
      {influencersData.map((influencer, index) => (
        <InfluencerDetails
          key={influencer.id}
          name={influencer.name}
          primarySubtitle={influencer.primarySubtitle}
          secondarySubtitle={influencer.secondarySubtitle}
          image={influencer.image}
          socialLinks={influencer.socialLinks}
          isReversed={index % 2 === 1}
        />
      ))}
    </div>
  );
};
