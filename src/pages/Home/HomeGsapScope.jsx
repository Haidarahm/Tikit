import { createContext, useContext } from "react";

const HomeGsapScopeContext = createContext(null);

export const HomeGsapScopeProvider = HomeGsapScopeContext.Provider;

export const useHomeGsapScope = () => useContext(HomeGsapScopeContext);
