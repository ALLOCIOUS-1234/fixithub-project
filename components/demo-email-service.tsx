"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Mail, CheckCircle, AlertTriangle } from "lucide-react"

export function DemoEmailService() {
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const testVerificationEmail = async () => {
    if (!email || !userName) {
      setResult({ success: false, message: "Please enter both email and name" })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString()

      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          userName,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: `✅ Verification email sent successfully to ${email}! Code: ${code}`,
        })
      } else {
        setResult({
          success: false,
          message: `❌ Failed to send email: ${data.error}`,
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testWelcomeEmail = async () => {
    if (!email || !userName) {
      setResult({ success: false, message: "Please enter both email and name" })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/send-welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userName,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: `✅ Welcome email sent successfully to ${email}!`,
        })
      } else {
        setResult({
          success: false,
          message: `❌ Failed to send email: ${data.error}`,
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Service Test
        </CardTitle>
        <CardDescription>Test the email service functionality with real emails</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="test-email">Email Address</Label>
          <Input
            id="test-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="test-name">Full Name</Label>
          <Input
            id="test-name"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={testVerificationEmail} disabled={isLoading || !email || !userName} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Verification Email"
            )}
          </Button>

          <Button
            onClick={testWelcomeEmail}
            disabled={isLoading || !email || !userName}
            variant="outline"
            className="w-full bg-transparent"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Welcome Email"
            )}
          </Button>
        </div>

        {result && (
          <Alert variant={result.success ? "default" : "destructive"}>
            {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription className="text-sm">{result.message}</AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Emails are sent using Resend service</p>
          <p>• Check your spam folder if you don't see the email</p>
          <p>• Verification codes are randomly generated for testing</p>
        </div>
      </CardContent>
    </Card>
  )
}
