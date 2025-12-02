import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import Footer from "../components/Footer";
import { useI18nLanguage } from "../store/I18nLanguageContext";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const lastUpdated = "December 2, 2025";

  const sections = [
    {
      title: "1. Introduction",
      content: `Welcome to Tikit Agency ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website tikit.ae or use our services.

By accessing our website or using our services, you agree to this Privacy Policy. If you do not agree with the terms of this policy, please do not access the site or use our services.`
    },
    {
      title: "2. Information We Collect",
      content: `We collect information that you provide directly to us, including:

• **Personal Information**: Name, email address, phone number, company name, and job title when you contact us or register as an influencer.

• **Business Information**: Company details, marketing goals, and campaign requirements when you inquire about our services.

• **Influencer Information**: Social media handles, follower counts, content categories, media kits, and pricing information when you register as an influencer.

• **Communication Data**: Records of correspondence when you contact us via email, phone, or our contact forms.

• **Technical Data**: IP address, browser type, device information, and cookies when you visit our website.`
    },
    {
      title: "3. How We Use Your Information",
      content: `We use the information we collect for the following purposes:

• To provide and maintain our influencer marketing and talent management services
• To match brands with suitable influencers for marketing campaigns
• To communicate with you about our services, updates, and promotional offers
• To process influencer registrations and manage talent relationships
• To improve our website and services based on user feedback
• To comply with legal obligations and protect our rights
• To send newsletters and marketing communications (with your consent)
• To analyze website usage and improve user experience`
    },
    {
      title: "4. Information Sharing and Disclosure",
      content: `We may share your information in the following circumstances:

• **With Brands and Clients**: If you are a registered influencer, we may share your profile information with brands seeking influencer partnerships.

• **With Service Providers**: We may share information with third-party vendors who assist us in operating our website and providing our services.

• **For Legal Purposes**: We may disclose information if required by law or to protect our rights, safety, or property.

• **Business Transfers**: In the event of a merger, acquisition, or sale of assets, your information may be transferred.

We do not sell your personal information to third parties for their marketing purposes.`
    },
    {
      title: "5. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Secure Socket Layer (SSL) encryption for data transmission
• Regular security assessments and updates
• Access controls limiting employee access to personal data
• Secure data storage practices

However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      title: "6. Your Rights",
      content: `Depending on your location, you may have the following rights regarding your personal information:

• **Access**: Request access to the personal data we hold about you
• **Correction**: Request correction of inaccurate or incomplete data
• **Deletion**: Request deletion of your personal data (subject to legal requirements)
• **Objection**: Object to processing of your personal data for marketing purposes
• **Portability**: Request transfer of your data to another service provider
• **Withdrawal**: Withdraw consent for data processing at any time

To exercise these rights, please contact us at Hello@tikit.ae.`
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: `Our website uses cookies and similar tracking technologies to:

• Remember your preferences and settings
• Analyze website traffic and usage patterns
• Improve website functionality and user experience
• Deliver targeted advertising (with your consent)

You can control cookie settings through your browser preferences. Note that disabling cookies may affect website functionality.

**Types of Cookies We Use:**
• Essential cookies (required for website operation)
• Analytics cookies (to understand user behavior)
• Marketing cookies (for personalized advertising)`
    },
    {
      title: "8. Third-Party Links",
      content: `Our website may contain links to third-party websites, including social media platforms. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`
    },
    {
      title: "9. Children's Privacy",
      content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a minor, please contact us immediately.`
    },
    {
      title: "10. International Data Transfers",
      content: `Tikit Agency operates in multiple countries including the United Arab Emirates, Saudi Arabia, Turkey, and Syria. Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.`
    },
    {
      title: "11. Data Retention",
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. For influencer profiles, we retain data for the duration of our business relationship and for a reasonable period thereafter.`
    },
    {
      title: "12. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.`
    },
    {
      title: "13. Contact Us",
      content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us:

**Tikit Agency**
Jumeirah 1, Dubai, United Arab Emirates

**Email:** Hello@tikit.ae
**Phone:** +971 56 888 1133
**Instagram:** @tikit.ae

For data protection inquiries, please email Hello@tikit.ae with "Privacy" in the subject line.`
    }
  ];

  return (
    <div 
      className="min-h-screen bg-[var(--background)]" 
      data-nav-color="black"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="Privacy Policy | Tikit Agency"
        description="Read Tikit Agency's Privacy Policy. Learn how we collect, use, and protect your personal information when using our influencer marketing services."
        keywords="Tikit Agency privacy policy, data protection, personal information, influencer agency privacy"
        canonicalUrl="/privacy-policy"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" }
        ]}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 md:px-10 bg-gradient-to-b from-[var(--secondary)]/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
            Privacy Policy
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
              to="/home" 
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

export default PrivacyPolicy;

