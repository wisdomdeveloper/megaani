"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: "learner" | "instructor"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: "learner" | "instructor") => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Mock authentication - replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        role: email.includes("instructor") ? "instructor" : "learner",
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      })

      // Redirect based on role
      if (mockUser.role === "instructor") {
        router.push("/instructor/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "learner" | "instructor") => {
    try {
      setLoading(true)

      // Mock registration - replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      toast({
        title: "Account created!",
        description: "Welcome to LearnHub. Your account has been created successfully.",
      })

      // Redirect based on role
      if (role === "instructor") {
        router.push("/instructor/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
