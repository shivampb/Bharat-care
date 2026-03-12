import { useQuery } from "@tanstack/react-query";
import type { Doctor } from "@/lib/types";

export function useDoctors(hospitalId?: number) {
  return useQuery<Doctor[]>({
    queryKey: ["/api/doctors", hospitalId],
    queryFn: async () => {
      let url = "/api/doctors";
      if (hospitalId) {
        url += `?hospitalId=${hospitalId}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch doctors");
      return res.json();
    },
  });
}
