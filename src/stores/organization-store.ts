import { create } from "zustand"
import { persist } from "zustand/middleware"
import { UserOrganization } from "../http/@types/user-organization/user-organization"

type OrganizationState = {
  selectedOrg: UserOrganization | null
  setOrg: (org: UserOrganization) => void
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
