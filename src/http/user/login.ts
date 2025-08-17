'use client'

import { useMutation } from "@tanstack/react-query";
import { LoginData } from "../@types/user/login";
import { API } from "../api";
import { useRouter } from "next/navigation";

const fetchLogin = async (data: LoginData) => {
  const response = await API.post('/login', data, {
    withCredentials: true
  })
  return response.data
}

export function useLoginMutation(){
  const router = useRouter()

  const mutate = useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      router.push("/")
    },
    onError: (err) => {
      console.log("Ocorreu um erro ao realizar o login", err)
    }
  })

  return mutate;
}