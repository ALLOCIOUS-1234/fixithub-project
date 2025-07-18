import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY || "re_Pd79efJV_K7yZMbjBTbXPGWy5omyqHoW1")

export interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export class EmailService {
  private static instance: EmailService
  private fromEmail: string

  private constructor() {
    // Prefer a verified domain supplied by the developer; otherwise use Resend's sandbox domain.
    this.fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev"
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendVerificationCode(email: string, code: string, userName: string): Promise<boolean> {
    const emailTemplate = this.getVerificationEmailTemplate(code, userName)
    return this.dispatch({
      from: `Universe Admin <${this.fromEmail}>`,
      to: [email],
      subject: "🌍 Verify Your Universe Account - Action Required",
      html: emailTemplate,
    })
  }

  async sendWelcomeEmail(email: string, userName: string): Promise<boolean> {
    const emailTemplate = this.getWelcomeEmailTemplate(userName)
    return this.dispatch({
      from: `Universe Team <${this.fromEmail}>`,
      to: [email],
      subject: "🎉 Welcome to Universe - Your Account is Ready!",
      html: emailTemplate,
    })
  }

  private async dispatch(msg: EmailOptions): Promise<boolean> {
    const { data, error } = await resend.emails.send(msg)

    if (!error) {
      console.log("✅ email sent:", data?.id)
      return true
    }

    // Auto-repair: try once again with Resend's sandbox domain
    if (/domain is not verified/i.test(error.message ?? "") && msg.from !== "onboarding@resend.dev") {
      console.warn("⚠️  domain not verified – retrying with onboarding@resend.dev")
      const retry = { ...msg, from: "onboarding@resend.dev" }
      const { error: retryErr } = await resend.emails.send(retry)
      if (!retryErr) return true
      console.error("❌ sandbox retry failed:", retryErr)
    } else {
      console.error("❌ email error:", error)
    }
    return false
  }

  private getVerificationEmailTemplate(code: string, userName: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Universe Account</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 0; 
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin: 20px;
            }
            .header { 
                background: linear-gradient(135deg, #8B5CF6, #EC4899); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
            }
            .logo { 
                font-size: 32px; 
                font-weight: bold; 
                margin-bottom: 10px; 
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            .logo-icon {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            .content { 
                background: white; 
                padding: 40px 30px; 
            }
            .code-box { 
                background: linear-gradient(135deg, #f8fafc, #e2e8f0); 
                border: 3px solid #8B5CF6; 
                border-radius: 16px; 
                padding: 30px; 
                text-align: center; 
                margin: 30px 0; 
                position: relative;
            }
            .code-box::before {
                content: '🔐';
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 0 10px;
                font-size: 24px;
            }
            .verification-code { 
                font-size: 36px; 
                font-weight: bold; 
                color: #8B5CF6; 
                letter-spacing: 12px; 
                margin: 15px 0; 
                font-family: 'Courier New', monospace;
                background: white;
                padding: 15px;
                border-radius: 8px;
                border: 2px dashed #8B5CF6;
            }
            .footer { 
                text-align: center; 
                margin-top: 30px; 
                padding: 30px; 
                border-top: 1px solid #e2e8f0; 
                color: #64748b; 
                font-size: 14px; 
                background: #f8fafc;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <div class="logo-icon">🌍</div>
                    Universe
                </div>
                <p style="margin: 0; opacity: 0.9;">Global Issue Resolution Platform</p>
            </div>
            
            <div class="content">
                <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${userName}! 👋</h2>
                <p style="font-size: 16px; color: #475569;">Welcome to Universe! We're excited to have you join our community of citizens working together to resolve issues and improve communities worldwide.</p>
                
                <p style="font-size: 16px; color: #475569;">To complete your account setup and start reporting issues, please verify your email address using the code below:</p>
                
                <div class="code-box">
                    <p style="margin: 0; font-size: 16px; color: #64748b; font-weight: 600;">Your Verification Code:</p>
                    <div class="verification-code">${code}</div>
                    <p style="margin: 0; font-size: 14px; color: #64748b;">Enter this code in the app to verify your account</p>
                </div>
                
                <div style="border-top: 1px solid #e2e8f0; padding-top: 25px; margin-top: 30px;">
                    <p style="color: #475569; margin-bottom: 5px;">Best regards,</p>
                    <p style="color: #1e293b; font-weight: bold; margin: 0;">ALLOCIOUS KIPROP</p>
                    <p style="color: #64748b; font-size: 14px; margin: 5px 0;">CEO & Founder, Universe</p>
                    <p style="color: #64748b; font-size: 14px; margin: 0;">Co-Founder: JUSTIN KIRAGU</p>
                </div>
            </div>
            
            <div class="footer">
                <p style="margin: 0 0 10px 0;">© 2024 Universe - Global Issue Resolution Platform</p>
                <p style="margin: 0; font-size: 12px;">CEO: ALLOCIOUS KIPROP | Co-Founder: JUSTIN KIRAGU</p>
            </div>
        </div>
    </body>
    </html>
    `
  }

  private getWelcomeEmailTemplate(userName: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Universe!</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 0; 
                background-color: #f0fdf4;
            }
            .container {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin: 20px;
            }
            .header { 
                background: linear-gradient(135deg, #10B981, #3B82F6); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
            }
            .logo { 
                font-size: 32px; 
                font-weight: bold; 
                margin-bottom: 10px; 
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            .logo-icon {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }
            .content { 
                background: white; 
                padding: 40px 30px; 
            }
            .success-box { 
                background: linear-gradient(135deg, #D1FAE5, #A7F3D0); 
                border: 3px solid #10B981; 
                border-radius: 16px; 
                padding: 30px; 
                text-align: center; 
                margin: 30px 0; 
                position: relative;
            }
            .success-box::before {
                content: '🎉';
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 0 10px;
                font-size: 24px;
            }
            .footer { 
                text-align: center; 
                margin-top: 30px; 
                padding: 30px; 
                border-top: 1px solid #e2e8f0; 
                color: #64748b; 
                font-size: 14px; 
                background: #f0fdf4;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <div class="logo-icon">🌍</div>
                    Welcome to Universe!
                </div>
                <p style="margin: 0; opacity: 0.9;">Your account is now active and ready to use</p>
            </div>
            
            <div class="content">
                <div class="success-box">
                    <h2 style="color: #10B981; margin: 0 0 10px 0;">✅ Account Verified Successfully!</h2>
                    <p style="margin: 0; color: #059669; font-weight: 500;">You're now part of the Universe community</p>
                </div>
                
                <h2 style="color: #1e293b;">Hello ${userName}! 🚀</h2>
                <p style="font-size: 16px; color: #475569;">Congratulations! Your Universe account has been successfully verified and is now ready to use. You're joining a global community of citizens making real change in their communities.</p>
                
                <div style="border-top: 1px solid #e2e8f0; padding-top: 25px; margin-top: 30px;">
                    <p style="color: #475569; margin-bottom: 5px;">Best regards,</p>
                    <p style="color: #1e293b; font-weight: bold; margin: 0;">ALLOCIOUS KIPROP</p>
                    <p style="color: #64748b; font-size: 14px; margin: 5px 0;">CEO & Founder, Universe</p>
                    <p style="color: #64748b; font-size: 14px; margin: 0;">Co-Founder: JUSTIN KIRAGU</p>
                </div>
            </div>
            
            <div class="footer">
                <p style="margin: 0 0 10px 0;">© 2024 Universe - Global Issue Resolution Platform</p>
                <p style="margin: 0; font-size: 12px;">CEO: ALLOCIOUS KIPROP | Co-Founder: JUSTIN KIRAGU</p>
            </div>
        </div>
    </body>
    </html>
    `
  }
}

export const emailService = EmailService.getInstance()
