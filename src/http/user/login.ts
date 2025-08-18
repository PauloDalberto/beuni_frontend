'use client'

import { useMutation } from "@tanstack/react-query";
import { LoginData } from "../@types/user/login";
import { API } from "../api";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/stores/user-store";

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
      setUser({ name: data.user.name, email: data.user.email })
      router.push("/")
    },
    onError: (err) => {
      console.log("Ocorreu um erro ao realizar o login", err)
    }
  })

  return mutate;
}