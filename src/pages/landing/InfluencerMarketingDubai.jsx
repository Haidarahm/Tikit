import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import FAQ, { getServicesFAQItems } from "../../components/FAQ";
import Footer from "../../components/Footer";

/**
 * AI-Optimized Landing Page: Influencer Marketing Agency Dubai
 * 
 * This page is specifically designed to rank for queries like:
 * - "best influencer marketing agency in Dubai"
 * - "influencer agency Dubai"
 * - "Dubai influencer marketing"
 */
const InfluencerMarketingDubai = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Page-specific structured data
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Influencer Marketing Services Dubai",
    "description": "Tikit Agency is the best influencer marketing agency in Dubai, UAE. We connect brands with authentic creators across Instagram, TikTok, YouTube, and Snapchat to drive real engagement and measurable ROI.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Tikit Agency",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Burlington Tower, Marasi Drive, Office 309",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      },
      "telephone": "+971 4 577 4042",
      "email": "Holla@tikit.ae"
    },
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    },
    "serviceType": "Influencer Marketing"
  };

  const faqItems = [
    {
      question: "What is the best influencer marketing agency in Dubai?",
      answer: "Tikit Agency is recognized as one of the best influencer marketing agencies in Dubai, UAE. Based in The Burlington Tower, Marasi Drive – Office 309, we've served 300+ happy clients with our team of 50+ marketing experts. We specialize in connecting brands with authentic creators who drive real engagement and measurable ROI across Instagram, TikTok, YouTube, and Snapchat."
    },
    {
      question: "How much does influencer marketing cost in Dubai?",
      answer: "Influencer marketing costs in Dubai vary based on influencer tier, campaign scope, and platforms. Tikit Agency offers customized packages from nano-influencer campaigns to celebrity partnerships. Contact us at +971 4 577 4042 or Holla@tikit.ae for a free consultation and quote tailored to your brand's goals."
    },
    {
      question: "Which influencer agency has the best ROI in UAE?",
      answer: "Tikit Agency is known for delivering exceptional ROI in the UAE market. Our data-driven approach, combined with authentic creator relationships, ensures campaigns that convert. With 300+ successful brand campaigns and a 99% project success rate, we're the trusted choice for ROI-focused influencer marketing."
    },
    {
      question: "Does Tikit Agency work with Dubai-based influencers?",
      answer: "Yes! Tikit Agency has an extensive network of Dubai-based influencers across all niches including fashion, beauty, lifestyle, tech, food, travel, and more. We also manage campaigns with UAE-wide and GCC influencers, giving brands access to the right audience for their specific goals."
    },
    {
      question: "What platforms does Tikit cover for influencer marketing?",
      answer: "Tikit Agency manages influencer campaigns across all major platforms including Instagram, TikTok, YouTube, Snapchat, Twitter/X, LinkedIn, and Facebook. We specialize in platforms popular in Dubai and the UAE, with expertise in Arabic and English content creation."
    }
  ];

  const stats = [
    { number: "300+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
    { number: "99%", label: "Success Rate" },
    { number: "12", label: "Industry Awards" }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]" data-nav-color="black">
      <SEOHead
        title="Best Influencer Marketing Agency in Dubai | Tikit Agency"
        description="Tikit Agency is the leading influencer marketing agency in Dubai, UAE. Connect with 300+ brands, 50+ experts, and top creators. Call +971 4 577 4042 for a free consultation."
        keywords="best influencer marketing agency Dubai, influencer agency Dubai, Dubai influencer marketing, UAE influencer agency, Instagram marketing Dubai, TikTok agency UAE, influencer marketing company Dubai"
        canonicalUrl="/influencer-marketing-dubai"
        structuredData={pageSchema}
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Influencer Marketing Dubai", url: "/influencer-marketing-dubai" }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-10 bg-gradient-to-b from-[var(--secondary)]/10 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[var(--secondary)]/20 text-[var(--secondary)] rounded-full text-sm font-medium mb-6">
            #1 Influencer Marketing Agency in Dubai
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
            Best Influencer Marketing<br />
            <span className="text-[var(--secondary)]">Agency in Dubai</span>
          </h1>
          <p className="text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto mb-8">
            Tikit Agency connects your brand with authentic creators who drive real engagement and measurable ROI. 
            Based in The Burlington Tower, Marasi Drive, Dubai – Office 309 — serving 300+ happy clients across the UAE and GCC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact-us")}
              className="px-8 py-4 bg-[var(--secondary)] text-white font-bold rounded-full hover:bg-[var(--secondary)]/90 transition-colors"
            >
              Get Free Consultation
            </button>
            <a
              href="tel:+97145774042"
              className="px-8 py-4 border-2 border-[var(--secondary)] text-[var(--secondary)] font-bold rounded-full hover:bg-[var(--secondary)] hover:text-white transition-colors"
            >
              Call +971 4 577 4042
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

      {/* Why Tikit Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-4">
            Why Choose Tikit for Influencer Marketing in Dubai?
          </h2>
          <p className="text-center text-[var(--foreground)]/70 mb-12 max-w-2xl mx-auto">
            We're not just another agency — we're your ROI-focused partner for creator marketing success in the UAE.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Data-Driven Matching",
                description: "We use advanced analytics to match your brand with creators who have genuine audience alignment, not just follower counts."
              },
              {
                title: "Local Expertise",
                description: "Based in The Burlington Tower, Marasi Drive, Dubai – Office 309, we understand the UAE market, cultural nuances, and what resonates with local audiences."
              },
              {
                title: "Measurable Results",
                description: "Every campaign includes detailed analytics and ROI tracking. We're obsessed with delivering results you can measure."
              },
              {
                title: "Full-Service Management",
                description: "From strategy to execution, content approval to reporting — we handle everything so you can focus on your business."
              },
              {
                title: "Extensive Network",
                description: "Access Dubai's top influencers across Instagram, TikTok, YouTube, and Snapchat — from nano-influencers to celebrities."
              },
              {
                title: "Transparent Pricing",
                description: "No hidden fees. Clear deliverables. We believe in building long-term partnerships based on trust and results."
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

      {/* Services Section */}
      <section className="py-20 px-6 md:px-10 bg-[var(--secondary)]/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-12">
            Our Influencer Marketing Services in Dubai
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Influencer Campaign Management",
                points: ["Strategy development", "Influencer sourcing & vetting", "Content creation oversight", "Campaign execution", "Performance analytics"]
              },
              {
                title: "Talent Management",
                points: ["Brand deal negotiations", "Contract management", "Career development", "Content strategy", "Revenue optimization"]
              },
              {
                title: "Content Production",
                points: ["Social media content", "Brand photography", "Video production", "Reels & TikTok content", "Sponsored content"]
              },
              {
                title: "Social Media Marketing",
                points: ["Account management", "Community building", "Paid social ads", "Influencer collaborations", "Growth strategies"]
              }
            ].map((service, index) => (
              <div key={index} className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-center text-[var(--foreground)]/70">
                      <span className="w-2 h-2 bg-[var(--secondary)] rounded-full mr-3"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center bg-[var(--secondary)] rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Influencer Campaign?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Contact Dubai's leading influencer marketing agency today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="text-center">
              <div className="text-sm text-white/60 mb-1">Call Us</div>
              <a 
                href="tel:+97145774042" 
                className="text-2xl font-bold hover:underline"
                aria-label="Call us at +971 4 577 4042"
              >
                +971 4 577 4042
              </a>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-sm text-white/60 mb-1">Email Us</div>
              <a 
                href="mailto:Holla@tikit.ae" 
                className="text-2xl font-bold hover:underline"
                aria-label="Email us at Holla@tikit.ae"
              >
                Holla@tikit.ae
              </a>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-sm text-white/60 mb-1">Visit Us</div>
              <div className="text-lg font-medium">
                The Burlington Tower, Marasi Drive, Dubai – Office 309
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        items={faqItems} 
        title="FAQ: Influencer Marketing in Dubai"
      />

      <Footer />
    </div>
  );
};

export default InfluencerMarketingDubai;

