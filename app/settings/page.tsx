"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Bell,
  Shield,
  Moon,
  Sun,
  Smartphone,
  Lock,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  updates: boolean
  marketing: boolean
}

interface PrivacySettings {
  profilePublic: boolean
  showLocation: boolean
  showActivity: boolean
}

interface AccountSettings {
  email: string
  phone: string
  fullName: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  // Load initial settings from localStorage or defaults
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    updates: true,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profilePublic: true,
    showLocation: true,
    showActivity: false,
  })

  const [account, setAccount] = useState<AccountSettings>({
    email: "",
    phone: "",
    fullName: "",
  })

  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")

  // Load settings from localStorage on component mount
  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem("userNotifications")
      const savedPrivacy = localStorage.getItem("userPrivacy")
      const savedAccount = localStorage.getItem("userAccount")
      const savedDarkMode = localStorage.getItem("userDarkMode")
      const savedLanguage = localStorage.getItem("userLanguage")

      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications))
      }
      if (savedPrivacy) {
        setPrivacy(JSON.parse(savedPrivacy))
      }
      if (savedAccount) {
        setAccount(JSON.parse(savedAccount))
      } else {
        // Set default account info from stored user data
        const userEmail = localStorage.getItem("userEmail") || ""
        const userName = localStorage.getItem("userName") || ""
        setAccount({
          email: userEmail,
          phone: "+254 700 000 000",
          fullName: userName || "John Doe",
        })
      }
      if (savedDarkMode) {
        setDarkMode(JSON.parse(savedDarkMode))
      }
      if (savedLanguage) {
        setLanguage(savedLanguage)
      }
    } catch (err) {
      console.error("Error loading settings:", err)
    }
  }, [])

  // Track changes to enable/disable save button
  useEffect(() => {
    setHasChanges(true)
  }, [notifications, privacy, account, darkMode, language])

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: keyof PrivacySettings, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handleAccountChange = (key: keyof AccountSettings, value: string) => {
    setAccount((prev) => ({ ...prev, [key]: value }))
  }

  const validateSettings = (): boolean => {
    setError("")

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!account.email || !emailRegex.test(account.email)) {
      setError("Please enter a valid email address")
      return false
    }

    // Validate phone (basic validation)
    if (!account.phone || account.phone.length < 10) {
      setError("Please enter a valid phone number")
      return false
    }

    // Validate full name
    if (!account.fullName || account.fullName.trim().length < 2) {
      setError("Please enter your full name")
      return false
    }

    return true
  }

  const handleSave = async () => {
    if (!validateSettings()) {
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save all settings to localStorage
      localStorage.setItem("userNotifications", JSON.stringify(notifications))
      localStorage.setItem("userPrivacy", JSON.stringify(privacy))
      localStorage.setItem("userAccount", JSON.stringify(account))
      localStorage.setItem("userDarkMode", JSON.stringify(darkMode))
      localStorage.setItem("userLanguage", language)

      // Update user email and name in main storage
      localStorage.setItem("userEmail", account.email)
      localStorage.setItem("userName", account.fullName)

      // Apply dark mode if enabled
      if (darkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      setSuccess("✅ Settings saved successfully! Your preferences have been updated.")
      setHasChanges(false)

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("Save error:", err)
      setError("❌ Failed to save settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default values?")) {
      setNotifications({
        email: true,
        push: true,
        sms: false,
        updates: true,
        marketing: false,
      })
      setPrivacy({
        profilePublic: true,
        showLocation: true,
        showActivity: false,
      })
      setDarkMode(false)
      setLanguage("en")
      setHasChanges(true)
      setSuccess("Settings reset to defaults. Click 'Save Changes' to apply.")
    }
  }

  const handleDeleteAccount = () => {
    if (
      confirm(
        "⚠️ WARNING: This will permanently delete your account and all data. This action cannot be undone. Are you sure?",
      )
    ) {
      if (confirm("This is your final confirmation. Delete account permanently?")) {
        // Clear all user data
        localStorage.clear()
        alert("Account deleted successfully. You will be redirected to the homepage.")
        router.push("/landing")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
          {hasChanges && <Badge className="ml-auto bg-orange-100 text-orange-800">Unsaved Changes</Badge>}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-20">
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

        <div className="space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={account.fullName}
                    onChange={(e) => handleAccountChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={account.email}
                    onChange={(e) => handleAccountChange("email", e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={account.phone}
                    onChange={(e) => handleAccountChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <Button variant="outline" className="w-fit bg-transparent">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified on your device</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive text messages</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Issue Updates</Label>
                    <p className="text-sm text-gray-600">Updates on your reported issues</p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={(checked) => handleNotificationChange("updates", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-gray-600">News and feature updates</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public Profile</Label>
                    <p className="text-sm text-gray-600">Make your profile visible to others</p>
                  </div>
                  <Switch
                    checked={privacy.profilePublic}
                    onCheckedChange={(checked) => handlePrivacyChange("profilePublic", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Location</Label>
                    <p className="text-sm text-gray-600">Display your location on reports</p>
                  </div>
                  <Switch
                    checked={privacy.showLocation}
                    onCheckedChange={(checked) => handlePrivacyChange("showLocation", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Activity</Label>
                    <p className="text-sm text-gray-600">Let others see your activity</p>
                  </div>
                  <Switch
                    checked={privacy.showActivity}
                    onCheckedChange={(checked) => handlePrivacyChange("showActivity", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  <Moon className="w-4 h-4" />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Language</Label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 border rounded-md bg-white"
                >
                  <option value="en">English</option>
                  <option value="sw">Kiswahili</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="ar">العربية</option>
                  <option value="pt">Português</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download My Data
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
                <Button
                  variant="outline"
                  className="justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={handleReset} disabled={isLoading}>
              Reset to Defaults
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading || !hasChanges}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>

          {/* Settings Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Settings Information</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your settings are saved locally and synced to your account</li>
                    <li>• Email and phone changes may require verification</li>
                    <li>• Privacy settings affect how others see your profile</li>
                    <li>• Dark mode applies immediately after saving</li>
                    <li>• All data is encrypted and secure</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
