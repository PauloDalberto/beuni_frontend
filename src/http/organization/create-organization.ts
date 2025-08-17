'use client'

import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { useRouter } from "next/navigation";
import { OrganizationData } from "../@types/organization/organization";

const fetchRegister = async (data: OrganizationData) => {
  const response = await API.post('/organizations', data)
  return response.data
}

export function useCreateOrganizationMutation(){
  const router = useRouter()

  const mutate = useMutation({
    mutationFn: fetchRegister,
    onSuccess: () => {
      router.push("/login")
    },
    onError: () => {
      console.log("Ocorreu um erro ao realizar o login")
    }
  })

  return mutate;
}