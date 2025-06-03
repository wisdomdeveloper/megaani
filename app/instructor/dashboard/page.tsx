import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { DashboardSidebar } from "@/components/common/dashboard-sidebar"
import { InstructorStats } from "@/components/instructor/instructor-stats"
import { InstructorCourses } from "@/components/instructor/instructor-courses"
import { DashboardShell } from "@/components/common/dashboard-shell"

export default function InstructorDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <DashboardShell>
        <DashboardSidebar userType="instructor" />
        <div className="flex-1 space-y-8 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h2>
          </div>
          <div className="space-y-4">
            <InstructorStats />
            <InstructorCourses />
          </div>
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
