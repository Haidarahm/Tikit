# Sitemap Generation Script

## Overview

The `generate-sitemap.js` script automatically generates a `sitemap.xml` file that includes all blog posts from your API. This helps Google discover and index all your blog posts.

## Usage

Run the script before deploying:

```bash
npm run generate-sitemap
```

Or directly:

```bash
node scripts/generate-sitemap.js
```

## What It Does

1. Fetches all blog posts from your API (`/blogs/get`)
2. Generates a `sitemap.xml` file in the `public/` directory
3. Includes:
   - All static pages (home, about, services, etc.)
   - All blog posts with their slugs (`/blogs/{slug}`)
   - Proper `lastmod` dates from blog `updated_at` or `created_at`
   - SEO-friendly priorities and change frequencies

## When to Run

- **Before each deployment** - To ensure new blog posts are included
- **After publishing new blogs** - To update the sitemap
- **Weekly/Monthly** - To refresh `lastmod` dates

## CI/CD Integration

You can add this to your deployment pipeline:

```yaml
# Example GitHub Actions
- name: Generate Sitemap
  run: npm run generate-sitemap
- name: Deploy
  run: npm run build
```

## Manual Updates

If you prefer to update the sitemap manually, you can add blog URLs to `public/sitemap.xml` in this format:

```xml
<url>
  <loc>https://tikit.ae/blogs/your-blog-slug</loc>
  <lastmod>2026-02-13</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
</url>
```

## Notes

- The script fetches blogs in batches of 100
- Only blogs with valid `slug` fields are included
- Uses English (`lang=en`) blogs for the sitemap
- Update `BASE_URL` in the script if your API URL changes
