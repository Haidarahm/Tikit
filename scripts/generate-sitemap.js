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
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// Static pages that should always be in sitemap
const staticPages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/about-us', changefreq: 'monthly', priority: '0.9' },
  { url: '/services', changefreq: 'monthly', priority: '0.9' },
  { url: '/services/influencer-marketing', changefreq: 'monthly', priority: '0.8' },
  { url: '/services/social-media-management', changefreq: 'monthly', priority: '0.8' },
  { url: '/services/production', changefreq: 'monthly', priority: '0.8' },
  { url: '/services/branding', changefreq: 'monthly', priority: '0.8' },
  { url: '/work', changefreq: 'weekly', priority: '0.8' },
  { url: '/influencer', changefreq: 'weekly', priority: '0.8' },
  { url: '/influencer-register', changefreq: 'monthly', priority: '0.7' },
  { url: '/blogs', changefreq: 'weekly', priority: '0.7' },
  { url: '/contact-us', changefreq: 'monthly', priority: '0.8' },
  { url: '/faq', changefreq: 'monthly', priority: '0.8' },
  { url: '/careers', changefreq: 'monthly', priority: '0.7' },
  { url: '/influencer-marketing-dubai', changefreq: 'monthly', priority: '0.9' },
  { url: '/influencer-marketing-saudi-arabia', changefreq: 'monthly', priority: '0.9' },
  { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { url: '/terms-of-service', changefreq: 'yearly', priority: '0.3' },
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

function generateSitemap(blogs) {
  const today = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

`;

  // Add static pages
  staticPages.forEach((page) => {
    xml += `  <!-- ${page.url.replace('/', '').replace('-', ' ') || 'Homepage'} -->\n`;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n\n`;
  });

  // Add blog posts
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

async function main() {
  console.log('🚀 Generating sitemap...');
  console.log('📡 Fetching blog posts from API...');
  
  const blogs = await fetchAllBlogs();
  console.log(`✅ Found ${blogs.length} blog posts`);
  
  console.log('📝 Generating sitemap.xml...');
  const sitemapXml = generateSitemap(blogs);
  
  console.log('💾 Writing sitemap.xml...');
  fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf8');
  
  const totalUrls = staticPages.length + blogs.length;
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`   - Static pages: ${staticPages.length}`);
  console.log(`   - Blog posts: ${blogs.length}`);
  console.log(`   - Total URLs: ${totalUrls}`);
  console.log(`   - Location: ${SITEMAP_PATH}`);
}

main().catch((error) => {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
});
