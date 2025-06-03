"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CourseCard } from "@/components/learner/course-card"
import { getCourses } from "@/lib/data/courses"
import type { Course } from "@/types/course"

export function CourseGrid() {
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)

      // Get filter parameters
      const query = searchParams.get("q") || ""
      const category = searchParams.get("category") || ""
      const level = searchParams.get("level") || ""
      const minPrice = Number(searchParams.get("minPrice") || 0)
      const maxPrice = Number(searchParams.get("maxPrice") || 1000)

      // Fetch courses with filters
      const filteredCourses = getCourses({
        query,
        category,
        level,
        minPrice,
        maxPrice,
      })

      setCourses(filteredCourses)
      setLoading(false)
    }

    fetchCourses()
  }, [searchParams.toString()]) // Use searchParams.toString() instead of searchParams object

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video w-full bg-muted rounded-md animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-semibold">No courses found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
