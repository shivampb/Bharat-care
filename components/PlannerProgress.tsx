"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { usePlannerStore } from "@/store/use-planner-store";
import { cn } from "@/lib/utils";

export function PlannerProgress() {
  const pathname = usePathname();
  const { procedure, hospital, doctor, accommodation } = usePlannerStore();

  const steps = [
    { id: 1, name: "Procedure", path: "/procedures", isComplete: !!procedure },
    { id: 2, name: "Hospital", path: "/hospitals", isComplete: !!hospital },
    { id: 3, name: "Doctor", path: "/doctors", isComplete: !!doctor },
    { id: 4, name: "Stay", path: "/accommodations", isComplete: !!accommodation },
    { id: 5, name: "Review", path: "/planner", isComplete: false },
  ];

  return (
    <div className="w-full py-8 mb-8 bg-white border-b border-border shadow-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-4 justify-between">
          <div className="flex items-center justify-between grow w-full">
            {steps.map((step, index) => {
              const isActive = pathname === step.path;
              const isPast = steps.findIndex((s) => s.path === pathname) > index;

              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <Link 
                    href={step.path}
                    className="flex flex-col items-center relative z-10 group"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                        step.isComplete
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 group-hover:scale-110"
                          : isActive
                            ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30 ring-4 ring-secondary/20"
                            : "bg-muted text-muted-foreground border-2 border-border group-hover:border-primary/50"
                      )}
                    >
                      {step.isComplete && !isActive ? <Check className="w-5 h-5" /> : step.id}
                    </div>
                    <span
                      className={cn(
                        "absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider transition-colors",
                        isActive || step.isComplete ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {step.name}
                    </span>
                  </Link>

                  {index < steps.length - 1 && (
                    <div className="flex-1 px-2 mb-0">
                      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500 ease-out"
                          style={{ width: isPast || step.isComplete ? "100%" : "0%" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <Link 
            href="/planner"
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center shrink-0 shadow-lg",
              pathname === "/planner"
                ? "bg-primary text-white"
                : (procedure || hospital || doctor || accommodation)
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20"
                  : "bg-slate-100 text-slate-400 pointer-events-none"
            )}
          >
            Review Plan <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
