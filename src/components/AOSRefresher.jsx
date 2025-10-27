// src/components/AOSRefresher.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

export default function AOSRefresher() {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 0);
  }, [location.pathname]);
  return null;
}
