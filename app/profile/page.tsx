"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  FileText,
  Edit,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock user data
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  joinedDate: "January 15, 2024",
  location: "San Francisco, CA",
  bio: "Community advocate passionate about improving local infrastructure and environmental issues.",
  stats: {
    reportsSubmitted: 12,
    issuesResolved: 8,
    communityImpact: 156,
    reputation: 4.8,
  },
}

// Mock user reports
const mockReports = [
  {
    id: 1,
    title: "Broken streetlight on Main Street",
    status: "resolved",
    priority: "high",
    submittedAt: "2024-01-20",
    category: "Infrastructure",
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    title: "Pothole on Highway 101",
    status: "in-progress",
    priority: "critical",
    submittedAt: "2024-01-18",
    category: "Roads",
    likes: 28,
    comments: 7,
  },
  {
    id: 3,
    title: "Illegal dumping in Central Park",
    status: "under-review",
    priority: "medium",
    submittedAt: "2024-01-15",
    category: "Environment",
    likes: 12,
    comments: 5,
  },
]

// Mock achievements
const mockAchievements = [
  {
    id: 1,
    title: "First Report",
    description: "Submitted your first issue report",
    icon: "🎯",
    earnedAt: "2024-01-15",
    type: "milestone",
  },
  {
    id: 2,
    title: "Community Helper",
    description: "Helped resolve 5 community issues",
    icon: "🤝",
    earnedAt: "2024-01-25",
    type: "impact",
  },
  {
    id: 3,
    title: "Photo Detective",
    description: "Provided photo evidence for 10 reports",
    icon: "📸",
    earnedAt: "2024-02-01",
    type: "quality",
  },
]

export default function ProfilePage() {
  const [userData, setUserData] = useState(mockUserData)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail")
    const userName = localStorage.getItem("userName")

    if (!userEmail) {
      router.push("/login")
      return
    }

    // Update user data from localStorage
    if (userName) {
      setUserData((prev) => ({
        ...prev,
        name: userName,
        email: userEmail,
      }))
    }

    setIsLoading(false)
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "under-review":
        return "bg-yellow-100 text-yellow-800"
      case "reported":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "under-review":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-strikingly-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/home">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>
            <Link href="/profile/edit">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900">{userData.name}</h2>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {userData.email}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {userData.joinedDate}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {userData.location}
                  </div>
                </div>
                <p className="mt-3 text-gray-700">{userData.bio}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Award className="h-3 w-3 mr-1" />
                  {userData.stats.reputation}/5.0 Rating
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports Submitted</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.stats.reportsSubmitted}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.stats.issuesResolved}</div>
              <p className="text-xs text-muted-foreground">67% resolution rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Impact</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.stats.communityImpact}</div>
              <p className="text-xs text-muted-foreground">People helped</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.stats.reputation}/5.0</div>
              <p className="text-xs text-muted-foreground">Excellent rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">My Reports</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* My Reports */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Issue Reports</CardTitle>
                <CardDescription>Track the status of issues you've reported to the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{report.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Submitted {report.submittedAt}</span>
                          <Badge variant="outline">{report.category}</Badge>
                          <div className="flex items-center space-x-2">
                            <span>{report.likes} likes</span>
                            <span>{report.comments} comments</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(report.priority)}>{report.priority}</Badge>
                        <Badge className={getStatusColor(report.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(report.status)}
                            <span>{report.status}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
                <CardDescription>Recognition for your contributions to the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockAchievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 border rounded-lg text-center">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                      <Badge variant="outline" className="mt-2">
                        Earned {achievement.earnedAt}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent interactions and contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 border-l-4 border-green-500 bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Issue Resolved</p>
                      <p className="text-sm text-gray-600">
                        Your report "Broken streetlight on Main Street" was marked as resolved
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Status Update</p>
                      <p className="text-sm text-gray-600">Your report "Pothole on Highway 101" is now in progress</p>
                      <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border-l-4 border-purple-500 bg-purple-50">
                    <Award className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Achievement Unlocked</p>
                      <p className="text-sm text-gray-600">You earned the "Community Helper" badge</p>
                      <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
