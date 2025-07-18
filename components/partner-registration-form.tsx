"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, Globe, MapPin, Users, CheckCircle, Loader2, FileText, Shield } from "lucide-react"

const partnerTypes = [
  { id: "government", name: "Government Agency", icon: "🏛️", description: "Municipal, county, or state agencies" },
  { id: "utility", name: "Utility Company", icon: "⚡", description: "Water, electricity, gas, telecommunications" },
  {
    id: "contractor",
    name: "Service Contractor",
    icon: "🔧",
    description: "Construction, maintenance, repair services",
  },
  { id: "nonprofit", name: "Non-Profit Organization", icon: "🤝", description: "Community organizations and NGOs" },
]

const serviceAreas = [
  "Infrastructure Maintenance",
  "Road & Transportation",
  "Water & Utilities",
  "Environmental Services",
  "Public Safety",
  "Community Development",
  "Emergency Response",
  "Waste Management",
]

export function PartnerRegistrationForm() {
  const [formData, setFormData] = useState({
    organizationName: "",
    partnerType: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    description: "",
    serviceAreas: [] as string[],
    licenseNumber: "",
    yearsInBusiness: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceAreaToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter((a) => a !== area)
        : [...prev.serviceAreas, area],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Application Submitted!</CardTitle>
          <CardDescription>Your partner application has been received and is under review.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Application ID:</strong> PA-{Math.floor(Math.random() * 10000)}
              <br />
              You'll receive an email confirmation shortly with next steps.
            </AlertDescription>
          </Alert>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Our team will review your application within 3-5 business days</li>
              <li>• We may contact you for additional information or verification</li>
              <li>• Once approved, you'll receive partner portal access</li>
              <li>• Training materials and onboarding will be provided</li>
            </ul>
          </div>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                organizationName: "",
                partnerType: "",
                contactName: "",
                email: "",
                phone: "",
                website: "",
                address: "",
                description: "",
                serviceAreas: [],
                licenseNumber: "",
                yearsInBusiness: "",
              })
            }}
            className="w-full"
            variant="outline"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          Partner Registration
        </CardTitle>
        <CardDescription>
          Join our network of trusted partners to help resolve community issues efficiently.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Organization Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Organization Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter organization name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License/Registration Number</Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="Business license or registration number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Partner Type *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partnerTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.partnerType === type.id
                        ? "border-strikingly-purple bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setFormData((prev) => ({ ...prev, partnerType: type.id }))}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-sm text-gray-500">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearsInBusiness">Years in Business</Label>
                <Input
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                  placeholder="Number of years"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.example.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Organization Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your organization, services, and experience..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Primary Contact Name *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, city, state, zip"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Service Areas</h3>
            <p className="text-sm text-gray-600">Select the types of issues your organization can help resolve:</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className={`p-3 border rounded-lg cursor-pointer transition-all text-center ${
                    formData.serviceAreas.includes(area)
                      ? "border-strikingly-purple bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleServiceAreaToggle(area)}
                >
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>

            {formData.serviceAreas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Selected:</span>
                {formData.serviceAreas.map((area) => (
                  <Badge key={area} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Terms and Submit */}
          <div className="space-y-6">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                By submitting this application, you agree to our partner terms and conditions. All information will be
                verified during the review process.
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.organizationName ||
                !formData.partnerType ||
                !formData.contactName ||
                !formData.email ||
                !formData.phone ||
                !formData.address ||
                !formData.description
              }
              className="w-full bg-strikingly-purple hover:bg-strikingly-purple/90"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                "Submit Partner Application"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
