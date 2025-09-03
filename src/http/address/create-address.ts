import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { toast } from "sonner";
import { AddressData } from "../@types/address/address";

const fetchCreateAddress = async (data: AddressData) => {
  const response = await API.post('/addresses', data)
  return response.data
}

export function useCreateAddressMutation(){
  const queryClient  = useQueryClient()
  const mutate = useMutation({
    mutationFn: fetchCreateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-address'] })
      toast("Endereço atribuido ao funcionário com sucesso!")
    },
    onError: () => {
      toast("Ocorreu um erro ao atribuir o endereço!")
    }
  })

  return mutate;
}