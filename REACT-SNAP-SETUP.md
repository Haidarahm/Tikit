# React-Snap Setup Guide

This project uses **react-snap** for SEO pre-rendering without converting to Next.js. React-snap crawls your React app after build and generates static HTML files for each route, making your content immediately visible to search engines.

## What Was Changed

### 1. Package Installation
- ✅ Installed `react-snap` as a dev dependency

### 2. Package.json Updates
- ✅ Added `"postbuild": "react-snap"` script (runs automatically after `npm run build`)
- ✅ Added `reactSnap` configuration with optimized settings:
  - `inlineCss: true` - Inlines CSS for faster initial render
  - `minifyHtml` - Minifies HTML output
  - `skipThirdPartyRequests: true` - Skips external requests during prerendering
  - `preloadImages: false` - Prevents image preloading during prerendering

### 3. Code Fixes for Prerendering Compatibility

#### Blog Links (SEO Fix)
- ✅ **Fixed**: Changed blog `Card` component from `onClick` navigation to `<Link>` components
- **Why**: Search engines can crawl `<Link>` elements but not programmatic navigation
- **Location**: `src/pages/news/Content.jsx`

#### Window/Document Safety
- ✅ **Fixed**: Added guards for `window` and `document` access in `main.jsx`
- ✅ **Added**: Hydration support for pre-rendered HTML
- **Location**: `src/main.jsx`

## How to Build with Pre-rendering

### Standard Build Process

```bash
# 1. Build the app (Vite will create dist/ folder)
npm run build

# 2. React-snap automatically runs after build (via postbuild script)
# It will crawl all routes and generate static HTML files

# 3. Preview the pre-rendered site locally
npm run preview
```

### What Happens During Build

1. **Vite Build**: Creates optimized production bundle in `dist/`
2. **React-Snap**: 
   - Starts a local server with your built app
   - Uses Puppeteer to crawl all routes
   - Generates static HTML files for each route
   - Inlines CSS and optimizes HTML
   - Saves files to `dist/` directory

### Generated Files Structure

After build, your `dist/` folder will contain:

```
dist/
├── index.html          # Homepage (pre-rendered)
├── blogs/
│   └── index.html      # Blog listing page (pre-rendered)
├── blogs/
│   └── [slug]/
│       └── index.html   # Individual blog posts (pre-rendered)
├── about-us/
│   └── index.html      # About page (pre-rendered)
├── services/
│   └── index.html      # Services page (pre-rendered)
└── ... (all other routes)
```

## How to Verify Pre-rendering Works

### Method 1: Check Generated HTML Files

```bash
# After building, check if HTML files exist
ls dist/blogs/
ls dist/blogs/*/index.html

# View a pre-rendered HTML file
cat dist/index.html
```

**What to look for:**
- HTML should contain actual content (not just `<div id="root"></div>`)
- Blog titles, descriptions, and content should be visible in the HTML
- Meta tags should be present in `<head>`

### Method 2: View Source in Browser

1. Build and serve the site:
   ```bash
   npm run build
   npm run preview
   ```

2. Open `http://localhost:4173` in your browser

3. **Right-click → View Page Source** (not Inspect Element)

4. **What to check:**
   - ✅ HTML contains actual blog content
   - ✅ Meta tags are present (`<meta name="description">`, etc.)
   - ✅ Blog links are present as `<a>` tags
   - ✅ Structured data (JSON-LD) is visible

### Method 3: Test with curl (No JavaScript)

```bash
# Test if content is visible without JavaScript
curl http://localhost:4173/blogs

# Should return HTML with blog content visible
# If you only see <div id="root"></div>, prerendering didn't work
```

### Method 4: Google Search Console

1. Deploy your site
2. Submit sitemap in Google Search Console
3. Use "URL Inspection" tool
4. Check "Test Live URL" - should show rendered HTML

### Method 5: Use Google's Mobile-Friendly Test

1. Go to: https://search.google.com/test/mobile-friendly
2. Enter your URL
3. Check the "Page Loading" section
4. Should show rendered content, not just a blank page

## Testing Blog Routes

React-snap will automatically discover and pre-render routes by:
1. Starting from `/` (homepage)
2. Following all `<Link>` components
3. Pre-rendering each discovered route

**Important**: Since blog posts use dynamic routes (`/blogs/:slug`), react-snap needs to discover them from the blog listing page. Make sure:

- ✅ Blog listing page (`/blogs`) renders blog cards with `<Link>` components
- ✅ Blog cards are visible on initial render (not hidden behind loading states)
- ✅ API calls complete before react-snap crawls (may need to wait for data)

### If Blog Posts Aren't Being Pre-rendered

If react-snap isn't finding blog posts:

1. **Check blog listing page loads data**: Ensure `/blogs` page fetches and displays blog list
2. **Add explicit routes** (optional): You can add a `include` array in `reactSnap` config:

```json
"reactSnap": {
  "include": [
    "/",
    "/blogs",
    "/about-us",
    "/services"
  ]
}
```

3. **Check console output**: React-snap logs which routes it's crawling

## Common Issues & Solutions

### Issue: "Cannot find module 'react-snap'"

**Solution**: Make sure react-snap is installed:
```bash
npm install --save-dev react-snap
```

### Issue: Build fails with Puppeteer errors

**Solution**: Install Puppeteer dependencies:
```bash
# On Linux
sudo apt-get install -y libgbm-dev

# On macOS (if needed)
brew install --cask chromium
```

Or add to `package.json`:
```json
"reactSnap": {
  "puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"]
}
```

### Issue: Blog posts show loading state in pre-rendered HTML

**Solution**: Ensure API calls complete before react-snap crawls. You may need to:
- Mock API responses during build
- Use static data for prerendering
- Increase `waitFor` timeout in react-snap config

### Issue: Hydration errors in browser console

**Solution**: 
- Check for differences between server-rendered HTML and client-side render
- Ensure all `window`/`document` access is guarded
- Avoid using browser-only APIs during initial render

### Issue: Routes not being discovered

**Solution**: 
- Ensure all links use `<Link>` from `react-router-dom`
- Avoid programmatic navigation (`navigate()`) for important routes
- Check that links are visible on initial render (not hidden by CSS)

## BrowserRouter vs HashRouter

**✅ BrowserRouter is CORRECT** - We're using BrowserRouter, which works perfectly with react-snap.

- BrowserRouter creates clean URLs: `/blogs/my-post`
- React-snap generates static HTML files for these routes
- No need to switch to HashRouter

HashRouter would create URLs like `/#/blogs/my-post`, which is worse for SEO.

## Deployment

### Standard Deployment

1. Build with pre-rendering:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your server

3. Ensure your server serves `index.html` for all routes (SPA fallback)

### Server Configuration

Your `.htaccess` should already handle this, but ensure:
- All routes serve `index.html` (SPA fallback)
- Static files (JS, CSS, images) are served directly
- Directory listings are disabled

## Monitoring & Verification

### After Deployment

1. **Google Search Console**:
   - Submit sitemap: `https://tikit.ae/sitemap.xml`
   - Use "URL Inspection" to verify pages are indexed
   - Check "Coverage" report

2. **Test with curl**:
   ```bash
   curl https://tikit.ae/blogs
   # Should return HTML with blog content
   ```

3. **View Source**:
   - Visit your live site
   - Right-click → View Page Source
   - Verify content is in HTML (not just React root div)

4. **Google Rich Results Test**:
   - https://search.google.com/test/rich-results
   - Enter your blog post URL
   - Verify structured data is detected

## Performance Benefits

Pre-rendering provides:
- ✅ **Faster Initial Load**: HTML is ready immediately
- ✅ **Better SEO**: Search engines see content immediately
- ✅ **Social Sharing**: OG tags work correctly
- ✅ **Accessibility**: Content available without JavaScript

## Next Steps

1. ✅ Build and test locally
2. ✅ Verify HTML files are generated
3. ✅ Deploy and test on production
4. ✅ Monitor Google Search Console
5. ✅ Check indexing status after a few days

## Troubleshooting

If you encounter issues:

1. Check react-snap output during build
2. Verify routes are being discovered
3. Test HTML files manually
4. Check browser console for hydration errors
5. Verify API calls complete during prerendering

For more help, see: https://github.com/stereobooster/react-snap
