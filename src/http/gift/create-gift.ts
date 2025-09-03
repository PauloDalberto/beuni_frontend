'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { toast } from "sonner";
import { GiftData } from "../@types/gift/gift";

const fetchGift = async (data: GiftData) => {
  const response = await API.post('/gifts', data)
  return response.data
}

export function useCreateGiftMutation(){
  const queryClient  = useQueryClient()

  const mutate = useMutation({
    mutationFn: fetchGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-gift'] })
      toast("Presente cadastrado com sucesso!")
    },
    onError: () => {
      toast("Ocorreu um erro ao cadastrar o presente!")
    }
  })

  return mutate;
}