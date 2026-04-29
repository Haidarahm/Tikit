# Influencer Section Blueprint

This guide explains how to build new influencer-marketing sections/pages using the existing architecture.

## Core Pattern

- Use `src/pages/services-sections/influencers-marketing/InfluencerMarketing.jsx` as the **hub orchestrator** pattern.
- Use `src/pages/services-sections/influencers-marketing/InfluencerSubPage.jsx` as the **template** for individual sub-pages.
- Keep page copy in i18n under `serviceSections.influencerMarketing...`; avoid hardcoded content in JSX.
- Keep styles in `influencerMarketing.css` with `im-*` classes.

## Architecture Rules

- **Container first**: page file assembles data + refs + section order.
- **Presentational sections**: `Inf*` components render UI only from props.
- **Animation isolation**: each section has its own `ref`; reveal by selector.
- **SEO first-class**: always set `SEOHead` title/description/keywords/service type, plus breadcrumbs and FAQ items when present.
- **Route-safe links**: centralize sub-service paths/icons in `sub-components/influencerMarketingSubServices`.

## Reusable Building Blocks

- Shared/global:
  - `SEOHead`
  - `FAQ`
  - `ServiceHeroSection`
  - `ServiceCTASection`
  - `ServiceSubServicesSection`
- Influencer-specific:
  - `InfServicesGrid`
  - `InfFullService`
  - `InfPlatforms`
  - `InfInfluencerTypes`
  - `InfCampaignProcess`
  - `InfIndustries`
  - `InfWhyChooseUs`
  - `InfComparisonTable`

## Data Flow Contract

- Define `const TK = "serviceSections.influencerMarketing";`
- Pull arrays with `toArray(t(path, { returnObjects: true }))`.
- Map icon arrays by index into translated items.
- Pass normalized props to each section:
  - `label`, `title`, `description`
  - `items` (or section-specific arrays like `steps`, `rows`, `reasons`)
- Build `faqItems` from i18n and pass to both `FAQ` and `SEOHead`.

## Animation Contract

- Register `ScrollTrigger`.
- Keep refs per section (hero, cards, process, comparison, cta, etc.).
- Use `revealChildren(ref, selector, stagger)` for grid/list sections.
- Use direct `gsap.fromTo` for one-off blocks (hero/comparison/cta).
- Revert context on unmount.

## New Section Checklist

1. Add i18n keys in EN/AR/FR for the section.
2. Add/update icon arrays and mapped data in page container.
3. Build or reuse an `Inf*` section component.
4. Wire section in page order with its own ref.
5. Add reveal animation selector for the section.
6. Ensure RTL works (`dir` and text alignment).
7. Verify `SEOHead` breadcrumbs/faq/schema.
8. Run lint and quick visual check.

## New Sub-Page Checklist

1. Create page data object (or translation-backed data map).
2. Render via `InfluencerSubPage` template if it matches needed blocks.
3. Add route in `App.jsx`.
4. Register in related/sub-services links.
5. Add sitemap entries if this project flow requires static listing.
6. Validate canonical URL and breadcrumb path.

## Anti-Patterns To Avoid

- Hardcoding large text content in JSX.
- Mixing UI layout and content transformation inside section components.
- Duplicating routes/links in multiple files instead of shared sub-services config.
- Using unscoped CSS classes without `im-` prefix.
