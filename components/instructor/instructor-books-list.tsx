"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Book, MoreVertical, Edit, Trash2, Eye, BarChart2 } from "lucide-react"
import { books } from "@/lib/data/books"
import { useCurrency } from "@/context/currency-context"

export function InstructorBooksList() {
  const { formatPrice } = useCurrency()
  const [instructorBooks, setInstructorBooks] = useState(books)

  const handleDeleteBook = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setInstructorBooks(instructorBooks.filter((book) => book.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Books</h2>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/instructor/books/create">Upload New Book</Link>
        </Button>
      </div>

      {instructorBooks.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <Book className="mb-4 h-12 w-12 text-muted-foreground" />
          <CardTitle className="mb-2">No Books Yet</CardTitle>
          <CardDescription className="mb-6">
            You haven't uploaded any books yet. Start by uploading your first book.
          </CardDescription>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/instructor/books/create">Upload Your First Book</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instructorBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <div className="relative h-40">
                <img
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="line-clamp-1 text-lg font-bold text-white">{book.title}</h3>
                  <p className="text-sm text-gray-200">{formatPrice(book.price)}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex flex-wrap gap-2">
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
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Sales</p>
                    <p className="font-medium">{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    <p className="font-medium">★ {book.rating.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reviews</p>
                    <p className="font-medium">{book.reviewCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Published</p>
                    <p className="font-medium">{new Date(book.publicationDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4">
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link href={`/book/${book.id}`}>
                    <Eye className="mr-1 h-3 w-3" />
                    Preview
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/instructor/books/${book.id}/edit`}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Book
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/instructor/books/${book.id}/analytics`}
                        className="flex w-full cursor-pointer items-center"
                      >
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex cursor-pointer items-center text-red-600 focus:text-red-600"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
