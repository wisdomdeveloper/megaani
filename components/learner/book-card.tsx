"use client"

import type { Book } from "@/types/book"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, BookOpen } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useCurrency } from "@/context/currency-context"
import Link from "next/link"
import Image from "next/image"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart()
  const { formatPrice } = useCurrency()

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.coverImage,
      type: "book",
    })
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-gray-700">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={book.coverImage || "/placeholder.svg"}
          alt={book.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {book.bestseller && (
          <Badge className="absolute left-2 top-2 bg-amber-500 text-white hover:bg-amber-600">Bestseller</Badge>
        )}
        {book.new && (
          <Badge className="absolute left-2 top-2 bg-emerald-500 text-white hover:bg-emerald-600">New</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-amber-500">★</span>
            <span className="text-sm font-medium">{book.rating}</span>
            <span className="text-xs text-muted-foreground">({book.reviewCount})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(book.format) ? (
              book.format.map((format) => (
                <Badge key={format} variant="outline" className="text-xs">
                  {format}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-xs">
                {book.format}
              </Badge>
            )}
          </div>
        </div>
        <Link href={`/book/${book.id}`} className="group">
          <h3 className="line-clamp-2 font-semibold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
            {book.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
        <p className="mt-2 text-lg font-bold text-emerald-600 dark:text-emerald-400">{formatPrice(book.price)}</p>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-900 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
