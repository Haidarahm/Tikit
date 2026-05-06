/**
 * Cloudflare Worker redirect logic
 * - "/" => preferred_locale cookie, then Accept-Language, fallback "/en" (302)
 * - Non-localized extension-less paths => "/en/:path" (301)
 */

function pickLocale(acceptLanguage = "") {
  const value = String(acceptLanguage).toLowerCase();
  if (value.startsWith("ar") || value.includes(",ar")) return "ar";
  if (value.startsWith("fr") || value.includes(",fr")) return "fr";
  return "en";
}

function pickLocaleFromCookie(cookieHeader = "") {
  const m = String(cookieHeader).match(/(?:^|;\s*)preferred_locale=(en|fr|ar)(?:;|$)/i);
  return m?.[1]?.toLowerCase?.() || null;
}

function hasLocalePrefix(pathname) {
  return /^\/(en|fr|ar)(\/|$)/i.test(pathname);
}

function hasFileExtension(pathname) {
  return /\.[a-z0-9]{1,8}$/i.test(pathname);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, search } = url;

    // Auto language redirect on root only
    if (pathname === "/") {
      const locale =
        pickLocaleFromCookie(request.headers.get("cookie")) ||
        pickLocale(request.headers.get("accept-language"));
      return Response.redirect(`${url.origin}/${locale}${search}`, 302);
    }

    // Canonicalize non-localized app routes
    if (!hasLocalePrefix(pathname) && !hasFileExtension(pathname)) {
      return Response.redirect(`${url.origin}/en${pathname}${search}`, 301);
    }

    return fetch(request);
  },
};
