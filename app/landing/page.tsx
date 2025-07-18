"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Camera, Bell, Shield, Lock } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const userEmail = localStorage.getItem("userEmail")
    const role = localStorage.getItem("userRole")
    setIsAuthenticated(!!(userEmail && role))
    setUserRole(role || "")
  }, [])

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (userRole === "admin") {
        router.push("/admin")
      } else {
        router.push("/home")
      }
    } else {
      router.push("/login")
    }
  }

  const handleStartReporting = () => {
    if (isAuthenticated) {
      router.push("/report")
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                fixithub
              </span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    ✅ Signed In
                  </Badge>
                  <Button onClick={handleGetStarted} className="bg-gradient-to-r from-purple-500 to-pink-500">
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-orange-200 text-orange-600">
                    <Lock className="w-3 h-3 mr-1" />
                    Sign in required
                  </Badge>
                  <Button onClick={() => router.push("/login")} variant="outline">
                    Sign In
                  </Button>
                  <Button
                    onClick={() => router.push("/login")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200">
            🌍 Global Issue Resolution Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Report Issues.
            <br />
            Drive Change.
            <br />
            Build Better Communities.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens worldwide using fixithub to report community issues, connect with authorities,
            and create lasting positive change in their neighborhoods.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={handleStartReporting}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3"
            >
              {isAuthenticated ? (
                <>
                  <Camera className="w-5 h-5 mr-2" />
                  Start Reporting Issues
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Sign In to Report Issues
                </>
              )}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={handleGetStarted}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 border-purple-200 hover:bg-purple-50 bg-transparent"
            >
              {isAuthenticated ? "Go to Dashboard" : "Learn More"}
            </Button>
          </div>

          {!isAuthenticated && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-orange-700">
                <Lock className="w-4 h-4" />
                <span className="font-medium">Authentication Required</span>
              </div>
              <p className="text-sm text-orange-600 mt-1">
                Create a free account to start reporting issues and making a difference in your community.
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Issues Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">120+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How fixithub Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to report issues, track progress, and see real results in your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Report Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Take photos, add location details, and describe community issues that need attention. Our platform
                  routes your report to the right authorities automatically.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-pink-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-xl">Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive real-time updates as authorities review and work on your reports. Stay informed every step of
                  the way until resolution.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">See Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Watch as your community improves through collective action. Celebrate resolved issues and inspire
                  others to make a difference.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Authorities Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connected to Key Authorities</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your reports reach the right people. We're integrated with government agencies and local authorities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "KENHAA",
              "KURA",
              "MP Offices",
              "County Governments",
              "NEMA",
              "Ministry of Health",
              "Police Service",
              "Water Boards",
            ].map((authority, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-sm">{authority}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of changemakers and start reporting issues in your area today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStartReporting}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              {isAuthenticated ? (
                <>
                  <Camera className="w-5 h-5 mr-2" />
                  Start Reporting Now
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Sign Up to Get Started
                </>
              )}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => router.push("/explore")}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
            >
              Explore Issues
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold">fixithub</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering communities worldwide to report and resolve issues together. Building better neighborhoods,
                one report at a time.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  CEO: <span className="font-semibold text-white">ALLOCIOUS KIPROP</span>
                </p>
                <p>
                  Co-Founder: <span className="font-semibold text-white">JUSTIN KIRAGU</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/explore" className="hover:text-white">
                    Explore Issues
                  </Link>
                </li>
                <li>
                  <Link href="/report" className="hover:text-white">
                    Report Issue
                  </Link>
                </li>
                <li>
                  <Link href="/dockets" className="hover:text-white">
                    Government Dockets
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 fixithub - Global Issue Resolution Platform. All rights reserved.</p>
            <p className="mt-2 text-sm">CEO: ALLOCIOUS KIPROP | Co-Founder: JUSTIN KIRAGU</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
