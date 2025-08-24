'use client'

import { useMutation } from "@tanstack/react-query";
import { LoginData } from "../@types/user/login";
import { API } from "../api";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/stores/user-store";
import { toast } from "sonner";

const fetchLogin = async (data: LoginData) => {
  const response = await API.post('/login', data, {
    withCredentials: true
  })
  return response.data
}

export function useLoginMutation(){
  const router = useRouter()
  const { setUser } = useUserStore()

  const mutate = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (data) => {
      setUser({ name: data.user.name, email: data.user.email, id: data.user.id })
      toast("Login realizado com sucesso!")
      router.push("/")
    },
    onError: (err) => {
      toast("Ocorreu um erro ao realizar o login")
      console.log("Ocorreu um erro ao realizar o login", err)
    }
  })

  return mutate;
}