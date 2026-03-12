"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Star, MapPin, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Procedure, Hospital, Doctor, Accommodation } from "@/lib/types";

const TypewriterWords = ({ words }: { words: string[] }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Find the longest word to reserve space and prevent jumping
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const handleTyping = () => {
      const currentFullWord = words[currentWordIndex];
      
      if (!isDeleting) {
        setCurrentText(currentFullWord.substring(0, currentText.length + 1));
        setTypingSpeed(150);

        if (currentText === currentFullWord) {
          setIsDeleting(true);
          setTypingSpeed(2000); // Pause at end of word
        }
      } else {
        setCurrentText(currentFullWord.substring(0, currentText.length - 1));
        setTypingSpeed(100);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500); // Pause before next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed]);

  return (
    <span className="relative inline-grid">
      {/* Invisible ghost text to reserve maximum width and height */}
      <span className="invisible opacity-0 pointer-events-none select-none col-start-1 row-start-1" aria-hidden="true">
        {longestWord}
      </span>
      {/* Actual animated text */}
      <span className="inline-flex items-center text-primary col-start-1 row-start-1 whitespace-nowrap">
        {currentText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="ml-1.5 inline-block w-1.5 h-[0.85em] bg-primary/60 rounded-sm"
        />
      </span>
    </span>
  );
};

const FloatingPlus = ({ className, delay = 0, size = "text-xl" }: { className?: string; delay?: number; size?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
      rotate: [0, 90, 0],
      y: [0, -15, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    className={`absolute text-primary/30 font-display font-light pointer-events-none select-none z-0 ${size} ${className}`}
  >
    +
  </motion.div>
);

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
      <section className="relative min-h-dvh lg:h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row items-center pt-6 sm:pt-8 lg:pt-0 overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-background" />

          {/* Soft, minimal gradient orbs - Enhanced for mobile */}
          <div className="absolute top-[-10%] left-[-10%] w-screen h-[100vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-primary/8 blur-[80px] lg:blur-[120px]" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[80vw] h-[80vw] lg:w-[45vw] lg:h-[45vw] rounded-full bg-secondary/8 blur-[80px] lg:blur-[120px]" />
          <div className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] lg:w-[25vw] lg:h-[25vw] rounded-full bg-teal-400/5 blur-[60px] lg:blur-[100px]" />

          {/* Animated Plus symbols */}
          <FloatingPlus className="top-[15%] left-[10%]" delay={0} size="text-3xl" />
          <FloatingPlus className="top-[45%] left-[5%]" delay={1.5} size="text-xl" />
          <FloatingPlus className="top-[75%] left-[25%]" delay={0.8} size="text-2xl" />
          <FloatingPlus className="top-[25%] right-[25%]" delay={2} size="text-2xl" />
          <FloatingPlus className="top-[60%] right-[10%]" delay={1.2} size="text-4xl" />
          <FloatingPlus className="bottom-[15%] right-[35%]" delay={0.5} size="text-xl" />
          <FloatingPlus className="top-[10%] left-[50%]" delay={2.5} size="text-lg" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full flex flex-col lg:flex-row items-center text-center lg:text-left">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-[55%] pt-2 lg:pt-0"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-[11px] sm:text-[13px] mb-6 lg:mb-8 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Affordable World-Class Medical Treatment in India</span>
            </div>

            {/* Heading */}
            <h1 className="text-[3rem] sm:text-[4.2rem] lg:text-[4.5rem] xl:text-[5rem] font-bold leading-[1.05] sm:leading-[1.1] lg:leading-[1.05] tracking-tight mb-6 lg:mb-8 text-foreground">
              Your <TypewriterWords words={["Medical", "Health", "Clinical", "Treatment"]} /> <br className="hidden sm:block" />
              Journey, <br />
              <span className="text-secondary">Perfectly Planned</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-[1.1rem] text-slate-600 mb-8 lg:mb-10 leading-relaxed max-w-[520px] mx-auto lg:mx-0">
              Welcome to India. Seamlessly plan your medical trip. Choose from leading procedures, top-rated hospitals, expert doctors, and luxury accommodations all in one place.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
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
          className="lg:absolute right-0 bottom-0 top-0 w-full lg:w-[50%] flex items-end justify-center lg:justify-end pointer-events-none z-10"
        >
          {/* Mobile visible image wrapper */}
          <div className="relative w-full max-w-[320px] sm:max-w-lg mx-auto flex justify-center pb-0 mt-12 lg:hidden pointer-events-none z-10 px-4">
            {/* Decorative shapes for mobile like in reference */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 bg-linear-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute top-[10%] right-[10%] w-24 h-48 bg-yellow-400/20 rounded-full -z-10 rotate-12 blur-xl" />
            <div className="absolute bottom-[20%] left-[5%] w-32 h-16 bg-primary/20 rounded-full -z-10 -rotate-12 blur-xl" />
            
            <img
              src="/hero.png"
              alt="Medical Professional"
              className="w-full h-auto max-h-[45vh] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative z-10"
            />
            {/* Mobile-only plus signs around image */}
            <FloatingPlus className="top-[20%] left-[-5%] lg:hidden" delay={0.3} size="text-2xl" />
            <FloatingPlus className="bottom-[40%] right-[-5%] lg:hidden" delay={1.1} size="text-xl" />
          </div>

          {/* Desktop visible image */}
          <div className="relative w-full h-[calc(100vh-4rem)] hidden lg:flex justify-end items-end pointer-events-none z-10 lg:pr-12 xl:pr-24">
            <FloatingPlus className="top-[20%] left-[10%]" delay={0.4} size="text-3xl" />
            <FloatingPlus className="bottom-[30%] left-[20%]" delay={1.7} size="text-4xl" />
            
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
                  <div className="p-5 flex flex-col grow">
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
                    {hospital.rating && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-foreground font-bold text-xs flex items-center shadow-lg border border-slate-100">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                        {hospital.rating}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full uppercase tracking-wider border border-primary/20">
                        {hospital.accreditations}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[11px] font-bold text-amber-700">{hospital.rating || "4.8"}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors leading-tight">{hospital.name}</h3>
                    <div className="flex items-center text-slate-500 text-xs mb-4">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-secondary" />
                      {hospital.location}
                    </div>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{hospital.specialties}</p>
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">View Details</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
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
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold bg-secondary/10 text-secondary px-2.5 py-1 rounded-full uppercase tracking-wider border border-secondary/20">
                        {doctor.specialty}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[11px] font-bold text-amber-700">{doctor.rating || "4.8"}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1 group-hover:text-primary transition-colors leading-tight">{doctor.name}</h3>
                    <div className="flex items-center text-slate-500 text-xs mb-4">
                      <Briefcase className="w-3.5 h-3.5 mr-1 text-secondary" />
                      {doctor.experience}
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Available Now</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
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
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full uppercase tracking-wider border border-teal-100">
                        Top Rated Stay
                      </span>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[11px] font-bold text-amber-700">{acc.rating || "4.7"}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">{acc.name}</h3>
                    <div className="flex items-center text-slate-500 text-xs mb-4">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-secondary" />
                      Distance: {acc.distance}
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">{acc.priceRange.split(' / ')[0]}</span>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
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
                className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold bg-linear-to-r from-primary to-teal-500 text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
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
