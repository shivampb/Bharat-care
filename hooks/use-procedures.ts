import { useQuery } from "@tanstack/react-query";
import type { Procedure } from "@/lib/types";

export function useProcedures() {
  return useQuery<Procedure[]>({
    queryKey: ["/api/procedures"],
    queryFn: async () => {
      const res = await fetch("/api/procedures");
      if (!res.ok) throw new Error("Failed to fetch procedures");
      return res.json();
    },
  });
}
