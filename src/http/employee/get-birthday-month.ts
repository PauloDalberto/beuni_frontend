import { useQuery } from "@tanstack/react-query"
import { API } from "../api"
import { BirthdayEmployeeData } from "../@types/employee/employee"

const fetchGetBirthdayMonthEmployee = async (month: number, organizationId: string): Promise<BirthdayEmployeeData[]> => {
  const response = await API.get(`/employees/birthdays/month`, {
    params: { month, organization_id: organizationId }
  })
  return response.data
}

export function useGetBirthdayMonthEmployee(month: number, organizationId?: string){
  return useQuery<BirthdayEmployeeData[]>({
    queryKey: ['get-month-birthdays', month, organizationId],
    queryFn: () => fetchGetBirthdayMonthEmployee(month, organizationId!),
    enabled: !!month && !!organizationId, 
  })
}