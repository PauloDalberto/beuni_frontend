import { useQuery } from "@tanstack/react-query"
import { API } from "../api"
import { DepartmentData } from "../@types/department/department"

const fetchGetOrganization = async (): Promise<DepartmentData[]> => {
  const response = await API.get('/departments')
  return response.data
}

export function useGetOrganization(){
  return useQuery<DepartmentData[]>({
    queryKey: ['get-department'],
    queryFn: fetchGetOrganization,
  })
}