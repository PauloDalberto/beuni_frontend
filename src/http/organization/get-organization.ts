import { useQuery } from "@tanstack/react-query"
import { API } from "../api"
import { OrganizationData } from "../@types/organization/organization"

const fetchGetOrganization = async (): Promise<OrganizationData> => {
  const response = await API.get('/organizations')
  return response.data
}

export function useGetOrganization(){
  return useQuery<OrganizationData>({
    queryKey: ['get-organiations'],
    queryFn: fetchGetOrganization,
  })
}