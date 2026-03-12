"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Search } from "lucide-react";
import { useProcedures } from "@/hooks/use-procedures";
import { usePlannerStore } from "@/store/use-planner-store";
import { PlannerProgress } from "@/components/PlannerProgress";

export default function Procedures() {
  const router = useRouter();
  const { data: procedures, isLoading } = useProcedures();
  const { procedure: selected, setProcedure } = usePlannerStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Standard Medical", "Ayurveda"];

  const filteredProcedures = procedures?.filter(proc => {
    const matchesSearch = 
      proc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      proc.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || proc.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (proc: any) => {
    setProcedure(proc);
    router.push("/hospitals");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      <PlannerProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-4">Select a Procedure</h1>
          <p className="text-lg text-muted-foreground">
            Choose from our specialized medical treatments performed by world-renowned experts.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search procedures by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                ${activeCategory === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProcedures?.map((proc: any, idx: number) => (
              <motion.div
                key={proc.uid || proc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`
                  bg-white rounded-3xl overflow-hidden shadow-md border-2 transition-all duration-300
                  ${(selected?.uid && selected.uid === proc.uid) || (selected?.id && selected.id === proc.id) ? "border-primary ring-4 ring-primary/10 shadow-xl scale-[1.02]" : "border-transparent hover:border-border hover:shadow-lg"}
                `}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={proc.image || `https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600&h=400`}
                    alt={proc.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold text-lg">{proc.name}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-white/80 text-sm font-medium">{proc.costRange}</p>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <p className="text-white/80 text-sm font-medium whitespace-nowrap">{proc.recoveryTime || "7-14 Days"}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-primary font-bold text-[10px] uppercase tracking-wider shadow-sm">
                      {proc.category || "Standard Medical"}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-emerald-500/90 backdrop-blur-md px-2 py-1 rounded-lg text-white font-bold text-[10px] flex items-center shadow-lg">
                      {proc.successRate || "99% Success"}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">{proc.description}</p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/procedures/${proc.uid || proc.id}`}
                      className="flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 bg-slate-100 text-foreground hover:bg-slate-200"
                    >
                      About Procedure
                    </Link>
                    <button
                      onClick={() => handleSelect(proc)}
                      className={`
                        flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200
                        ${(selected?.uid && selected.uid === proc.uid) || (selected?.id && selected.id === proc.id) ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"}
                      `}
                    >
                      {(selected?.uid && selected.uid === proc.uid) || (selected?.id && selected.id === proc.id) ? "Selected" : "Select"}
                      {((selected?.uid && selected.uid !== proc.uid) || (!selected?.uid && selected?.id !== proc.id) || !selected) && <ArrowRight className="w-4 h-4 ml-2" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredProcedures?.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                No procedures found matching "{searchQuery}". Try adjusting your search.
              </div>
            )}

            <div className="col-span-full flex flex-col items-center gap-6 pt-10 border-t border-slate-200/60 mt-4">
              <div className="text-center space-y-2">
                <h4 className="text-lg font-bold text-slate-800">Not sure about a procedure yet?</h4>
                <p className="text-sm text-slate-500 max-w-md">Our medical experts can help diagnose and suggest the best treatment for your condition during your first consultation.</p>
              </div>
              <button 
                onClick={() => router.push("/hospitals")}
                className="group px-8 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-600 font-bold hover:border-primary hover:text-primary transition-all flex items-center shadow-xs"
              >
                Skip Procedure Selection <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
