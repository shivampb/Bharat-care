"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Procedure, Hospital, Doctor, Accommodation } from "@/lib/types";

export default function HomeClientFallback() {
  const { data: procedures = [] } = useQuery<Procedure[]>({
    queryKey: ["/api/procedures"],
    queryFn: async () => {
      const res = await fetch("/api/procedures");
      return res.json();
    },
  });

  const { data: hospitals = [] } = useQuery<Hospital[]>({
    queryKey: ["/api/hospitals"],
    queryFn: async () => {
      const res = await fetch("/api/hospitals");
      return res.json();
    },
  });

  const { data: doctors = [] } = useQuery<Doctor[]>({
    queryKey: ["/api/doctors"],
    queryFn: async () => {
      const res = await fetch("/api/doctors");
      return res.json();
    },
  });

  const { data: accommodations = [] } = useQuery<Accommodation[]>({
    queryKey: ["/api/accommodations"],
    queryFn: async () => {
      const res = await fetch("/api/accommodations");
      return res.json();
    },
  });

  const testimonials = [
    {
      name: "Mr. Ahmed Hassan",
      country: "UAE",
      procedure: "Cardiac Bypass Surgery",
      text: "The entire experience was seamless. From initial consultation to post-surgery care, every detail was perfectly coordinated. I'm grateful for this platform!",
      rating: 5,
    },
    {
      name: "Mrs. Sarah Williams",
      country: "UK",
      procedure: "Knee Replacement",
      text: "Affordable world-class treatment combined with excellent hospitality. My recovery has been smooth and I've saved 60% compared to UK treatment costs.",
      rating: 5,
    },
    {
      name: "Mr. David Chen",
      country: "Australia",
      procedure: "IVF Treatment",
      text: "Highly professional doctors and state-of-the-art facilities. The personalized care we received made all the difference. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] w-full flex items-center pt-20 lg:pt-0 overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-background" />

          {/* Soft, minimal gradient orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-primary/5 blur-[100px] lg:blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] lg:w-[45vw] lg:h-[45vw] rounded-full bg-secondary/5 blur-[100px] lg:blur-[120px]" />
          <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] lg:w-[25vw] lg:h-[25vw] rounded-full bg-teal-400/5 blur-[80px] lg:blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-[55%] pt-10 lg:pt-0"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-primary/10 text-primary font-medium text-xs sm:text-[13px] mb-8 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Affordable World-Class Medical Treatment in India</span>
            </div>

            {/* Heading */}
            <h1 className="text-[3.5rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold leading-[1.05] tracking-tight mb-6 text-foreground">
              Your Medical <br />
              Journey, <br />
              <span className="text-secondary">Perfectly Planned</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-[1.1rem] text-slate-600 mb-10 leading-relaxed max-w-[520px]">
              Seamlessly plan your medical trip in India. Choose from leading procedures, top-rated hospitals, expert doctors, and luxury accommodations all in one place.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/procedures"
                className="inline-flex items-center justify-center px-8 lg:px-9 py-4 rounded-full font-bold bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(44,141,118,0.25)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(44,141,118,0.35)] hover:bg-primary/90 transition-all duration-300 group"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-primary-foreground" />
              </Link>
              <Link
                href="/planner"
                className="inline-flex items-center justify-center px-8 lg:px-9 py-4 rounded-full font-bold bg-transparent text-foreground border-2 border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                Plan Your Medical Trip
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:absolute right-0 bottom-0 top-0 w-full lg:w-[50%] h-full flex items-end justify-end pointer-events-none z-10"
        >
          {/* Mobile visible image */}
          <div className="relative w-full max-w-lg mx-auto flex justify-center pb-0 mt-12 lg:hidden pointer-events-none z-10">
            <img
              src="/hero.png"
              alt="Medical Professional"
              className="w-full h-auto max-h-[60vh] object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] relative z-10"
            />
          </div>

          {/* Desktop visible image */}
          <div className="relative w-full h-[calc(100vh-4rem)] hidden lg:flex justify-end items-end pointer-events-none z-10 lg:pr-12 xl:pr-24">
            <img
              src="/hero.png"
              alt="Medical Professional"
              className="h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-auto object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] relative z-10"
            />
          </div>
        </motion.div>
      </section>
      {/* Popular Procedures Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Popular Procedures</h2>
            <p className="text-muted-foreground text-lg">Choose from our most sought-after medical treatments with transparent pricing.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(procedures as any[]).slice(0, 4).map((procedure, i) => (
              <motion.div
                key={procedure.uid || procedure.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex"
              >
                <Link 
                  href={`/procedures/${procedure.uid || procedure.id}`}
                  className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col w-full"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img
                      src={procedure.image}
                      alt={procedure.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{procedure.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{procedure.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-primary font-semibold">{procedure.costRange}</span>
                      <span className="text-primary hover:text-primary/80 font-medium transition flex items-center gap-1">
                        Select <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/procedures"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              View All Procedures
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose India Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Why Choose India for Medical Treatment?</h2>
            <p className="text-muted-foreground text-lg">Experience world-class healthcare at a fraction of global costs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "💰", title: "Affordable Care", desc: "Save up to 70% on medical procedures without compromising quality." },
              { icon: "⭐", title: "Experienced Doctors", desc: "Highly trained specialists with international certifications and years of expertise." },
              { icon: "🏥", title: "Modern Hospitals", desc: "State-of-the-art facilities equipped with latest medical technology." },
              { icon: "🤝", title: "Patient Support", desc: "Dedicated support for visa, travel arrangements, and post-operative care." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:bg-white transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Hospitals Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Top Accredited Hospitals</h2>
            <p className="text-muted-foreground text-lg">Partner with India&apos;s leading JCI and NABH accredited medical institutions.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(hospitals as any[]).slice(0, 3).map((hospital, i) => (
              <motion.div
                key={hospital.uid || hospital.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex"
              >
                <Link 
                  href={`/hospitals/${hospital.uid || hospital.id}`}
                  className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col w-full hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden bg-slate-200">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{hospital.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">📍 {hospital.location}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hospital.specialties}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">{hospital.accreditations}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Expert Medical Specialists</h2>
            <p className="text-muted-foreground text-lg">Choose from our network of highly experienced and qualified doctors.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(doctors as any[]).slice(0, 4).map((doctor, i) => (
              <motion.div
                key={doctor.uid || doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex"
              >
                <Link 
                  href={`/doctors/${doctor.uid || doctor.id}`}
                  className="group text-center rounded-2xl overflow-hidden bg-slate-50 hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col w-full hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{doctor.name}</h3>
                    <p className="text-primary font-semibold text-sm mb-3">{doctor.specialty}</p>
                    <p className="text-muted-foreground text-sm mb-4 mt-auto">{doctor.experience}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hygienic Accommodations Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Hygienic & Healing Stays</h2>
            <p className="text-muted-foreground text-lg">Partnered luxury recovery accommodations tailored for medical tourists.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(accommodations as any[]).slice(0, 4).map((acc, i) => (
              <motion.div
                key={acc.uid || acc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex"
              >
                <Link 
                  href={`/accommodations/${acc.uid || acc.id}`}
                  className="group rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col w-full hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white font-bold text-xs flex items-center shadow-lg">
                      {acc.priceRange}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{acc.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">Distance: {acc.distance}</p>
                    
                    <div className="mt-auto w-full py-2.5 rounded-xl font-semibold flex items-center justify-center transition-all duration-200 bg-slate-100 text-foreground group-hover:bg-primary group-hover:text-white text-sm">
                      View Details
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonials Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Patient Testimonials</h2>
            <p className="text-muted-foreground text-lg">Real stories from satisfied patients who trusted us with their health.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.procedure} • {testimonial.country}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 lg:py-20 bg-linear-to-r from-primary/10 to-teal-500/10 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground">Start Planning Your Medical Trip Today</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of patients who have successfully completed their medical treatments with us. Take the first step towards better health.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/procedures"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-primary to-teal-500 text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold bg-white text-foreground border-2 border-border shadow-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
