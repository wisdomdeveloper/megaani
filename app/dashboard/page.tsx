import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { DashboardSidebar } from "@/components/common/dashboard-sidebar"
import { LearnerStats } from "@/components/learner/learner-stats"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { PurchasedCourses } from "@/components/learner/purchased-courses"

export default function LearnerDashboard() { 
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <DashboardShell>
        <DashboardSidebar userType="learner" />
        <div className="flex-1 space-y-8 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="space-y-4">
            <LearnerStats /> 
            <PurchasedCourses />
          </div>
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
