import type { Metadata } from "next"
import { BookGrid } from "@/components/learner/book-grid"
import { BookFilters } from "@/components/learner/book-filters"
import { SearchBar } from "@/components/common/search-bar"
import { MainNav }  from "@/components/common/main-nav.tsx" 

export const metadata: Metadata = {
  title: "Browse Books | Megaani",
  description: "Discover and purchase books on various topics",
}

interface BrowseBooksPageProps {
  searchParams: {
    category?: string
    format?: string
    language?: string
    minPrice?: string
    maxPrice?: string
    q?: string
  }
}

export default function BrowseBooksPage({ searchParams }: BrowseBooksPageProps) {
  const { category, format, language, minPrice, maxPrice, q } = searchParams

  return (
   <div>
      <MainNav/>

    <div className="container !p-8 " >
      <div className="!mb-8 !p-3">
        <h1 className="mb-4 text-3xl font-bold">Browse Books</h1>
        <SearchBar placeholder="Search for books..." />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 ">
        <div className="lg:col-span-1 !p-3">
          <BookFilters />
        </div>
        <div className="lg:col-span-3 !p-2">
          <BookGrid
            category={category}
            format={format}
            language={language}
            minPrice={minPrice ? Number.parseFloat(minPrice) : undefined}
            maxPrice={maxPrice ? Number.parseFloat(maxPrice) : undefined}
            searchQuery={q}
          />
        </div>
      </div>
    </div>
   </div>
  )
}
