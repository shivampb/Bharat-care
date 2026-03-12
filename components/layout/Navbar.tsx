"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, Stethoscope, Building2, UserCircle, Bed, ClipboardList } from "lucide-react";
import { usePlannerStore } from "@/store/use-planner-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { procedure, hospital, doctor, accommodation } = usePlannerStore();

  const steps = [
    { name: "Procedures", path: "/procedures", active: !!procedure, icon: Stethoscope },
    { name: "Hospitals", path: "/hospitals", active: !!hospital, icon: Building2 },
    { name: "Doctors", path: "/doctors", active: !!doctor, icon: UserCircle },
    { name: "Stay", path: "/accommodations", active: !!accommodation, icon: Bed },
  ];

  const itemsSelected = [procedure, hospital, doctor, accommodation].filter(Boolean).length;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              Bharat<span className="text-primary"> Care</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {steps.map((step, index) => (
              <div key={step.name} className="flex items-center">
                <Link
                  href={step.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    pathname === step.path
                      ? "bg-primary/10 text-primary"
                      : step.active
                        ? "text-foreground hover:bg-black/5"
                        : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
                  )}
                >
                  <step.icon className={cn("w-4 h-4", step.active && pathname !== step.path && "text-primary")} />
                  <span>{step.name}</span>
                </Link>
                {index < steps.length - 1 && (
                  <div className="w-4 h-[1px] bg-border mx-1" />
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center">
            <Link
              href="/planner"
              className="flex items-center space-x-2 bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
            >
              <ClipboardList className="w-5 h-5" />
              <span>Planner</span>
              {itemsSelected > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-bold ml-1">
                  {itemsSelected}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
