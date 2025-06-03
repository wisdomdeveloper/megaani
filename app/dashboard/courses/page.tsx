import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { DashboardSidebar } from "@/components/common/dashboard-sidebar"
import { EnrolledCoursesList } from "@/components/learner/enrolled-courses-list"
import { DashboardShell } from "@/components/common/dashboard-shell"

export default function EnrolledCoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <DashboardShell>
        <DashboardSidebar userType="learner" />
        <div className="flex-1 space-y-8 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
          </div>
          <EnrolledCoursesList />
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
