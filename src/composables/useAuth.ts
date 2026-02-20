import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { authService } from "../services/authService";
import { useRouter } from "vue-router";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => authService.getSession(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: () => authService.signInWithGoogle(),
    onError: (error: Error) => {
      console.error("Erreur de connexion:", error.message);
    },
  });
}

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      queryClient.setQueryData(["session"], null);
      router.push("/login");
    },
    onError: (error: Error) => {
      console.error("Erreur de déconnexion:", error.message);
    },
  });
}
