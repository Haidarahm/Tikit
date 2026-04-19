import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useI18nLanguage } from "../store/I18nLanguageContext";
import { useTheme } from "../store/ThemeContext";
import { useSubscriptionStore } from "../store/subscriptionStore";
import { gsap } from "gsap";
import FloatingInput from "./ui/FloatingInput";
import { X } from "lucide-react";

const HOME_POPUP_STORAGE_KEY = "tikit_newsletter_home_popup_shown";
/** Delay before showing on home only (ms) */
const HOME_POPUP_DELAY_MS = 8000;

const NewsletterPopup = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  useTheme();
  const { subscribe } = useSubscriptionStore();
  const location = useLocation();
  const popupRef = useRef(null);
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const tlRef = useRef(null);

  useEffect(() => {
    // Only ever schedule on the main (home) page
    if (location.pathname !== "/") {
      setIsVisible(false);
      return;
    }

    try {
      const userSigned = localStorage.getItem("userSigned");
      if (userSigned === "true") {
        return;
      }
    } catch (error) {
      console.warn("Failed to read userSigned from localStorage:", error);
    }

    try {
      if (localStorage.getItem(HOME_POPUP_STORAGE_KEY) === "true") {
        return;
      }
    } catch (error) {
      console.warn("Failed to read newsletter home flag from localStorage:", error);
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      try {
        localStorage.setItem(HOME_POPUP_STORAGE_KEY, "true");
      } catch (error) {
        console.warn("Failed to write newsletter home flag to localStorage:", error);
      }
    }, HOME_POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (!isVisible || !popupRef.current || !overlayRef.current) return;

    const popup = popupRef.current;
    const overlay = overlayRef.current;

    // Check if mobile or desktop
    const isMobile = window.innerWidth < 768;

    // Set initial state
    if (isMobile) {
      gsap.set(popup, {
        y: "100%",
        opacity: 0,
      });
    } else {
      gsap.set(popup, {
        y: 50,
        opacity: 0,
        scale: 0.9,
      });
    }
    gsap.set(overlay, {
      opacity: 0,
    });

    // Create animation timeline
    tlRef.current = gsap.timeline();

    tlRef.current
      .to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        popup,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: isMobile ? "back.out(1.2)" : "power3.out",
        },
        "-=0.2"
      );

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [isVisible]);

  const handleClose = () => {
    if (!popupRef.current || !overlayRef.current) return;

    const popup = popupRef.current;
    const overlay = overlayRef.current;
    const isMobile = window.innerWidth < 768;

    const closeTl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        try {
          localStorage.setItem(HOME_POPUP_STORAGE_KEY, "true");
        } catch {
          // ignore
        }
      },
    });

    closeTl
      .to(popup, {
        y: isMobile ? "100%" : 50,
        opacity: 0,
        scale: isMobile ? 1 : 0.9,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call (replace with your actual API endpoint)
    try {
      const success = await subscribe({ name, email }, true);

if (success) {
        // Store in localStorage
        try {
          localStorage.setItem("userSigned", "true");
        } catch (error) {
          console.warn("Failed to write userSigned to localStorage:", error);
        }

        setIsSubmitted(true);

        // Animate success message
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        onClick={handleClose}
      />

      {/* Popup */}
      <div
        ref={popupRef}
        className="fixed left-1/2 bottom-0 z-[9999] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-t-3xl border border-[var(--foreground)]/15 border-b-0 bg-[var(--background)] p-6 shadow-2xl md:bottom-6 md:rounded-3xl md:border-b md:p-8"
        style={{
          boxShadow:
            "0 -12px 48px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 ${
            isRtl ? "left-4" : "right-4"
          } w-8 h-8 flex items-center justify-center rounded-full bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/20 transition-colors duration-200 text-[var(--foreground)]`}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <>
            {/* Title */}
            <h2
              className={`text-2xl md:text-3xl font-bold mb-3 text-[var(--foreground)] ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {t("newsletter.title")}
            </h2>

            {/* Description */}
            <p
              className={`text-sm md:text-base text-[var(--foreground)]/70 mb-6 ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {t("newsletter.description")}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <FloatingInput
                id="newsletter-name"
                label={t("newsletter.name")}
                type="text"
                containerClassName="w-full"
                inputProps={{
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  required: true,
                }}
              />

              <FloatingInput
                id="newsletter-email"
                label={t("newsletter.email")}
                type="email"
                containerClassName="w-full"
                inputProps={{
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true,
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !email.trim()}
                className="w-full px-6 py-3 
                 rounded-full font-semibold
                  bg-[var(--secondary)] 
                  text-[var(--background)]
                  hover:bg-[var(--secondary)]/90 
                  disabled:opacity-50
                   disabled:cursor-not-allowed 
                   transition-all duration-200 transform 
                   hover:scale-[1.02] 
                active:scale-[0.98]"
              >
                {isSubmitting
                  ? t("newsletter.subscribing")
                  : t("newsletter.subscribe")}
              </button>
            </form>
          </>
        ) : (
          <div
            className={`text-center py-4 ${isRtl ? "text-right" : "text-left"}`}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">
              {t("newsletter.successTitle")}
            </h3>
            <p className="text-sm text-[var(--foreground)]/70">
              {t("newsletter.successMessage")}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsletterPopup;
