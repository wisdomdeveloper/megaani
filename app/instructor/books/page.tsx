import type { Metadata } from "next"
import { InstructorBooksList } from "@/components/instructor/instructor-books-list"

export const metadata: Metadata = {
  title: "My Books | Megaani",
  description: "Manage your books on Megaani",
}

export default function InstructorBooksPage() {
  return (
    <div className="container py-8">
      <InstructorBooksList />
    </div>
  )
}
