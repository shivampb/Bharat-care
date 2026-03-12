"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Stethoscope, Building2, UserCircle, Bed,
  CheckCircle2, AlertCircle, Loader2, ArrowRight, Trash2
} from "lucide-react";

import { usePlannerStore } from "@/store/use-planner-store";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { PlannerProgress } from "@/components/PlannerProgress";

const inquiryFormSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  country: z.string().min(2, "Country of residence is required"),
  age: z.number({ message: "Valid age is required" }).min(1, "Valid age is required").max(120),
  medicalNotes: z.string().min(10, "Please provide brief medical details"),
  visaStatus: z.string().min(1, "Please select your visa status"),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

export default function Planner() {
  const router = useRouter();
  const { procedure, hospital, doctor, accommodation, isComplete, clearPlanner } = usePlannerStore();
  const { mutateAsync: createInquiry, isPending } = useCreateInquiry();

  const { register, handleSubmit, formState: { errors } } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
  });

  const onSubmit = async (data: InquiryFormValues) => {
    if (!isComplete()) return;

    try {
      await createInquiry({
        ...data,
        procedureId: procedure!.id,
        hospitalId: hospital!.id,
        doctorId: doctor!.id,
        accommodationId: accommodation!.id,
      });

      clearPlanner();
      router.push("/thank-you");
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  const selections = [
    { label: "Procedure", item: procedure, icon: Stethoscope, link: "/procedures" },
    { label: "Hospital", item: hospital, icon: Building2, link: "/hospitals" },
    { label: "Doctor", item: doctor, icon: UserCircle, link: "/doctors" },
    { label: "Accommodation", item: accommodation, icon: Bed, link: "/accommodations" },
  ];

  const readyToSubmit = isComplete();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      <PlannerProgress />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-4">Review &amp; Submit</h1>
          <p className="text-lg text-muted-foreground">
            Review your selections and provide your details to request a comprehensive consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Selections Summary */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl font-bold mb-6">Your Plan</h2>

            {selections.map((sec, idx) => (
              <motion.div
                key={sec.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-5 rounded-2xl shadow-sm border border-border flex items-start"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 ${sec.item ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"}`}>
                  <sec.icon className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-1">{sec.label}</p>
                  {sec.item ? (
                    <p className="font-bold text-foreground text-lg leading-tight">{sec.item.name}</p>
                  ) : (
                    <Link href={sec.link} className="text-secondary font-medium hover:underline inline-flex items-center text-sm">
                      Select {sec.label} <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  )}
                </div>
                {sec.item && (
                  <Link href={sec.link} className="text-muted-foreground hover:text-primary text-sm font-medium underline shrink-0 ml-4">
                    Edit
                  </Link>
                )}
              </motion.div>
            ))}

            {(procedure || hospital || doctor || accommodation) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => {
                  if (confirm("Are you sure you want to clear your entire plan?")) {
                    clearPlanner();
                  }
                }}
                className="w-full flex items-center justify-center p-3 text-sm text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium mt-4"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Reset Entire Plan
              </motion.button>
            )}
          </div>

          {/* Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-border">
              <h2 className="text-2xl font-bold mb-8">Patient Details</h2>

              {!readyToSubmit ? (
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start text-amber-800">
                  <AlertCircle className="w-6 h-6 mr-3 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Incomplete Plan</h4>
                    <p className="text-sm">Please complete all selections (Procedure, Hospital, Doctor, and Accommodation) on the left before requesting a consultation.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Full Name</label>
                      <input
                        {...register("name")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-destructive text-xs font-medium">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Email Address</label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-destructive text-xs font-medium">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Phone Number</label>
                      <input
                        {...register("phone")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && <p className="text-destructive text-xs font-medium">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Age</label>
                      <input
                        {...register("age", { valueAsNumber: true })}
                        type="number"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                        placeholder="35"
                      />
                      {errors.age && <p className="text-destructive text-xs font-medium">{errors.age.message}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Country of Residence</label>
                      <input
                        {...register("country")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all"
                        placeholder="United States"
                      />
                      {errors.country && <p className="text-destructive text-xs font-medium">{errors.country.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Visa Status</label>
                      <select
                        {...register("visaStatus")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all appearance-none"
                      >
                        <option value="">Select status...</option>
                        <option value="Not Required">Not Required</option>
                        <option value="Have valid visa">Have Valid Visa</option>
                        <option value="Need to apply">Need to Apply</option>
                      </select>
                      {errors.visaStatus && <p className="text-destructive text-xs font-medium">{errors.visaStatus.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Medical Notes / Background</label>
                    <textarea
                      {...register("medicalNotes")}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all resize-none"
                      placeholder="Briefly describe your medical condition, previous surgeries, and specific requests..."
                    />
                    {errors.medicalNotes && <p className="text-destructive text-xs font-medium">{errors.medicalNotes.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-teal-500 text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        Request Consultation <CheckCircle2 className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Your information is secure and encrypted. Our medical concierge will contact you within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
