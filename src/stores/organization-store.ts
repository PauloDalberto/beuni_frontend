import { create } from "zustand"
import { persist } from "zustand/middleware"

type Organization = {
  orgId: string
  orgName: string
}

type OrganizationState = {
  organizations: Organization[]
  selectedOrg: Organization | null
  setOrganizations: (orgs: Organization[]) => void
  setSelectedOrg: (org: Organization) => void
  clearSelectedOrg: () => void
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      organizations: [],
      selectedOrg: null,
      setOrganizations: (orgs) => set({ organizations: orgs }),
      setSelectedOrg: (org) => set({ selectedOrg: org }),
      clearSelectedOrg: () => set({ selectedOrg: null }),
    }),
    {
      name: "organization-storage",
      partialize: (state) => ({
        organizations: state.organizations,
        selectedOrg: state.selectedOrg,
      }),
    }
  )
)
