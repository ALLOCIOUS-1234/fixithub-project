"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Camera,
  MapPin,
  Upload,
  CheckCircle,
  AlertTriangle,
  Loader2,
  User,
  Building,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { value: "roads-kenhaa", label: "Roads - KENHAA", authority: "Kenya National Highways Authority" },
  { value: "roads-kura", label: "Roads - KURA", authority: "Kenya Urban Roads Authority" },
  { value: "waste-management", label: "Waste Management", authority: "County Government" },
  { value: "water-sanitation", label: "Water & Sanitation", authority: "Water Service Provider" },
  { value: "mp-office", label: "MP Office", authority: "Member of Parliament" },
  { value: "health-services", label: "Health Services", authority: "Ministry of Health" },
  { value: "education", label: "Education", authority: "Ministry of Education" },
  { value: "security", label: "Security", authority: "National Police Service" },
  { value: "environment", label: "Environment", authority: "NEMA" },
  { value: "corruption", label: "Corruption", authority: "Ethics & Anti-Corruption Commission" },
]

const priorities = [
  { value: "low", label: "Low", color: "bg-green-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-orange-500" },
  { value: "critical", label: "Critical", color: "bg-red-500" },
]

export default function ReportPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [userInfo, setUserInfo] = useState({ name: "", email: "" })
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    location: "",
    contactInfo: "",
    anonymous: false,
  })

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const userEmail = localStorage.getItem("userEmail")
    const userName = localStorage.getItem("userName")
    const userRole = localStorage.getItem("userRole")

    if (!userEmail || !userRole) {
      router.push("/login")
      return
    }

    setUserInfo({
      name: userName || "User",
      email: userEmail,
    })

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }))
        },
        (error) => {
          console.log("Location access denied:", error)
          setFormData((prev) => ({
            ...prev,
            location: "Location not available",
          }))
        },
      )
    }

    setIsLoading(false)
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Please provide a title for your report")
      return false
    }
    if (!formData.description.trim()) {
      setError("Please provide a description of the issue")
      return false
    }
    if (!formData.category) {
      setError("Please select a category")
      return false
    }
    if (!formData.priority) {
      setError("Please select a priority level")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Get selected category info
      const selectedCategory = categories.find((cat) => cat.value === formData.category)

      // Create report object
      const reportData = {
        id: Date.now(),
        ...formData,
        authority: selectedCategory?.authority,
        submittedBy: formData.anonymous ? "Anonymous" : userInfo.name,
        submittedAt: new Date().toISOString(),
        status: "pending",
        image: imagePreview,
      }

      // Save to localStorage (in real app, this would be sent to API)
      const existingReports = JSON.parse(localStorage.getItem("userReports") || "[]")
      existingReports.push(reportData)
      localStorage.setItem("userReports", JSON.stringify(existingReports))

      setSuccess(
        `✅ Report submitted successfully! Your issue has been forwarded to ${selectedCategory?.authority}. You will receive updates via email.`,
      )

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "",
        location: formData.location, // Keep location
        contactInfo: "",
        anonymous: false,
      })
      setSelectedImage(null)
      setImagePreview(null)

      // Auto-hide success message and redirect after 3 seconds
      setTimeout(() => {
        setSuccess("")
        router.push("/home")
      }, 3000)
    } catch (err) {
      console.error("Submit error:", err)
      setError("❌ Failed to submit report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <h1 className="text-xl font-bold">Report Issue</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{userInfo.name}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Status Messages */}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-red-600">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
              <CardDescription>Provide clear details about the issue you want to report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief, descriptive title (e.g., 'Pothole on Main Street')"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the issue, including when you noticed it and how it affects the community..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex flex-col">
                            <span>{category.label}</span>
                            <span className="text-xs text-gray-500">{category.authority}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level *</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
                            <span>{priority.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Evidence */}
          <Card>
            <CardHeader>
              <CardTitle>Location & Evidence</CardTitle>
              <CardDescription>Help authorities locate and understand the issue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <Input
                    id="location"
                    placeholder="Specific location or address"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {formData.location.includes(",") ? "GPS coordinates detected" : "Enter specific address or landmark"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Photo Evidence</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="mx-auto rounded-lg max-h-48 object-cover"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedImage(null)
                          setImagePreview(null)
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-gray-600">Upload a photo of the issue</p>
                        <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                      </div>
                      <label htmlFor="image-upload">
                        <Button type="button" variant="outline" className="cursor-pointer bg-transparent">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How should authorities contact you for updates?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Additional Contact Info (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <Input
                    id="contact"
                    placeholder="Phone number or alternative email"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Mail className="w-4 h-4 text-blue-600" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Primary Contact: {userInfo.email}</p>
                  <p className="text-blue-700">Updates will be sent to this email address</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => handleInputChange("anonymous", e.target.checked.toString())}
                  className="rounded"
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Submit anonymously (your identity will not be shared with authorities)
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Authority Information */}
          {formData.category && (
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">Report Destination</h3>
                    <p className="text-purple-800">
                      Your report will be sent directly to:{" "}
                      <span className="font-semibold">
                        {categories.find((cat) => cat.value === formData.category)?.authority}
                      </span>
                    </p>
                    <p className="text-sm text-purple-700 mt-1">
                      You will receive email updates as your report is processed and resolved.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-purple-500 to-pink-500">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
