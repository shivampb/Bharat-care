"use client";

import { motion } from "framer-motion";
import { ArrowRight, HeartPulse, ShieldCheck, Globe, Star, Users, Briefcase, Award, Stethoscope, Heart, Activity } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const FloatingObject = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.1, 1],
      rotate: [0, 45, 0],
      y: [0, -20, 0]
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`absolute pointer-events-none select-none z-0 ${className}`}
  >
    {children}
  </motion.div>
);

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

export default function AboutClientFallback() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center overflow-hidden">
        {/* Decorative Background Objects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Orbs */}
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] left-[30%] w-[30vw] h-[30vw] bg-teal-100 rounded-full blur-[100px] opacity-30" />

          {/* Pluses */}
          <FloatingPlus className="top-[15%] left-[5%]" delay={0} size="text-4xl" />
          <FloatingPlus className="top-[45%] right-[8%]" delay={1.5} size="text-2xl" />
          <FloatingPlus className="bottom-[20%] left-[15%]" delay={0.8} size="text-3xl" />
          <FloatingPlus className="top-[10%] right-[25%]" delay={2.2} size="text-xl" />
          <FloatingPlus className="bottom-[10%] right-[20%]" delay={1.2} size="text-5xl" />
          <FloatingPlus className="top-[60%] left-[10%]" delay={3} size="text-2xl" />

          {/* Medical Icons */}
          <FloatingObject className="top-[25%] left-[20%] text-primary" delay={0.5}>
            <Stethoscope className="w-12 h-12" />
          </FloatingObject>
          <FloatingObject className="top-[15%] right-[15%] text-secondary" delay={1.8}>
            <Heart className="w-10 h-10" />
          </FloatingObject>
          <FloatingObject className="bottom-[25%] right-[30%] text-primary" delay={2.5}>
            <Activity className="w-14 h-14" />
          </FloatingObject>
          <FloatingObject className="bottom-[15%] left-[30%] text-secondary" delay={0.2}>
            <HeartPulse className="w-16 h-16" />
          </FloatingObject>

          {/* Animated Mesh Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 py-20 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-6 border border-primary/20"
            >
              Our Journey
            </motion.div>

            <h1 className="text-5xl lg:text-9.5xl font-bold tracking-tight text-zinc-900 mb-8 max-w-4xl mx-auto leading-tight drop-shadow-sm">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Revolutionizing
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-primary"
              >
                Global Healthcare
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Through Bharat
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed mb-16"
            >
              Bharat Care is more than a medical tourism platform. We are your dedicated partners in navigating the excellence of Indian healthcare.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/procedures"
                className="px-10 py-5 bg-primary text-white rounded-full font-bold shadow-2xl shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group text-lg"
              >
                Explore Treatments
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/"
                className="px-10 py-5 bg-white text-zinc-900 border border-zinc-200 rounded-full font-bold hover:bg-zinc-50 transition-all text-center text-lg"
              >
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-zinc-50/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-[55%]">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-zinc-900 tracking-tight leading-tight">
                  Born from a Vision to Make Healing Accessible
                </h2>
                <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
                  <p>
                    For decades, India has emerged as a beacon of medical excellence, combining ancient wisdom with cutting-edge modern science. Yet, navigating this landscape remained a challenge for international patients.
                  </p>
                  <p>
                    Bharat Care was founded to bridge this gap. We simplify every step of your medical journey, from choosing the right hospital to coordinating your post-operative stay, ensuring you can focus entirely on your recovery.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900">Accredited Network</h4>
                      <p className="text-sm text-zinc-500">Only JCI & NABH certified partner hospitals.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900">Full Support</h4>
                      <p className="text-sm text-zinc-500">Concierge help for visa, flight, and stay.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end lg:pr-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-lg aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=85&w=1000"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Patients Served", value: "2500+", icon: <Users className="w-6 h-6" /> },
              { label: "Partner Hospitals", value: "85+", icon: <Briefcase className="w-6 h-6" /> },
              { label: "Specialist Doctors", value: "450+", icon: <HeartPulse className="w-6 h-6" /> },
              { label: "Success Rate", value: "99%", icon: <Award className="w-6 h-6" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform text-primary">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-zinc-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-zinc-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-zinc-900">Meet Our Leadership</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Our team consists of medical experts and operational veterans dedicated to your safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Dr. Vikram Singh", role: "Chief Medical Officer", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400" },
              { name: "Sanya Kapoor", role: "Head of Operations", image: "https://images.unsplash.com/photo-1582750433449-64c7019d4577?auto=format&fit=crop&q=80&w=400" },
              { name: "Rahul Mukherjee", role: "Patient Safety Officer", image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?auto=format&fit=crop&q=80&w=400" },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden shadow-xl aspect-4/5"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black/80 to-transparent">
                  <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                  <p className="text-primary font-medium text-sm tracking-wider uppercase">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[40px_40px]" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                Ready to Experience <br /> World-Class Healthcare?
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Join thousands of patients who have entrusted Bharat Care with their medical journeys. We are here for you, every step of the way.
              </p>
              <Link
                href="/planner"
                className="inline-flex items-center px-10 py-5 bg-white text-primary rounded-full font-bold shadow-2xl hover:bg-emerald-50 transition-all gap-3 group"
              >
                Start Planning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
