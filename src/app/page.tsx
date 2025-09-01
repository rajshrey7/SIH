"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Gamepad2, Globe, WifiOff, Trophy, Users, Home, User, Loader2 } from "lucide-react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useLanguage } from "@/contexts/LanguageContext"

function AppContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { t } = useLanguage()

  const handleSignIn = () => {
    router.push("/auth/signin")
  }

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">STEM Learning Platform</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                {t("about")}
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
                {t("contact")}
              </Button>
              {session ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGoToDashboard}
                  className="hover-lift border-green-200 text-green-700 hover:bg-green-50"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignIn}
                  className="hover-lift border-green-200 text-green-700 hover:bg-green-50"
                >
                  {t("signIn")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-blue-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <Badge variant="secondary" className="w-fit bg-green-100 text-green-700 border-green-200 animate-pulse-slow">
                🎓 {t("platformDescription")}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {t("heroTitle")}
                <span className="gradient-text block mt-2">{t("heroSubtitle")}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                {t("heroDescription")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-bounce-in"
                  onClick={session ? handleGoToDashboard : handleSignIn}
                >
                  {session ? "Go to Dashboard" : t("startLearning")}
                </Button>
                <Button size="lg" variant="outline" className="border-2 hover-lift">
                  {t("learnMore")}
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl animate-float">
                <div className="bg-white rounded-xl p-6 space-y-4 shadow-lg">
                  <div className="flex items-center gap-3 hover-lift cursor-pointer">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Interactive Learning</h3>
                      <p className="text-sm text-gray-600">Play while you learn</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 hover-lift cursor-pointer">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Multilingual</h3>
                      <p className="text-sm text-gray-600">Learn in your language</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 hover-lift cursor-pointer">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <WifiOff className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Offline Access</h3>
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
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("whyChoosePlatform")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("platformDescription")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.1s'}}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold">{t("gamifiedLearning")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("gamifiedLearningDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.2s'}}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold">{t("stemFocused")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("stemFocusedDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.3s'}}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold">{t("multilingualContent")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("multilingualContentDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.4s'}}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <WifiOff className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold">{t("offlineFirst")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("offlineFirstDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.5s'}}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold">{t("progressTracking")}</CardTitle>
                <CardDescription className="text-gray-600">
                  {t("progressTrackingDesc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{animationDelay: '0.6s'}}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold">{t("collaborativeLearning")}</CardTitle>
                <CardDescription className="text-gray-600">
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
      <section className="py-16 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            {t("readyToTransform")}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            {t("joinThousands")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              onClick={session ? handleGoToDashboard : handleSignIn}
            >
              {session ? "Go to Dashboard" : t("getStartedFree")}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 font-semibold transition-all duration-300 hover-lift">
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
    <AppContent />
  )
}