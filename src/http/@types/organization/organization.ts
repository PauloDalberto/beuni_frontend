export interface OrganizationData {
  userId: string
  name: string
}

export interface OrganizationDataResponse {
  id: string
  name: string
}

export interface JoinOrganization {
  orgId: string
  userId: string
}