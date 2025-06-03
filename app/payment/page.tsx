"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useCurrency } from "@/context/currency-context"
import { useToast } from "@/hooks/use-toast"
import { getCourseById } from "@/lib/data/courses"
import { CreditCard, Lock, Shield } from "lucide-react"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { items, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { convertPrice, formatPrice, currency } = useCurrency()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const courseId = searchParams.get("courseId")
  const singleCourse = courseId ? getCourseById(courseId) : null

  // Determine what we're purchasing
  const purchaseItems = singleCourse ? [singleCourse] : items.map((item) => item.course)
  const totalAmount = purchaseItems.reduce((sum, course) => sum + course.price, 0)

  // Convert total amount to user's currency
  const convertedTotalAmount = convertPrice(totalAmount)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart after successful payment
      if (!singleCourse) {
        clearCart()
      }

      toast({
        title: "Payment successful!",
        description: "You now have access to your purchased courses.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (purchaseItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">No items to purchase</h1>
            <p className="text-muted-foreground mb-6">Add some courses to your cart first.</p>
            <Button asChild>
              <a href="/browse-courses">Browse Courses</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>Enter your payment details to complete the purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Processing..." : `Complete Payment - ${formatPrice(convertedTotalAmount)}`}
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {purchaseItems.map((course) => (
                  <div key={course.id} className="flex items-start space-x-3">
                    <img
                      src={course.thumbnail || "/placeholder.svg?height=60&width=80"}
                      alt={course.title}
                      className="h-15 w-20 rounded object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">by {course.instructor.name}</p>
                      <div className="text-sm font-semibold">
                        {course.price === 0 ? "Free" : formatPrice(convertPrice(course.price))}
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(convertedTotalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax:</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(convertedTotalAmount)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground text-right">Paying in {currency.code}</div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">30-day money-back guarantee</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    If you're not satisfied with your purchase, we'll refund your money within 30 days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
