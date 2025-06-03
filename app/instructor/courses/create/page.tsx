import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { DashboardSidebar } from "@/components/common/dashboard-sidebar"
import { CourseForm } from "@/components/instructor/course-form"
import { DashboardShell } from "@/components/common/dashboard-shell"

export default function CreateCoursePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <DashboardShell>
        <DashboardSidebar userType="instructor" />
        <div className="flex-1 space-y-8 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Create New Course</h2>
          </div>
          <CourseForm />
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
