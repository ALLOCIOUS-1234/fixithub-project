"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Crown,
  Users,
  FileText,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Lock,
  Eye,
  UserX,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Activity,
  User,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminAccessPage() {
  const router = useRouter()

  const adminFeatures = [
    {
      icon: Users,
      title: "User Management",
      description: "View all registered users, their activity, and manage accounts",
      features: ["View user profiles", "Suspend/freeze accounts", "Monitor user activity", "Track user reports"],
      color: "bg-blue-500",
    },
    {
      icon: FileText,
      title: "Issue Oversight",
      description: "Monitor all reported issues across the platform",
      features: ["View all reports", "Track issue status", "Assign to departments", "Moderate content"],
      color: "bg-green-500",
    },
    {
      icon: Shield,
      title: "Partner Management",
      description: "Manage registered government departments and agencies",
      features: ["Register new partners", "View partner performance", "Manage dockets", "Track resolutions"],
      color: "bg-purple-500",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Comprehensive platform analytics and performance metrics",
      features: ["User engagement stats", "Issue resolution rates", "Department performance", "Platform growth"],
      color: "bg-orange-500",
    },
    {
      icon: Settings,
      title: "System Management",
      description: "Configure platform settings and receive suggestions",
      features: ["Platform configuration", "Feature toggles", "App improvements", "System updates"],
      color: "bg-red-500",
    },
    {
      icon: AlertTriangle,
      title: "Moderation Tools",
      description: "Content moderation and user behavior management",
      features: [
        "Flag inappropriate content",
        "Review reported users",
        "Enforce community guidelines",
        "Ban management",
      ],
      color: "bg-yellow-500",
    },
  ]

  const quickStats = [
    { label: "Total Users", value: "3,456", icon: Users, color: "text-blue-600" },
    { label: "Active Issues", value: "89", icon: AlertTriangle, color: "text-red-600" },
    { label: "Resolved Issues", value: "1,058", icon: CheckCircle, color: "text-green-600" },
    { label: "Registered Partners", value: "23", icon: Shield, color: "text-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Access Guide</h1>
                <p className="text-gray-600">Complete platform administration</p>
              </div>
            </div>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-red-500 to-orange-500">
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Admin Credentials */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Lock className="w-5 h-5" />
              Admin Login Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-300 bg-red-100">
              <Crown className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <div className="space-y-2">
                  <div className="font-semibold">🔐 Administrator Access</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Email:</strong>{" "}
                      <code className="bg-red-200 px-2 py-1 rounded text-red-900">txichub39@gmail.com</code>
                    </div>
                    <div>
                      <strong>Password:</strong>{" "}
                      <code className="bg-red-200 px-2 py-1 rounded text-red-900">Any password works</code>
                    </div>
                  </div>
                  <div className="text-xs opacity-75">
                    Note: This is a demo system. In production, secure authentication would be required.
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="flex gap-3">
              <Link href="/login" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Go to Admin Login
                </Button>
              </Link>
              <Link href="/admin" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Direct to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-4 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Features */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard Features</h2>
            <p className="text-gray-600">Complete control over the Universe platform</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${feature.color} rounded-lg flex items-center justify-center`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Admin Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              What You Can Do as Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  User Management
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    View all registered users and their profiles
                  </li>
                  <li className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    Monitor user activity and report history
                  </li>
                  <li className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-gray-400" />
                    Suspend or freeze accounts for policy violations
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Send notifications and updates to users
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  Issue Oversight
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    View all reported issues with location data
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Track issue timeline and resolution progress
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    Assign issues to appropriate departments
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-gray-400" />
                    Flag inappropriate or invalid reports
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  Partner Management
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-400" />
                    Register government departments and agencies
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    Monitor partner performance and response times
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    Manage dockets and tender opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    Maintain partner contact information
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                  Analytics & Insights
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    Real-time platform usage statistics
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    Issue resolution rate tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    User engagement and growth metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-gray-400" />
                    System performance monitoring
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              Getting Started as Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Login as Admin</h3>
                  <p className="text-sm text-gray-600">Use txichub39@gmail.com with any password</p>
                </div>

                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Explore Dashboard</h3>
                  <p className="text-sm text-gray-600">Navigate through all admin features and tools</p>
                </div>

                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Manage Platform</h3>
                  <p className="text-sm text-gray-600">Start managing users, issues, and partners</p>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500">
                    <Crown className="w-5 h-5 mr-2" />
                    Access Admin Dashboard Now
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Platform Administrator</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>ALLOCIOUS KIPROP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>txichub39@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span>CEO & System Administrator</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">System Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span>Universe Issue Resolution Platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Launched: January 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>Serving: Kenya & Beyond</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-600">© 2024 Universe Admin Panel - Comprehensive Platform Management</p>
          <p className="text-xs text-gray-500 mt-1">
            Administrator: <span className="font-semibold">ALLOCIOUS KIPROP</span> (txichub39@gmail.com)
          </p>
        </div>
      </footer>
    </div>
  )
}
