import { createContext, useContext, useState, useEffect } from "react";

import en from "../locales/en";
import te from "../locales/te";
import hi from "../locales/hi";

const LanguageContext = createContext();

const translations = {
  en,
  te,
  hi,
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

const changeLanguage = (lang) => {
  setLanguage(lang);
};

const value = {
  language,
  setLanguage,
  changeLanguage,
  t: translations[language],
};

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}