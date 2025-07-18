import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 API: Verification email request received")

    // Parse request body
    const body = await request.json()
    const { email, code, userName } = body

    console.log("📧 API: Email:", email)
    console.log("🔢 API: Code:", code)
    console.log("👤 API: User:", userName)

    // Validate input
    if (!email || !code || !userName) {
      console.error("❌ API: Missing required fields")
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "Email, code, and userName are required",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error("❌ API: Invalid email format")
      return NextResponse.json(
        {
          error: "Invalid email format",
          details: "Please provide a valid email address",
        },
        { status: 400 },
      )
    }

    // Validate code format (6 digits)
    if (!/^\d{6}$/.test(code)) {
      console.error("❌ API: Invalid code format")
      return NextResponse.json(
        {
          error: "Invalid code format",
          details: "Code must be 6 digits",
        },
        { status: 400 },
      )
    }

    // Check environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ API: Missing RESEND_API_KEY")
      return NextResponse.json(
        {
          error: "Email service not configured",
          details: "RESEND_API_KEY environment variable is missing",
        },
        { status: 500 },
      )
    }

    console.log("📤 API: Attempting to send verification email...")

    // Send verification email
    const emailSent = await emailService.sendVerificationCode(email, code, userName)

    if (!emailSent) {
      console.error("❌ API: Failed to send email")
      return NextResponse.json(
        {
          error: "Failed to send verification email",
          details: "Email service returned false - check server logs",
        },
        { status: 500 },
      )
    }

    console.log("✅ API: Verification email sent successfully")
    return NextResponse.json(
      {
        success: true,
        message: "Verification email sent successfully",
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("💥 API: Unexpected error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
