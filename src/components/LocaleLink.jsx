import { Link } from "react-router-dom";
import { useI18nLanguage } from "../store/I18nLanguageContext.jsx";

/**
 * Same API as react-router Link; prefixes internal paths with the active locale (/en, /fr, /ar).
 * External URLs (http/https/mailto/tel) and paths already locale-prefixed are unchanged.
 */
export function LocaleLink({ to, ...rest }) {
  const { localizedPath } = useI18nLanguage();

  const resolvedTo =
    typeof to === "string"
      ? localizedPath(to)
      : typeof to === "object" && to && typeof to.pathname === "string"
        ? { ...to, pathname: localizedPath(to.pathname) }
        : to;

  return <Link to={resolvedTo} {...rest} />;
}
