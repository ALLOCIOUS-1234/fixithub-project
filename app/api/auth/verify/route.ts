import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { emailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    if (!email || !code) {
      return NextResponse.json({ error: "Email and verification code are required" }, { status: 400 })
    }

    // Verify email
    const result = await AuthService.verifyEmail(email, code)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    // Send welcome email
    if (result.user) {
      await emailService.sendWelcomeEmail(result.user.email, result.user.name)
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      user: result.user,
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
