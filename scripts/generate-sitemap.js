/**
 * Sitemap Generator Script
 *
 * Generates a sitemap index (`sitemap.xml`) plus five child sitemaps under
 * `public/`, each emitted in all 3 site locales (en, fr, ar) with hreflang
 * alternate tags so Google Search Console picks up the right localized URLs:
 *
 *   - sitemap-pages.xml         (static marketing pages)
 *   - sitemap-services.xml      (service hub + landing pages)
 *   - sitemap-blogs.xml         (blog listing + every blog post)
 *   - sitemap-work.xml          (work portfolio: influence/social/creative/events)
 *   - sitemap-case-studies.xml  (showcase case studies / `/showcase/:slug`)
 *
 * Run after content changes and resubmit `https://tikit.ae/sitemap.xml` in
 * Google Search Console so the new URLs are crawled with priority.
 *
 * Usage:
 *   npm run generate-sitemap
 *   # or
 *   node scripts/generate-sitemap.js
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL_CANDIDATES = [
  process.env.VITE_BASE_URL,
  'https://back.tikit.ae/api',
  'https://back.tikit.ae/public/index.php/api',
].filter(Boolean);

let BASE_URL = null;
const SITE_URL = 'https://tikit.ae';
const LOCALES = ['en', 'fr', 'ar'];

function localizePath(url, locale) {
  if (!url || url === '/') return `/${locale}`;
  return `/${locale}${url.startsWith('/') ? url : `/${url}`}`;
}

function stripLocalePrefix(url) {
  if (!url) return '/';
  const match = url.match(new RegExp(`^/(${LOCALES.join('|')})(?=/|$)`));
  if (!match) return url;
  const stripped = url.slice(match[0].length);
  return stripped === '' ? '/' : stripped;
}

function localizedEntries(entries) {
  return entries.flatMap((entry) =>
    LOCALES.map((locale) => ({
      ...entry,
      url: localizePath(entry.url, locale),
      locale,
    }))
  );
}

// Output sitemap paths
const SITEMAP_INDEX_PATH = path.join(__dirname, '../public/sitemap.xml');
const SITEMAP_SERVICES_PATH = path.join(__dirname, '../public/sitemap-services.xml');
const SITEMAP_PAGES_PATH = path.join(__dirname, '../public/sitemap-pages.xml');
const SITEMAP_BLOGS_PATH = path.join(__dirname, '../public/sitemap-blogs.xml');
const SITEMAP_WORK_PATH = path.join(__dirname, '../public/sitemap-work.xml');
const SITEMAP_CASE_STUDIES_PATH = path.join(__dirname, '../public/sitemap-case-studies.xml');

// Static URLs grouped by logical sitemap (service sections at root, no /services prefix)
const servicesPages = [
  { url: '/services', changefreq: 'monthly', priority: '0.9' },
  { url: '/influencer-marketing-agency-dubai', changefreq: 'monthly', priority: '0.8' },
  { url: '/influencer-marketing-agency-dubai/campaign-management-dubai', changefreq: 'monthly', priority: '0.7' },
  { url: '/influencer-marketing-agency-dubai/luxury-influencer-marketing', changefreq: 'monthly', priority: '0.7' },
  { url: '/influencer-marketing-agency-dubai/roi-analytics', changefreq: 'monthly', priority: '0.7' },
  { url: '/influencer-marketing-agency-dubai/instagram-influencer-marketing', changefreq: 'monthly', priority: '0.7' },
  { url: '/influencer-marketing-agency-dubai/tiktok-influencer-marketing', changefreq: 'monthly', priority: '0.7' },
  { url: '/influencer-marketing-agency-dubai/influencer-marketing-cost-uae', changefreq: 'monthly', priority: '0.7' },
  { url: '/social-media-management', changefreq: 'monthly', priority: '0.8' },
  { url: '/production', changefreq: 'monthly', priority: '0.8' },
  { url: '/branding-agency-dubai', changefreq: 'monthly', priority: '0.8' },
  { url: '/web-development-dubai', changefreq: 'monthly', priority: '0.8' },
  { url: '/digital-marketing-agency-dubai', changefreq: 'monthly', priority: '0.8' },
  { url: '/digital-marketing-agency-dubai/seo-services', changefreq: 'monthly', priority: '0.7' },
  { url: '/digital-marketing-agency-dubai/paid-ads-management', changefreq: 'monthly', priority: '0.7' },
  { url: '/digital-marketing-agency-dubai/conversion-optimization', changefreq: 'monthly', priority: '0.7' },
  { url: '/digital-marketing-agency-dubai/performance-marketing', changefreq: 'monthly', priority: '0.7' },
];

const pages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/about-us', changefreq: 'monthly', priority: '0.9' },
  { url: '/work', changefreq: 'weekly', priority: '0.8' },
  { url: '/influencer', changefreq: 'weekly', priority: '0.8' },
  { url: '/influencer-register', changefreq: 'monthly', priority: '0.7' },
  { url: '/contact-us', changefreq: 'monthly', priority: '0.8' },
  { url: '/faq', changefreq: 'monthly', priority: '0.8' },
  { url: '/influencer-marketing-dubai', changefreq: 'monthly', priority: '0.9' },
  { url: '/influencer-marketing-saudi-arabia', changefreq: 'monthly', priority: '0.9' },
  { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

const blogListingPages = [
  { url: '/blogs', changefreq: 'weekly', priority: '0.7' },
];

const WORK_CATEGORY_CONFIG = [
  {
    type: "influence",
    sectionEndpoint: "/work-influences",
    detailPrefix: "/work/influence",
  },
  {
    type: "social",
    sectionEndpoint: "/work-socials",
    detailPrefix: "/work/social",
  },
  {
    type: "creative",
    sectionEndpoint: "/work-creatives",
    detailPrefix: "/work/creative",
  },
  {
    type: "events",
    sectionEndpoint: "/work-events",
    detailPrefix: "/work/event",
  },
];

async function fetchWorkSections() {
  try {
    const response = await axios.get(`${BASE_URL}/works/get`, {
      params: {
        page: 1,
        per_page: 100,
        lang: "en",
      },
    });
    const sections = response?.data?.data ?? [];
    return Array.isArray(sections) ? sections : [];
  } catch (error) {
    console.error("Error fetching work sections:", error.message);
    return [];
  }
}

async function fetchWorkItemsBySection(endpoint, sectionSlug) {
  if (!sectionSlug) return [];

  try {
    const response = await axios.get(
      `${BASE_URL}${endpoint}/${encodeURIComponent(sectionSlug)}`,
      {
        params: {
          page: 1,
          per_page: 200,
          lang: "en",
        },
      }
    );

    const items = response?.data?.data ?? [];
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error(
      `Error fetching work items for section "${sectionSlug}" from "${endpoint}":`,
      error.message
    );
    return [];
  }
}

async function fetchAllWorkDetailUrls() {
  const sections = await fetchWorkSections();
  if (!sections.length) return [];

  const groupedSectionSlugs = sections.reduce((acc, section) => {
    const type = section?.type;
    const slug = section?.slug;
    if (!type || !slug) return acc;
    if (!acc[type]) acc[type] = [];
    acc[type].push(slug);
    return acc;
  }, {});

  const urlSet = new Set();

  for (const category of WORK_CATEGORY_CONFIG) {
    const categorySectionSlugs = groupedSectionSlugs[category.type] ?? [];
    for (const sectionSlug of categorySectionSlugs) {
      const items = await fetchWorkItemsBySection(
        category.sectionEndpoint,
        sectionSlug
      );
      items.forEach((item) => {
        if (!item?.slug) return;
        urlSet.add(`${category.detailPrefix}/${item.slug}`);
      });
    }
  }

  return Array.from(urlSet).sort();
}

async function fetchAllCaseStudyUrls() {
  try {
    const response = await axios.get(`${BASE_URL}/showcase-projects/get`, {
      params: { lang: 'en' },
      timeout: 15000,
    });

    // The API may return data in different shapes depending on environment:
    //   - { data: [ ... ] }
    //   - [ ... ]
    //   - { data: { data: [ ... ] } }
    const raw = response?.data;
    const items = Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.data)
        ? raw.data
        : Array.isArray(raw?.data?.data)
          ? raw.data.data
          : [];

    const urlSet = new Set();
    items.forEach((item) => {
      if (item?.slug) urlSet.add(`/showcase/${item.slug}`);
    });

    return Array.from(urlSet).sort();
  } catch (error) {
    console.error('Error fetching showcase case studies:', error.message);
    return [];
  }
}

async function fetchAllBlogs() {
  try {
    const blogs = [];
    let page = 1;
    let hasMore = true;
    const perPage = 100; // Fetch large batches

    while (hasMore) {
      const response = await axios.get(`${BASE_URL}/blogs/get`, {
        params: {
          page,
          per_page: perPage,
          lang: 'en', // Fetch English blogs for sitemap
        },
      });

      const data = response?.data?.data || [];
      if (Array.isArray(data) && data.length > 0) {
        blogs.push(...data);
        page++;
        hasMore = data.length === perPage;
      } else {
        hasMore = false;
      }
    }

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    return [];
  }
}

function formatDate(dateString) {
  if (!dateString) return new Date().toISOString().split('T')[0];
  try {
    return new Date(dateString).toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

// Builds the <xhtml:link rel="alternate" hreflang="..."/> tags for a URL
// expressed as a non-localized path (e.g. "/blogs/foo" or "/" for the home).
function buildHreflangAlternates(canonicalPath, indent = '    ') {
  const lines = LOCALES.map(
    (locale) =>
      `${indent}<xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${localizePath(canonicalPath, locale)}"/>`
  );
  lines.push(
    `${indent}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${localizePath(canonicalPath, 'en')}"/>`
  );
  return lines.join('\n');
}

const URLSET_OPEN = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

function generateStaticSitemap(staticPages, today) {
  let xml = URLSET_OPEN;

  staticPages.forEach((page) => {
    // `page.url` here is already localized (e.g. "/en/about-us"). For the
    // hreflang alternates we need the un-prefixed canonical path so we can
    // re-localize per language.
    const canonicalPath = stripLocalePrefix(page.url);
    const label =
      page.url === '/' || canonicalPath === '/'
        ? `Homepage (${page.locale ?? 'all'})`
        : `${page.locale ?? ''} ${canonicalPath.replace(/^\//, '').replace(/-/g, ' ')}`.trim();
    xml += `  <!-- ${label} -->\n`;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `${buildHreflangAlternates(canonicalPath)}\n`;
    xml += `  </url>\n\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

function generateBlogsSitemap(blogs, today) {
  let xml = URLSET_OPEN;

  blogListingPages.forEach((page) => {
    LOCALES.forEach((locale) => {
      const localizedUrl = localizePath(page.url, locale);
      xml += `  <!-- ${locale}${page.url} -->\n`;
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}${localizedUrl}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `${buildHreflangAlternates(page.url)}\n`;
      xml += `  </url>\n\n`;
    });
  });

  if (blogs.length > 0) {
    xml += `  <!-- Blog Posts (${blogs.length} posts × ${LOCALES.length} locales) -->\n`;
    blogs.forEach((blog) => {
      if (!blog.slug) return;
      const lastmod = formatDate(blog.updated_at || blog.created_at);
      const canonicalPath = `/blogs/${blog.slug}`;
      LOCALES.forEach((locale) => {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}${localizePath(canonicalPath, locale)}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `${buildHreflangAlternates(canonicalPath)}\n`;
        xml += `  </url>\n\n`;
      });
    });
  }

  xml += `</urlset>\n`;
  return xml;
}

function generateWorkSitemap(workUrls, today) {
  let xml = URLSET_OPEN;

  if (workUrls.length > 0) {
    xml += `  <!-- Work Details (${workUrls.length} pages × ${LOCALES.length} locales) -->\n`;
    workUrls.forEach((url) => {
      LOCALES.forEach((locale) => {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}${localizePath(url, locale)}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `${buildHreflangAlternates(url)}\n`;
        xml += `  </url>\n\n`;
      });
    });
  }

  xml += `</urlset>\n`;
  return xml;
}

function generateCaseStudiesSitemap(caseStudyUrls, today) {
  let xml = URLSET_OPEN;

  if (caseStudyUrls.length > 0) {
    xml += `  <!-- Case Study Showcase (${caseStudyUrls.length} cases × ${LOCALES.length} locales) -->\n`;
    caseStudyUrls.forEach((url) => {
      LOCALES.forEach((locale) => {
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}${localizePath(url, locale)}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `${buildHreflangAlternates(url)}\n`;
        xml += `  </url>\n\n`;
      });
    });
  }

  xml += `</urlset>\n`;
  return xml;
}

function generateSitemapIndex(today) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-blogs.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-work.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-case-studies.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
}
async function resolveBaseUrl() {
  console.log("🔍 Resolving working API base URL...");

  for (const base of BASE_URL_CANDIDATES) {
    try {
      const res = await axios.get(`${base}/works/get`, {
        params: { page: 1, per_page: 1 },
      });

      if (res.status === 200) {
        console.log(`✅ Using API base: ${base}`);
        return base;
      }
    } catch (err) {
      console.log(`❌ Failed: ${base}`);
    }
  }

  throw new Error("No working API base URL found");
}
async function main() {
  console.log('🚀 Generating sitemaps...');
  BASE_URL = await resolveBaseUrl();
  const today = new Date().toISOString().split('T')[0];

  console.log('📄 Generating pages sitemap...');
  const pagesXml = generateStaticSitemap(localizedEntries(pages), today);
  fs.writeFileSync(SITEMAP_PAGES_PATH, pagesXml, 'utf8');

  console.log('🧩 Generating services sitemap...');
  const servicesXml = generateStaticSitemap(localizedEntries(servicesPages), today);
  fs.writeFileSync(SITEMAP_SERVICES_PATH, servicesXml, 'utf8');

  console.log('📡 Fetching blog posts from API...');
  const blogs = await fetchAllBlogs();
  console.log(`✅ Found ${blogs.length} blog posts`);

  console.log('📝 Generating blogs sitemap...');
  const blogsXml = generateBlogsSitemap(blogs, today);
  fs.writeFileSync(SITEMAP_BLOGS_PATH, blogsXml, 'utf8');

  console.log('💼 Fetching work detail URLs from API...');
  const workDetailUrls = await fetchAllWorkDetailUrls();
  console.log(`✅ Found ${workDetailUrls.length} work detail pages`);

  console.log('🎬 Fetching showcase case study URLs from API...');
  const caseStudyUrls = await fetchAllCaseStudyUrls();
  console.log(`✅ Found ${caseStudyUrls.length} showcase case studies`);

  if (blogs.length === 0) {
    console.warn('⚠️  No blogs found');
  }

  if (workDetailUrls.length === 0) {
    // Don't hard-fail: the API may be temporarily unreachable during build.
    // We still want a usable sitemap with static + blog content.
    console.warn('⚠️  No work detail pages found — API may be unreachable.');
  }

  if (caseStudyUrls.length === 0) {
    console.warn('⚠️  No showcase case studies found — API may be unreachable.');
  }

  console.log('🧭 Generating work sitemap...');
  const workXml = generateWorkSitemap(workDetailUrls, today);
  fs.writeFileSync(SITEMAP_WORK_PATH, workXml, 'utf8');

  console.log('🏆 Generating case studies sitemap...');
  const caseStudiesXml = generateCaseStudiesSitemap(caseStudyUrls, today);
  fs.writeFileSync(SITEMAP_CASE_STUDIES_PATH, caseStudiesXml, 'utf8');

  console.log('🔗 Generating sitemap index...');
  const indexXml = generateSitemapIndex(today);
  fs.writeFileSync(SITEMAP_INDEX_PATH, indexXml, 'utf8');

  const totalStatic =
    (pages.length + servicesPages.length + blogListingPages.length) * LOCALES.length;
  const totalUrls =
    totalStatic +
    blogs.length * LOCALES.length +
    workDetailUrls.length * LOCALES.length +
    caseStudyUrls.length * LOCALES.length;

  console.log('✅ Sitemaps generated successfully!');
  console.log(`   - Pages (static): ${pages.length} × ${LOCALES.length} locales`);
  console.log(`   - Services (static): ${servicesPages.length} × ${LOCALES.length} locales`);
  console.log(`   - Blog listing pages (static): ${blogListingPages.length} × ${LOCALES.length} locales`);
  console.log(`   - Blog posts: ${blogs.length} × ${LOCALES.length} locales`);
  console.log(`   - Work detail pages: ${workDetailUrls.length} × ${LOCALES.length} locales`);
  console.log(`   - Case study (showcase) pages: ${caseStudyUrls.length} × ${LOCALES.length} locales`);
  console.log(`   - Total URLs: ${totalUrls}`);
  console.log(`   - Index: ${SITEMAP_INDEX_PATH}`);
}

main().catch((error) => {
  console.error('❌ Error generating sitemaps:', error);
  process.exit(1);
});
