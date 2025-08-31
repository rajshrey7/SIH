"use client"

import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage()

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>{currentLang?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={`flex items-center gap-2 ${
              currentLanguage === language.code ? "bg-gray-100" : ""
            }`}
          >
            <span className="font-medium">{language.nativeName}</span>
            <span className="text-sm text-gray-500">({language.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}