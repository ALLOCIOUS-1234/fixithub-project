"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  Users,
  Eye,
  Download,
  ExternalLink,
  Home,
  Plus,
  User,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const docketCategories = [
  "All",
  "Government Tenders",
  "Anti-Corruption",
  "Public Procurement",
  "Development Projects",
  "NGO Opportunities",
  "Public Consultations",
  "Policy Updates",
  "Transparency Reports",
]

const mockDockets = [
  {
    id: 1,
    category: "Government Tenders",
    title: "Construction of Nairobi-Nakuru Highway Phase 2",
    organization: "Kenya National Highways Authority (KENHAA)",
    description:
      "Tender for the construction of 120km dual carriageway from Nairobi to Nakuru with modern infrastructure including bridges, interchanges, and service roads.",
    budget: "KSh 45.2 Billion",
    deadline: "2024-02-15",
    location: "Nairobi - Nakuru",
    status: "Open",
    applicants: 23,
    publishedDate: "2024-01-10",
    contactEmail: "tenders@kenha.co.ke",
    requirements: ["Valid contractor license", "Minimum 10 years experience", "Financial capacity proof"],
    documents: ["Tender Document.pdf", "Technical Specifications.pdf", "Terms & Conditions.pdf"],
    image: "/placeholder.svg?height=200&width=300",
    priority: "High",
    transparency: 95,
  },
  {
    id: 2,
    category: "Anti-Corruption",
    title: "Report Corruption in Public Procurement",
    organization: "Ethics and Anti-Corruption Commission (EACC)",
    description:
      "Anonymous reporting platform for corruption cases in government procurement processes. Help us build a transparent Kenya by reporting suspicious activities.",
    budget: "Confidential",
    deadline: "Ongoing",
    location: "Nationwide",
    status: "Active",
    applicants: 156,
    publishedDate: "2024-01-01",
    contactEmail: "report@eacc.go.ke",
    requirements: ["Anonymous reporting available", "Evidence documentation", "Witness protection assured"],
    documents: ["Reporting Guidelines.pdf", "Whistleblower Protection.pdf"],
    image: "/placeholder.svg?height=200&width=300",
    priority: "Critical",
    transparency: 100,
  },
  {
    id: 3,
    category: "Development Projects",
    title: "Affordable Housing Initiative - Kibera Upgrade",
    organization: "Ministry of Housing and Urban Development",
    description:
      "Comprehensive slum upgrading project in Kibera including construction of 5,000 affordable housing units, infrastructure development, and community facilities.",
    budget: "KSh 12.8 Billion",
    deadline: "2024-03-01",
    location: "Kibera, Nairobi",
    status: "Open",
    applicants: 45,
    publishedDate: "2024-01-08",
    contactEmail: "housing@government.go.ke",
    requirements: ["Social impact assessment", "Community engagement plan", "Environmental compliance"],
    documents: ["Project Proposal.pdf", "Community Guidelines.pdf", "Environmental Impact.pdf"],
    image: "/placeholder.svg?height=200&width=300",
    priority: "High",
    transparency: 88,
  },
  {
    id: 4,
    category: "NGO Opportunities",
    title: "Youth Empowerment and Skills Development Program",
    organization: "Kenya Youth Development Agency",
    description:
      "Partnership opportunities for NGOs to implement youth skills training programs in technology, agriculture, and entrepreneurship across 47 counties.",
    budget: "KSh 2.3 Billion",
    deadline: "2024-02-20",
    location: "All 47 Counties",
    status: "Open",
    applicants: 78,
    publishedDate: "2024-01-12",
    contactEmail: "partnerships@youth.go.ke",
    requirements: ["Registered NGO status", "Youth program experience", "County-level presence"],
    documents: ["Partnership Framework.pdf", "Application Form.pdf", "Evaluation Criteria.pdf"],
    image: "/placeholder.svg?height=200&width=300",
    priority: "Medium",
    transparency: 92,
  },
  {
    id: 5,
    category: "Public Consultations",
    title: "National Digital Identity System Public Participation",
    organization: "Ministry of ICT and Digital Economy",
    description:
      "Public consultation on the implementation of a comprehensive digital identity system. Your input will shape Kenya's digital future and ensure privacy protection.",
    budget: "KSh 8.5 Billion",
    deadline: "2024-01-30",
    location: "Virtual & Regional Centers",
    status: "Open",
    applicants: 234,
    publishedDate: "2024-01-05",
    contactEmail: "digitalid@ict.go.ke",
    requirements: ["Kenyan citizenship", "Valid ID", "Online registration"],
    documents: ["Consultation Framework.pdf", "Privacy Policy.pdf", "Implementation Plan.pdf"],
    image: "/placeholder.svg?height=200&width=300",
    priority: "High",
    transparency: 96,
  },
  {
    id: 6,
    category: "Transparency Reports",
    title: "County Government Budget Allocation Transparency Report 2024",
    organization: "Controller of Budget",
    description:
      "Comprehensive report on budget allocation and utilization across all 47 county governments. Track how public funds are being used for development projects.",
    budget: "KSh 370 Billion (Total County Allocation)",
    deadline: "Quarterly Updates",
    location: "All Counties",
    status: "Published",
    applicants: 0,
    publishedDate: "2024-01-15",
    contactEmail: "transparency@cob.go.ke",
    requirements: ["Public access", "No registration required"],
    documents: ["Q4 2023 Report.pdf", "Budget Analysis.pdf", "Performance Indicators.pdf"],
    image: "/placeholder.svg?height=200&width=300",
    priority: "Medium",
    transparency: 100,
  },
]

export default function DocketsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDocket, setSelectedDocket] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-500"
      case "Active":
        return "bg-blue-500"
      case "Published":
        return "bg-purple-500"
      case "Closed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-600"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredDockets = mockDockets.filter((docket) => {
    const matchesCategory = selectedCategory === "All" || docket.category === selectedCategory
    const matchesSearch =
      docket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      docket.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      docket.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (selectedDocket) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedDocket(null)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Docket Details</h1>
            </div>
          </div>
        </header>

        {/* Docket Details */}
        <main className="max-w-4xl mx-auto px-4 py-6 pb-20">
          <div className="space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Image
                    src={selectedDocket.image || "/placeholder.svg"}
                    alt={selectedDocket.title}
                    width={300}
                    height={200}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-2xl font-bold mb-2">{selectedDocket.title}</h1>
                        <p className="text-lg text-gray-600 mb-2">{selectedDocket.organization}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={`text-white ${getStatusColor(selectedDocket.status)}`}>
                          {selectedDocket.status}
                        </Badge>
                        <Badge className={`text-white ${getPriorityColor(selectedDocket.priority)}`}>
                          {selectedDocket.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">{selectedDocket.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>{selectedDocket.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span>{selectedDocket.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>{selectedDocket.applicants} Applicants</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{selectedDocket.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedDocket.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents & Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDocket.documents.map((doc: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">{doc}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact & Apply */}
            <Card>
              <CardHeader>
                <CardTitle>Contact & Application</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Contact Email:</span>
                    <a href={`mailto:${selectedDocket.contactEmail}`} className="text-blue-600 hover:underline">
                      {selectedDocket.contactEmail}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">Transparency Score:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${selectedDocket.transparency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedDocket.transparency}%</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="bg-gradient-to-r from-blue-500 to-green-500">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Government Dockets</h1>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm opacity-90">Active Tenders</div>
            </div>
            <div>
              <div className="text-2xl font-bold">KSh 2.3T</div>
              <div className="text-sm opacity-90">Total Value</div>
            </div>
            <div>
              <div className="text-2xl font-bold">47</div>
              <div className="text-sm opacity-90">Counties Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm opacity-90">Transparency Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tenders, projects, consultations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {docketCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Dockets Grid */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid gap-6">
          {filteredDockets.map((docket) => (
            <Card
              key={docket.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedDocket(docket)}
            >
              <div className="flex gap-4 p-6">
                <Image
                  src={docket.image || "/placeholder.svg"}
                  alt={docket.title}
                  width={300}
                  height={200}
                  className="w-32 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge variant="outline" className="mb-2 text-xs">
                        {docket.category}
                      </Badge>
                      <h3 className="font-semibold text-lg leading-tight mb-1">{docket.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{docket.organization}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`text-white ${getStatusColor(docket.status)}`}>{docket.status}</Badge>
                      <Badge className={`text-white ${getPriorityColor(docket.priority)}`}>{docket.priority}</Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{docket.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{docket.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{docket.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{docket.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{docket.applicants} applicants</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Transparency:</span>
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full">
                        <div
                          className="h-1.5 bg-green-500 rounded-full"
                          style={{ width: `${docket.transparency}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{docket.transparency}%</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDockets.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No dockets found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
                <Home className="w-5 h-5" />
                <span className="text-xs">Home</span>
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
                <Search className="w-5 h-5" />
                <span className="text-xs">Explore</span>
              </Button>
            </Link>
            <Button
              variant="default"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 bg-gradient-to-r from-blue-500 to-green-500"
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs">Dockets</span>
            </Button>
            <Link href="/report">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
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
    </div>
  )
}
