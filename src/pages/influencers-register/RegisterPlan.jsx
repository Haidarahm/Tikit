import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Tick from "../../assets/Tick";
import ManagementIcon from "../../assets/planes/Management.svg";
import AffiliateIcon from "../../assets/planes/Affiliate.svg";
import PremiumIcon from "../../assets/planes/Premium.svg";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const RegisterPlan = ({ selectedPlan, onPlanSelect, className = "" }) => {
  const { t } = useTranslation();
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const { isRtl } = useI18nLanguage();
  const plans = useMemo(
    () => [
      {
        id: "management",
        name: t("influencerRegister.plans.management.name"),
        icon: ManagementIcon,
        description: t("influencerRegister.plans.management.description"),
        features: t("influencerRegister.plans.management.features", {
          returnObjects: true,
        }),
        color: "from-blue-500 to-cyan-500",
        borderColor: "border-blue-500/30 dark:border-blue-400/20",
        bgGlow: "bg-blue-500/5 dark:bg-blue-400/10",
      },
      {
        id: "affiliate",
        name: t("influencerRegister.plans.affiliate.name"),
        icon: AffiliateIcon,
        description: t("influencerRegister.plans.affiliate.description"),
        features: t("influencerRegister.plans.affiliate.features", {
          returnObjects: true,
        }),
        color: "from-purple-500 to-pink-500",
        borderColor: "border-purple-500/30 dark:border-purple-400/20",
        bgGlow: "bg-purple-500/5 dark:bg-purple-400/10",
        popular: true,
      },
      {
        id: "premium",
        name: t("influencerRegister.plans.premium.name"),
        icon: PremiumIcon,
        description: t("influencerRegister.plans.premium.description"),
        features: t("influencerRegister.plans.premium.features", {
          returnObjects: true,
        }),
        color: "from-amber-500 to-orange-500",
        borderColor: "border-amber-500/30 dark:border-amber-400/20",
        bgGlow: "bg-amber-500/5 dark:bg-amber-400/10",
      },
    ],
    [t]
  );

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      <label dir={isRtl ? "rtl" : "ltr"} className="text-[var(--foreground)] text-sm md:text-base font-medium">
        {t("influencerRegister.fields.selectPlan")}
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 md:items-end md:pt-8">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id;
          const isHovered = hoveredPlan === plan.id;
          const isCenter = index === 1;

          return (
            <div
              key={plan.id}
              onClick={() => onPlanSelect && onPlanSelect(plan.id)}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative flex flex-col items-center p-5 md:p-6 rounded-[20px] border-2 cursor-pointer transition-all duration-300 ease-out ${
                isSelected
                  ? `${plan.borderColor} ${plan.bgGlow} scale-[1.02] shadow-lg dark:shadow-xl`
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-lg"
              } ${isHovered && !isSelected ? "scale-[1.01]" : ""} ${
                isCenter ? "md:-mt-8" : ""
              } bg-white dark:bg-[var(--container-bg)]`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-semibold rounded-full shadow-md">
                  {t("influencerRegister.plans.affiliate.mostPopular")}
                </div>
              )}

              {/* Selection Indicator */}
              <div
                className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isSelected
                    ? "border-[var(--secondary)] bg-[var(--secondary)]"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 md:w-16 md:h-16 mb-3 p-3 rounded-xl bg-gradient-to-br ${
                  plan.color
                } flex items-center justify-center transition-transform duration-300 ${
                  isHovered || isSelected ? "scale-110" : ""
                }`}
              >
                <img
                  src={plan.icon}
                  alt={plan.name}
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>

              {/* Plan Name */}
              <h3 className="text-lg md:text-xl font-bold text-[var(--foreground)] font-antonio mb-1">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-gray-300 text-center mb-4">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-2 w-full">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs md:text-sm text-[var(--foreground)]"
                  >
                    <Tick className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                type="button"
                className={`mt-4 w-full py-2.5 px-5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-r ${plan.color} text-white shadow-md`
                    : "bg-gray-100 dark:bg-gray-800 text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {isSelected
                  ? t(`influencerRegister.plans.${plan.id}.selected`)
                  : t(`influencerRegister.plans.${plan.id}.selectPlan`)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegisterPlan;
