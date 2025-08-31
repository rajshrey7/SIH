"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { translations, Language, TranslationKey } from "@/lib/translations"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  availableLanguages: { code: Language; name: string; nativeName: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const availableLanguages = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिन्दी" },
  { code: "es" as Language, name: "Spanish", nativeName: "Español" },
]

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    // Save to localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang)
    }
  }

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation = translations[currentLanguage]?.[key] || translations.en[key] || key
    
    // Replace parameters in the translation
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(new RegExp(`{${param}}`, "g"), String(value))
      })
    }
    
    return translation
  }

  // Load saved language on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("preferred-language") as Language
      if (saved && translations[saved]) {
        setCurrentLanguage(saved)
      }
    }
  }, [])

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage, 
        t, 
        availableLanguages 
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}