"use client"

import { useState, useEffect } from "react"
import { BookCard } from "@/components/learner/book-card"
import type { Book } from "@/types/book"
import { getBooks } from "@/lib/data/books"

interface BookGridProps {
  category?: string
  format?: string
  language?: string
  minPrice?: number
  maxPrice?: number
  searchQuery?: string
}

export function BookGrid({ category, format, language, minPrice, maxPrice, searchQuery }: BookGridProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      // In a real app, this would be an API call with filters
      let filteredBooks = getBooks()

      if (category) {
        filteredBooks = filteredBooks.filter((book) => book.category === category)
      }

      if (format) {
        filteredBooks = filteredBooks.filter((book) => {
          if (Array.isArray(book.format)) {
            return book.format.includes(format as any)
          }
          return book.format === format
        })
      }

      if (language) {
        filteredBooks = filteredBooks.filter((book) => book.language === language)
      }

      if (minPrice !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.price >= minPrice)
      }

      if (maxPrice !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.price <= maxPrice)
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredBooks = filteredBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.description.toLowerCase().includes(query),
        )
      }

      setBooks(filteredBooks)
      setLoading(false)
    }

    fetchBooks()
  }, [category, format, language, minPrice, maxPrice, searchQuery])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-[400px] animate-pulse rounded-lg bg-muted"></div>
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-medium">No books found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
