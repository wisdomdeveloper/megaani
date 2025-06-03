"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Course } from "@/types/course"
import { Clock, Users, BarChart, Star, Play, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useCurrency } from "@/context/currency-context"
import { useRouter } from "next/navigation"

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const { addToCart, isInCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { convertPrice, formatPrice, isLoading } = useCurrency()
  const router = useRouter()

  const inCart = isInCart(course.id)

  // Convert prices to user's currency
  const convertedPrice = convertPrice(course.price)
  const convertedOriginalPrice = course.originalPrice ? convertPrice(course.originalPrice) : null

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    addToCart(course)
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // If not in cart, add it first
    if (!inCart) {
      addToCart(course)
    }

    // Redirect to payment page
    router.push(`/payment?courseId=${course.id}`)
  }

  return (
    <div className="bg-muted/50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Badge variant="outline">{course.category}</Badge>
            <h1 className="text-3xl font-bold sm:text-4xl">{course.title}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-muted-foreground ml-1">({course.totalRatings} ratings)</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{course.purchases.toLocaleString()} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <BarChart className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="capitalize">{course.level}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={course.instructor.avatar || "/placeholder.svg?height=40&width=40"}
                alt={course.instructor.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{course.instructor.name}</p>
                <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
              </div>
            </div>
          </div>
          <div className="order-first lg:order-last">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <img
                    src={course.thumbnail || "/placeholder.svg?height=200&width=300"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      {isLoading ? (
                        <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
                      ) : (
                        <>
                          <div className="text-2xl font-bold">
                            {course.price === 0 ? "Free" : formatPrice(convertedPrice)}
                          </div>
                          {convertedOriginalPrice && convertedOriginalPrice > convertedPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {formatPrice(convertedOriginalPrice)}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {course.isPurchased ? (
                    <Button className="w-full" size="lg" asChild>
                      <a href={`/course/${course.id}/learn`}>
                        <Play className="mr-2 h-4 w-4" />
                        Continue Learning
                      </a>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button className="w-full" size="lg" onClick={handleBuyNow}>
                        <Play className="mr-2 h-4 w-4" />
                        Buy Course
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={inCart}
                      >
                        {inCart ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  <div className="text-center text-sm text-muted-foreground">30-day money-back guarantee</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
