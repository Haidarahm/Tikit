import { createContext, useContext, useState, useCallback } from "react";

const IntroContext = createContext({ introDone: true, setIntroDone: () => {} });

export function IntroProvider({ children }) {
  const [introDone, setIntroDoneRaw] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("logoIntroSeen") === "true";
  });

  const setIntroDone = useCallback((val) => setIntroDoneRaw(val), []);

  return (
    <IntroContext.Provider value={{ introDone, setIntroDone }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
