import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { emailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword } = body

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Create user
    const result = await AuthService.createUser({ name, email, password })

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    // Send verification email
    if (result.verificationCode) {
      const emailSent = await emailService.sendVerificationCode(email, result.verificationCode, name)

      if (!emailSent) {
        return NextResponse.json({ error: "Failed to send verification email" }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully. Please check your email for verification code.",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
