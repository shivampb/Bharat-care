"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, MapPin, Award, ArrowRight, Search, Star } from "lucide-react";
import { useHospitals } from "@/hooks/use-hospitals";
import { usePlannerStore } from "@/store/use-planner-store";
import { PlannerProgress } from "@/components/PlannerProgress";

export default function Hospitals() {
  const router = useRouter();
  const { data: hospitals, isLoading } = useHospitals();
  const { procedure, hospital: selected, setHospital } = usePlannerStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (procedure?.category) {
      setActiveCategory(procedure.category);
    }
  }, [procedure]);

  const categories = ["All", "Standard Medical", "Ayurveda"];

  const filteredHospitals = hospitals?.filter(hosp => {
    const matchesSearch = 
      hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      hosp.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || hosp.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (hosp: any) => {
    setHospital(hosp);
    router.push("/doctors");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      <PlannerProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-4">Choose a Facility</h1>
          <p className="text-lg text-muted-foreground">
            Partnering exclusively with internationally accredited institutions for your safety and comfort.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search hospitals by name or location..."
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
          <div className="grid md:grid-cols-2 gap-8">
            {filteredHospitals?.map((hosp: any, idx: number) => (
              <motion.div
                key={hosp.uid || hosp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`
                  flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-md border-2 transition-all duration-300
                  ${(selected?.uid && selected.uid === hosp.uid) || (selected?.id && selected.id === hosp.id) ? "border-primary ring-4 ring-primary/10 shadow-xl scale-[1.02]" : "border-transparent hover:border-border hover:shadow-lg"}
                `}
              >
                <div className="sm:w-2/5 h-64 sm:h-auto relative">
                  <img
                    src={hosp.image || `https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600&h=800`}
                    alt={hosp.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary flex items-center shadow-sm w-fit uppercase tracking-wider">
                      {hosp.category || "Standard Medical"}
                    </div>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-teal-600 flex items-center shadow-sm w-fit">
                      <Award className="w-3 h-3 mr-1" /> JCI
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{hosp.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1 text-secondary" />
                      {hosp.location}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Specialties</p>
                        <p className="text-sm text-foreground font-medium">{hosp.specialties}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Accreditations</p>
                        <p className="text-sm text-foreground font-medium">{hosp.accreditations}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Rating</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => {
                            const ratingValue = parseFloat(hosp.rating || "4.8");
                            const isFull = i + 1 <= Math.floor(ratingValue);
                            const isHalf = !isFull && i < ratingValue;
                            
                            return (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${isFull || isHalf ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`} 
                              />
                            );
                          })}
                          <span className="ml-2 text-sm font-bold text-foreground">{hosp.rating || "4.8"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {hosp.freeAirportTransfers && (
                        <div className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center">
                          <span className="mr-1">✈</span> Free Transfers
                        </div>
                      )}
                      {hosp.internationalTranslators && (
                        <div className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center">
                          <span className="mr-1">文</span> Translators
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Link
                      href={`/hospitals/${hosp.uid || hosp.id}`}
                      className="flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 bg-slate-100 text-foreground hover:bg-slate-200"
                    >
                      About Hospital
                    </Link>
                    <button
                      onClick={() => handleSelect(hosp)}
                      className={`
                        flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200
                        ${(selected?.uid && selected.uid === hosp.uid) || (selected?.id && selected.id === hosp.id) ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"}
                      `}
                    >
                      {(selected?.uid && selected.uid === hosp.uid) || (selected?.id && selected.id === hosp.id) ? "Selected" : "Select"}
                      {((selected?.uid && selected.uid !== hosp.uid) || (!selected?.uid && selected?.id !== hosp.id) || !selected) && <ArrowRight className="w-4 h-4 ml-2" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredHospitals?.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                No facilities found matching "{searchQuery}". Try adjusting your search.
              </div>
            )}

            <div className="col-span-full flex flex-col items-center gap-6 pt-10 border-t border-slate-200/60 mt-4">
              <div className="text-center space-y-2">
                <h4 className="text-lg font-bold text-slate-800">Not ready to pick a hospital?</h4>
                <p className="text-sm text-slate-500 max-w-md">Our concierge team will recommend the most suitable internationally accredited facilities based on your specific treatment needs.</p>
              </div>
              <button 
                onClick={() => router.push("/doctors")}
                className="group px-8 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-600 font-bold hover:border-primary hover:text-primary transition-all flex items-center shadow-xs"
              >
                Skip Hospital Selection <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
