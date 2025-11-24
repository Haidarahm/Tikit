import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // تأخير بسيط لإعطاء الصفحة وقت لتُحمّل
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300); // يمكنك زيادتها إذا كان التحميل بطيئاً
    }
  }, [location]);

  return null;
}
