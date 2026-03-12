"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Award, Briefcase, ArrowRight, Info, Search } from "lucide-react";
import { useDoctors } from "@/hooks/use-doctors";
import { usePlannerStore } from "@/store/use-planner-store";
import { PlannerProgress } from "@/components/PlannerProgress";

export default function Doctors() {
  const router = useRouter();
  const { procedure, hospital, doctor: selected, setDoctor } = usePlannerStore();
  const { data: doctors, isLoading } = useDoctors(hospital?.id);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (procedure?.category) {
      setActiveCategory(procedure.category);
    }
  }, [procedure]);

  const categories = ["All", "Standard Medical", "Ayurveda"];

  const filteredDoctors = doctors?.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || doc.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (doc: any) => {
    setDoctor(doc);
    router.push("/accommodations");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      <PlannerProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-4">Select a Specialist</h1>
          <p className="text-lg text-muted-foreground">
            {hospital
              ? `Showing leading specialists available at ${hospital.name}.`
              : "Showing our network of renowned medical professionals."}
          </p>
        </div>

        {!hospital && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start text-blue-800">
            <Info className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
            <p className="text-sm">
              You haven&apos;t selected a hospital yet. Showing all available doctors in our network. To narrow down choices, please select a hospital first.
            </p>
          </div>
        )}

        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search specialists by name or specialty..."
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
            {filteredDoctors?.map((doc: any, idx: number) => (
              <motion.div
                key={doc.uid || doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`
                  bg-white rounded-3xl p-6 shadow-md border-2 transition-all duration-300 flex flex-col
                  ${(selected?.uid && selected.uid === doc.uid) || (selected?.id && selected.id === doc.id) ? "border-primary ring-4 ring-primary/10 shadow-xl scale-[1.02]" : "border-transparent hover:border-border hover:shadow-lg"}
                `}
              >
                <div className="flex items-center space-x-5 mb-6">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm shrink-0">
                    <img
                      src={doc.image || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400`}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-secondary/10 text-secondary font-bold text-[9px] uppercase tracking-wider mb-2 border border-secondary/20">
                      {doc.category || "Standard Medical"}
                    </div>
                    <h3 className="text-xl font-bold text-foreground leading-tight mb-1">{doc.name}</h3>
                    <p className="text-primary font-medium text-sm mb-1">{doc.specialty}</p>
                    {doc.rating && (
                      <div className="flex items-center text-amber-500 text-xs font-bold">
                        <span className="mr-1">★</span> {doc.rating}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-4 grow">
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-secondary mr-3 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Experience</p>
                      <p className="text-sm font-medium text-foreground">{doc.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 text-secondary mr-3 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Affiliation</p>
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {(hospital?.uid && doc.hospitalUid && hospital.uid === doc.hospitalUid) || 
                         (hospital?.id && doc.hospitalId && hospital.id === doc.hospitalId)
                          ? hospital?.name 
                          : doc.hospitalName || "Network Hospital"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    {doc.acceptingPatients !== false && (
                      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit">
                        ● Accepting New Patients
                      </div>
                    )}
                    {doc.freeConsultation && (
                      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md w-fit">
                        ● Free Initial Consultation
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    href={`/doctors/${doc.uid || doc.id}`}
                    className="flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 bg-slate-100 text-foreground hover:bg-slate-200"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => handleSelect(doc)}
                    className={`
                      flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-200
                      ${(selected?.uid && selected.uid === doc.uid) || (selected?.id && selected.id === doc.id) ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"}
                    `}
                  >
                    {(selected?.uid && selected.uid === doc.uid) || (selected?.id && selected.id === doc.id) ? "Selected" : "Select"}
                    {((selected?.uid && selected.uid !== doc.uid) || (!selected?.uid && selected?.id !== doc.id) || !selected) && <ArrowRight className="w-4 h-4 ml-2" />}
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredDoctors?.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                No specialists found matching "{searchQuery}". Try adjusting your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
