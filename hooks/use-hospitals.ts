import { useQuery } from "@tanstack/react-query";
import type { Hospital } from "@/lib/types";

export function useHospitals() {
  return useQuery<Hospital[]>({
    queryKey: ["/api/hospitals"],
    queryFn: async () => {
      const res = await fetch("/api/hospitals");
      if (!res.ok) throw new Error("Failed to fetch hospitals");
      return res.json();
    },
  });
}
