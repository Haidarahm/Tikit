import React from "react";
import Hero from "./Hero";
import { InfluencerDetails } from "./InfluencerDetails";
import influencer1 from "../../assets/influncer/1.png";
import influencer2 from "../../assets/influncer/2.png";

export const Influencer = () => {
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

  return (
    <div className="influencers-section w-full">
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
