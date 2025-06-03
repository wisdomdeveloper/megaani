"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-1">{children}</div>
    </SidebarProvider>
  )
}
