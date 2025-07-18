"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, MapPin, Clock, Home, Search, User, Plus, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mockIssues = [
  {
    id: 1,
    user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40", username: "johndoe" },
    category: "Roads - KENHAA",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues and vehicle damage",
    image: "/placeholder.svg?height=300&width=400",
    location: "Nairobi, Kenya",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    status: "Under Review",
  },
  {
    id: 2,
    user: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=40&width=40", username: "sarahw" },
    category: "Waste Management",
    title: "Overflowing garbage bins",
    description: "Garbage bins haven't been collected for over a week, causing health hazards",
    image: "/placeholder.svg?height=300&width=400",
    location: "Mombasa, Kenya",
    timestamp: "4 hours ago",
    likes: 18,
    comments: 12,
    status: "Pending",
  },
  {
    id: 3,
    user: { name: "Mike Johnson", avatar: "/placeholder.svg?height=40&width=40", username: "mikej" },
    category: "MP Office",
    title: "Street lighting issues",
    description: "Multiple street lights not working in residential area, safety concern",
    image: "/placeholder.svg?height=300&width=400",
    location: "Kisumu, Kenya",
    timestamp: "6 hours ago",
    likes: 31,
    comments: 15,
    status: "Resolved",
  },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState({ name: "", email: "", role: "" })
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userEmail = localStorage.getItem("userEmail")
    const userName = localStorage.getItem("userName")
    const userRole = localStorage.getItem("userRole")

    if (!userEmail || !userRole) {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    setUserInfo({
      name: userName || "User",
      email: userEmail,
      role: userRole,
    })
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500"
      case "Under Review":
        return "bg-yellow-500"
      case "Pending":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    router.push("/landing")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              fixithub
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Welcome, {userInfo.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {userInfo.name}!</h2>
          <p className="text-gray-600">Here are the latest community issues and updates.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/report">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-200">
              <CardContent className="p-4 text-center">
                <Plus className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Report New Issue</h3>
                <p className="text-sm text-gray-600">Submit a new community issue</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200">
              <CardContent className="p-4 text-center">
                <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">My Reports</h3>
                <p className="text-sm text-gray-600">View your submitted reports</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/explore">
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-green-200">
              <CardContent className="p-4 text-center">
                <Search className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Explore Issues</h3>
                <p className="text-sm text-gray-600">Browse community reports</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Issues Feed */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Community Issues</h3>

          {mockIssues.map((issue) => (
            <Card key={issue.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={issue.user.avatar || "/placeholder.svg"} alt={issue.user.name} />
                      <AvatarFallback>{issue.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{issue.user.name}</p>
                      <p className="text-xs text-gray-500">@{issue.user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {issue.category}
                    </Badge>
                    <Badge className={`text-xs text-white ${getStatusColor(issue.status)}`}>{issue.status}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{issue.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{issue.description}</p>
                  </div>

                  <div className="relative">
                    <Image
                      src={issue.image || "/placeholder.svg"}
                      alt={issue.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{issue.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{issue.timestamp}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span>{issue.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{issue.comments}</span>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("home")}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
                <Search className="w-5 h-5" />
                <span className="text-xs">Explore</span>
              </Button>
            </Link>
            <Link href="/report">
              <Button
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Plus className="w-5 h-5" />
                <span className="text-xs">Report</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
                <User className="w-5 h-5" />
                <span className="text-xs">Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer for bottom navigation */}
      <div className="h-20"></div>
    </div>
  )
}
