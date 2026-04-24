/**
 * React-snap with showcase pre-rendering
 *
 * Fetches showcase slugs from the API and runs react-snap with those URLs
 * in the include list, so showcase detail pages are pre-rendered for SEO.
 *
 * Usage: node scripts/react-snap-with-showcase.js
 * Runs automatically after build (postbuild).
 */

import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_BASE = process.env.VITE_BASE_URL || 'https://back.tikit.ae/public/index.php/api';

const defaultInclude = [
  '/',
  '/blogs',
  '/about-us',
  '/services',
  '/work',
  '/contact',
  '/contact-us',
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

async function fetchShowcaseSlugs() {
  try {
    const response = await axios.get(`${API_BASE}/showcase-projects/get`, {
      params: { lang: 'en' },
      timeout: 15000,
    });
    const data = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : response?.data?.data ?? [];
    const slugs = data
      .filter((item) => item?.slug)
      .map((item) => `/showcase/${item.slug}`);
    return slugs;
  } catch (err) {
    console.warn(
      '⚠️  Could not fetch showcase slugs for react-snap (API may be unreachable at build time):',
      err.message
    );
    return [];
  }
}

async function fetchWorkSections() {
  try {
    const response = await axios.get(`${API_BASE}/works/get`, {
      params: {
        page: 1,
        per_page: 100,
        lang: "en",
      },
      timeout: 15000,
    });
    const data = Array.isArray(response?.data?.data) ? response.data.data : [];
    return data;
  } catch (err) {
    console.warn(
      "⚠️  Could not fetch work sections for react-snap:",
      err.message
    );
    return [];
  }
}

async function fetchWorkItemsBySection(endpoint, sectionSlug) {
  try {
    const response = await axios.get(
      `${API_BASE}${endpoint}/${encodeURIComponent(sectionSlug)}`,
      {
        params: {
          page: 1,
          per_page: 200,
          lang: "en",
        },
        timeout: 15000,
      }
    );
    const data = Array.isArray(response?.data?.data) ? response.data.data : [];
    return data;
  } catch (err) {
    console.warn(
      `⚠️  Could not fetch items for section "${sectionSlug}" (${endpoint}):`,
      err.message
    );
    return [];
  }
}

async function fetchWorkDetailUrls() {
  const sections = await fetchWorkSections();
  if (!sections.length) return [];

  const sectionsByType = sections.reduce((acc, section) => {
    const type = section?.type;
    const slug = section?.slug;
    if (!type || !slug) return acc;
    if (!acc[type]) acc[type] = [];
    acc[type].push(slug);
    return acc;
  }, {});

  const urls = new Set();

  for (const category of WORK_CATEGORY_CONFIG) {
    const sectionSlugs = sectionsByType[category.type] ?? [];
    for (const sectionSlug of sectionSlugs) {
      const items = await fetchWorkItemsBySection(
        category.sectionEndpoint,
        sectionSlug
      );
      items.forEach((item) => {
        if (!item?.slug) return;
        urls.add(`${category.detailPrefix}/${item.slug}`);
      });
    }
  }

  return Array.from(urls);
}

async function main() {
  console.log('📡 Fetching showcase slugs for react-snap...');
  const showcaseUrls = await fetchShowcaseSlugs();
  console.log(`✅ Found ${showcaseUrls.length} showcase case(s) to pre-render`);

  console.log("📡 Fetching work detail URLs for react-snap...");
  const workDetailUrls = await fetchWorkDetailUrls();
  console.log(`✅ Found ${workDetailUrls.length} work detail page(s) to pre-render`);

  const include = [
    ...new Set([...defaultInclude, ...showcaseUrls, ...workDetailUrls]),
  ];

  const pkgPath = join(__dirname, '../package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

  const originalInclude = pkg.reactSnap?.include ?? defaultInclude;
  pkg.reactSnap = {
    ...pkg.reactSnap,
    include,
  };

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');

  try {
    const { spawnSync } = await import('child_process');
    const result = spawnSync('npx', ['react-snap'], {
      stdio: 'inherit',
      cwd: join(__dirname, '..'),
      shell: true,
    });
    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  } finally {
    pkg.reactSnap = {
      ...pkg.reactSnap,
      include: originalInclude,
    };
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
  }
}

main().catch((err) => {
  console.error('❌ react-snap failed:', err);
  process.exit(1);
});
