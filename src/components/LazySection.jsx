import { useEffect, useRef, useState, Suspense } from "react";

export default function LazySection({
  children,
  rootMargin = "200px",
  threshold = 0,
  className = "",
  minHeight = "100px",
  fallback = null,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? <Suspense fallback={fallback}>{children}</Suspense> : null}
    </div>
  );
}

