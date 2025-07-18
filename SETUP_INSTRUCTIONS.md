# Universe App Setup Instructions

## Prerequisites

- Node.js 18+ installed
- A Resend account for email functionality
- Git for version control

## Environment Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd universe-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Variables**
   
   Copy `.env.example` to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Update the following variables in `.env.local`:
   
   \`\`\`env
   # Required: Resend API Key
   RESEND_API_KEY=re_your_actual_api_key_here
   
   # Optional: Custom verified domain for emails
   # If not provided, will use onboarding@resend.dev
   RESEND_FROM_EMAIL=notifications@yourdomain.com
   \`\`\`

## Getting Your Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys in your dashboard
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

## Email Configuration

### Option 1: Use Sandbox Domain (Easiest)
- Leave `RESEND_FROM_EMAIL` empty or remove it
- Emails will be sent from `onboarding@resend.dev`
- Works immediately, no domain verification needed

### Option 2: Use Your Own Domain
1. Add your domain in Resend dashboard
2. Verify domain ownership (DNS records)
3. Set `RESEND_FROM_EMAIL=notifications@yourdomain.com`
4. Replace `yourdomain.com` with your actual domain

## Running the Application

1. **Development mode**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Production build**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## Testing Email Functionality

1. Navigate to the signup page
2. Create a new account with a real email address
3. Check your email for the verification code
4. If using sandbox domain, check spam folder

## Admin Access

- **Admin Email**: `txichub39@gmail.com`
- **Password**: Any password (demo purposes)
- **Admin Dashboard**: `/admin`

## Features

### User Features
- ✅ User registration with email verification
- ✅ Issue reporting with photos and location
- ✅ Browse and explore community issues
- ✅ User profile management
- ✅ Settings with dark mode
- ✅ Government dockets integration

### Admin Features
- ✅ Admin dashboard with analytics
- ✅ User management
- ✅ Issue management and moderation
- ✅ System settings configuration

### Email Features
- ✅ Verification emails with styled templates
- ✅ Welcome emails after verification
- ✅ Automatic fallback to sandbox domain
- ✅ Error handling and retry logic

## Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   \`\`\`bash
   npm i -g vercel
   vercel
   \`\`\`

2. **Set Environment Variables**
   In Vercel dashboard, add:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (optional)

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting provider

## Troubleshooting

### Email Issues

1. **Emails not sending**
   - Check your Resend API key is correct
   - Verify you have credits in your Resend account
   - Check browser console for error messages

2. **Domain verification errors**
   - Use sandbox domain (`onboarding@resend.dev`) for testing
   - Verify DNS records are correctly set up
   - Wait for DNS propagation (up to 24 hours)

3. **Emails in spam folder**
   - This is normal for new domains
   - Use a verified domain with proper SPF/DKIM records
   - Sandbox domain has better deliverability

### Development Issues

1. **Port already in use**
   \`\`\`bash
   npx kill-port 3000
   npm run dev
   \`\`\`

2. **Module not found errors**
   \`\`\`bash
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

3. **TypeScript errors**
   \`\`\`bash
   npm run lint
   \`\`\`

## Support

For issues or questions:
- Check the browser console for error messages
- Verify environment variables are set correctly
- Ensure Resend API key has sufficient credits
- Contact support if email delivery issues persist

## License

This project is for demonstration purposes. Please review and comply with all applicable licenses and terms of service.
