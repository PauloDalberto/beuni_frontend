import { useQuery } from "@tanstack/react-query"
import { API } from "../api"
import { DepartmentData } from "../@types/department/department"

const fetchGetDepartment = async (organizationId: string): Promise<DepartmentData[]> => {
  const response = await API.get(`/departments/${organizationId}`)
  return response.data
}

export function useGetDepartment(organizationId?: string){
  return useQuery<DepartmentData[]>({
    queryKey: ['get-department'],
    queryFn: () => fetchGetDepartment(organizationId!),
    enabled: !!organizationId
  })
}