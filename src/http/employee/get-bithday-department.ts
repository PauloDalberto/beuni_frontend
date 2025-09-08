import { useQuery } from "@tanstack/react-query"
import { API } from "../api"
import { BirthdayEmployeeData } from "../@types/employee/employee"

const fetchGetBirthdayDepartmentEmployee = async (departmentId: string, organizationId: string): Promise<BirthdayEmployeeData[]> => {
  const response = await API.get(`/employees/birthdays/department`, {
    params: { department_id: departmentId, organization_id: organizationId }
  })
  return response.data
}

export function useGetBirthdayDepartmentEmployee(departmentId: string, organizationId?: string){
  return useQuery<BirthdayEmployeeData[]>({
    queryKey: ['get-department-birthdays', departmentId, organizationId],
    queryFn: () => fetchGetBirthdayDepartmentEmployee(departmentId, organizationId!),
    enabled: !!departmentId && !!organizationId, 
  })
}