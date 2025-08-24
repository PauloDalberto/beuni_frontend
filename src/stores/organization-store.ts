import { create } from "zustand"
import { persist } from "zustand/middleware"

type Organization = {
  orgId: string
  orgName: string
}

type OrganizationState = {
  selectedOrg: Organization | null
  setOrg: (org: Organization) => void
  clearOrg: () => void
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      selectedOrg: null,
      setOrg: (org) => set({ selectedOrg: org }),
      clearOrg: () => set({ selectedOrg: null }),
    }),
    {
      name: "organization-storage", 
      partialize: (state) => ({ selectedOrg: state.selectedOrg }),
    }
  )
)
