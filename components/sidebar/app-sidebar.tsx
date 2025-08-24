"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/sidebar/nav-documents"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useUserStore } from "@/src/stores/user-store"
import { useOrganizationStore } from "@/src/stores/organization-store"
import { useGetUserOrganization } from "@/src/http/user-organizations/get-user-organization"

const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Funcionários", url: "/employees", icon: IconUsers },
    { title: "Departamentos", url: "/departments", icon: IconFolder },
    { title: "Presentes", url: "/gifts", icon: IconListDetails },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: IconSettings },
    { title: "Get Help", url: "#", icon: IconHelp },
    { title: "Search", url: "#", icon: IconSearch },
  ],
  documents: [
    { name: "Data Library", url: "#", icon: IconDatabase },
    { name: "Reports", url: "#", icon: IconReport },
    { name: "Word Assistant", url: "#", icon: IconFileWord },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUserStore((state) => state.user)
  const setOrg = useOrganizationStore((state) => state.setOrg)
  const selectedOrg = useOrganizationStore((state) => state.selectedOrg)

  const { data: userOrganizationData } = useGetUserOrganization()

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Select
                onValueChange={(value) => {
                  const org = userOrganizationData?.find((item) => item.orgId === value)
                  if (org) setOrg(org)
                }}
                value={selectedOrg?.orgId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma organização!" />
                </SelectTrigger>
                <SelectContent>
                  {userOrganizationData?.map((item) => (
                    <SelectItem key={item.orgId} value={item.orgId}>
                      {item.orgName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            avatar: "/avatars/shadcn.jpg",
            name: user?.name || "",
            email: user?.email || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
