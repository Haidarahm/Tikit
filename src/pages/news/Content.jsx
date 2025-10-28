import React from "react";
import { useTranslation } from "react-i18next";

const Content = () => {
  const { t } = useTranslation();

  return (
    <section className="news-content">
      <div className="news-content-container">
        <div className="news-content-header">
          <h2 className="news-content-title">
            {t("news.content.sectionTitle", "Latest Articles")}
          </h2>
          <p className="news-content-subtitle">
            {t(
              "news.content.sectionSubtitle",
              "Insights and strategies from our team of marketing experts"
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Content;
