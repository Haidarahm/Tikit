# Influencer Marketing Section — Images Needed & Remaining Tasks

## Images Needed

### Hub Page (influencer-marketing-agency-dubai)
| Image | Description | Recommended Size | Where to Place |
|-------|-------------|-----------------|----------------|
| `Influencer-Marketing.webp` | **Already exists** at `src/assets/services/Influencer-Marketing.webp` — used as hero background | 1920x1080 | Already in place |

### Sub-page Hero Images (Optional)
Each sub-page currently uses a gradient background (no image). If you want hero images for each sub-page, add them to `src/assets/services/influencer-marketing/` and pass them via the `heroImage` prop in each page's `pageData`.

| File Name | Page | Description | Recommended Size |
|-----------|------|-------------|-----------------|
| `campaign-management-hero.webp` | Campaign Management | Team planning a campaign, strategy boards, influencer briefing | 1920x1080 |
| `micro-influencer-hero.webp` | Micro-Influencer Marketing | Authentic creators making content, relatable lifestyle shots | 1920x1080 |
| `luxury-influencer-hero.webp` | Luxury Influencer Marketing | High-end lifestyle, luxury Dubai scenery, premium fashion | 1920x1080 |
| `roi-analytics-hero.webp` | ROI & Analytics | Data dashboards, analytics screens, performance charts | 1920x1080 |
| `instagram-marketing-hero.webp` | Instagram Marketing | Instagram UI elements, creators shooting content, phone mockups | 1920x1080 |
| `tiktok-marketing-hero.webp` | TikTok Marketing | TikTok creators filming, phone-first content, behind the scenes | 1920x1080 |
| `influencer-cost-hero.webp` | Influencer Marketing Cost | Budget planning, calculators, transparent pricing visual | 1920x1080 |

**How to add hero images:**
1. Create folder: `src/assets/services/influencer-marketing/`
2. Add your .webp images there
3. In each sub-page file (e.g., `CampaignManagement.jsx`), import the image and add it to `pageData`:
```jsx
import heroImage from "../../../assets/services/influencer-marketing/campaign-management-hero.webp";

// In pageData, add:
heroImage: heroImage,
```

### Image Section Images (Optional)
The `InfluencerSubPage` layout supports an optional `imageSection` with a side-by-side image + content layout. To use it, add an `imageSection` prop to any page's `pageData`:

```jsx
imageSection: {
  image: importedImage,
  imageAlt: "Description of the image",
  title: "Section Title",
  description: "Section description...",
  highlights: ["Point 1", "Point 2", "Point 3"],
},
```

| File Name | Recommended For | Description |
|-----------|----------------|-------------|
| `campaign-team.webp` | Campaign Management | Team collaborating on campaign strategy |
| `micro-creators.webp` | Micro-Influencer | Grid of micro-influencer content |
| `luxury-content.webp` | Luxury Marketing | Premium content production setup |
| `analytics-dashboard.webp` | ROI Analytics | Analytics dashboard screenshot or mockup |
| `instagram-content.webp` | Instagram Marketing | Instagram content creation process |
| `tiktok-filming.webp` | TikTok Marketing | TikTok video production behind the scenes |
| `pricing-comparison.webp` | Marketing Cost | Visual pricing tiers or comparison |

**Recommended image format:** WebP for performance, with fallback JPG if needed.
**Recommended sizes:** 800x600 for section images, 1920x1080 for hero images.

---

## Remaining Tasks

### Priority 1 — Must Do
- [ ] **Add hero images** for each sub-page (see table above)
- [ ] **Add Arabic translations** — Add translations for all 7 sub-pages in `src/locales/ar/translation.json` under `serviceSections.influencerMarketing.subPages`
- [ ] **Test all routes** — Navigate to each page and verify rendering:
  - `/services/influencer-marketing-agency-dubai` (hub)
  - `/services/influencer-marketing-agency-dubai/campaign-management`
  - `/services/influencer-marketing-agency-dubai/micro-influencer-marketing-uae`
  - `/services/influencer-marketing-agency-dubai/luxury-influencer-marketing`
  - `/services/influencer-marketing-agency-dubai/roi-analytics`
  - `/services/influencer-marketing-agency-dubai/instagram-influencer-marketing`
  - `/services/influencer-marketing-agency-dubai/tiktok-influencer-marketing`
  - `/services/influencer-marketing-agency-dubai/influencer-marketing-cost-uae`
- [ ] **Regenerate sitemap** — Run `node scripts/generate-sitemap.js` after deploying

### Priority 2 — Should Do
- [ ] **Add 301 redirect** from old path `/services/influencer-marketing` to `/services/influencer-marketing-agency-dubai` (in server config or via React redirect)
- [ ] **Internal linking audit** — Check all internal links across the site that pointed to `/services/influencer-marketing` (blog posts, other pages, etc.)
- [ ] **Update any hardcoded links** — Check footer, navigation, services page cards for old path references
- [ ] **Add section images** to each sub-page using the `imageSection` prop (see table above)
- [ ] **Add OG images** — Create unique Open Graph images for each sub-page (1200x630) for social sharing

### Priority 3 — Nice to Have
- [ ] **Add case studies/testimonials** — Link relevant case studies to each sub-page
- [ ] **Add client logos** — Display trusted brand logos on each sub-page
- [ ] **Add video content** — Embed relevant video testimonials or campaign showcases
- [ ] **Implement breadcrumb component** — Visual breadcrumb navigation on each sub-page
- [ ] **Add newsletter CTA** — Email capture form on sub-pages for lead generation
- [ ] **Performance optimization** — Lazy load sub-page images, optimize LCP for each page
- [ ] **A/B testing** — Test different hero titles and CTA buttons for conversion optimization

---

## File Structure Created

```
src/pages/services-sections/influencers-marketing/
├── InfluencerMarketing.jsx          ← Hub page (CORE HUB)
├── InfluencerSubPage.jsx            ← Shared layout component
├── influencersMarketing.css         ← Shared CSS with @apply
├── CampaignManagement.jsx           ← /campaign-management
├── MicroInfluencerMarketing.jsx     ← /micro-influencer-marketing-uae
├── LuxuryInfluencerMarketing.jsx    ← /luxury-influencer-marketing
├── ROIAnalytics.jsx                 ← /roi-analytics
├── InstagramInfluencerMarketing.jsx ← /instagram-influencer-marketing
├── TiktokInfluencerMarketing.jsx    ← /tiktok-influencer-marketing
└── InfluencerMarketingCost.jsx      ← /influencer-marketing-cost-uae
```

## Routes Added (App.jsx)

All routes are registered under `/services/influencer-marketing-agency-dubai/` with lazy-loaded components.

## Translation Keys Added

Hub page translations updated in `src/locales/en/translation.json` under:
- `serviceSections.influencerMarketing.badge` — Updated badge text
- `serviceSections.influencerMarketing.hero` — Updated hero content
- `serviceSections.influencerMarketing.subServices` — New sub-services grid data

Sub-page content is embedded directly in each component file (not in translation files). To add i18n support, extract the `pageData` text into translation keys.

## Other Files Updated
- `src/App.jsx` — Added all 8 routes (hub + 7 sub-pages)
- `scripts/generate-sitemap.js` — Added all new URLs
- `src/pages/Home/Services.jsx` — Updated path reference
- `src/pages/services/Services.jsx` — Updated path reference
