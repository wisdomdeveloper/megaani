"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useCurrency } from "@/context/currency-context"
import type { Course } from "@/types/course"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const { addToCart, isInCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { convertPrice, formatPrice, isLoading } = useCurrency()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }

    addToCart(course)
  }

  const inCart = isInCart(course.id)
  const convertedPrice = convertPrice(course.price)
  const convertedOriginalPrice = course.originalPrice ? convertPrice(course.originalPrice) : null

  return (
    <div className="group">
      <Link href={`/course/${course.id}`}>
        <Card className="overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 card-shadow-lg bg-white dark:bg-gray-900 dark:border dark:border-gray-800 dark:hover:shadow-violet-500/25">
          <div className="aspect-video w-full overflow-hidden relative">
            <img
              src={course.thumbnail || "/placeholder.svg?height=200&width=300"}
              alt={course.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Dark theme overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent dark:from-gray-900/30 dark:to-transparent" />
          </div>

          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700 font-medium"
                >
                  {course.category}
                </Badge>
                <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg border dark:border-yellow-800/50">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">{course.rating}</span>
                </div>
              </div>

              <h3 className="font-bold text-lg line-clamp-2 text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.instructor.name}</div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex items-center justify-between">
            <div className="flex flex-col">
              {isLoading ? (
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              ) : (
                <>
                  <div className="font-bold text-lg text-gray-800 dark:text-gray-200">
                    {course.price === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                    ) : (
                      <span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {formatPrice(convertedPrice)}
                      </span>
                    )}
                  </div>
                  {convertedOriginalPrice && convertedOriginalPrice > convertedPrice && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      {formatPrice(convertedOriginalPrice)}
                    </div>
                  )}
                </>
              )}
            </div>

            <Button
              variant={inCart ? "secondary" : "outline"}
              size="sm"
              onClick={handleAddToCart}
              disabled={inCart}
              className={`ml-2 transition-all duration-300 ${
                inCart
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                  : "border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:border-violet-300 dark:hover:border-violet-600"
              }`}
            >
              {inCart ? (
                <>
                  <Check className="mr-1 h-3 w-3" />
                  In Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  Add to Cart
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}
