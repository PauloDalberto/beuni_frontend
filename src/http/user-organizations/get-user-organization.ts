import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { UserOrganization } from "../@types/user-organization/user-organization";
import { useOrganizationStore } from "@/src/stores/organization-store";
import { useEffect } from "react";

const fetchUserOrganization = async (): Promise<UserOrganization[]> => {
  const response = await API.get('/user/organizations');
  return response.data;
}

export function useGetUserOrganization(){
  const { setOrganizations } = useOrganizationStore()

  const query =  useQuery<UserOrganization[]>({
    queryKey: ['user-organizations'],
    queryFn: fetchUserOrganization,
  })

    useEffect(() => {
    if(query.data){
      setOrganizations(query.data.map(org => ({
        orgId: org.orgId,
        orgName: org.orgName
      })))
    }
  }, [query.data, setOrganizations])

  return query
}