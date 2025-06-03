import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { DashboardSidebar } from "@/components/common/dashboard-sidebar"
import { InstructorCoursesList } from "@/components/instructor/instructor-courses-list"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function InstructorCoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <DashboardShell>
        <DashboardSidebar userType="instructor" />
        <div className="flex-1 space-y-8 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
            <Button asChild>
              <Link href="/instructor/courses/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Course
              </Link>
            </Button>
          </div>
          <InstructorCoursesList />
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
