import React, { memo } from "react";
import CountUp from "../../components/CountUp";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useTranslation } from "react-i18next";

const CaseNumbers = memo(({ caseData }) => {
  const { isRtl } = useI18nLanguage();
  const { t } = useTranslation();

  // Extract numbers from caseData
  const reach = caseData?.reach ? parseFloat(caseData.reach) : 0;
  const views = caseData?.views ? parseFloat(caseData.views) : 0;
  const engagementRate = caseData?.engagement_rate ? parseFloat(caseData.engagement_rate) : 0;

  const formatMetric = (value, isPercentage = false) => {
    if (isPercentage) return { value, suffix: "%" };
    const abs = Math.abs(value);
    if (abs >= 1_000_000) return { value: Number((value / 1_000_000).toFixed(1)), suffix: "M" };
    if (abs >= 1_000) return { value: Number((value / 1_000).toFixed(1)), suffix: "K" };
    return { value, suffix: "" };
  };

  const fmtReach = formatMetric(reach);
  const fmtViews = formatMetric(views);
  const fmtEngagement = formatMetric(engagementRate, true);

  const data = [
    {
      count: fmtReach.value,
      suffix: fmtReach.suffix,
      text1: t("caseNumbers.metrics.reach.line1"),
      text2: t("caseNumbers.metrics.reach.line2"),
      plus: true,
      color: "#e84b4326",
    },
    {
      count: fmtViews.value,
      suffix: fmtViews.suffix,
      text1: t("caseNumbers.metrics.views.line1"),
      text2: t("caseNumbers.metrics.views.line2"),
      plus: false,
      color: "#F3A67A26",
    },
    {
      count: fmtEngagement.value,
      suffix: fmtEngagement.suffix,
      text1: t("caseNumbers.metrics.engagement.line1"),
      text2: t("caseNumbers.metrics.engagement.line2"),
      plus: false,
      color: "#35D5D026",
    },
  ];

  return (
    <div className="min-h-[50vh] md:min-h-[80vh] flex items-center overflow-hidden">
      <div className="container mt-4 md:mt-0 mx-auto px-4">
        <div className="text-center flex flex-col md:gap-4 mb-10 md:mb-14">
          <h1 style={{fontFamily: isRtl ? "Cairo" : "Antonio"}} className="text-3xl md:text-5xl font-bold text-[var(--foreground)]">
            {t("caseNumbers.title")}
          </h1>
          <h3 className="mt-2 text-base md:text-lg lg:text-2xl xl:text-3xl text-[var(--foreground)]/80">
            {t("caseNumbers.subtitle")}
          </h3>
        </div>

        <div className="numbers relative flex flex-wrap justify-around">
          {data.map(({ count, suffix, text1, text2, plus, color }, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: color }}
              className="circle shadow-2xl w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] rounded-full text-center flex flex-col items-center justify-center backdrop-blur-lg"
            >
              <span className="font-[700] font-antonio text-center flex items-center justify-center text-3xl sm:text-4xl md:text-6xl text-[var(--foreground)]">
                <CountUp
                  from={0}
                  to={count}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text "
                />
                {suffix}
                {plus ? "+" : ""}
              </span>
              <h2 className="mt-2 text-sm sm:text-base md:text-lg leading-tight text-[var(--foreground)]">
                {text1} <br /> {text2}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

CaseNumbers.displayName = "CaseNumbers";

export default CaseNumbers;
