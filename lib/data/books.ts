import type { Book } from "@/types/book"

export const books: Book[] = [
  {
    id: "1",
    title: "JavaScript: The Good Parts",
    description:
      "This book provides an in-depth exploration of JavaScript, focusing on the good parts of the language that are truly useful.",
    author: "Douglas Crockford",
    authorId: "auth1",
    price: 29.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    reviewCount: 342,
    category: "programming",
    format: ["PDF", "EPUB"],
    language: "English",
    pages: 176,
    isbn: "978-0596517748",
    publicationDate: "2008-05-01",
    publisher: "O'Reilly Media",
    fileSize: "5.2 MB",
    featured: true,
  },
  {
    id: "2",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description:
      "This book is a must for any developer, software engineer, project manager, team lead, or systems analyst with an interest in producing better code.",
    author: "Robert C. Martin",
    authorId: "auth2",
    price: 39.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    reviewCount: 521,
    category: "programming",
    format: ["PDF", "Physical"],
    language: "English",
    pages: 464,
    isbn: "978-0132350884",
    publicationDate: "2008-08-11",
    publisher: "Prentice Hall",
    fileSize: "8.4 MB",
    bestseller: true,
  },
  {
    id: "3",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    description: "This book is the classic software engineering text on design patterns in programming.",
    author: "Erich Gamma",
    authorId: "auth3",
    price: 49.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    reviewCount: 287,
    category: "programming",
    format: ["PDF", "EPUB", "Physical"],
    language: "English",
    pages: 416,
    isbn: "978-0201633610",
    publicationDate: "1994-11-10",
    publisher: "Addison-Wesley Professional",
    fileSize: "12.1 MB",
  },
  {
    id: "4",
    title: "The Lean Startup",
    description: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
    author: "Eric Ries",
    authorId: "auth4",
    price: 24.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    reviewCount: 678,
    category: "business",
    format: ["PDF", "EPUB", "Audiobook"],
    language: "English",
    pages: 336,
    isbn: "978-0307887894",
    publicationDate: "2011-09-13",
    publisher: "Crown Business",
    fileSize: "4.8 MB",
    duration: "8h 43m",
    bestseller: true,
  },
  {
    id: "5",
    title: "Don't Make Me Think",
    description: "A Common Sense Approach to Web Usability",
    author: "Steve Krug",
    authorId: "auth5",
    price: 34.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    reviewCount: 412,
    category: "design",
    format: ["PDF", "Physical"],
    language: "English",
    pages: 216,
    isbn: "978-0321965516",
    publicationDate: "2013-12-24",
    publisher: "New Riders",
    fileSize: "18.3 MB",
    featured: true,
  },
  {
    id: "6",
    title: "Marketing Made Simple",
    description: "A Step-by-Step StoryBrand Guide for Any Business",
    author: "Donald Miller",
    authorId: "auth6",
    price: 19.99,
    coverImage: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    reviewCount: 231,
    category: "marketing",
    format: ["PDF", "EPUB", "Audiobook"],
    language: "English",
    pages: 240,
    isbn: "978-1400203796",
    publicationDate: "2020-03-17",
    publisher: "HarperCollins Leadership",
    fileSize: "3.7 MB",
    duration: "4h 19m",
    new: true,
  },
]

export function getBooks() {
  return books
}

export function getBookById(id: string) {
  return books.find((book) => book.id === id)
}

export function getBooksByCategory(category: string) {
  return books.filter((book) => book.category === category)
}

export function getFeaturedBooks() {
  return books.filter((book) => book.featured)
}

export function getBestsellerBooks() {
  return books.filter((book) => book.bestseller)
}

export function getNewBooks() {
  return books.filter((book) => book.new)
}

export function getBooksByAuthor(authorId: string) {
  return books.filter((book) => book.authorId === authorId)
}
