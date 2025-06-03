"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, GraduationCap, LayoutDashboard, Library, LifeBuoy, Settings, Wallet } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface DashboardSidebarProps {
  userType: "learner" | "instructor"
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname()

  const learnerLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Help",
      href: "/help",
      icon: LifeBuoy,
    },
  ]

  const instructorLinks = [
    {
      title: "Dashboard",
      href: "/instructor/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      href: "/instructor/courses",
      icon: Library,
    },
    {
      title: "Wallet",
      href: "/instructor/wallet",
      icon: Wallet,
    },
    {
      title: "Settings",
      href: "/instructor/settings",
      icon: Settings,
    },
    {
      title: "Help",
      href: "/help",
      icon: LifeBuoy,
    },
  ]

  const links = userType === "instructor" ? instructorLinks : learnerLinks

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2 px-4 py-2">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold">Megaani</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.title}>
                <Link href={link.href}>
                  <link.icon className="h-5 w-5" />
                  <span>{link.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {userType === "learner" && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Become an Instructor">
                <Link href="/become-instructor">
                  <GraduationCap className="h-5 w-5" />
                  <span>Become an Instructor</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
