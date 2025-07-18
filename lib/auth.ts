import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  name: string
  password: string
  isVerified: boolean
  createdAt: string
  role: "user" | "admin"
}

export interface AuthSession {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  isAuthenticated: boolean
}

// In-memory user storage (in production, use a database)
const users: User[] = [
  {
    id: "1",
    email: "txichub39@gmail.com",
    name: "ALLOCIOUS KIPROP",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    isVerified: true,
    createdAt: new Date().toISOString(),
    role: "admin",
  },
]

// Pending verifications storage
const pendingVerifications: { [email: string]: { code: string; userData: Omit<User, "id" | "isVerified"> } } = {}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static async createUser(userData: {
    email: string
    name: string
    password: string
  }): Promise<{ success: boolean; message: string; verificationCode?: string }> {
    try {
      // Check if user already exists
      const existingUser = users.find((user) => user.email.toLowerCase() === userData.email.toLowerCase())
      if (existingUser) {
        return { success: false, message: "User with this email already exists" }
      }

      // Check if email is already pending verification
      if (pendingVerifications[userData.email.toLowerCase()]) {
        delete pendingVerifications[userData.email.toLowerCase()]
      }

      // Hash password
      const hashedPassword = await this.hashPassword(userData.password)

      // Generate verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

      // Store pending verification
      pendingVerifications[userData.email.toLowerCase()] = {
        code: verificationCode,
        userData: {
          email: userData.email,
          name: userData.name,
          password: hashedPassword,
          createdAt: new Date().toISOString(),
          role: "user",
        },
      }

      return {
        success: true,
        message: "Verification code sent to your email",
        verificationCode,
      }
    } catch (error) {
      console.error("Create user error:", error)
      return { success: false, message: "Failed to create user account" }
    }
  }

  static async verifyEmail(email: string, code: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const pendingVerification = pendingVerifications[email.toLowerCase()]

      if (!pendingVerification) {
        return { success: false, message: "No pending verification found for this email" }
      }

      if (pendingVerification.code !== code) {
        return { success: false, message: "Invalid verification code" }
      }

      // Create verified user
      const newUser: User = {
        id: Date.now().toString(),
        ...pendingVerification.userData,
        isVerified: true,
      }

      // Add to users array
      users.push(newUser)

      // Remove from pending verifications
      delete pendingVerifications[email.toLowerCase()]

      return {
        success: true,
        message: "Email verified successfully",
        user: newUser,
      }
    } catch (error) {
      console.error("Verify email error:", error)
      return { success: false, message: "Failed to verify email" }
    }
  }

  static async loginUser(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

      if (!user) {
        return { success: false, message: "Invalid email or password" }
      }

      if (!user.isVerified) {
        return { success: false, message: "Please verify your email before logging in" }
      }

      const isPasswordValid = await this.comparePassword(password, user.password)

      if (!isPasswordValid) {
        return { success: false, message: "Invalid email or password" }
      }

      return {
        success: true,
        message: "Login successful",
        user,
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Login failed" }
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
  }

  static createSession(user: User): AuthSession {
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      isAuthenticated: true,
    }
  }

  static validateSession(sessionData: any): boolean {
    return (
      sessionData &&
      sessionData.user &&
      sessionData.user.id &&
      sessionData.user.email &&
      sessionData.isAuthenticated === true
    )
  }
}
