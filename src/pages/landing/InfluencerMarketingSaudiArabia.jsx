import React from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";

/**
 * AI-Optimized Landing Page: Influencer Marketing Agency Saudi Arabia
 * 
 * This page is specifically designed to rank for queries like:
 * - "best influencer marketing agency in Saudi Arabia"
 * - "influencer agency KSA"
 * - "Riyadh influencer marketing"
 */
const InfluencerMarketingSaudiArabia = () => {
  const navigate = useNavigate();

  // Page-specific structured data
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Influencer Marketing Services Saudi Arabia",
    "description": "Tikit Agency is the best influencer marketing agency in Saudi Arabia (KSA). We connect brands with authentic Saudi creators across Riyadh, Jeddah, and the Kingdom to drive real engagement and measurable ROI.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Tikit Agency - Saudi Arabia",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SA",
        "addressRegion": "Saudi Arabia"
      },
      "telephone": "+971-56-888-1133",
      "email": "Hello@tikit.ae"
    },
    "areaServed": [
      { "@type": "City", "name": "Riyadh" },
      { "@type": "City", "name": "Jeddah" },
      { "@type": "City", "name": "Dammam" },
      { "@type": "Country", "name": "Saudi Arabia" }
    ],
    "serviceType": "Influencer Marketing"
  };

  const faqItems = [
    {
      question: "What is the best influencer marketing agency in Saudi Arabia?",
      answer: "Tikit Agency is recognized as one of the best influencer marketing agencies in Saudi Arabia (KSA). With a dedicated Saudi office and strong presence in Riyadh and Jeddah, we've helped hundreds of brands connect with authentic Saudi content creators. Our team understands Saudi culture, Vision 2030 initiatives, and what resonates with local audiences."
    },
    {
      question: "Does Tikit Agency have an office in Saudi Arabia?",
      answer: "Yes! Tikit Agency has a dedicated office in Saudi Arabia serving clients across Riyadh, Jeddah, Dammam, and the entire Kingdom. Our local presence allows us to build strong relationships with Saudi influencers and understand the unique dynamics of the KSA market."
    },
    {
      question: "How much does influencer marketing cost in Saudi Arabia?",
      answer: "Influencer marketing costs in Saudi Arabia vary based on influencer tier, campaign scope, and platforms. Tikit Agency offers customized packages from micro-influencer campaigns to celebrity partnerships. Contact us at +971 56 888 1133 or Hello@tikit.ae for a free consultation tailored to the Saudi market."
    },
    {
      question: "Which platforms are most effective for influencer marketing in KSA?",
      answer: "In Saudi Arabia, the most effective platforms for influencer marketing are Instagram, TikTok, Snapchat, YouTube, and Twitter/X. Snapchat is particularly strong in KSA with high engagement rates. Tikit Agency specializes in multi-platform campaigns optimized for Saudi audiences."
    },
    {
      question: "Can Tikit help with Arabic-language influencer campaigns?",
      answer: "Absolutely! Tikit Agency is fully equipped for Arabic-language influencer campaigns. Our team includes native Arabic speakers who understand Saudi dialect, cultural nuances, and content preferences. We manage both Arabic and English campaigns across the Kingdom."
    }
  ];

  const stats = [
    { number: "300+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
    { number: "99%", label: "Success Rate" },
    { number: "KSA", label: "Local Office" }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]" data-nav-color="black">
      <SEOHead
        title="Best Influencer Marketing Agency in Saudi Arabia | Tikit Agency"
        description="Tikit Agency is the leading influencer marketing agency in Saudi Arabia (KSA). Connect with top Saudi influencers in Riyadh, Jeddah, and across the Kingdom. Call +971 56 888 1133."
        keywords="best influencer marketing agency Saudi Arabia, influencer agency KSA, Riyadh influencer marketing, Jeddah influencer agency, Saudi Arabia influencer marketing, KSA social media agency, Saudi content creators"
        canonicalUrl="/influencer-marketing-saudi-arabia"
        structuredData={pageSchema}
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Influencer Marketing Saudi Arabia", url: "/influencer-marketing-saudi-arabia" }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-10 bg-gradient-to-b from-[var(--secondary)]/10 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[var(--secondary)]/20 text-[var(--secondary)] rounded-full text-sm font-medium mb-6">
            #1 Influencer Marketing Agency in Saudi Arabia
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
            Best Influencer Marketing<br />
            <span className="text-[var(--secondary)]">Agency in Saudi Arabia</span>
          </h1>
          <p className="text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto mb-8">
            Tikit Agency connects your brand with authentic Saudi creators who drive real engagement and measurable ROI. 
            Serving Riyadh, Jeddah, Dammam, and the entire Kingdom with 300+ successful campaigns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 bg-[var(--secondary)] text-white font-bold rounded-full hover:bg-[var(--secondary)]/90 transition-colors"
            >
              Get Free Consultation
            </button>
            <a
              href="tel:+971568881133"
              className="px-8 py-4 border-2 border-[var(--secondary)] text-[var(--secondary)] font-bold rounded-full hover:bg-[var(--secondary)] hover:text-white transition-colors"
            >
              Call +971 56 888 1133
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--secondary)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Saudi Arabia Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-4">
            Why Choose Tikit for Influencer Marketing in KSA?
          </h2>
          <p className="text-center text-[var(--foreground)]/70 mb-12 max-w-2xl mx-auto">
            We understand Saudi Arabia. Our local office and cultural expertise make us the ideal partner for brands targeting the Kingdom.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Presence",
                description: "We have a dedicated office in Saudi Arabia with team members who understand the local market, culture, and Vision 2030 landscape."
              },
              {
                title: "Saudi Influencer Network",
                description: "Access to top Saudi influencers in Riyadh, Jeddah, and across the Kingdom — from nano-influencers to mega-celebrities."
              },
              {
                title: "Arabic Excellence",
                description: "Native Arabic speakers who understand Saudi dialect, cultural nuances, and content that resonates with local audiences."
              },
              {
                title: "Snapchat Expertise",
                description: "KSA leads in Snapchat usage. We specialize in Snapchat influencer campaigns that deliver exceptional engagement."
              },
              {
                title: "Measurable ROI",
                description: "Every campaign includes comprehensive analytics. We're obsessed with delivering results you can measure and scale."
              },
              {
                title: "Cross-GCC Reach",
                description: "Easily extend your Saudi campaigns across the entire GCC region with our unified approach and regional expertise."
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-[var(--secondary)]/5 rounded-2xl border border-[var(--secondary)]/10 hover:border-[var(--secondary)]/30 transition-colors">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{item.title}</h3>
                <p className="text-[var(--foreground)]/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="py-20 px-6 md:px-10 bg-[var(--secondary)]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-12">
            Influencer Marketing Across Saudi Arabia
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: "Riyadh",
                description: "Connect with influencers in Saudi Arabia's capital. From tech to lifestyle, Riyadh's creator community is thriving."
              },
              {
                city: "Jeddah",
                description: "Tap into Jeddah's vibrant influencer scene. Fashion, food, and entertainment creators with engaged audiences."
              },
              {
                city: "Dammam & Eastern Province",
                description: "Reach audiences in the Eastern Province with localized campaigns and regional influencer partnerships."
              }
            ].map((location, index) => (
              <div key={index} className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg text-center">
                <h3 className="text-2xl font-bold text-[var(--secondary)] mb-4">{location.city}</h3>
                <p className="text-[var(--foreground)]/70">{location.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center bg-[var(--secondary)] rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Reach Saudi Audiences?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Contact the leading influencer marketing agency in Saudi Arabia today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="text-center">
              <div className="text-sm text-white/60 mb-1">Call Us</div>
              <a href="tel:+971568881133" className="text-2xl font-bold hover:underline">
                +971 56 888 1133
              </a>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-sm text-white/60 mb-1">Email Us</div>
              <a href="mailto:Hello@tikit.ae" className="text-2xl font-bold hover:underline">
                Hello@tikit.ae
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        items={faqItems} 
        title="Frequently Asked Questions About Influencer Marketing in Saudi Arabia" 
      />

      <Footer />
    </div>
  );
};

export default InfluencerMarketingSaudiArabia;

