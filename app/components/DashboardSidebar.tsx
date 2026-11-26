"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookmarkIcon,
  BriefcaseIcon,
  Building2Icon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { UserMenu } from "@/components/user-menu"
import { DEFAULT_USER_ROLE, type UserRole } from "@/lib/user-fields"

type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

/**
 * Fixed placeholder widths — `SidebarMenuSkeleton` picks a random width on
 * every render, which mismatches between SSR and hydration (React warns and
 * refuses to patch it up). Deterministic values keep the loading state
 * identical on the server and the client.
 */
const SKELETON_WIDTHS = ["65%", "82%", "71%", "58%", "76%", "63%"]

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    {
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboardIcon,
    },
    { name: "Jobs", url: "/dashboard/seeker/jobs", icon: BriefcaseIcon },
    {
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: BookmarkIcon,
    },
    {
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileTextIcon,
    },
    {
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCardIcon,
    },
    {
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: SettingsIcon,
    },
  ],
  recruiter: [
    {
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboardIcon,
    },
    {
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building2Icon,
    },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/manage-jobs",
      icon: BriefcaseIcon,
    },
    {
      name: "Add Job",
      url: "/dashboard/recruiter/add-job",
      icon: BriefcaseIcon,
    },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileTextIcon,
    },
    {
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: SettingsIcon,
    },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboardIcon },
    { name: "Users", url: "/dashboard/admin/users", icon: UsersIcon },
    {
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2Icon,
    },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseIcon },
    {
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCardIcon,
    },
    {
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: SettingsIcon,
    },
  ],
}

const DashboardSidebar = () => {
  const { data: session, isPending } = useSession()
  const pathname = usePathname()
  const role: UserRole = session?.user?.role ?? DEFAULT_USER_ROLE
  const menuItems = menuItemsByRole[role]

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isPending
                ? Array.from({ length: menuItems.length }, (_, index) => (
                    <SidebarMenuItem key={index}>
                      <div className="flex h-8 items-center gap-2 rounded-md px-2">
                        <div className="size-4 shrink-0 animate-pulse rounded-md bg-muted" />
                        <div
                          className="h-4 animate-pulse rounded-md bg-muted"
                          style={{
                            width:
                              SKELETON_WIDTHS[index % SKELETON_WIDTHS.length],
                          }}
                        />
                      </div>
                    </SidebarMenuItem>
                  ))
                : menuItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={pathname === item.url}
                        tooltip={item.name}
                      >
                        <item.icon />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* The dashboard hides the marketing navbar, so the sidebar carries the
          account menu (identity + sign out) itself. */}
      <SidebarFooter className="border-t border-border/60 p-2">
        {!isPending && session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <div className="flex h-10 items-center gap-2 rounded-xl px-2">
            <div className="size-6 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar
