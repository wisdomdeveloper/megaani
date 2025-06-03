"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Course } from "@/types/course"

interface CartItem {
  course: Course
  addedAt: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (course: Course) => void
  removeFromCart: (courseId: string) => void
  clearCart: () => void
  isInCart: (courseId: string) => boolean
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = (course: Course) => {
    if (isInCart(course.id)) {
      toast({
        title: "Already in cart",
        description: "This course is already in your cart.",
        variant: "destructive",
      })
      return
    }

    const newItem: CartItem = {
      course,
      addedAt: new Date().toISOString(),
    }

    setItems((prev) => [...prev, newItem])
    toast({
      title: "Added to cart",
      description: `${course.title} has been added to your cart.`,
    })
  }

  const removeFromCart = (courseId: string) => {
    setItems((prev) => prev.filter((item) => item.course.id !== courseId))
    toast({
      title: "Removed from cart",
      description: "Course has been removed from your cart.",
    })
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem("cart")
  }

  const isInCart = (courseId: string) => {
    return items.some((item) => item.course.id === courseId)
  }

  const totalItems = items.length
  const totalPrice = items.reduce((sum, item) => sum + item.course.price, 0)

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
