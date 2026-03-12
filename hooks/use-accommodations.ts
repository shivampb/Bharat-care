import { useQuery } from "@tanstack/react-query";
import type { Accommodation } from "@/lib/types";

export function useAccommodations(hospitalId?: number) {
  return useQuery<Accommodation[]>({
    queryKey: ["/api/accommodations", hospitalId],
    queryFn: async () => {
      let url = "/api/accommodations";
      if (hospitalId) {
        url += `?hospitalId=${hospitalId}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch accommodations");
      return res.json();
    },
  });
}
