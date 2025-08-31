"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Gamepad2, Globe, WifiOff, Trophy, Users, Home, User } from "lucide-react"
import StudentDashboard from "@/components/StudentDashboard"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/contexts/LanguageContext"

function AppContent() {
  const [currentView, setCurrentView] = useState("landing") // "landing" or "dashboard"
  const { t } = useLanguage()

  if (currentView === "dashboard") {
    return (
      <div>
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentView("landing")}
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    {t("home")}
                  </span>
                </Button>
                <h1 className="text-xl font-bold text-green-600">STEM Learning Platform</h1>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {t("profile")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("logout")}
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <StudentDashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-green-600">STEM Learning Platform</h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm">
                {t("about")}
              </Button>
              <Button variant="ghost" size="sm">
                {t("contact")}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentView("dashboard")}
              >
                {t("signIn")}
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                🎓 {t("platformDescription")}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {t("heroTitle")}
                <span className="text-green-600 block">{t("heroSubtitle")}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                {t("heroDescription")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setCurrentView("dashboard")}
                >
                  {t("startLearning")}
                </Button>
                <Button size="lg" variant="outline">
                  {t("learnMore")}
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Interactive Learning</h3>
                      <p className="text-sm text-gray-600">Play while you learn</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Multilingual</h3>
                      <p className="text-sm text-gray-600">Learn in your language</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <WifiOff className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Offline Access</h3>
                      <p className="text-sm text-gray-600">No internet? No problem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("whyChoosePlatform")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("platformDescription")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Gamepad2 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>{t("gamifiedLearning")}</CardTitle>
                <CardDescription>
                  {t("gamifiedLearningDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{t("stemFocused")}</CardTitle>
                <CardDescription>
                  {t("stemFocusedDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>{t("multilingualContent")}</CardTitle>
                <CardDescription>
                  {t("multilingualContentDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <WifiOff className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>{t("offlineFirst")}</CardTitle>
                <CardDescription>
                  {t("offlineFirstDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>{t("progressTracking")}</CardTitle>
                <CardDescription>
                  {t("progressTrackingDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>{t("collaborativeLearning")}</CardTitle>
                <CardDescription>
                  {t("collaborativeLearningDesc")}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Subject Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("subjectAreas")}
            </h2>
            <p className="text-xl text-gray-600">
              {t("subjectDescription")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧪</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("science")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("scienceDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("technology")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("technologyDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("engineering")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("engineeringDesc")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t("mathematics")}</h3>
                <p className="text-gray-600 text-sm">
                  {t("mathematicsDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("readyToTransform")}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t("joinThousands")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-green-600 hover:bg-gray-100"
              onClick={() => setCurrentView("dashboard")}
            >
              {t("getStartedFree")}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              {t("contact")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}