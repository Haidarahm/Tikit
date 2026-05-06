/** Supported URL locale prefixes for crawlable multilingual routes */
export const LOCALE_CODES = ["en", "fr", "ar"];
export const DEFAULT_LOCALE = "en";

/**
 * @param {string} pathname
 * @returns {string | null}
 */
export function getLocaleFromPathname(pathname) {
  const m = pathname.match(new RegExp(`^\\/(${LOCALE_CODES.join("|")})(?=\\/|$)`));
  return m ? m[1] : null;
}

/**
 * Path without leading /en|fr|ar (keeps leading slash for non-root, e.g. "/blogs").
 * @param {string} pathname
 */
export function stripLocalePrefix(pathname) {
  if (!pathname || pathname === "/") return "/";
  const re = new RegExp(`^\\/(${LOCALE_CODES.join("|")})(?=\\/|$)`);
  const stripped = pathname.replace(re, "") || "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

/**
 * @param {string} locale
 * @param {string} pathWithoutLocale — e.g. "/", "/blogs", "/blogs/foo"
 */
export function withLocalePrefix(locale, pathWithoutLocale) {
  const loc = LOCALE_CODES.includes(locale) ? locale : DEFAULT_LOCALE;
  if (!pathWithoutLocale || pathWithoutLocale === "/") return `/${loc}`;
  const p = pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`;
  return `/${loc}${p}`;
}

/**
 * Swap locale segment; preserves rest of path and query/hash via caller.
 * @param {string} pathname — full pathname
 * @param {string} newLocale
 */
export function swapLocaleInPathname(pathname, newLocale) {
  const rest = stripLocalePrefix(pathname);
  return withLocalePrefix(newLocale, rest);
}
