"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Clock, ThumbsUp, MessageCircle, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for issues
const mockIssues = [
  {
    id: 1,
    title: "Broken streetlight on Main Street",
    description: "The streetlight has been out for 3 days, making it dangerous for pedestrians at night.",
    location: "Main Street, Downtown",
    category: "Infrastructure",
    status: "In Progress",
    priority: "High",
    reportedBy: "John Doe",
    reportedAt: "2 hours ago",
    likes: 15,
    comments: 3,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Pothole causing traffic issues",
    description: "Large pothole on Highway 101 is causing vehicles to swerve dangerously.",
    location: "Highway 101, Mile Marker 15",
    category: "Roads",
    status: "Reported",
    priority: "Critical",
    reportedBy: "Jane Smith",
    reportedAt: "5 hours ago",
    likes: 28,
    comments: 7,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Illegal dumping in park",
    description: "Someone has dumped construction waste in Central Park near the playground.",
    location: "Central Park, Playground Area",
    category: "Environment",
    status: "Under Review",
    priority: "Medium",
    reportedBy: "Mike Johnson",
    reportedAt: "1 day ago",
    likes: 12,
    comments: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Water leak flooding sidewalk",
    description: "Burst water pipe is flooding the sidewalk and creating a safety hazard.",
    location: "Oak Avenue, Block 200",
    category: "Utilities",
    status: "Resolved",
    priority: "High",
    reportedBy: "Sarah Wilson",
    reportedAt: "3 days ago",
    likes: 22,
    comments: 8,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const categories = ["All", "Infrastructure", "Roads", "Environment", "Utilities", "Safety"]
const statuses = ["All", "Reported", "Under Review", "In Progress", "Resolved"]
const priorities = ["All", "Low", "Medium", "High", "Critical"]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || issue.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || issue.status === selectedStatus
    const matchesPriority = selectedPriority === "All" || issue.priority === selectedPriority

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Reported":
        return "bg-red-100 text-red-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500 text-white"
      case "High":
        return "bg-orange-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Explore Issues</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search issues by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-strikingly-purple focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-strikingly-purple focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-strikingly-purple focus:border-transparent"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredIssues.length} of {mockIssues.length} issues
          </p>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img src={issue.image || "/placeholder.svg"} alt={issue.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{issue.title}</CardTitle>
                  <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                </div>
                <CardDescription className="line-clamp-2">{issue.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {issue.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {issue.reportedAt}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {issue.reportedBy
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{issue.reportedBy}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {issue.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {issue.comments}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {issue.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No issues found matching your criteria</div>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setSelectedStatus("All")
                setSelectedPriority("All")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
