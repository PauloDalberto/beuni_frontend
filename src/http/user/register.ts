'use client'

import { useMutation } from "@tanstack/react-query";
import { API } from "../api";
import { useRouter } from "next/navigation";
import { RegisterData } from "../@types/user/register";

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
      router.push("/login")
    },
    onError: () => {
      console.log("Ocorreu um erro ao realizar o login")
    }
  })

  return mutate;
}