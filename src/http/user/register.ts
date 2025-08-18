'use client'

import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { useRouter } from "next/navigation";
import { RegisterData } from "../@types/user/register";
import { toast } from "sonner";

const fetchRegister = async (data: RegisterData) => {
  const response = await API.post('/register', data, {
    withCredentials: true
  })
  return response.data
}

export function useRegisterMutation(){
  const router = useRouter()

  const mutate = useMutation({
    mutationFn: fetchRegister,
    onSuccess: () => {
      toast("Usuário cadastrado com sucesso!")
      router.push("/login")
    },
    onError: () => {
      toast("Ocorreu um erro ao realizar o cadastro!")
    }
  })

  return mutate;
}