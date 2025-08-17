import { useQuery } from "@tanstack/react-query"
import { API } from "../api"

const fetchGetOrganization = async () => {
  const response = await API.get('/organizations')
  return response.data
}

export function useGetOrganization(){
  return useQuery({
    queryKey: ['get-organiations'],
    queryFn: fetchGetOrganization,
  })
}