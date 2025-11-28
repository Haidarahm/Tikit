import React from "react";

const TikitTitle2 = ({ title, className, mainWord }) => {
  return (
    <h1 className={`${className} capitalize tikit-title`}>
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
