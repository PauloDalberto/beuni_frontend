'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { toast } from "sonner";
import { CreateEmployeeData } from "../@types/employee/employee";

const fetchEmployee = async (data: CreateEmployeeData) => {
  const response = await API.post('/employees', data, {
    withCredentials: true
  })
  
  console.log(response.data)
  return response.data
}

export function useCreateEmployeeMutation(organizationId?: string){
  const queryClient  = useQueryClient()

  const mutate = useMutation({
    mutationFn: fetchEmployee,
    onSuccess: () => {
      toast("Funcionário cadastrado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ['get-employees', organizationId] })
    },
    onError: () => {
      toast("Ocorreu um erro ao realizar o cadastro!")
    }
  })

  return mutate;
}