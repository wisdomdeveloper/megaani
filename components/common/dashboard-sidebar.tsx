import { LayoutDashboard, ListChecks, Users, BookOpen } from "lucide-react"

import type { SidebarNavItem } from "@/types"

interface DashboardSidebarProps {
  isInstructor: boolean
}

export const DashboardSidebar = ({ isInstructor }: DashboardSidebarProps) => {
  const guestLinks: SidebarNavItem[] = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
  ]

  const instructorLinks: SidebarNavItem[] = [
    {
      href: "/instructor/courses",
      label: "Courses",
      icon: ListChecks,
    },
    {
      href: "/instructor/analytics",
      label: "Analytics",
      icon: Users,
    },
    {
      href: "/instructor/books",
      label: "My Books",
      icon: BookOpen,
    },
  ]

  const studentLinks: SidebarNavItem[] = [
    {
      href: "/search",
      label: "Browse",
      icon: ListChecks,
    },
  ]

  const links = isInstructor ? instructorLinks : studentLinks

  return (
    <>
      {links.map((link) => (
        <div key={link.href}>{link.label}</div>
      ))}
    </>
  )
}
