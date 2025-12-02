import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image1 from "../../assets/aboutus/about-1.webp";
import image2 from "../../assets/aboutus/about-2.webp";
import image3 from "../../assets/aboutus/about-3.webp";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Images = () => {
  const { isRtl } = useI18nLanguage();
  const containerRef = useRef(null);
  const visionTitleRef = useRef(null);
  const visionText1Ref = useRef(null);
  const visionText2Ref = useRef(null);
  const missionTitleRef = useRef(null);
  const missionText1Ref = useRef(null);
  const missionText2Ref = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const floatingShape1Ref = useRef(null);
  const floatingShape2Ref = useRef(null);
  const decorLineRef = useRef(null);
  const pillsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Vision Title - Fade up animation
      if (visionTitleRef.current) {
        gsap.set(visionTitleRef.current, { 
          opacity: 0, 
          y: 60,
          scale: 0.9
        });

        ScrollTrigger.create({
          trigger: visionTitleRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(visionTitleRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            });
          },
        });
      }

      // Vision text paragraphs - staggered fade up
      [visionText1Ref, visionText2Ref].forEach((ref, index) => {
        if (ref.current) {
          gsap.set(ref.current, { 
            opacity: 0, 
            y: 40,
          });

          ScrollTrigger.create({
            trigger: ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(ref.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: "power2.out",
              });
            },
          });
        }
      });

      // Decorative line animation
      if (decorLineRef.current) {
        gsap.set(decorLineRef.current, { 
          scaleX: 0,
          transformOrigin: isRtl ? "right center" : "left center"
        });

        ScrollTrigger.create({
          trigger: decorLineRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(decorLineRef.current, {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      }

      // Mission Title - Slide in animation
      if (missionTitleRef.current) {
        gsap.set(missionTitleRef.current, { 
          opacity: 0, 
          x: isRtl ? -80 : 80,
        });

        ScrollTrigger.create({
          trigger: missionTitleRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(missionTitleRef.current, {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
            });
          },
        });
      }

      // Mission text paragraphs - staggered slide in
      [missionText1Ref, missionText2Ref].forEach((ref, index) => {
        if (ref.current) {
          gsap.set(ref.current, { 
            opacity: 0, 
            x: isRtl ? -40 : 40,
          });

          ScrollTrigger.create({
            trigger: ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(ref.current, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                delay: index * 0.15,
                ease: "power2.out",
              });
            },
          });
        }
      });

      // Feature pills animation
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll(".feature-pill");
        gsap.set(pills, { 
          opacity: 0, 
          y: 20,
          scale: 0.8
        });

        ScrollTrigger.create({
          trigger: pillsRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(pills, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.7)",
            });
          },
        });
      }

      // Image 1 - Reveal with scale
      if (img1Ref.current) {
        const imgElement = img1Ref.current.querySelector("img");
        const overlay = img1Ref.current.querySelector(".img-overlay");
        const badge = img1Ref.current.querySelector(".img-badge");

        if (imgElement) {
          gsap.set(imgElement, { 
            scale: 1.2,
            opacity: 0,
          });
        }
        if (overlay) {
          gsap.set(overlay, { opacity: 0.8 });
        }
        if (badge) {
          gsap.set(badge, { opacity: 0, y: 20 });
        }

        ScrollTrigger.create({
          trigger: img1Ref.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            
            if (imgElement) {
              tl.to(imgElement, {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out",
              }, 0);
            }
            if (overlay) {
              tl.to(overlay, {
                opacity: 0,
                duration: 0.6,
                delay: 0.3,
              }, 0);
            }
            if (badge) {
              tl.to(badge, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
              }, 0.5);
            }
          },
        });

        // Subtle parallax effect
        if (imgElement) {
          gsap.to(imgElement, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: img1Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      }

      // Image 2 - Scale and fade in
      if (img2Ref.current) {
        const imgElement = img2Ref.current.querySelector("img");
        const quoteOverlay = img2Ref.current.querySelector(".quote-overlay");

        if (imgElement) {
          gsap.set(imgElement, {
            scale: 0.8,
            opacity: 0,
          });
        }
        if (quoteOverlay) {
          gsap.set(quoteOverlay, { opacity: 0, y: 30 });
        }

        ScrollTrigger.create({
          trigger: img2Ref.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            
            if (imgElement) {
              tl.to(imgElement, {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
              }, 0);
            }
            if (quoteOverlay) {
              tl.to(quoteOverlay, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
              }, 0.4);
            }
          },
        });

        // Floating effect on scroll
        gsap.to(img2Ref.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: img2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // Image 3 - Clip path reveal
      if (img3Ref.current) {
        const imgElement = img3Ref.current.querySelector("img");
        const statsBadge = img3Ref.current.querySelector(".stats-badge");

        if (imgElement) {
          gsap.set(imgElement, {
            clipPath: "inset(100% 0 0 0)",
            scale: 1.1,
          });
        }
        if (statsBadge) {
          gsap.set(statsBadge, { opacity: 0, scale: 0.8 });
        }

        ScrollTrigger.create({
          trigger: img3Ref.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            
            if (imgElement) {
              tl.to(imgElement, {
                clipPath: "inset(0% 0 0 0)",
                scale: 1,
                duration: 1,
                ease: "power3.inOut",
              }, 0);
            }
            if (statsBadge) {
              tl.to(statsBadge, {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
              }, 0.6);
            }
          },
        });
      }

      // Floating decorative shapes
      if (floatingShape1Ref.current) {
        gsap.to(floatingShape1Ref.current, {
          y: -80,
          rotation: 180,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 3,
          },
        });
      }

      if (floatingShape2Ref.current) {
        gsap.to(floatingShape2Ref.current, {
          y: 60,
          rotation: -90,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <div
      ref={containerRef}
      className={`relative text-[var(--foreground)] px-4 md:px-[60px] lg:px-[100px] py-16 md:py-24 overflow-hidden ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Decorative floating shapes */}
      <div 
        ref={floatingShape1Ref}
        className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-[#6ACBCC]/20 to-[#1C6F6C]/20 blur-2xl pointer-events-none"
      />
      <div 
        ref={floatingShape2Ref}
        className="absolute bottom-40 left-[5%] w-48 h-48 rounded-full bg-gradient-to-tr from-[#52c3c5]/15 to-[#6ACBCC]/25 blur-3xl pointer-events-none"
      />

      {/* Vision Section */}
      <section className="mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Vision Content */}
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
            <h2 
              ref={visionTitleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent"
            >
              Our Vision
            </h2>
            
            <p 
              ref={visionText1Ref}
              className="text-lg md:text-xl leading-relaxed text-[var(--foreground)]/80"
            >
              To redefine the global marketing landscape by bridging creativity, culture, and technology. We envision a future where brands don't just communicate — they connect, inspire, and shape conversations worldwide.
            </p>
            
            <p 
              ref={visionText2Ref}
              className="text-lg md:text-xl leading-relaxed text-[var(--foreground)]/80"
            >
              At Tikit, our vision is not only to deliver marketing campaigns but to build emotional resonance between brands and their audiences, helping companies grow while remaining true to their identity.
            </p>

            {/* Decorative line */}
            <div 
              ref={decorLineRef}
              className="w-24 h-1 bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] rounded-full" 
            />
          </div>

          {/* Vision Image */}
          <div 
            ref={img1Ref}
            className="order-1 lg:order-2 relative h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl"
          >
            <img
              src={image1}
              alt="Our Vision"
              className="w-full h-full object-cover will-change-transform"
            />
            <div className="img-overlay absolute inset-0 bg-gradient-to-br from-[#6ACBCC]/40 to-[#1C6F6C]/60 pointer-events-none" />
            
            {/* Floating badge */}
            <div className="img-badge absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-[var(--background)]/90 dark:bg-[var(--foreground)]/10 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full border border-[#52c3c5]/30">
              <span className="text-sm md:text-base font-medium bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
                Innovate • Connect • Inspire
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Center Image with Quote */}
      <section className="mb-20 md:mb-32 relative">
        <div 
          ref={img2Ref}
          className="relative mx-auto max-w-4xl h-[250px] md:h-[350px] overflow-hidden rounded-3xl shadow-2xl"
        >
          <img
            src={image2}
            alt="Creative Marketing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Quote overlay */}
          <div className="quote-overlay absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <blockquote className="text-white text-lg md:text-2xl font-light italic text-center">
              "Marketing is not about selling — it's about creating connections that last."
            </blockquote>
          </div>
        </div>

        {/* Side decorative elements */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-[#6ACBCC] to-[#1C6F6C] rounded-full hidden lg:block" />
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-[#1C6F6C] to-[#6ACBCC] rounded-full hidden lg:block" />
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Mission Image */}
          <div 
            ref={img3Ref}
            className="relative h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl"
          >
            <img
              src={image3}
              alt="Our Mission"
              className="w-full h-full object-cover will-change-transform"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1C6F6C]/30 to-transparent pointer-events-none" />
            
            {/* Stats badge */}
            <div className="stats-badge absolute top-6 right-6 md:top-8 md:right-8 bg-[var(--background)]/90 dark:bg-[var(--foreground)]/10 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-[#52c3c5]/30">
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent">
                  100%
                </span>
                <span className="text-xs md:text-sm text-[var(--foreground)]/70">
                  Purpose Driven
                </span>
              </div>
            </div>
          </div>

          {/* Mission Content */}
          <div className="space-y-6 md:space-y-8">
            <h2 
              ref={missionTitleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1C6F6C] to-[#6ACBCC] bg-clip-text text-transparent"
            >
              Our Mission
            </h2>
            
            <p 
              ref={missionText1Ref}
              className="text-lg md:text-xl leading-relaxed text-[var(--foreground)]/80"
            >
              Our mission is to empower brands with strategies that are not only effective but culturally relevant. We believe marketing is an ever-evolving ecosystem, and success lies in adaptability, authenticity, and innovation.
            </p>
            
            <p 
              ref={missionText2Ref}
              className="text-lg md:text-xl leading-relaxed text-[var(--foreground)]/80"
            >
              Through data-driven insights, creative craftsmanship, and a people-first mindset, Tikit delivers meaningful engagement that drives measurable business growth. Every campaign is designed with purpose — to influence behavior, ignite conversation, and create enduring brand value.
            </p>

            {/* Feature pills */}
            <div ref={pillsRef} className="flex flex-wrap gap-3 pt-4">
              {["Data-Driven", "Creative", "Authentic", "Innovative"].map((item, index) => (
                <span 
                  key={index}
                  className="feature-pill px-4 py-2 rounded-full text-sm font-medium border border-[#52c3c5]/40 bg-[#52c3c5]/10 dark:bg-[#52c3c5]/5 text-[var(--foreground)]
                    hover:bg-[#52c3c5]/20 hover:border-[#52c3c5]/60 transition-all duration-300 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom decorative gradient line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#52c3c5]/50 to-transparent" />
    </div>
  );
};

export default Images;
