/**
 * FAQ utility functions
 * Separated from FAQ component to avoid react-refresh warnings
 */

export const getHomeFAQItems = (t) => [
  {
    question: t("faq.home.q1", "What is Tikit Agency?"),
    answer: t("faq.home.a1", "Tikit Agency is a leading influencer marketing and talent management agency based in Dubai, UAE, with offices in Saudi Arabia, Istanbul (Turkey), and Syria. We connect brands with authentic creators to drive real engagement and measurable ROI across the GCC and MENA region. With 300+ happy clients and 50+ team members, we're one of the top influencer marketing agencies in the Middle East.")
  },
  {
    question: t("faq.home.q2", "What services does Tikit Agency offer?"),
    answer: t("faq.home.a2", "Tikit Agency offers comprehensive marketing services including: Influencer Marketing, Talent Management, Social Media Marketing, Branding & Identity Design, Content Production, Web Development, and Digital Marketing. We serve clients across Dubai, Abu Dhabi, Saudi Arabia (Riyadh, Jeddah), Istanbul (Turkey), and the broader MENA region.")
  },
  {
    question: t("faq.home.q3", "How can I contact Tikit Agency?"),
    answer: t(
      "faq.home.a3",
      "You can contact Tikit Agency at +971 4 577 4042 or email Holla@tikit.ae. Our main office is located in The Burlington Tower, Marasi Drive, Dubai – Office 309. We also have offices in Saudi Arabia, Istanbul (Turkey), and Syria. Follow us on Instagram @tikit.ae for updates."
    )
  },
  {
    question: t("faq.home.q4", "Does Tikit work with influencers in Saudi Arabia?"),
    answer: t("faq.home.a4", "Yes! Tikit Agency has a dedicated office in Saudi Arabia and works with top influencers across Riyadh, Jeddah, and the entire Kingdom. We're recognized as one of the best influencer marketing agencies in KSA, helping brands connect with authentic Saudi content creators.")
  },
  {
    question: t("faq.home.q5", "How do I become an influencer with Tikit?"),
    answer: t("faq.home.a5", "Content creators can register with Tikit Agency through our Influencer Registration page. We offer three plans: Management, Affiliate, and Premium, each providing different levels of support including brand deal negotiations, contract review, dedicated account management, and international opportunities.")
  }
];

export const getServicesFAQItems = (t) => [
  {
    question: t("faq.services.q1", "What makes Tikit different from other influencer agencies?"),
    answer: t("faq.services.a1", "Tikit Agency combines data-driven matchmaking with authentic creator relationships. Unlike traditional agencies, we focus on ROI and measurable results. Our team of 50+ experts, presence in Dubai and Saudi Arabia, and track record of 300+ happy clients make us a trusted partner for brands seeking real impact in the GCC market.")
  },
  {
    question: t("faq.services.q2", "How does influencer marketing work with Tikit?"),
    answer: t("faq.services.a2", "Our influencer marketing process includes: 1) Understanding your brand goals, 2) Data-backed influencer matching, 3) Campaign strategy development, 4) Content creation and approval, 5) Campaign execution across platforms, 6) Real-time analytics and reporting. We handle everything from nano-influencers to celebrity partnerships.")
  },
  {
    question: t("faq.services.q3", "What platforms does Tikit cover?"),
    answer: t("faq.services.a3", "Tikit Agency manages influencer campaigns across all major platforms including Instagram, TikTok, YouTube, Snapchat, Twitter/X, LinkedIn, and Facebook. We specialize in platforms popular in the MENA region and can customize campaigns for specific audience segments.")
  }
];