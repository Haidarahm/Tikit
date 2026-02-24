import InfluencerSubPage from "./InfluencerSubPage";
import {
  HiPhotograph,
  HiVideoCamera,
  HiShoppingCart,
  HiHashtag,
  HiUserGroup,
  HiBadgeCheck,
  HiGlobe,
  HiChartBar,
  HiHeart,
} from "react-icons/hi";
import {
  HiMegaphone,
  HiSparkles,
  HiCurrencyDollar,
  HiPresentationChartBar,
} from "react-icons/hi2";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const BASE = "/services/influencer-marketing-agency-dubai";

const pageData = {
  seo: {
    title: "Instagram Influencer Marketing Dubai | Reels, Stories & Collaborations",
    description: "Instagram influencer marketing agency in Dubai. Strategic Reels, Stories, collaborations, and shoppable content campaigns. Connect with top Instagram creators to drive engagement, brand awareness, and sales in the UAE.",
    keywords: "Instagram influencer marketing Dubai, Instagram marketing agency UAE, Instagram Reels marketing, Instagram Stories campaign, Instagram creator partnerships, Instagram shopping influencer, Instagram content Dubai",
    canonicalUrl: `${BASE}/instagram-influencer-marketing`,
    serviceType: "Instagram Influencer Marketing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://tikit.ae${BASE}/instagram-influencer-marketing#service`,
      name: "Instagram Influencer Marketing Dubai",
      description: "Strategic Instagram influencer marketing services in Dubai including Reels, Stories, collaborations, and shoppable content campaigns.",
      provider: { "@type": "Organization", name: "Tikit Agency", url: "https://tikit.ae" },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Influencer Marketing", url: BASE },
      { name: "Instagram Influencer Marketing", url: `${BASE}/instagram-influencer-marketing` },
    ],
  },
  badge: "Instagram Influencer Marketing",
  hero: {
    title: "Dominate the Feed With",
    mainWord: "Instagram Creators",
    description: "Leverage the full power of Instagram through strategic creator partnerships. From Reels and Stories to collaborations and shoppable content, we craft campaigns that captivate audiences and drive results across the UAE.",
  },
  definition: {
    title: "What is Instagram Influencer Marketing?",
    paragraph: "Instagram influencer marketing is the strategic use of Instagram content creators to promote brands, products, and services through authentic visual storytelling. With over 70% of UAE residents actively using Instagram, it remains the most powerful platform for influencer marketing in the region. Modern Instagram campaigns leverage multiple content formats — Reels for viral reach, Stories for daily engagement, carousel posts for education, and Instagram Shopping for direct conversions — creating a multi-touchpoint brand experience.",
    benefitsTitle: "Why Instagram Leads Influencer Marketing",
    benefits: [
      "Highest engagement platform in the UAE with over 70% active user penetration",
      "Visual-first format perfectly suited for showcasing products and brand aesthetics",
      "Instagram Reels drive 2x more reach than static posts for maximum brand discovery",
      "Shoppable content features enable direct product tagging and seamless purchase journeys",
      "Instagram Collaborations double reach by appearing on both brand and creator profiles",
      "Story stickers, polls, and links drive interactive engagement and website traffic",
    ],
    processTitle: "Our Instagram Marketing Approach",
    processSteps: [
      "Audit your Instagram presence and analyze competitor strategies in your niche",
      "Identify Instagram creators whose visual aesthetic and audience align with your brand",
      "Develop content strategies leveraging Reels, Stories, carousels, and collaborations",
      "Manage content creation with brand-consistent visuals and compelling captions",
      "Track performance metrics including reach, engagement, saves, shares, and conversions",
    ],
  },
  stats: [
    { value: "300+", label: "Instagram Campaigns" },
    { value: "400+", label: "Instagram Creators" },
    { value: "40M+", label: "Total Impressions" },
    { value: "5.2%", label: "Average Engagement Rate" },
  ],
  features: {
    title: "Instagram Marketing Services",
    subtitle: "Full-spectrum Instagram influencer campaigns",
    items: [
      {
        icon: HiVideoCamera,
        title: "Reels Campaigns",
        description: "Short-form video content with trending audio, creative transitions, and storytelling that drives organic reach and brand discovery on Instagram Reels.",
      },
      {
        icon: HiPhotograph,
        title: "Stories & Highlights",
        description: "Engaging Instagram Stories with interactive stickers, polls, Q&As, and swipe-up links for daily brand touchpoints and website traffic.",
      },
      {
        icon: HiHeart,
        title: "Instagram Collaborations",
        description: "Native collaboration posts that appear on both brand and creator profiles, doubling organic reach and building social proof.",
      },
      {
        icon: HiShoppingCart,
        title: "Shoppable Content",
        description: "Product-tagged posts and Reels that enable seamless shopping experiences directly from influencer content on Instagram.",
      },
      {
        icon: HiHashtag,
        title: "Hashtag Campaigns",
        description: "Branded hashtag strategies that generate user participation, create trending conversations, and build searchable brand content libraries.",
      },
      {
        icon: HiUserGroup,
        title: "Brand Ambassador Programs",
        description: "Long-term Instagram ambassador partnerships with consistent content creation, exclusive launches, and ongoing brand representation.",
      },
    ],
  },
  process: {
    title: "Our Instagram Campaign Process",
    subtitle: "Strategic approach to Instagram influencer success",
    steps: [
      {
        title: "Platform Strategy",
        description: "We analyze your brand's Instagram landscape, competitor activity, and target audience behavior to develop a content-format strategy optimized for the algorithm.",
      },
      {
        title: "Creator Matching",
        description: "We identify Instagram creators whose visual style, audience demographics, and engagement patterns perfectly align with your brand and campaign objectives.",
      },
      {
        title: "Content & Launch",
        description: "We manage the entire content lifecycle — from creative briefing and mood boards to shooting, editing, caption writing, and coordinated posting across formats.",
      },
      {
        title: "Optimize & Report",
        description: "We track performance across Reels views, Story engagement, post saves, profile visits, and conversions — optimizing in real-time and delivering comprehensive reports.",
      },
    ],
  },
  trust: {
    title: "Instagram Marketing Experts",
    subtitle: "Proven results on the UAE's favorite visual platform",
    cards: [
      { icon: HiBadgeCheck, title: "Platform Specialists", description: "Dedicated Instagram strategists who stay ahead of algorithm changes and trending formats." },
      { icon: FaInstagram, title: "400+ Creators", description: "Access to a vetted network of Instagram creators across every niche in the UAE." },
      { icon: HiGlobe, title: "UAE Market Leaders", description: "Deep understanding of UAE Instagram trends, peak engagement times, and local content preferences." },
      { icon: HiChartBar, title: "Proven Results", description: "Consistent 5%+ engagement rates and measurable business impact from our Instagram campaigns." },
    ],
    paragraph: "Instagram remains the number one platform for influencer marketing in the UAE. Our team has managed 300+ Instagram campaigns, built relationships with 400+ creators, and generated over 40M impressions for brands across fashion, beauty, F&B, hospitality, and technology.",
  },
  relatedPages: [
    { path: `${BASE}/tiktok-influencer-marketing`, title: "TikTok Marketing", description: "Viral short-form video campaigns.", icon: FaTiktok },
    { path: `${BASE}/campaign-management`, title: "Campaign Management", description: "End-to-end campaign execution.", icon: HiMegaphone },
    { path: `${BASE}/micro-influencer-marketing-uae`, title: "Micro-Influencer Marketing", description: "Authentic micro-influencer campaigns.", icon: HiUserGroup },
    { path: `${BASE}/luxury-influencer-marketing`, title: "Luxury Influencer Marketing", description: "Premium brand partnerships.", icon: HiSparkles },
    { path: `${BASE}/roi-analytics`, title: "ROI & Analytics", description: "Campaign performance tracking.", icon: HiPresentationChartBar },
    { path: `${BASE}/influencer-marketing-cost-uae`, title: "Influencer Marketing Cost", description: "Pricing and budget planning.", icon: HiCurrencyDollar },
  ],
  faq: {
    title: "Instagram Influencer Marketing FAQ",
    items: [
      { question: "Why is Instagram the best platform for influencer marketing in UAE?", answer: "Instagram has over 70% user penetration in the UAE, making it the most widely used social platform. Its visual-first format, diverse content types (Reels, Stories, Posts, Shopping), and strong engagement culture make it ideal for brand storytelling. UAE audiences actively discover and purchase products through Instagram content." },
      { question: "What types of Instagram content work best?", answer: "Instagram Reels currently drive the highest organic reach, making them ideal for brand discovery. Stories work best for daily engagement and traffic. Carousel posts excel for educational and detailed content. Collaboration posts double reach. The best campaigns combine multiple formats for a full-funnel approach." },
      { question: "How do Instagram Reels compare to TikTok for marketing?", answer: "Both platforms excel at short-form video. Instagram Reels benefit from Instagram's established user base and shopping features, making them better for conversion-focused campaigns. TikTok offers higher viral potential and younger demographics. Many successful brands use both platforms in complementary strategies." },
      { question: "Can you run Instagram Shopping campaigns with influencers?", answer: "Yes, we set up shoppable influencer content where products are tagged directly in posts and Reels. This creates seamless shopping experiences from discovery to purchase. Combined with Instagram Checkout and influencer discount codes, we create a complete conversion funnel." },
    ],
  },
  cta: {
    title: "Amplify Your Instagram Presence",
    description: "Connect with the right Instagram creators to build brand awareness, drive engagement, and grow your business in the UAE.",
    button: "Launch Your Campaign",
  },
};

const InstagramInfluencerMarketing = () => <InfluencerSubPage pageData={pageData} />;

export default InstagramInfluencerMarketing;
