"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useCurrency } from "@/context/currency-context"
import { ShoppingCart, Trash2, CreditCard } from "lucide-react"
import Link from "next/link"

export function CartDropdown() {
  const { items, totalItems, totalPrice, removeFromCart } = useCart()
  const { convertPrice, formatPrice } = useCurrency()

  // Convert total price to user's currency
  const convertedTotalPrice = convertPrice(totalPrice)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <div className="p-4">
          <h3 className="font-semibold">Shopping Cart ({totalItems})</h3>
        </div>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <ShoppingCart className="mx-auto h-12 w-12 mb-2 opacity-50" />
            <p>Your cart is empty</p>
            <p className="text-sm">Add courses to get started</p>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.course.id} className="flex items-center space-x-3 p-3 hover:bg-muted/50">
                  <img
                    src={item.course.thumbnail || "/placeholder.svg?height=40&width=60"}
                    alt={item.course.title}
                    className="h-10 w-15 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.course.title}</p>
                    <p className="text-xs text-muted-foreground">by {item.course.instructor.name}</p>
                    <p className="text-sm font-semibold">
                      {item.course.price === 0 ? "Free" : formatPrice(convertPrice(item.course.price))}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.course.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between font-semibold">
                <span>Total:</span>
                <span>{formatPrice(convertedTotalPrice)}</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/cart">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Go to Cart
                </Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
