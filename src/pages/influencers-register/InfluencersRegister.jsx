import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import NationalityInput from "./NationalityInput";
import ResidenceInput from "./ResidenceInput";
import AdditionalInfoInput from "./AdditionalInfoInput";
import ContentFieldInput from "./ContentFieldInput";
import RegisterPlan from "./RegisterPlan";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

const InfluencersRegister = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [residenceCountry, setResidenceCountry] = useState(null);
  const [residenceCity, setResidenceCity] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [message, setMessage] = useState("");
  const [contentFields, setContentFields] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section
      data-nav-color="black"
      className="w-full min-h-screen flex flex-col items-center mt-[104px]"
    >
      <div className="title py-[40px] md:py-[100px]">
        <h1
          style={{
            fontFamily: isRtl ? "var(--font-cairo)" : "var(--font-cairo)",
          }}
          className="text-[30px] md:text-[40px] lg:text-[65px] 2xl:text-[75px]  font-[700] text-center text-[var(--foreground)] leading-tight capitalize will-change-transform"
        >
          {t("influencerRegister.title")}
        </h1>
      </div>
      <div className="main-content px-[12px] md:px-[75px] w-full">
        <div className="container py-[15px] md:py-[45px] flex flex-col items-center w-full rounded-[25px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-[var(--container-bg)] shadow-sm dark:shadow-none">
          <div
            style={{
              fontFamily: isRtl ? "var(--font-cairo)" : "var(--font-antonio)",
            }}
            className="title text-center text-[var(--foreground)] text-[20px] m:text-[24px] lg:text-[34px] xl:text-[42px] font-medium  leading-tight capitalize will-change-transform"
          >
            <h2>{t("influencerRegister.formTitle")}</h2>
          </div>
          <div className="main-content mt-[10px] md:mt-[30px] w-full px-[20px] md:px-[80px] flex flex-col gap-4">
            <TextInput
              name="fullName"
              placeholder={t("influencerRegister.fields.fullName")}
              label={t("influencerRegister.fields.fullName")}
            />
            <TextInput
              name="email"
              placeholder="example@gmail.com"
              label={t("influencerRegister.fields.email")}
            />
            <NumberInput
              name="phoneNumber"
              label={t("influencerRegister.fields.phoneNumber")}
              placeholder={t("influencerRegister.fields.phonePlaceholder")}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
            <NationalityInput
              name="nationality"
              label={t("influencerRegister.fields.nationality")}
              placeholder={t(
                "influencerRegister.fields.nationalityPlaceholder"
              )}
              value={nationality}
              onChange={setNationality}
            />
            <ResidenceInput
              name="residence"
              label={t("influencerRegister.fields.residence")}
              countryPlaceholder={t("influencerRegister.fields.country")}
              cityPlaceholder={t("influencerRegister.fields.city")}
              country={residenceCountry}
              city={residenceCity}
              onCountryChange={setResidenceCountry}
              onCityChange={setResidenceCity}
            />
            <ContentFieldInput
              name="contentFields"
              label={t("influencerRegister.fields.contentFields")}
              placeholder={t(
                "influencerRegister.fields.contentFieldsPlaceholder"
              )}
              selectedFields={contentFields}
              onChange={setContentFields}
              maxSelections={5}
            />
            <AdditionalInfoInput
              name="additionalInfo"
              followerCount={followerCount}
              onFollowerCountChange={setFollowerCount}
              message={message}
              onMessageChange={setMessage}
              followerLabel={t("influencerRegister.fields.followerCount")}
              followerPlaceholder={t(
                "influencerRegister.fields.followerPlaceholder"
              )}
              messageLabel={t("influencerRegister.fields.message")}
              messagePlaceholder={t(
                "influencerRegister.fields.messagePlaceholder"
              )}
            />
            <RegisterPlan
              selectedPlan={selectedPlan}
              onPlanSelect={setSelectedPlan}
            />
          </div>
          {/* Proceed Button */}
          <div className="w-full flex justify-center px-[20px] md:px-[80px] mt-6 md:mt-8">
            <button
              type="button"
              dir={isRtl ? "rtl" : "ltr"}
              className={` py-4 rounded-full w-1/3 md:py-5 px-8  font-semibold text-base md:text-lg transition-all duration-300 ease-in-out relative overflow-hidden ${
                isRtl ? "font-cairo" : "font-antonio"
              } bg-[var(--secondary)] text-white hover:bg-white dark:hover:bg-[var(--container-bg)] hover:text-[var(--secondary)] border-2 border-[var(--secondary)] hover:border-[var(--secondary)] shadow-md hover:shadow-lg active:scale-[0.98]`}
            >
              <span className="relative z-10 block">
                {t("influencerRegister.proceedButton")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfluencersRegister;
