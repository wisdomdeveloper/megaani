export interface Book {
  id: string
  title: string
  description: string
  author: string
  authorId: string
  price: number
  coverImage: string
  rating: number
  reviewCount: number
  category: string
  format: BookFormat | BookFormat[]
  language: string
  pages?: number
  isbn?: string
  publicationDate: string
  publisher?: string
  fileSize?: string
  duration?: string // For audiobooks
  featured?: boolean
  bestseller?: boolean
  new?: boolean
}

export type BookFormat = "PDF" | "EPUB" | "Audiobook" | "Physical"
