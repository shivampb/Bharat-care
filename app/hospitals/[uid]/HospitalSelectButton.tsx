"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePlannerStore } from "@/store/use-planner-store";

interface HospitalSelectButtonProps {
  hospital: {
    id: string;
    uid: string;
    name: string;
    location: string;
    specialties: string;
    accreditations: string;
    image: string;
  };
}

export function HospitalSelectButton({ hospital }: HospitalSelectButtonProps) {
  const router = useRouter();
  const { hospital: selected, setHospital } = usePlannerStore();

  const handleSelect = () => {
    setHospital(hospital as any);
    router.push("/doctors");
  };

  const isSelected = String(selected?.id) === String(hospital.id) || (selected as any)?.uid === hospital.uid;

  return (
    <button
      onClick={handleSelect}
      className={`
        w-full py-4 rounded-xl font-bold text-base flex items-center justify-center transition-all duration-300
        ${isSelected
          ? "bg-slate-100 text-foreground border-2 border-primary/20"
          : "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 hover:bg-primary/90"}
      `}
    >
      {isSelected ? (
        <>Selected in Planner <CheckCircle2 className="w-5 h-5 ml-2 text-primary" /></>
      ) : (
        <>Select for My Planner <ArrowRight className="w-5 h-5 ml-2" /></>
      )}
    </button>
  );
}
