import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/learner/course-card"
import { getFeaturedCourses } from "@/lib/data/courses"

export function FeaturedCourses() {
  const courses = getFeaturedCourses()

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-violet-50/50 via-purple-50/50 to-indigo-50/50 dark:from-gray-900 dark:via-purple-900/10 dark:to-indigo-900/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
              Explore our most popular courses and start learning today
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.slice(0, 4).map((course, index) => (
            <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            asChild
            size="lg"
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 dark:from-violet-500 dark:to-purple-500 dark:hover:from-violet-600 dark:hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl dark:shadow-violet-500/25 dark:hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/browse-courses">Browse All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
