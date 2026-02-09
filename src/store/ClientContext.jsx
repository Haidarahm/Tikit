import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const ClientContext = createContext({
  clientType: "client",
  setClientType: () => {},
});

export function ClientProvider({ children }) {
  const [clientType, setClientTypeState] = useState(() => {
    try {
      const stored = sessionStorage.getItem("client");
      if (stored === "client" || stored === "influencer") return stored;
    } catch {
      // Intentionally empty
    }
    return "client";
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("client", clientType);
    } catch {
      // Intentionally empty
    }
  }, [clientType]);

  const setClientType = useCallback((type) => {
    if (type === "client" || type === "influencer") {
      setClientTypeState(type);
      try {
        sessionStorage.setItem("client", type);
      } catch {
      // Intentionally empty
    }
    }
  }, []);

  const value = useMemo(
    () => ({
      clientType,
      setClientType,
    }),
    [clientType, setClientType]
  );

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
}

export function useClient() {
  return useContext(ClientContext);
}

