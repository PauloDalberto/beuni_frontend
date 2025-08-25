import { useQuery } from "@tanstack/react-query"
import { API } from "../api"
import { EmployeeData } from "../@types/employee/employee"

const fetchGetEmployee = async (organizationId: string): Promise<EmployeeData[]> => {
  const response = await API.get(`/employees/${organizationId}`)
  console.log(response.data)
  return response.data
}

export function useGetEmployee(organizationId?: string){
  return useQuery<EmployeeData[]>({
    queryKey: ['get-employee', organizationId],
    queryFn: () => fetchGetEmployee(organizationId!),
    enabled: !!organizationId,
  })
}