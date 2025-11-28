import React from "react";
import { useI18nLanguage } from "../store/I18nLanguageContext";

const TikitTitle = ({ title, className, mainWord }) => {
  const { isRtl } = useI18nLanguage();
  return (
    <h1 className={`${className}  tikit-title`}>
      {title}
      {mainWord ? (
        <>
          {" "}
          <span
            className={`${
              isRtl ? "font-cairo" : "font-caveat pr-6"
            } inline-block  text-3xl sm:text-4xl md:text-5xl lg:text-[80px] py-4 w-fit bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent`}
          >
            {mainWord}
          </span>
        </>
      ) : null}
    </h1>
  );
};

export default TikitTitle;
