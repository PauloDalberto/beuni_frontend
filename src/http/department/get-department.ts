import { useQuery } from "@tanstack/react-query"
import { API } from "../api"
import { DepartmentData } from "../@types/department/department"

const fetchGetDepartment = async (): Promise<DepartmentData[]> => {
  const response = await API.get('/departments')
  return response.data
}

export function useGetDepartment(){
  return useQuery<DepartmentData[]>({
    queryKey: ['get-department'],
    queryFn: fetchGetDepartment,
  })
}