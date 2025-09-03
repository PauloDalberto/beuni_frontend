'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { toast } from "sonner";
import { CreateEmployeeData } from "../@types/employee/employee";

const fetchEmployee = async (data: CreateEmployeeData) => {
  const response = await API.post('/employees', data)
  return response.data
}

export function useCreateEmployeeMutation(){
  const queryClient  = useQueryClient()

  const mutate = useMutation({
    mutationFn: fetchEmployee,
    onSuccess: (_data, variables) => {
      toast("Funcionário cadastrado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ['get-employees', variables.organization_id] })
    },
    onError: () => {
      toast("Ocorreu um erro ao realizar o cadastro!")
    }
  })

  return mutate;
}