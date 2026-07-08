import { createContext, useContext, useState } from "react";

const PHCContext = createContext();

export function PHCProvider({ children }) {
  const [selectedPHC, setSelectedPHC] = useState("All PHCs");

  return (
    <PHCContext.Provider
      value={{
        selectedPHC,
        setSelectedPHC,
      }}
    >
      {children}
    </PHCContext.Provider>
  );
}

export function usePHC() {
  return useContext(PHCContext);
}