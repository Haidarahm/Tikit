import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useNewsStore } from "../../store/newsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import Loader from "../../components/Loader";
import BlogDetails from "./BlogDetails";
import NewsDetails from "./NewsDetails";

const BlogDetailsSwitcher = () => {
  const { slug } = useParams();
  const { language } = useI18nLanguage();
  const { loadOneNews, newsDetails } = useNewsStore();
  const [resolving, setResolving] = useState(true);
  const [hasHtmlFile, setHasHtmlFile] = useState(false);

  const cachedNews = useMemo(
    () => (slug ? newsDetails?.[slug] : null),
    [newsDetails, slug]
  );

  useEffect(() => {
    let mounted = true;

    const resolveTarget = async () => {
      if (!slug) {
        if (!mounted) return;
        setHasHtmlFile(false);
        setResolving(false);
        return;
      }

      if (cachedNews && Object.prototype.hasOwnProperty.call(cachedNews, "html_file")) {
        setHasHtmlFile(Boolean(cachedNews.html_file));
        setResolving(false);
        return;
      }

      setResolving(true);
      try {
        const data = await loadOneNews(slug, language);
        if (!mounted) return;
        setHasHtmlFile(Boolean(data?.html_file));
      } catch {
        if (!mounted) return;
        setHasHtmlFile(false);
      } finally {
        if (mounted) setResolving(false);
      }
    };

    resolveTarget();
    return () => {
      mounted = false;
    };
  }, [slug, language, loadOneNews, cachedNews]);

  if (resolving) {
    return <Loader />;
  }

  return hasHtmlFile ? <BlogDetails /> : <NewsDetails />;
};

export default BlogDetailsSwitcher;
