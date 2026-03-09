/**
 * Sitemap Generator Script
 * 
 * This script generates a sitemap.xml file that includes all blog posts.
 * Run this script before deploying to ensure Google can discover all blog posts.
 * 
 * Usage:
 *   node scripts/generate-sitemap.js
 * 
 * Or add to package.json:
 *   "generate-sitemap": "node scripts/generate-sitemap.js"
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://back.tikit.ae/public/index.php/api';
const SITE_URL = 'https://tikit.ae';

// Output sitemap paths
const SITEMAP_INDEX_PATH = path.join(__dirname, '../public/sitemap.xml');
const SITEMAP_SERVICES_PATH = path.join(__dirname, '../public/sitemap-services.xml');
const SITEMAP_PAGES_PATH = path.join(__dirname, '../public/sitemap-pages.xml');
const SITEMAP_BLOGS_PATH = path.join(__dirname, '../public/sitemap-blogs.xml');

// Static URLs grouped by logical sitemap (service sections at root, no /services prefix)
const servicesPages = [
  { url: '/services', changefreq: 'monthly', priority: '0.9' },
  { url: '/influencer-marketing-agency-dubai', changefreq: 'monthly', priority: '0.8' },
  { url: '/influencer-marketing-agency-dubai/campaign-management', changefreq: 'monthly', priority: '0.7' },
  { url: '/influencer-marketing-agency-dubai/micro-influencer-marketing-uae', changefreq: 'monthly', priority: '0.7' },
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
  { url: '/digital-marketing-agency-dubai/performance-marketing', changefreq: 'monthly', priority: '0.7' },
  { url: '/digital-marketing-agency-dubai/seo-services', changefreq: 'monthly', priority: '0.7' },
  { url: '/digital-marketing-agency-dubai/paid-ads-management', changefreq: 'monthly', priority: '0.7' },
  { url: '/digital-marketing-agency-dubai/conversion-optimization', changefreq: 'monthly', priority: '0.7' },
];

const pages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/about-us', changefreq: 'monthly', priority: '0.9' },
  { url: '/work', changefreq: 'weekly', priority: '0.8' },
  { url: '/influencer', changefreq: 'weekly', priority: '0.8' },
  { url: '/influencer-register', changefreq: 'monthly', priority: '0.7' },
  { url: '/contact-us', changefreq: 'monthly', priority: '0.8' },
  { url: '/faq', changefreq: 'monthly', priority: '0.8' },
  { url: '/careers', changefreq: 'monthly', priority: '0.7' },
  { url: '/influencer-marketing-dubai', changefreq: 'monthly', priority: '0.9' },
  { url: '/influencer-marketing-saudi-arabia', changefreq: 'monthly', priority: '0.9' },
  { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
];

const blogListingPages = [
  { url: '/blogs', changefreq: 'weekly', priority: '0.7' },
];

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

function generateStaticSitemap(staticPages, today) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  staticPages.forEach((page) => {
    const label = page.url === '/' ? 'Homepage' : page.url.replace('/', '').replace(/-/g, ' ');
    xml += `  <!-- ${label} -->\n`;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

function generateBlogsSitemap(blogs, today) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  // Blog listing pages
  blogListingPages.forEach((page) => {
    const label = page.url.replace('/', '').replace(/-/g, ' ');
    xml += `  <!-- ${label} -->\n`;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n\n`;
  });

  if (blogs.length > 0) {
    xml += `  <!-- Blog Posts (${blogs.length} posts) -->\n`;
    blogs.forEach((blog) => {
      if (blog.slug) {
        const lastmod = formatDate(blog.updated_at || blog.created_at);
        xml += `  <url>\n`;
        xml += `    <loc>${SITE_URL}/blogs/${blog.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.6</priority>\n`;
        xml += `  </url>\n\n`;
      }
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
</sitemapindex>
`;
}

async function main() {
  console.log('🚀 Generating sitemaps...');

  const today = new Date().toISOString().split('T')[0];

  console.log('📄 Generating pages sitemap...');
  const pagesXml = generateStaticSitemap(pages, today);
  fs.writeFileSync(SITEMAP_PAGES_PATH, pagesXml, 'utf8');

  console.log('🧩 Generating services sitemap...');
  const servicesXml = generateStaticSitemap(servicesPages, today);
  fs.writeFileSync(SITEMAP_SERVICES_PATH, servicesXml, 'utf8');

  console.log('📡 Fetching blog posts from API...');
  const blogs = await fetchAllBlogs();
  console.log(`✅ Found ${blogs.length} blog posts`);

  console.log('📝 Generating blogs sitemap...');
  const blogsXml = generateBlogsSitemap(blogs, today);
  fs.writeFileSync(SITEMAP_BLOGS_PATH, blogsXml, 'utf8');

  console.log('🔗 Generating sitemap index...');
  const indexXml = generateSitemapIndex(today);
  fs.writeFileSync(SITEMAP_INDEX_PATH, indexXml, 'utf8');

  const totalStatic =
    pages.length + servicesPages.length + blogListingPages.length;
  const totalUrls = totalStatic + blogs.length;

  console.log('✅ Sitemaps generated successfully!');
  console.log(`   - Pages (static): ${pages.length}`);
  console.log(`   - Services (static): ${servicesPages.length}`);
  console.log(`   - Blog listing pages (static): ${blogListingPages.length}`);
  console.log(`   - Blog posts: ${blogs.length}`);
  console.log(`   - Total URLs: ${totalUrls}`);
  console.log(`   - Index: ${SITEMAP_INDEX_PATH}`);
}

main().catch((error) => {
  console.error('❌ Error generating sitemaps:', error);
  process.exit(1);
});
