import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import SEOHead from "../../components/SEOHead";
import influencerMarketing from "../../assets/services/Influencer-Marketing.webp"
import SocialMedia from "../../assets/services/Social-Media.webp"
import Branding from "../../assets/services/Branding.webp"
gsap.registerPlugin(Observer, SplitText);

const Services = () => {
  const { t } = useTranslation();
  const { language, isRtl } = useI18nLanguage();
  const isArabic = language === "ar";
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const headingsRef = useRef([]);
  const descriptionsRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const splitHeadingsRef = useRef([]);
  const splitDescriptionsRef = useRef([]);

  const serviceImages = [
    {
      // Influencer Marketing - Content creator with ring light
      image:
      influencerMarketing,
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      // Social Media Marketing
      image:
       SocialMedia,
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      // Branding - Creative brand identity design
      image:
      Branding,
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      // Production - Video production setup
      image:
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&h=1080&fit=crop",
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      // Web Development
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      // Digital Marketing
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
  ];

  const translatedItems = t("services.page.items", { returnObjects: true });
  const services = translatedItems.map((item, index) => ({
    title: item.title,
    description: item.description,
    ...serviceImages[index],
  }));

  useEffect(() => {
    // Set first section visible immediately
    gsap.set(sectionsRef.current[0], { autoAlpha: 1, zIndex: 1 });

    // For Arabic: use words, for other languages: use chars
    const splitType = isArabic ? "words,lines" : "chars,words,lines";

    // Initialize SplitText for all headings and descriptions
    splitHeadingsRef.current = headingsRef.current.map(
      (heading) =>
        new SplitText(heading, {
          type: splitType,
          linesClass: "clip-text",
        })
    );

    splitDescriptionsRef.current = descriptionsRef.current.map(
      (desc) =>
        new SplitText(desc, {
          type: splitType,
          linesClass: "clip-text",
        })
    );

    // Set initial positions for all sections except first
    gsap.set(outerWrappersRef.current, { yPercent: 100 });
    gsap.set(innerWrappersRef.current, { yPercent: -100 });

    // Set first section wrappers to 0
    gsap.set([outerWrappersRef.current[0], innerWrappersRef.current[0]], {
      yPercent: 0,
    });

    const wrap = gsap.utils.wrap(0, services.length);

    // Get animation targets based on language
    const getHeadingTargets = (index) =>
      isArabic
        ? splitHeadingsRef.current[index].words
        : splitHeadingsRef.current[index].chars;
    const getDescriptionTargets = (index) =>
      isArabic
        ? splitDescriptionsRef.current[index].words
        : splitDescriptionsRef.current[index].chars;

    // Stagger settings based on language
    const headingStagger = isArabic ? 0.08 : 0.02;
    const descriptionStagger = isArabic ? 0.05 : 0.01;

    const gotoSection = (index, direction) => {
      index = wrap(index);
      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(sectionsRef.current[currentIndexRef.current], { zIndex: 0 });
        tl.to(imagesRef.current[currentIndexRef.current], {
          yPercent: -15 * dFactor,
        }).set(sectionsRef.current[currentIndexRef.current], { autoAlpha: 0 });
      }

      gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappersRef.current[index], innerWrappersRef.current[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(
          imagesRef.current[index],
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0
        )
        .fromTo(
          getHeadingTargets(index),
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: { each: headingStagger, from: "random" },
          },
          0.2
        )
        .fromTo(
          getDescriptionTargets(index),
          { autoAlpha: 0, yPercent: 100 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power2",
            stagger: { each: descriptionStagger, from: "random" },
          },
          0.4
        );

      currentIndexRef.current = index;
    };

    // Create Observer
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    // Animate in the first section's text
    gsap.fromTo(
      getHeadingTargets(0),
      { autoAlpha: 0, yPercent: 150 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
        stagger: { each: headingStagger, from: "random" },
        delay: 0.3,
      }
    );

    gsap.fromTo(
      getDescriptionTargets(0),
      { autoAlpha: 0, yPercent: 100 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power2",
        stagger: { each: descriptionStagger, from: "random" },
        delay: 0.5,
      }
    );

    currentIndexRef.current = 0;

    // Cleanup
    return () => {
      observer.kill();
      splitHeadingsRef.current.forEach((split) => split.revert());
      splitDescriptionsRef.current.forEach((split) => split.revert());
    };
  }, [isArabic, services.length]);

  return (
    <>
      <SEOHead
        title="Marketing Services Dubai | Influencer, Social Media & Branding"
        description="Tikit Agency services: influencer marketing, social media management, branding & production in Dubai & UAE. Full-service marketing solutions."
        keywords="marketing services Dubai, influencer marketing UAE, social media management Dubai, branding services UAE, video production Dubai, digital marketing agency"
        canonicalUrl="/services"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" }
        ]}
      />
      
      <div
        style={styles.container}
        data-services2-page
        data-nav-color="white"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* SEO H1 - Hidden but readable by search engines */}
        <h1 style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
          Social Media Management, Influencer Marketing, Branding & Production Services - Tikit Agency Dubai & Saudi Arabia
        </h1>
        
        <header style={styles.header}>
          <div>{t("services.page.header")}</div>
          <div style={styles.subtext}>{t("services.page.scrollHint")}</div>
        </header>

      {services.map((service, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          style={styles.section}
        >
          <div
            ref={(el) => (outerWrappersRef.current[index] = el)}
            style={styles.outer}
          >
            <div
              ref={(el) => (innerWrappersRef.current[index] = el)}
              style={styles.inner}
            >
              <div
                ref={(el) => (imagesRef.current[index] = el)}
                style={{
                  ...styles.bg,
                  backgroundImage: `${service.gradient}, url(${service.image})`,
                }}
              >
                <h2
                  ref={(el) => (headingsRef.current[index] = el)}
                  style={styles.heading}
                >
                  {service.title}
                </h2>
                <p
                  ref={(el) => (descriptionsRef.current[index] = el)}
                  style={styles.description}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
      </div>
    </>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#fff",
    userSelect: "none",
  },
  header: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    width: "100%",
    zIndex: 3,
    height: "7em",
    top: "80px",
    fontSize: "clamp(0.66rem, 2vw, 1rem)",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
  },
  subtext: {
    fontSize: "0.8em",
    opacity: 0.7,
  },
  section: {
    height: "100%",
    width: "100%",
    top: 0,
    position: "fixed",
    visibility: "hidden",
  },
  outer: {
    width: "100%",
    height: "100%",
    overflowY: "hidden",
  },
  inner: {
    width: "100%",
    height: "100%",
    overflowY: "hidden",
  },
  bg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    gap: "0.5rem",
  },
  heading: {
    fontSize: "clamp(2rem, 8vw, 10rem)",
    fontWeight: 600,
    lineHeight: 1.2,
    textAlign: "center",
    margin: 0,
    marginBottom: "1rem",
    width: "90vw",
    maxWidth: "1200px",
    zIndex: 999,
    textShadow: "2px 2px 20px rgba(0,0,0,0.8)",
  },
  description: {
    fontSize: "clamp(1rem, 2vw, 1.5rem)",
    fontWeight: 300,
    lineHeight: 1.6,
    textAlign: "center",
    margin: 0,
    width: "90vw",
    maxWidth: "800px",
    zIndex: 999,
    textShadow: "1px 1px 10px rgba(0,0,0,0.8)",
    opacity: 0.9,
  },
};

export default Services;
