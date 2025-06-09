import { LayoutDashboard, ListChecks, Users, BookOpen, Settings, HelpCircle } from "lucide-react"
import type { SidebarNavItem } from "@/types/sidebar-nav"

type UserType = "guest" | "instructor" | "learner"

interface DashboardSidebarProps {
  userType: UserType
}

const navLinks: Record<UserType, SidebarNavItem[]> = {
  guest: [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
  ],
  instructor: [
    {
      href: "/instructor/courses",
      label: "Courses",
      icon: ListChecks,
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: Users,
    },
    {
      href: "/instructor/books",
      label: "My Books",
      icon: BookOpen,
    },
      {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
     {
      href: "/help",
      label: "Help",
      icon: HelpCircle,
    },
  ],
  learner: [
  
     {
      href: "/learner/courses",
      label: "My Courses",
      icon: ListChecks,
    },

     {
      href: "/learner/books",
      label: "My Books",
      icon: BookOpen,
    },

     {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
     {
      href: "/help",
      label: "Help",
      icon: HelpCircle,
    },
  ],
}

export const DashboardSidebar = ({ userType }: DashboardSidebarProps) => {
  const links = navLinks[userType] || navLinks.guest

  return (
 <aside className="w-64 p-4">
  {links.map((link) => (
    <a
      key={link.href}
      href={link.href}
      className="flex items-center gap-2 mb-4 p-2 rounded transition-colors cursor-pointer rounded-xl hover:bg-gray-800"
    >
      <link.icon className="w-5 h-5" />
      <span>{link.label}</span>
    </a>
  ))}
</aside>
  );
}