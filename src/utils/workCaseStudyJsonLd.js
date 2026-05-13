/**
 * Helpers for portfolio / work detail JSON-LD (`CaseStudy` via SEOHead).
 * Reads optional API fields when present; safe no-ops when missing.
 */

const pickString = (...vals) => {
  for (const v of vals) {
    if (v == null) continue;
    const s = String(v).trim();
    if (s) return s;
  }
  return undefined;
};

const extractMediaUrl = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    return (
      value.media ??
      value.url ??
      value.src ??
      value.path ??
      value.image ??
      null
    );
  }
  return null;
};

const collectImageUrls = (item, media, { max = 8 } = {}) => {
  const out = [];
  const push = (u) => {
    const s = extractMediaUrl(u);
    if (s && !out.includes(s)) out.push(s);
  };

  if (Array.isArray(media)) {
    for (const m of media) {
      push(m);
      if (out.length >= max) return out;
    }
  }

  push(item?.main_image);
  push(item?.logo);
  if (Array.isArray(item?.images)) {
    for (const im of item.images) {
      push(im);
      if (out.length >= max) return out;
    }
  }

  return out.slice(0, max);
};

export const extractWorkItemIndustry = (item) =>
  pickString(
    item?.industry,
    item?.sector,
    item?.vertical,
    typeof item?.category === "string" ? item.category : item?.category?.name,
  );

export const extractWorkItemClientName = (item) =>
  pickString(
    item?.client_name,
    item?.client,
    item?.brand_name,
    item?.brand,
    item?.company_name,
    item?.company,
  );

const formatMetricNumber = (num) => {
  if (num == null || num === "") return null;
  const n = typeof num === "string" ? parseFloat(num) : num;
  if (Number.isFinite(n)) return n;
  return null;
};

const buildMetricLines = (category, item) => {
  if (!item || typeof item !== "object") return [];
  const lines = [];

  const reach = formatMetricNumber(item.reach);
  if (reach != null) lines.push(`Reach: ${reach}`);

  const views = formatMetricNumber(item.views);
  if (views != null) lines.push(`Views: ${views}`);

  const er = formatMetricNumber(item.engagement_rate);
  if (er != null) lines.push(`Engagement rate: ${er}%`);

  const fg = formatMetricNumber(item.follower_growth);
  if (fg != null) lines.push(`Follower growth: ${fg}`);

  const aud = formatMetricNumber(item.audience_size);
  if (aud != null) lines.push(`Audience size: ${aud}`);

  if (category === "events") {
    const att = formatMetricNumber(item.attendance ?? item.attendees);
    if (att != null) lines.push(`Attendance: ${att}`);
  }

  return lines;
};

const buildArticleBody = (item) => {
  if (!item || typeof item !== "object") return undefined;
  const sections = [];
  const brief = pickString(item.brief);
  const strategy = pickString(item.strategy);
  const approach = pickString(item.approach);
  if (brief) sections.push(`Brief: ${brief}`);
  if (strategy) sections.push(`Strategy: ${strategy}`);
  if (approach) sections.push(`Approach: ${approach}`);
  return sections.length ? sections.join("\n\n") : undefined;
};

const isoDate = (raw) => {
  const s = pickString(raw);
  if (!s) return undefined;
  const d = new Date(s);
  return Number.isFinite(d.getTime()) ? d.toISOString() : undefined;
};

/**
 * @param {object} opts
 * @param {'influence'|'social'|'creative'|'events'} opts.category
 * @param {object|null|undefined} opts.item — API work item
 * @param {unknown[]} [opts.media]
 * @param {string} opts.headline — short campaign title (not suffixed site title)
 * @param {string} [opts.description]
 * @param {string} [opts.alternativeHeadline]
 * @returns {object|null} — payload for SEOHead `caseStudyData`
 */
export function buildCaseStudySeoPayload({
  category,
  item,
  media = [],
  headline,
  description,
  alternativeHeadline,
}) {
  if (!item || typeof item !== "object") return null;

  const h = pickString(headline);
  if (!h) return null;

  const industry = extractWorkItemIndustry(item);
  const clientName = extractWorkItemClientName(item);
  const images = collectImageUrls(item, media);
  const metricLines = buildMetricLines(category, item);
  const articleBody = buildArticleBody(item);
  const datePublished = isoDate(
    item.published_at ?? item.created_at ?? item.date_published,
  );
  const dateModified = isoDate(
    item.updated_at ?? item.modified_at ?? item.published_at ?? item.created_at,
  );

  const keywordParts = [
    industry,
    clientName,
    category,
    ...metricLines,
  ].filter(Boolean);

  const abstract =
    metricLines.length > 0 ? metricLines.join(". ") + "." : undefined;

  return {
    headline: h,
    alternativeHeadline: pickString(alternativeHeadline),
    description: pickString(description) ?? pickString(item.objective),
    images: images.length ? images : undefined,
    industry,
    clientName,
    articleBody,
    abstract,
    keywords: keywordParts.length ? keywordParts.join(", ") : undefined,
    datePublished,
    dateModified,
  };
}
