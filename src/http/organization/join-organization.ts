import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { JoinOrganization } from "../@types/organization/organization";
import { toast } from "sonner";

const fetchJoinOrganization = async (data: JoinOrganization) => {
  const response = await API.post(`/organizations/${data.orgId}/join`, data)
  return response.data
}

export function useJoinOrganizationMutation(){
  const queryClient  = useQueryClient()

  const mutate = useMutation({
    mutationFn: fetchJoinOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-organizations'] })
      toast("Entrou na organização com sucesso!")
    },
    onError: () => {
      toast("Ocorreu um erro ao criar a organização!")
    }
  })

  return mutate;
}