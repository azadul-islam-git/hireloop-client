import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

const menuItemsByRole = {
  seeker: [
    "Dashboard",
    "Jobs",
    "SavedJobs",
    "Applications",
    "Billing",
    "Settings",
  ],
  recruiter: ["Dashboard", "Manage Jobs", "Applications", "Settings"],
  admin: ["Dashboard", "Users", "Companies", "Jobs", "Payments", "Settings"],
}

const DashboardSidebar = () => {
  const { data: session, isPending } = useSession()
  const role = session?.user?.role || "seeker"

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {/* {menuItemsByRole[role]?.map((items) => (
              <SidebarMenuItem key={items.id}>
                <SidebarMenuButton render={<a href={items.url} />}>
                  <items.icon />
                  <span>{items.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))} */}
          </SidebarMenu>
          F
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default DashboardSidebar
