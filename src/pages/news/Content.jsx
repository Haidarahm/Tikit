import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Mock news items - replace with API data later
const newsItems = [
  {
    id: 1,
    title: "The Future of Digital Marketing",
    subtitle: "Industry Insights",
    description:
      "Discover how artificial intelligence and machine learning are revolutionizing the way brands connect with their audiences.",
    image:
      "https://images.pexels.com/photos/15943830/pexels-photo-15943830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "Social Media Trends 2024",
    subtitle: "Trend Analysis",
    description:
      "Explore the latest trends shaping social media marketing. From short-form video content to community-driven campaigns.",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    title: "Building Brand Identity",
    subtitle: "Brand Strategy",
    description:
      "Learn how compelling narratives can transform your brand's presence and create emotional connections with your audience.",
    image:
      "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    title: "Data-Driven Marketing",
    subtitle: "Analytics & Insights",
    description:
      "Unlock the power of data analytics to make informed marketing decisions and optimize campaigns for maximum ROI.",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    title: "Data-Driven Marketing",
    subtitle: "Analytics & Insights",
    description:
      "Unlock the power of data analytics to make informed marketing decisions and optimize campaigns for maximum ROI.",
    image:
      "https://i.pinimg.com/736x/08/df/75/08df750ca3fee1053c9997e2b00b140f.jpg",
  },
  {
    id: 4,
    title: "Data-Driven Marketing",
    subtitle: "Analytics & Insights",
    description:
      "Unlock the power of data analytics to make informed marketing decisions and optimize campaigns for maximum ROI.",
    image:
      "https://i.pinimg.com/736x/08/df/75/08df750ca3fee1053c9997e2b00b140f.jpg",
  },
];

// Card component
const Card = ({ item }) => {
  const cardRef = useRef(null);
  const coverRef = useRef(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const cover = coverRef.current;
    if (!card || !cover) return;

    // Card parallax effect
    const scrollTrigger = gsap.to(cover, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      if (scrollTrigger && scrollTrigger.scrollTrigger) {
        scrollTrigger.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="card">
      {/* Cover */}
      <figure className="card-cover-container">
        {/* Cover image */}
        <img
          ref={coverRef}
          src={item.image}
          alt={item.title}
          className="card-cover"
        />
      </figure>
      {/* Content overlay */}
      <div className="card-content">
        <span className="card-subtitle">{item.subtitle}</span>
        <h2 className="card-title">{item.title}</h2>
        <p className="card-description">{item.description}</p>
      </div>
    </div>
  );
};

// React app
const Content = () => {
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger on resize
      const refreshScrollTrigger = () => {
        ScrollTrigger.refresh();
      };

      // Refresh on resize
      window.addEventListener("resize", refreshScrollTrigger);

      // Initial refresh after a small delay
      setTimeout(refreshScrollTrigger, 100);

      return () => {
        window.removeEventListener("resize", refreshScrollTrigger);
      };
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardsRef} className="news-cards-container">
      <section className="cards">
        {newsItems.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default Content;
