"use client"

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useState } from "react"
import JoinOrganizationModal from "../join-organization-modal"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <SidebarGroup>
        <SidebarMenuButton
          tooltip="Entrar em uma organização"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
          onClick={() => setIsModalOpen(true)}
        >
          <IconCirclePlusFilled />
          <span>Entrar em uma organização</span>
        </SidebarMenuButton>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url} className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <JoinOrganizationModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  )
}
