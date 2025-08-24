import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/stores/user-store";
import { toast } from "sonner";

export function useLogoutMutation() {
  const router = useRouter();
  const { logout } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: async () => {
      const response = await API.post('/logout', {}, {
        withCredentials: true
      });
      return response.data;
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast("Logout realizado com sucesso!");
      router.push("/login");
    },
    onError: (err) => {
      toast("Erro ao tentar deslogar!");
      console.error(err);
    }
  });
}
