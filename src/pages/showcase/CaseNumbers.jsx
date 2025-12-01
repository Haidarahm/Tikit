import React, { memo } from "react";
import CountUp from "../../components/CountUp";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const CaseNumbers = memo(() => {
  // Fake showcase data (no translations / AOS)
  const { isRtl } = useI18nLanguage();
  const data = [
    {
      count: 4.2,
      suffix: "M",
      text1: "Total",
      text2: "Reach",
      plus: true,
      color: "#e84b4326",
    },
    {
      count: 3.7,
      suffix: "x",
      text1: "Engagement",
      text2: "Lift",
      plus: false,
      color: "#F3A67A26",
    },
    {
      count: 92,
      suffix: "%",
      text1: "Positive",
      text2: "Sentiment",
      plus: false,
      color: "#35D5D026",
    },
  ];

  return (
    <div className="min-h-[50vh] md:min-h-[80vh] flex items-center overflow-hidden">
      <div className="container mt-4 md:mt-0 mx-auto px-4">
        <div className="text-center flex flex-col md:gap-4 mb-10 md:mb-14">
          <h1 style={{fontFamily: isRtl ? "Cairo" : "Antonio"}} className="text-3xl md:text-5xl font-bold text-[var(--foreground)]">
            Influence Campaign Results
          </h1>
          <h3 className="mt-2 text-base md:text-lg lg:text-2xl xl:text-3xl text-[var(--foreground)]/80">
            Department of Economic Development
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
