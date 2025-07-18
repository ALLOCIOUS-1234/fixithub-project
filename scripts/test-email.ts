import { emailService } from "../lib/email-service"

async function testEmailService() {
  console.log("🧪 Testing Email Service...")
  console.log("=".repeat(50))

  // Test verification email
  console.log("\n📧 Testing Verification Email...")
  const verificationResult = await emailService.sendVerificationCode("test@example.com", "123456", "Test User")

  console.log("Verification Email Result:", verificationResult ? "✅ Success" : "❌ Failed")

  // Test welcome email
  console.log("\n🎉 Testing Welcome Email...")
  const welcomeResult = await emailService.sendWelcomeEmail("test@example.com", "Test User")

  console.log("Welcome Email Result:", welcomeResult ? "✅ Success" : "❌ Failed")

  console.log("\n" + "=".repeat(50))
  console.log("🏁 Email Service Test Complete")

  if (verificationResult && welcomeResult) {
    console.log("✅ All tests passed!")
  } else {
    console.log("❌ Some tests failed. Check your configuration.")
  }
}

// Run the test
testEmailService().catch(console.error)
