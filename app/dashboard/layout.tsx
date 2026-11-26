"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

import DashboardSidebar from "../components/DashboardSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { dashboardPath, dashboardPathRole } from "@/lib/dashboard"
import { DEFAULT_USER_ROLE } from "@/lib/user-fields"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending, isRefetching } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const role = session?.user?.role ?? DEFAULT_USER_ROLE
  const pathRole = dashboardPathRole(pathname)

  React.useEffect(() => {
    // While a session fetch is in flight the data can be mid-update (e.g.
    // right after switching accounts) — deciding now would redirect based on
    // the previous account's role.
    if (isPending || isRefetching) return
    // Not signed in — the dashboard is not a public page.
    if (!session) {
      router.replace("/signin")
      return
    }
    // Signed in, but on another role's dashboard (`/dashboard`, a role the
    // user doesn't have, …) — send them to their own.
    if (pathRole !== role) {
      router.replace(dashboardPath(role))
    }
  }, [isPending, isRefetching, session, pathRole, role, router])

  // Hide the shell while the session resolves or we're about to navigate, so
  // the wrong role's sidebar never flashes on screen.
  if (isPending || isRefetching || !session || pathRole !== role) {
    return (
      <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
        Loading dashboard…
      </div>
    )
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout
