# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev` (runs on http://localhost:5173 with --host)
- **Build for production:** `npm run build` (outputs to dist/, then runs react-snap for prerendering)
- **Preview production build:** `npm run preview --host`
- **Lint code:** `npm run lint`
- **Generate sitemap:** `npm run generate-sitemap` (fetches blogs, work portfolio items, and showcase case studies from the API; emits a sitemap index plus five locale-aware child sitemaps under `public/`)
- **Check unused translations:** `npm run i18n:check-unused`
- **Prune unused translations:** `npm run i18n:prune-unused --apply`

## Technology Stack

**Framework & Routing:**
- React 19.1.1 + React Router DOM 7.8.2 (SPA routing)
- Vite 7.1.2 (ES modules, lazy loading, code splitting)
- Static prerendering via react-snap (crawl: true, waitFor: 5000ms, inlineCss: true)

**Styling & Animation:**
- Tailwind CSS 4.1.13 (with @tailwindcss/vite plugin)
- Framer Motion 12.23.24 (primary: whileInView animations, stagger groups)
- GSAP 3.13.0 (complex scroll timelines, used alongside Framer Motion)
- Styled Components 6.1.19 (CSS-in-JS fallback)

**Internationalization (i18n):**
- i18next 25.6.0 + react-i18next 16.2.1
- 3 languages: English (en), French (fr), Arabic (ar)
- Locale-prefixed routing: /:lang/:path (e.g., /en/blogs, /ar/contact-us)
- Lazy loads translation JSON by language (reduces initial bundle)
- RTL support for Arabic (dir="rtl", font-cairo class)
- LTR for English & French (font-hero-light class)
- Preferred locale persisted in cookie (LOCALE_COOKIE_NAME="preferred_locale")

**State Management:**
- Zustand 5.0.8 (all stores use create() with async thunks)
- Context API (ThemeContext, ClientContext, I18nLanguageContext, IntroContext)

**HTTP & APIs:**
- Axios 1.12.2 with custom retry interceptor
- Base URL from VITE_BASE_URL env var (default: https://back.tikit.ae/api)
- Auto-retry on 5xx, timeouts, network errors (max 2 retries, 1–2s delays)
- Silent failure during prerendering (react-snap detection)

**UI & Icons:**
- Ant Design (antd 5.28.0)
- Lucide React 0.543.0 + React Icons 5.5.0
- Shadcn-style components (configured in components.json)
- React Window 2.2.3 (virtualized lists)
- Swiper 11.2.10 (carousels/sliders)
- React Scroll 1.9.3 (smooth scroll, hash linking)

**Build Optimization:**
- Gzip & Brotli compression (vite-plugin-compression)
- Terser minification + esbuild
- Source maps enabled in production

## Codebase Architecture

### Routing & Localization

**Multi-locale routing:**
- All routes are locale-prefixed: /:lang/:path (lang ∈ {en, fr, ar})
- Root "/" redirects to "/en" (DEFAULT_LOCALE)
- Invalid locales redirect to DEFAULT_LOCALE
- I18nLanguageContext manages language state, locale switching, navigation

**Key utilities (src/utils/localePaths.js):**
- `getLocaleFromPathname(pathname)` → extracts /en|fr|ar from path
- `stripLocalePrefix(pathname)` → removes /en|fr|ar prefix
- `withLocalePrefix(locale, path)` → prepends /en|fr|ar to path
- `swapLocaleInPathname(pathname, newLocale)` → language switching

**Vercel config (vercel.json):**
- Redirects / based on cookie (preferred_locale) or Accept-Language header
- Unmapped paths auto-prefix with /en

### i18n & Translation Loading

**Dynamic loading (src/locales/i18n.js):**
- Only active locale + English (fallback) are loaded into the bundle
- Unused languages stay out of the JS chunk (tree-shaking via Promise.all)
- Languages split into 3 JSON files per language: common.json, work.json, influencer.json
- `ensureLanguageLoaded(lang)` loads bundles on-demand when switching locales

**Translation structure:**
```
src/locales/
├── en/sections/{common, work, influencer}.json
├── ar/sections/{common, work, influencer}.json
└── fr/sections/{common, work, influencer}.json
```

### State Management

**Zustand stores (src/store/):**
- All stores use `create()` pattern with async thunks
- Catch errors and set loading/error states
- Support caching (e.g., useNewsStore.newsDetails[slug])
- Include pagination where relevant

**Key stores:**
- `useNewsStore` — blogs list & details (paragraphs array)
- `useInfluencersStore` — sections, all influencers, influencers per section
- `useWorkItemsStore` — work by category (influence, social, creative, digital, events) with retry logic
- `useContactStore`, `useInfluencerRegistrationStore`, etc.

**Context providers (App.jsx):**
1. ThemeProvider (light/dark mode)
2. ClientProvider (client detection)
3. IntroProvider (logo intro animation state)
4. I18nLanguageProvider (language/locale management)
5. ToastContainer (notifications)

### API Layer

**Axios instance (src/config/backend.js):**
- Configurable base URL via VITE_BASE_URL (default: https://back.tikit.ae/api)
- Auto-retry on 5xx, timeouts, network errors (max 2 retries, 1–2s delays)
- Polite failure during prerendering (silent errors in react-snap)
- 10s timeout, withCredentials: false

**API modules (src/apis/):**
- Organized by domain: banners/, work/, influencers/, news/, chatbot/, contact/, etc.
- Each API function is a thin wrapper over axios calls
- Params-based fetching: `getAllNewsItems({page, per_page, lang})`

### Component Architecture

**Animated components (src/components/animations/):**
- Built on Framer Motion with shared variants from /src/animations/
- Exports: AnimatedSection, AnimatedGroup, AnimatedCard, AnimatedTitle, AnimatedText, AnimatedImage, AnimatedButton
- Auto-detection of parent AnimatedGroup (stagger behavior)
- Respects prefers-reduced-motion (no animation if opted out)
- Common props: className, delay, variants, viewport, polymorphic as

**Animation patterns:**
- `whileInView` with `viewport={{ once: true, amount: 0.2 }}` (trigger when 20% visible)
- Stagger groups via AnimatedGroup (children animate in sequence)
- GSAP for scroll-triggered complex timelines (e.g., PinnedSection)
- Custom animations in /src/animations/{fade, scale, slide, stagger, transition}.js

**SEOHead component (src/components/SEOHead.jsx):**
- Adds meta tags + JSON-LD structured data (WebPage, LocalBusiness, Service, FAQPage, BreadcrumbList)
- Configurable: title, description, keywords, canonicalUrl, ogImage, serviceType, faqItems, breadcrumbs
- Supports primaryLocalBusiness (Dubai HQ by default)
- AI-optimized for ChatGPT, Claude, Gemini, Perplexity crawling

### Page Structure

**Home (src/pages/Home/Home.jsx):**
- Intro logo animation (controlled by IntroContext, skippable)
- GSAP scope ref for complex animations
- Mobile detection (useEffect on window.matchMedia)
- ~15 sections (Hero, WhyTikit, Showcase, Numbers, Goals, Influencers, Services, etc.)
- Each section in LazySection (appears only when in viewport)
- Comprehensive JSON-LD schema (LocalBusiness with aggregateRating, etc.)

**Service pages (src/pages/services/ & services-sections/):**
- Hub pages + landing pages for each service (influencer marketing, digital marketing, branding, web dev)
- SEO-optimized with service-specific schema
- AI-targeted landing pages (InfluencerMarketingDubai, InfluencerMarketingSaudiArabia)

**Work/Portfolio (src/pages/Work/, workDetails/):**
- Work items grouped by category: influence, social, creative, digital, events
- Category state in useWorkItemsStore with pagination + error handling
- Detail pages fetch individual work item

**Blogs (src/pages/news/, newsDetails/):**
- Blogs list with pagination
- Blog details include paragraphs array (separate API call)
- BlogDetailsSwitcher handles SSG vs client rendering

### Prerendering & Static Generation

**React-snap (package.json config):**
- `crawl: true` → follows links from include list to discover routes
- `include: ["/en", "/en/blogs", ...]` → explicit entry points
- `waitFor: 5000` → waits 5s after page load (for animations)
- `inlineCss: true` → inlines critical CSS
- `skipThirdPartyRequests: true` → prevents external API calls
- `puppeteerArgs: ["--no-sandbox", "--disable-dev-shm-usage"]` → Docker-friendly
- `timeout: 60000` → 60s per page

**Build pipeline:**
- `npm run build` → Vite build
- Post-build hook → runs `node scripts/react-snap-with-showcase.js`
- Outputs static HTML snapshots to dist/

**Handling API calls during prerendering:**
- Components render empty/fallback state when API fails
- Sitemap generated via `npm run generate-sitemap` — produces a sitemap index plus child sitemaps under `public/`:
  - `sitemap-pages.xml` — static marketing pages
  - `sitemap-services.xml` — service hubs and landing pages
  - `sitemap-blogs.xml` — blog listing + every blog post
  - `sitemap-work.xml` — work portfolio (influence/social/creative/events)
  - `sitemap-case-studies.xml` — showcase case studies (`/showcase/:slug`)
  - Every entry is emitted in all 3 locales (`en`, `fr`, `ar`) with `xhtml:link rel="alternate" hreflang="…"` tags + `x-default` for proper Google Search Console indexing.
- After running, submit `https://tikit.ae/sitemap.xml` in Google Search Console (Sitemaps tab) as priority so the new case study and blog URLs are crawled.

## Development Workflow

**When to update translations:**
1. Add new translation keys to all 3 language JSON files (en, fr, ar)
2. Run `npm run i18n:check-unused` to verify no orphaned keys
3. Use `npm run i18n:prune-unused --apply` to clean up old keys before deployment

**Working with animations:**
1. Framer Motion for standard scroll-triggered animations (use AnimatedSection, etc.)
2. GSAP for complex scroll timelines or pixel-perfect control
3. Always test with `prefers-reduced-motion: reduce` (respects user preference)
4. Add delay/stagger in AnimatedGroup for sequential reveals

**Adding new API endpoints:**
1. Create new module in src/apis/ (e.g., src/apis/newFeature.js)
2. Use `api` instance from src/config/backend.js (includes retry logic)
3. Create Zustand store in src/store/ for state management
4. Handle loading/error states in component
5. Test with both dev & prerendering modes

**Adding static pages:**
1. Add route to App.jsx (lazy-loaded)
2. Add route to react-snap `include` list in package.json (for prerendering)
3. Ensure page renders without API calls (fallback empty state)
4. Add SEOHead with structured data
5. Run `npm run build` to prerender

## Deployment & Build Optimization

**Output structure:**
- Vite outputs to `dist/` with assets in js/, images/, fonts/, assets/
- React-snap generates HTML snapshots alongside JS files
- Gzip & Brotli compressed versions (.gz, .br) included

**Environment variables:**
- VITE_BASE_URL: backend API URL (default https://back.tikit.ae/api)
- Set in .env file or Vercel dashboard

**Performance tuning:**
- Chunk size warning limit: 1500KB
- Source maps enabled for debugging
- CSS code splitting enabled (separate .css files per route)
- Module preload polyfill disabled (ES2018+ compatible)
- Image/font assets hashed for cache busting

## Key Architectural Decisions

**Why lazy load translations?**
- Unused language bundles don't bloat the initial JS chunk
- Users only load the languages they use
- Fallback to English when switching to a missing language

**Why static prerendering (react-snap)?**
- Faster initial page load (HTML snapshot instead of client-side render)
- Better SEO (search engines see complete HTML + meta tags)
- Crawling follows links from include list to discover all routes
- Handles client hydration gracefully (hasChildNodes check in main.jsx)

**Why Zustand + Context API?**
- Zustand for async data fetching & caching (stores, pagination)
- Context for app-wide state (theme, language, intro animation)
- Minimal boilerplate, no Redux action/reducer overhead

**Why GSAP + Framer Motion?**
- Framer Motion: standard scroll-triggered animations, stagger groups, reduced-motion support
- GSAP: complex scroll timelines, pixel-perfect control, ScrollTrigger plugin
- Use Framer Motion by default, fall back to GSAP for advanced control

**i18n architecture:**
- URL-based locale detection (/:lang/:path) for crawlable SEO
- Vercel redirects handle Accept-Language header + cookie preference
- Cookie persistence allows user preference to survive across sessions
