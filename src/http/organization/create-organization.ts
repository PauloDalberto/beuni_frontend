'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { useRouter } from "next/navigation";
import { OrganizationData } from "../@types/organization/organization";

const fetchCreateOrganization = async (data: OrganizationData) => {
  const response = await API.post('/organizations', data)
  return response.data
}

export function useCreateOrganizationMutation(){
  const router = useRouter();
  const queryClient  = useQueryClient()

  const mutate = useMutation({
    mutationFn: fetchCreateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })
      router.push("/login")
    },
    onError: () => {
      console.log("Ocorreu um erro ao realizar o login")
    }
  })

  return mutate;
}