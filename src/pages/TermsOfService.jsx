import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import Footer from "../components/Footer";
import { useI18nLanguage } from "../store/I18nLanguageContext";

const TermsOfService = () => {
  const { isRtl } = useI18nLanguage();

  const lastUpdated = "January 5, 2026";

  const sections = [
    {
      title: "1. Agreement to Terms",
      content: `By accessing or using the Tikit Agency website (tikit.ae) and our services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our website or services.

These terms constitute a legally binding agreement between you and Tikit Agency regarding your use of our platform.`
    },
    {
      title: "2. Description of Services",
      content: `Tikit Agency provides influencer marketing, talent management, social media management, branding, and production services. We connect brands with content creators and manage marketing campaigns across various digital platforms.`
    },
    {
      title: "3. User Responsibilities",
      content: `When using our services, you agree to:
• Provide accurate and complete information during registration or inquiry
• Maintain the security of any account credentials
• Comply with all applicable laws and regulations
• Respect the intellectual property rights of others
• Not use our platform for any fraudulent or harmful activities`
    },
    {
      title: "4. Intellectual Property Rights",
      content: `All content on this website, including text, graphics, logos, images, and software, is the property of Tikit Agency or its content suppliers and is protected by international copyright and trademark laws.

You may not reproduce, distribute, modify, or create derivative works of any content from our website without our express written permission.`
    },
    {
      title: "5. Influencer and Client Relationships",
      content: `Tikit Agency acts as a facilitator between brands (Clients) and content creators (Influencers). While we strive to ensure successful collaborations, the specific terms of individual campaigns are governed by separate agreements between the involved parties and Tikit Agency.`
    },
    {
      title: "6. Limitation of Liability",
      content: `Tikit Agency shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services. We do not guarantee specific results from marketing campaigns, as performance depends on various external factors.`
    },
    {
      title: "7. Privacy",
      content: `Your use of our services is also governed by our Privacy Policy, which is incorporated into these terms by reference. Please review our Privacy Policy to understand how we collect and use your data.`
    },
    {
      title: "8. Termination",
      content: `We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, Tikit Agency, or third parties.`
    },
    {
      title: "9. Governing Law",
      content: `These Terms of Service are governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Dubai.`
    },
    {
      title: "10. Changes to Terms",
      content: `We may revise these Terms of Service from time to time. The most current version will always be posted on our website. By continuing to use our services after changes become effective, you agree to be bound by the revised terms.`
    },
    {
      title: "11. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us:

**Tikit Agency**
The Burlington Tower, Marasi Drive, Dubai – Office 309

**Email:** Holla@tikit.ae
**Phone:** +971 4 577 4042`
    }
  ];

  return (
    <div 
      className="min-h-screen " 
      data-nav-color="black"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="Terms of Service | Tikit Agency"
        description="Read Tikit Agency's Terms of Service. Understand the rules, guidelines, and legal agreement for using our influencer marketing and talent management services."
        keywords="Tikit Agency terms of service, legal terms, influencer agency agreement, marketing services terms"
        canonicalUrl="/terms-of-service"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms-of-service" }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 md:px-10 bg-gradient-to-b from-[var(--secondary)]/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-[var(--foreground)]/60">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Quick Navigation */}
          <div className="mb-12 p-6 bg-[var(--secondary)]/5 rounded-2xl">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a 
                  key={index}
                  href={`#section-${index}`}
                  className="text-[var(--secondary)] hover:underline text-sm"
                  aria-label={`Navigate to ${section.title} section`}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-10">
            {sections.map((section, index) => (
              <div 
                key={index} 
                id={`section-${index}`}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  {section.title}
                </h2>
                <div className="text-[var(--foreground)]/80 leading-relaxed whitespace-pre-line">
                  {section.content.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Back to Home */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[var(--secondary)] hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
