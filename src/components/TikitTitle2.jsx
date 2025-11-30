import React from "react";
import { useI18nLanguage } from "../store/I18nLanguageContext";

const TikitTitle2 = ({ title, className, mainWord }) => {
  const { isRtl } = useI18nLanguage();
  return (
    <h1 style={{fontFamily: isRtl ? "Cairo" : "Antonio"}} className={`${className} capitalize tikit-title`}>
      {title}
      {mainWord ? (
        <>
          {" "}
          <span
            className={` inline-block  bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] bg-clip-text text-transparent`}
          >
            {mainWord}
          </span>
        </>
      ) : null}
    </h1>
  );
};

export default TikitTitle2;
