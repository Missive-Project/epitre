import { useQuery } from "@tanstack/vue-query";
import { authService } from "../services/authService";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => authService.getSession(),
    staleTime: 5 * 60 * 1000,
  });
}
