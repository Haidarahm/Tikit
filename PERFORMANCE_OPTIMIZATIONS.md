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

### 3. ✅ Debounced Event Handlers

- Resize handlers in VerticalVideoLooper use debouncing

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

**Priority: Medium**

**Issue**: AOS is being initialized multiple times in different components.

**Solution**: Consolidate to a single global initialization in App.jsx:

```jsx
// In App.jsx - add once
useEffect(() => {
  if (!window.aosInitialized) {
    AOS.init({
      duration: 900,
      once: true,
      offset: 100,
      easing: "ease-out-quart",
    });
    window.aosInitialized = true;
  }
}, []);
```

### 3. Intersection Observer for Images

**Priority: High**

Replace lazy loading with Intersection Observer:

```jsx
const useLazyImage = (src) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      });
    });

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src]);

  return [imageSrc, imgRef];
};
```

### 4. Debounce/Throttle Scroll Events

**Priority: Medium**

Add to resize handlers:

```jsx
// In components with scroll/resize handlers
const debouncedRefresh = useMemo(
  () =>
    debounce(() => {
      AOS.refresh();
      ScrollTrigger.refresh();
    }, 150),
  []
);
```

### 5. CSS Optimization

**Priority: Low**

Add CSS containment to sections:

```css
.section-container {
  contain: layout style paint;
  will-change: transform;
}

.v-looper__innerList {
  contain: layout style;
}
```

### 6. Bundle Optimization

**Priority: High**

Update vite.config.js:

```js
export default defineConfig({
  // ... existing config
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-gsap": ["gsap"],
          "vendor-aos": ["aos"],
          "vendor-lenise": ["lenise"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

### 7. Virtual Scrolling

**Priority: Medium**

For long lists (like work items):

```jsx
// Install: npm install react-window
import { FixedSizeGrid } from "react-window";
```

### 8. Preconnect to External Resources

**Priority: Medium**

Add to index.html:

```html
<link rel="preconnect" href="https://your-api-domain.com" />
<link rel="dns-prefetch" href="https://your-api-domain.com" />
```

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
2. Add image lazy loading with Intersection Observer
3. Consolidate AOS initialization
4. Implement bundle code splitting

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

1. **AOS initializing multiple times** - Can cause conflicts
2. **No Intersection Observer** - Using browser lazy loading only
3. **No code splitting** - Large bundle size
4. **Scroll events not throttled** - Could cause jank
5. **Heavy re-renders** - Some components missing memoization

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
