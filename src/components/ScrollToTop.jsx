import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    const currentPathname = pathname;
    const previousPathname = previousPathnameRef.current;

    // Check if we're navigating between work sections (same base route, different workId)
    const isNavigatingBetweenWorkSections =
      previousPathname.startsWith("/work/") &&
      currentPathname.startsWith("/work/") &&
      previousPathname !== currentPathname;

    // Only scroll to top if we're not navigating between work sections
    if (!isNavigatingBetweenWorkSections) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    previousPathnameRef.current = currentPathname;
  }, [pathname]);

  return null;
}

export default ScrollToTop;
