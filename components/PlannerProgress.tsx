"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
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
    <div className="w-full py-8 mb-8 bg-white border-b border-border shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = pathname === step.path;
            const isPast = steps.findIndex((s) => s.path === pathname) > index;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center relative z-10 group">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300",
                      step.isComplete
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : isActive
                          ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30 ring-4 ring-secondary/20"
                          : "bg-muted text-muted-foreground border-2 border-border"
                    )}
                  >
                    {step.isComplete && !isActive ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-6 text-xs font-medium whitespace-nowrap transition-colors",
                      isActive || step.isComplete ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 px-4">
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
      </div>
    </div>
  );
}
