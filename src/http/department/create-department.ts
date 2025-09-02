import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { toast } from "sonner";
import { CreateDepartmentData } from "../@types/department/department";

const fetchCreateDepartment = async (data: CreateDepartmentData) => {
  const response = await API.post('/departments', data)
  return response.data
}

export function useCreateDepartmentMutation(){
  const queryClient  = useQueryClient()
  const mutate = useMutation({
    mutationFn: fetchCreateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-department'] })
      toast("Departamento criada com sucesso!")
    },
    onError: () => {
      toast("Ocorreu um erro ao criar o departamento!")
    }
  })

  return mutate;
}