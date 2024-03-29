import { createContext, useContext, ReactNode } from "react";

import { Policies } from "@/constants/data";

type OnRefreshFunction = (updatedPolicies: Policies[]) => void;

const RefreshContext = createContext<OnRefreshFunction | null>(null);

export const useRefreshContext = () => useContext(RefreshContext);

interface RefreshProviderProps {
  onRefresh: OnRefreshFunction;
  children: ReactNode;
}

export const RefreshProvider: React.FC<RefreshProviderProps> = ({
  children,
  onRefresh,
}) => {
  return (
    <RefreshContext.Provider value={onRefresh}>
      {children}
    </RefreshContext.Provider>
  );
};
