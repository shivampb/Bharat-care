"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePlannerStore } from "@/store/use-planner-store";

interface ProcedureSelectButtonProps {
  procedure: {
    id: string;
    uid: string;
    name: string;
    description: string;
    costRange: string;
    image: string;
  };
}

export function ProcedureSelectButton({ procedure }: ProcedureSelectButtonProps) {
  const router = useRouter();
  const { procedure: selected, setProcedure } = usePlannerStore();

  const handleSelect = () => {
    setProcedure(procedure as any);
    router.push("/hospitals");
  };

  const isSelected = String(selected?.id) === String(procedure.id) || (selected as any)?.uid === procedure.uid;

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
