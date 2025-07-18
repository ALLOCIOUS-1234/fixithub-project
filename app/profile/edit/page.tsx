"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    phone: "",
    website: ""
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail")
    const userName = localStorage.getItem("userName")
    
    if (!userEmail) {
      router.push("/login")
      return
    }

    // Load existing user data
    setFormData({
      name: userName || "",
      email: userEmail || "",
      location: "San Francisco, CA", // Mock data
      bio: "Community advocate passionate about improving local infrastructure and environmental issues.",
      phone: "",
      website: ""
    })

    setIsLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Update localStorage
      localStorage.setItem("userName", formData.name)
      localStorage.setItem("userEmail", formData.email)

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      
      // Redirect back to profile after a short delay
      setTimeout(() => {
        router.push("/profile")
      }, 2000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      console.log("Image selected:", file.name)
      setMessage({ type: 'success', text: 'Profile picture updated!' })
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">\
