import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { CourseFilters } from "@/components/learner/course-filters"
import { CourseGrid } from "@/components/learner/course-grid"
import { SearchBar } from "@/components/common/search-bar"

export default function BrowseCourses() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Browse Courses</h1>
            <p className="text-muted-foreground">Discover thousands of courses to start learning today</p>
          </div>
          <SearchBar />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 shrink-0">
              <CourseFilters />
            </div>
            <div className="flex-1">
              <CourseGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
