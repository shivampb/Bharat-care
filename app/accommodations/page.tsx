"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Navigation, DollarSign, ArrowRight, Info, Search } from "lucide-react";
import { useAccommodations } from "@/hooks/use-accommodations";
import { usePlannerStore } from "@/store/use-planner-store";
import { PlannerProgress } from "@/components/PlannerProgress";

export default function Accommodations() {
  const router = useRouter();
  const { hospital, accommodation: selected, setAccommodation } = usePlannerStore();
  const { data: accommodations, isLoading } = useAccommodations(hospital?.id);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAccommodations = accommodations?.filter(acc => 
    acc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (acc: any) => {
    setAccommodation(acc);
    router.push("/planner");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      <PlannerProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-4">Choose Your Stay</h1>
          <p className="text-lg text-muted-foreground">
            {hospital
              ? `Premium recovery accommodations conveniently located near ${hospital.name}.`
              : "Luxury partnered hotels tailored for recovery and comfort."}
          </p>
        </div>

        {!hospital && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start text-blue-800">
            <Info className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
            <p className="text-sm">You haven&apos;t selected a hospital yet. Distance estimates may not be accurate.</p>
          </div>
        )}

        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search accommodations by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccommodations?.map((acc: any, idx: number) => (
              <motion.div
                key={acc.uid || acc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`
                  bg-white rounded-3xl overflow-hidden shadow-md border-2 transition-all duration-300 flex flex-col
                  ${(selected?.uid && selected.uid === acc.uid) || (selected?.id && selected.id === acc.id) ? "border-primary ring-4 ring-primary/10 shadow-xl scale-[1.02]" : "border-transparent hover:border-border hover:shadow-lg"}
                `}
              >
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={acc.image || `https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=600&h=400`}
                    alt={acc.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-amber-600 font-bold text-[10px] flex items-center shadow-sm">
                    <span className="mr-1">★</span> {acc.rating}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold text-sm flex items-center shadow-lg">
                    <DollarSign className="w-4 h-4 mr-0.5 text-green-400" />
                    {acc.priceRange}
                  </div>
                </div>

                <div className="p-6 flex flex-col grow">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{acc.name}</h3>

                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                        <Navigation className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Distance to Facility</p>
                        <p className="text-sm text-muted-foreground">{acc.distance}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Link
                      href={`/accommodations/${acc.uid || acc.id}`}
                      className="flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 bg-slate-100 text-foreground hover:bg-slate-200"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleSelect(acc)}
                      className={`
                        flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200
                        ${(selected?.uid && selected.uid === acc.uid) || (selected?.id && selected.id === acc.id) ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"}
                      `}
                    >
                      {(selected?.uid && selected.uid === acc.uid) || (selected?.id && selected.id === acc.id) ? "Selected" : "Select"}
                      {((selected?.uid && selected.uid !== acc.uid) || (!selected?.uid && selected?.id !== acc.id) || !selected) && <ArrowRight className="w-4 h-4 ml-2" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredAccommodations?.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                No accommodations found matching "{searchQuery}". Try adjusting your search.
              </div>
            )}

            <div className="col-span-full flex flex-col items-center gap-6 pt-10 border-t border-slate-200/60 mt-4">
              <div className="text-center space-y-2">
                <h4 className="text-lg font-bold text-slate-800">Arranging your own stay?</h4>
                <p className="text-sm text-slate-500 max-w-md">No problem. You can manage your own recovery accommodation, or decide later with the help of your case manager.</p>
              </div>
              <button 
                onClick={() => router.push("/planner")}
                className="group px-8 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-600 font-bold hover:border-primary hover:text-primary transition-all flex items-center shadow-xs"
              >
                Skip Stay Selection <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
