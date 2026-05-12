/**
 * Scroll/viewport presets for `whileInView` — tuned per section scroll depth.
 * Use as `viewport={...}` on motion components.
 */

export const VIEWPORT_PROBLEMS = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -10% 0px",
};

export const VIEWPORT_PROCESS = {
  once: true,
  amount: 0.32,
  margin: "0px 0px -10% 0px",
};

export const VIEWPORT_BENEFITS = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -12% 0px",
};

export const VIEWPORT_CASE_STUDY = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -8% 0px",
};

export const VIEWPORT_WHY_US = {
  once: true,
  amount: 0.32,
  margin: "0px 0px -10% 0px",
};

export const VIEWPORT_SUB_SERVICES = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -12% 0px",
};

export const VIEWPORT_MULTI_CTA = {
  once: true,
  amount: 0.28,
  margin: "0px 0px -15% 0px",
};

/** FAQ block / wide sections */
export const VIEWPORT_FAQ = {
  once: true,
  amount: 0.18,
};

export const VIEWPORT_ONCE = { once: true };

/** DM subpages — staggered section `whileInView` (Paid Ads, CRO, DM blocks) */
export const VIEWPORT_DM_SUBPAGE = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
};
