import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { DashboardSidebar } from "@/components/common/dashboard-sidebar"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { CourseAdvertisement } from "@/components/instructor/course-advertisement"
import { getCourseById } from "@/lib/data/courses"
import { notFound } from "next/navigation"

export default function CourseAdvertisePage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id)

  if (!course) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <DashboardShell>
        <DashboardSidebar userType="instructor" />
        <div className="flex-1 space-y-8 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Course Advertisement</h2>
          </div>
          <CourseAdvertisement courseId={course.id} courseTitle={course.title} />
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
