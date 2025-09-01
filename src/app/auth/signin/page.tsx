"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, BookOpen, GraduationCap } from "lucide-react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Brand */}
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center animate-float">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-float" style={{animationDelay: '0.2s'}}>
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2 animate-slide-up">STEM Learning Platform</h1>
          <p className="text-gray-600 animate-slide-up" style={{animationDelay: '0.1s'}}>Welcome back! Sign in to continue learning</p>
        </div>

        <Card className="animate-scale-in shadow-xl border-0 glass-effect">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-bounce-in">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    className="h-11 pr-12 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  href="/auth/signup" 
                  className="text-green-600 hover:text-green-700 font-medium transition-colors hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 animate-pulse-slow">
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Demo Credentials:
              </p>
              <div className="space-y-1 text-xs text-gray-600 font-mono">
                <p>Email: demo@example.com</p>
                <p>Password: password123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}