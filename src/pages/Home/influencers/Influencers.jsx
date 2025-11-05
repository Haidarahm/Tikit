import React, { useState, useEffect } from "react";
import "./influencers.css";
import influencer1 from "../../../assets/influncer/1.png";
import influencer2 from "../../../assets/influncer/2.png";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaFire,
  FaPalette,
  FaLaugh,
  FaLandmark,
  FaMicrochip,
  FaPlane,
} from "react-icons/fa";
import AOS from "aos";

// Category data with background images
const categories = [
  {
    key: "Entertainment",
    label: "Entertainment",
    icon: FaFire,
    bgImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
  },
  {
    key: "Beauty",
    label: "Beauty",
    icon: FaPalette,
    bgImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
  },
  {
    key: "Comedy",
    label: "Comedy",
    icon: FaLaugh,
    bgImage:
      "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=400&h=300&fit=crop",
  },
  {
    key: "Political",
    label: "Political",
    icon: FaLandmark,
    bgImage:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop",
  },
  {
    key: "Tech",
    label: "Tech",
    icon: FaMicrochip,
    bgImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
  },

];

// Influencers data
const baseInfluencers = [
  {
    id: 1,
    name: "Sarah Johnson",
    primarySubtitle: "Digital Content Creator",
    secondarySubtitle: "Lifestyle & Fashion Influencer",
    image: influencer1,
    followers: "2.5M",
    socialLinks: [
      {
        platform: "instagram",
        href: "https://instagram.com/sarahjohnson",
        icon: FaInstagram,
      },
      {
        platform: "youtube",
        href: "https://youtube.com/@sarahjohnson",
        icon: FaYoutube,
      },
      {
        platform: "tiktok",
        href: "https://tiktok.com/@sarahjohnson",
        icon: FaTiktok,
      },
      {
        platform: "twitter",
        href: "https://twitter.com/sarahjohnson",
        icon: FaTwitter,
      },
    ],
  },
  {
    id: 2,
    name: "Emma Rodriguez",
    primarySubtitle: "Beauty & Wellness Expert",
    secondarySubtitle: "Skincare & Makeup Artist",
    image: influencer2,
    followers: "1.8M",
    socialLinks: [
      {
        platform: "instagram",
        href: "https://instagram.com/emmarodriguez",
        icon: FaInstagram,
      },
      {
        platform: "youtube",
        href: "https://youtube.com/@emmarodriguez",
        icon: FaYoutube,
      },
      {
        platform: "tiktok",
        href: "https://tiktok.com/@emmarodriguez",
        icon: FaTiktok,
      },
      {
        platform: "twitter",
        href: "https://twitter.com/emmarodriguez",
        icon: FaTwitter,
      },
    ],
  },
  {
    id: 3,
    name: "Marcus Chen",
    primarySubtitle: "Tech Reviewer & Entrepreneur",
    secondarySubtitle: "Gadgets & Innovation Expert",
    image: influencer1,
    followers: "3.2M",
    socialLinks: [
      {
        platform: "instagram",
        href: "https://instagram.com/marcuschen",
        icon: FaInstagram,
      },
      {
        platform: "youtube",
        href: "https://youtube.com/@marcuschen",
        icon: FaYoutube,
      },
      {
        platform: "twitter",
        href: "https://twitter.com/marcuschen",
        icon: FaTwitter,
      },
    ],
  },
  {
    id: 4,
    name: "Zara Ahmed",
    primarySubtitle: "Travel & Adventure Blogger",
    secondarySubtitle: "Sustainable Tourism Advocate",
    image: influencer2,
    followers: "1.5M",
    socialLinks: [
      {
        platform: "instagram",
        href: "https://instagram.com/zaraahmed",
        icon: FaInstagram,
      },
      {
        platform: "youtube",
        href: "https://youtube.com/@zaraahmed",
        icon: FaYoutube,
      },
      {
        platform: "tiktok",
        href: "https://tiktok.com/@zaraahmed",
        icon: FaTiktok,
      },
    ],
  },
  {
    id: 5,
    name: "Alex Rivera",
    primarySubtitle: "Fitness Coach",
    secondarySubtitle: "Health & Wellness",
    image: influencer1,
    followers: "900K",
    socialLinks: [
      {
        platform: "instagram",
        href: "https://instagram.com/alexrivera",
        icon: FaInstagram,
      },
      {
        platform: "youtube",
        href: "https://youtube.com/@alexrivera",
        icon: FaYoutube,
      },
      {
        platform: "tiktok",
        href: "https://tiktok.com/@alexrivera",
        icon: FaTiktok,
      },
    ],
  },
  {
    id: 6,
    name: "Sophie Williams",
    primarySubtitle: "Food & Lifestyle",
    secondarySubtitle: "Chef & Recipe Creator",
    image: influencer2,
    followers: "2.1M",
    socialLinks: [
      {
        platform: "instagram",
        href: "https://instagram.com/sophiewilliams",
        icon: FaInstagram,
      },
      {
        platform: "youtube",
        href: "https://youtube.com/@sophiewilliams",
        icon: FaYoutube,
      },
      {
        platform: "twitter",
        href: "https://twitter.com/sophiewilliams",
        icon: FaTwitter,
      },
    ],
  },
];

const categoryToInfluencers = {
  Entertainment: baseInfluencers.map((i, idx) => ({
    ...i,
    id: `ent-${i.id}-${idx}`,
    secondarySubtitle: "Entertainment Creator",
  })),
  Beauty: baseInfluencers.map((i, idx) => ({
    ...i,
    id: `bea-${i.id}-${idx}`,
    secondarySubtitle: "Beauty & Makeup",
  })),
  Comedy: baseInfluencers.map((i, idx) => ({
    ...i,
    id: `com-${i.id}-${idx}`,
    secondarySubtitle: "Comedy & Sketches",
  })),
  Political: baseInfluencers.map((i, idx) => ({
    ...i,
    id: `pol-${i.id}-${idx}`,
    secondarySubtitle: "Political Commentary",
  })),
  Tech: baseInfluencers.map((i, idx) => ({
    ...i,
    id: `tec-${i.id}-${idx}`,
    secondarySubtitle: "Tech & Gadgets",
  })),
  Travel: baseInfluencers.map((i, idx) => ({
    ...i,
    id: `tra-${i.id}-${idx}`,
    secondarySubtitle: "Travel & Lifestyle",
  })),
};

const Influencers = () => {
  const [activeCategory, setActiveCategory] = useState("Entertainment");

  useEffect(() => {
    AOS.refresh();
  }, []);

  const influencers = categoryToInfluencers[activeCategory] || [];

  return (
    <section className="min-h-screen py-16 px-4 relative overflow-hidden bg-[var(--background)]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#52C3C5]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52C3C5]/10 dark:bg-[#52C3C5]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#52C3C5] animate-pulse"></span>
            <span className="text-sm font-medium text-[#52C3C5]">
              Our Influencers
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#52C3C5] via-[#5269C5] to-[#52A0C5] bg-clip-text text-transparent">
            Meet The Creators
          </h2>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Connect with influential voices across diverse categories
          </p>
        </div>

        {/* Category Menu Bar - Centered */}
        <div
          className="flex justify-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <div className="flex flex-wrap gap-4 justify-center max-w-5xl">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  data-aos="zoom-in"
                  data-aos-duration="500"
                  data-aos-delay={idx * 80}
                  className={`
                    group relative overflow-hidden rounded-2xl w-40 h-28 
                    transition-all duration-500 ease-out
                    ${
                      isActive
                        ? "ring-4 ring-[#52C3C5] shadow-2xl shadow-[#52C3C5]/30 scale-105"
                        : "ring-2 ring-[var(--foreground)]/20 hover:ring-4 hover:ring-[#52C3C5]/60 hover:scale-[1.05] shadow-lg hover:shadow-2xl"
                    }
                  `}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${cat.bgImage})` }}
                  >
                    <div
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        isActive
                          ? "bg-gradient-to-br from-[#52C3C5]/80 to-[#5269C5]/80"
                          : "bg-black/40 group-hover:bg-[#52C3C5]/70"
                      }`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-3">
                    <Icon
                      className={`text-2xl mb-2 transition-all duration-500 ease-out ${
                        isActive
                          ? "scale-110"
                          : "group-hover:scale-125 group-hover:rotate-6"
                      }`}
                    />
                    <span className="font-semibold text-sm transition-all duration-300 group-hover:tracking-wider">
                      {cat.label}
                    </span>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid - 3 per row */}
        <div className="flex flex-wrap justify-center gap-6">
          {influencers.map((inf, idx) => {
            const Icon = inf.socialLinks[0]?.icon;
            return (
              <div
                key={inf.id}
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={idx * 100}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
              >
                <div className="group relative bg-[var(--background)] border border-[var(--foreground)]/10 dark:border-[var(--foreground)]/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#52C3C5]/20 transition-all duration-500 ease-out hover:-translate-y-3 hover:border-[#52C3C5]/30">
                  {/* Card Image */}
                  <div className="relative h-80 bg-gradient-to-br from-[#52C3C5]/10 to-[#5269C5]/10 dark:from-[#52C3C5]/20 dark:to-[#5269C5]/20 overflow-hidden transition-all duration-500 ease-out group-hover:from-[#52C3C5]/20 group-hover:to-[#5269C5]/20">
                    <img
                      src={inf.image}
                      alt={inf.name}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[95%] w-auto object-contain transition-all duration-700 ease-out group-hover:scale-110 group-hover:drop-shadow-2xl"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#52C3C5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>

                    {/* Followers Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--background)]/90 backdrop-blur-sm border border-[#52C3C5]/30 transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-[#52C3C5] group-hover:shadow-lg group-hover:shadow-[#52C3C5]/30">
                      <span className="text-xs font-semibold text-[#52C3C5]">
                        {inf.followers} Followers
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 transition-all duration-300 ease-out group-hover:bg-[#52C3C5]/5">
                    <h3 className="text-xl font-bold mb-2 text-[var(--foreground)] transition-all duration-300 ease-out group-hover:text-[#52C3C5]">
                      {inf.name}
                    </h3>
                    <p className="text-sm text-[#52C3C5] font-medium mb-1 transition-all duration-300 ease-out group-hover:tracking-wide">
                      {inf.primarySubtitle}
                    </p>
                    <p className="text-xs text-[var(--foreground)]/60 mb-4 transition-colors duration-300 ease-out group-hover:text-[var(--foreground)]/80">
                      {inf.secondarySubtitle}
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-2">
                      {inf.socialLinks?.map((social, socialIdx) => {
                        const SocialIcon = social.icon;
                        return (
                          <a
                            key={`${inf.id}-${social.platform}`}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={social.platform}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#52C3C5] to-[#5269C5] text-white hover:from-[#52C3C5] hover:to-[#5269C5] transition-all duration-500 ease-out hover:scale-125 hover:-rotate-12 shadow-lg hover:shadow-2xl hover:shadow-[#52C3C5]/50"
                            style={{ transitionDelay: `${socialIdx * 50}ms` }}
                          >
                            <SocialIcon className="text-base transition-transform duration-300 ease-out hover:scale-110" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#52C3C5]/10 to-transparent rounded-bl-full transition-all duration-500 ease-out group-hover:w-24 group-hover:h-24 group-hover:from-[#52C3C5]/20"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Influencers;
