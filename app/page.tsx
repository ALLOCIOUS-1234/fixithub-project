"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const userEmail = localStorage.getItem("userEmail")
    const userRole = localStorage.getItem("userRole")
    setIsAuthenticated(!!(userEmail && userRole))

    // Redirect to landing page
    router.push("/landing")
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

  const handleGetStarted = () => {
    router.push("/login")
  }

  const handleReportClick = () => {
    // Check if user is authenticated before allowing access to report page
    const userEmail = localStorage.getItem("userEmail")
    const userRole = localStorage.getItem("userRole")

    if (userEmail && userRole) {
      // User is authenticated, allow access to report page
      router.push("/report")
    } else {
      // User is not authenticated, redirect to login
      router.push("/login")
    }
  }

  const handleProfileClick = () => {
    // Check if user is authenticated before allowing access to profile
    const userEmail = localStorage.getItem("userEmail")
    const userRole = localStorage.getItem("userRole")

    if (userEmail && userRole) {
      // User is authenticated, allow access to profile
      router.push("/profile")
    } else {
      // User is not authenticated, redirect to login
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  )
}
