import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { UserOrganization } from "../@types/user-organization/user-organization";

const fetchUserOrganization = async (): Promise<UserOrganization[]> => {
  const response = await API.get('/user/organizations');
  return response.data;
}

export function useGetUserOrganization(){
  return useQuery<UserOrganization[]>({
    queryKey: ['user-organizations'],
    queryFn: fetchUserOrganization,
  })
}