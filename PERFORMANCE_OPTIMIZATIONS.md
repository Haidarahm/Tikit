# Performance Optimization Guide for Tikit Agency

## Summary

This document outlines performance optimizations to improve website speed, smoothness, and user experience.

---

## 🔧 Implemented Optimizations

### 1. ✅ Component Memoization

Several components already use `React.memo`:

- ContactUs
- Numbers
- Services
- WorkSection
- AboutUs
- Reviews

### 2. ✅ Lazy Loading

- Images already use `loading="lazy"` in WorkSection
- Route-level lazy loading is implemented
- Videos don't load on mobile devices
- **NEW**: Created `useLazyImage` hook with Intersection Observer
- **NEW**: Created `OptimizedImage` component with responsive srcSet

### 3. ✅ Debounced Event Handlers

- Resize handlers in VerticalVideoLooper use debouncing
- **NEW**: Created `src/utils/debounce.js` with debounce and throttle utilities
- **NEW**: Applied debouncing to resize handlers in Home.jsx and Influencer.jsx

### 4. ✅ Bundle Code Splitting

- **NEW**: Implemented comprehensive manual chunks in vite.config.js
- Vendor libraries split into separate chunks for better caching
- Terser minification with console.log removal in production

### 5. ✅ Resource Hints

- **NEW**: Added preconnect/dns-prefetch for external resources
- **NEW**: Added preload for critical fonts
- **NEW**: Added prefetch for likely next pages

### 6. ✅ CSS Containment

- **NEW**: Added CSS containment to `.section` class
- **NEW**: Added containment to video looper components

### 7. ✅ AOS Initialization

- **NEW**: Consolidated to single initialization in App.jsx
- **NEW**: Added safety checks to all AOS.refresh() calls

### 8. ✅ Missing Dependencies

- **NEW**: Installed framer-motion and prop-types
- **NEW**: Removed prop-types dependency from CreativeNoMedia component

---

## 🚀 Recommended Optimizations

### 1. Image Optimization

**Priority: High**

#### Add responsive image sizes

```jsx
// Replace static imports with optimized images
<img
  src={work.media}
  srcSet={`${work.media}?w=400 400w, ${work.media}?w=800 800w, ${work.media}?w=1200 1200w`}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"
  alt={work.title}
  className="..."
/>
```

#### Convert images to WebP format

- Currently using .webp for some images ✅
- Convert remaining .jpg/.png to WebP

### 2. AOS Initialization

**Priority: Medium** ✅ **COMPLETED**

**Issue**: AOS is being initialized multiple times in different components.

**Solution**: ✅ Consolidated to a single global initialization in App.jsx with guard to prevent multiple initializations. All components now use `AOS.refresh()` with safety checks.

### 3. Intersection Observer for Images

**Priority: High** ✅ **COMPLETED**

✅ Created `src/hooks/useLazyImage.js` hook with Intersection Observer.
✅ Created `src/components/OptimizedImage.jsx` component with:

- Responsive srcSet support
- Lazy loading with Intersection Observer
- Error handling
- Smooth fade-in animation
- Async decoding

**Usage:**

```jsx
import OptimizedImage from "../../components/OptimizedImage";

<OptimizedImage
  src={imageUrl}
  alt="Description"
  className="w-full h-full object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
/>;
```

### 4. Debounce/Throttle Scroll Events

**Priority: Medium** ✅ **COMPLETED**

✅ Created `src/utils/debounce.js` with debounce and throttle utilities.
✅ Applied debouncing to resize handlers in `Home.jsx` and `Influencer.jsx`.
✅ Added passive event listeners for better performance.

### 5. CSS Optimization

**Priority: Low** ✅ **COMPLETED**

✅ Added CSS containment to `.section` class in `index.css`.
✅ Added containment to `.v-looper__innerList` in `VerticalVideoLooper.css`.
✅ Optimized with `will-change: transform` for better performance.

### 6. Bundle Optimization

**Priority: High** ✅ **COMPLETED**

✅ Updated `vite.config.js` with comprehensive code splitting:

- vendor-react: React core libraries
- vendor-gsap: GSAP animation library
- vendor-animations: AOS and Lenis
- vendor-3d: Three.js and related 3D libraries
- vendor-ui: Radix UI and Lucide icons
- vendor-utils: State management and i18n
  ✅ Added terser minification with console.log removal in production.
  ✅ Set chunkSizeWarningLimit to 1000KB.

### 7. Virtual Scrolling

**Priority: Medium**

For long lists (like work items):

```jsx
// Install: npm install react-window
import { FixedSizeGrid } from "react-window";
```

### 8. Preconnect to External Resources

**Priority: Medium** ✅ **COMPLETED**

✅ Added preconnect and dns-prefetch for Google Fonts and unpkg.com in `index.html`.
✅ Added preload for critical fonts (HeroLight and Cairo).
✅ Added prefetch for likely next pages (/work, /services, /about).

### 9. Service Worker for Caching

**Priority: Low**

Implement PWA with service worker for offline support and faster repeat visits.

### 10. Reduce Re-renders with useCallback

**Priority: Medium**

Memoize callback functions:

```jsx
const handleSlideClick = useCallback((slideNumber) => {
  setIsSecondSlide(slideNumber === 2);
}, []);
```

---

## 📊 Performance Metrics to Monitor

1. **Lighthouse Scores**

   - Performance: Target >90
   - Accessibility: Target >90
   - Best Practices: Target >90
   - SEO: Target >90

2. **Core Web Vitals**

   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

3. **Bundle Size**
   - Initial bundle: < 200KB (gzipped)
   - Total JavaScript: < 500KB

---

## 🛠️ Quick Wins (Easy to Implement)

### 1. Add preload for critical assets

```html
<link rel="preload" as="font" href="fonts/hero-light.woff2" crossorigin />
```

### 2. Remove unused imports

```bash
# Check for unused dependencies
npm install --save-dev depcheck
npx depcheck
```

### 3. Minify CSS in production

Already handled by Vite ✅

### 4. Add resource hints

```html
<link rel="prefetch" href="/work" /> <link rel="prefetch" href="/services" />
```

### 5. Optimize fonts

- Use font-display: swap
- Subset fonts to include only needed characters
- Already using variable fonts ✅

---

## 🎯 Immediate Actions

### High Priority (Do First)

1. ✅ Fix mobile language menu (DONE)
2. ✅ Add image lazy loading with Intersection Observer (DONE)
3. ✅ Consolidate AOS initialization (DONE)
4. ✅ Implement bundle code splitting (DONE)

### Medium Priority

5. Add CSS containment
6. Memoize callbacks with useCallback
7. Optimize GSAP scroll triggers

### Low Priority

8. Add service worker
9. Implement virtual scrolling for lists
10. Add resource prefetching

---

## 📝 Testing Performance

### Before/After Metrics

```bash
# Build production version
npm run build

# Test with Lighthouse
npm install -g lighthouse
lighthouse http://localhost:5173 --view

# Test bundle size
npm run build
# Check dist/assets folder sizes
```

### Performance Monitoring

```jsx
// Add performance monitoring
if (process.env.NODE_ENV === "production") {
  import("web-vitals").then(({ onCLS, onFID, onLCP }) => {
    onCLS(console.log);
    onFID(console.log);
    onLCP(console.log);
  });
}
```

---

## 🔍 Current Issues Found

1. ✅ **AOS initializing multiple times** - FIXED: Single initialization with guard
2. ✅ **No Intersection Observer** - FIXED: Created useLazyImage hook and OptimizedImage component
3. ✅ **No code splitting** - FIXED: Implemented comprehensive bundle splitting
4. ✅ **Scroll events not throttled** - FIXED: Added debounce utilities and applied to resize handlers
5. **Heavy re-renders** - Some components missing memoization (Partially addressed)
6. ✅ **Missing dependencies** - FIXED: Installed framer-motion and prop-types

---

## 🎉 Expected Improvements

After implementing these optimizations:

- ⚡ **Page load time**: 30-40% faster
- 📦 **Bundle size**: 20-30% reduction
- 🎨 **Animation smoothness**: 60fps consistent
- 🔋 **Mobile performance**: Significant improvement
- 📊 **Lighthouse score**: +15-20 points

---

## 📚 Resources

- [Web.dev Performance](https://web.dev/performance/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Vite Optimization Guide](https://vitejs.dev/guide/performance.html)
- [GSAP Performance Tips](<https://greensock.com/docs/v3/GSAP/gsap.fromTo()>)
