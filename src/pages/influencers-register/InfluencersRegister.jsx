import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import NationalityInput from "./NationalityInput";
import ResidenceInput from "./ResidenceInput";
import AdditionalInfoInput from "./AdditionalInfoInput";
import ContentFieldInput from "./ContentFieldInput";
import RegisterPlan from "./RegisterPlan";
import MediaKitUpload from "./MediaKitUpload";
import SocialLinksInput from "./SocialLinksInput";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import { useInfluencerRegistrationStore } from "../../store/influencerRegistrationStore";
import TikitTitle from "../../components/TikitTitle";

const InfluencersRegister = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const { register, loading, error, success } =
    useInfluencerRegistrationStore();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [residenceCountry, setResidenceCountry] = useState(null);
  const [residenceCity, setResidenceCity] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [message, setMessage] = useState("");
  const [contentFields, setContentFields] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [mediaKitFiles, setMediaKitFiles] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the first PDF file from mediaKitFiles
    const mediaFile = mediaKitFiles.find(
      (file) => file.type === "application/pdf"
    );

    // Format residence (country + city)
    const residence = residenceCountry
      ? `${residenceCountry.name}${residenceCity ? `, ${residenceCity}` : ""}`
      : residenceCity || "";

    // Format nationality
    const nationalityValue = nationality?.name || nationality?.code || "";

    // Format niches (get IDs from selected contentFields)
    const niches = contentFields.map((field) => field.id);

    // Prepare registration data
    const registrationData = {
      name: fullName,
      nationality: nationalityValue,
      residence: residence,
      email: email,
      phone: phoneNumber,
      type: selectedPlan || "",
      socialLinks: socialLinks.map((link) => ({
        platform: link.platform || "",
        link: link.link || "",
        prices: (link.prices || []).map((price) => ({
          type: price.type || "",
          price: price.price || "",
        })),
      })),
      niches: niches,
      followerCount: followerCount
        ? parseInt(followerCount.toString().replace(/[^0-9]/g, ""), 10)
        : 0,
      whyJoin: message,
      media: mediaFile,
    };

    const result = await register(registrationData);

    if (result.success) {
      // Reset form on success
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setSelectedCountry(null);
      setNationality(null);
      setResidenceCountry(null);
      setResidenceCity("");
      setFollowerCount("");
      setMessage("");
      setContentFields([]);
      setSelectedPlan(null);
      setMediaKitFiles([]);
      setSocialLinks([]);
    }
  };

  return (
    <section
      data-nav-color="black"
      className="w-full min-h-screen flex flex-col items-center mt-[104px]"
    >
      <div className="title py-[40px] md:py-[100px]">
        <TikitTitle
          title={t("influencerRegister.title")}
          mainWord={t("influencerRegister.mainWord","Tikit?")}
        />
          
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
          <form
            onSubmit={handleSubmit}
            className="main-content mt-[10px] md:mt-[30px] w-full px-[20px] md:px-[80px] flex flex-col gap-4"
          >
            <TextInput
              name="fullName"
              placeholder={t("influencerRegister.fields.fullName")}
              label={t("influencerRegister.fields.fullName")}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <TextInput
              name="email"
              type="email"
              placeholder="example@gmail.com"
              label={t("influencerRegister.fields.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            <SocialLinksInput
              label={
                t("influencerRegister.fields.socialLinks") || "Social Links"
              }
              socialLinks={socialLinks}
              onChange={setSocialLinks}
            />
            <RegisterPlan
              selectedPlan={selectedPlan}
              onPlanSelect={setSelectedPlan}
              followerCount={followerCount}
            />
            <MediaKitUpload
              name="mediaKit"
              label={t("influencerRegister.fields.mediaKit")}
              onFilesChange={setMediaKitFiles}
              accept=".pdf"
              multiple={false}
            />

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 rounded-[20px] bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="px-4 py-3 rounded-[20px] bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm">
                {t("influencerRegister.successMessage") ||
                  "Registration successful!"}
              </div>
            )}

            {/* Proceed Button */}
            <div className="w-full flex justify-center mt-6 md:mt-8">
              <button
                type="submit"
                disabled={loading}
                dir={isRtl ? "rtl" : "ltr"}
                className={`py-2 rounded-full w-1/3 md:py-5 px-4 font-semibold text-base md:text-lg transition-all duration-300 ease-in-out relative overflow-hidden ${
                  isRtl ? "font-cairo" : "font-antonio"
                } ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                } bg-[var(--secondary)] text-[var(--background)] hover:bg-white dark:hover:bg-[var(--container-bg)] hover:text-[var(--secondary)] border-2 border-[var(--secondary)] hover:border-[var(--secondary)] shadow-md hover:shadow-lg active:scale-[0.98]`}
              >
                <span className="relative z-10 block">
                  {loading
                    ? t("influencerRegister.submitting") || "Submitting..."
                    : t("influencerRegister.proceedButton")}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InfluencersRegister;
