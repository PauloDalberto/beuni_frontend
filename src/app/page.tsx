'use client'

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SiteHeader } from "@/components/sidebar/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useOrganizationStore } from "../stores/organization-store"

export default function Page() {
  const { organizations, selectedOrg, setSelectedOrg } = useOrganizationStore()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            

            <div>
              <h2>Organizações:</h2>
                {organizations.map((org) => (
              <ul key={org.orgId}>
                  <li >
                    <button onClick={() => setSelectedOrg(org)}>
                      {org.orgName} {selectedOrg?.orgId === org.orgId && "(selecionada)"}
                    </button>
                  
                  </li>
                  <li>
                    {org.orgId}
                  </li>
              </ul>
                ))}
            </div>
            
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
