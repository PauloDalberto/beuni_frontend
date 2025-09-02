import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { OrganizationData } from "../@types/organization/organization";
import { toast } from "sonner";

const fetchCreateOrganization = async (data: OrganizationData) => {
  const response = await API.post('/organizations', data)
  return response.data
}

export function useCreateOrganizationMutation(){
  const queryClient  = useQueryClient()
  const mutate = useMutation({
    mutationFn: fetchCreateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })
      toast("Organização criada com sucesso!")
      
    },
    onError: () => {
      toast("Ocorreu um erro ao criar a organização!")
    }
  })

  return mutate;
}