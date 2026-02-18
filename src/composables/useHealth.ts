import { useQuery } from "@tanstack/vue-query";
import { healthService } from "../services/healthService";

export function useHealth() {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => healthService.checkHealth(),
    staleTime: 60000,
  });
}
