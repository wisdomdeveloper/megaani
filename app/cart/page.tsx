"use client"

import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useCurrency } from "@/context/currency-context"
import { Trash2, ShoppingCart, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, totalPrice, removeFromCart, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { convertPrice, formatPrice } = useCurrency()
  const router = useRouter()

  // Convert total price to user's currency
  const convertedTotalPrice = convertPrice(totalPrice)

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    router.push("/payment")
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            <Card>
              <CardContent className="p-12 text-center">
                <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't added any courses to your cart yet.</p>
                <Button asChild>
                  <Link href="/browse-courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart ({items.length} items)</h1>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.course.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.course.thumbnail || "/placeholder.svg?height=80&width=120"}
                        alt={item.course.title}
                        className="h-20 w-30 rounded object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">{item.course.title}</h3>
                        <p className="text-sm text-muted-foreground">by {item.course.instructor.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.course.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="capitalize">{item.course.level}</span>
                          <span>{item.course.duration}</span>
                          <span>{item.course.purchases.toLocaleString()} students</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-lg font-bold">
                          {item.course.price === 0 ? "Free" : formatPrice(convertPrice(item.course.price))}
                        </div>
                        {item.course.originalPrice && item.course.originalPrice > item.course.price && (
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(convertPrice(item.course.originalPrice))}
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.course.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.course.id} className="flex justify-between text-sm">
                        <span className="line-clamp-1">{item.course.title}</span>
                        <span>{formatPrice(convertPrice(item.course.price))}</span>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(convertedTotalPrice)}</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">30-day money-back guarantee</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
