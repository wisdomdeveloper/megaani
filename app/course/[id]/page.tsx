import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { CourseHeader } from "@/components/learner/course-header"
import { CourseContent } from "@/components/learner/course-content"
import { CourseInstructor } from "@/components/learner/course-instructor"
import { CourseReviews } from "@/components/learner/course-reviews"
import { getCourseById } from "@/lib/data/courses"
import { notFound } from "next/navigation"

export default function CourseDetails({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id)

  if (!course) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <CourseHeader course={course} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CourseContent course={course} />
              <CourseInstructor instructor={course.instructor} />
              <CourseReviews reviews={course.reviews || []} />
            </div>
            <div className="order-first lg:order-last">{/* Enrollment card will be here */}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
