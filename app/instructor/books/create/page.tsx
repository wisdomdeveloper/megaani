import type { Metadata } from "next"
import { BookForm } from "@/components/instructor/book-form"
import { MainNav } from "@/components/common/main-nav"
export const metadata: Metadata = {
  title: "Upload New Book | Megaani",
  description: "Upload a new book to sell on Megaani",
}

export default function CreateBookPage() {
  return (
   <div>
    <MainNav/>
      <div className="flex items-center justify-center">
          <div className="container  py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload New Book</h1>
        <p className="text-muted-foreground">Fill out the form below to upload your book to the marketplace</p>
      </div>
      <BookForm />
    </div>
      </div>
   </div>
  )
}
