"use client";

import { SliceComponentProps, PrismicRichText, PrismicLink } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Stethoscope, Heart, Activity, HeartPulse } from "lucide-react";

export type HeroProps = SliceComponentProps<any>;

const FloatingObject = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.1, 0.2, 0.1],
      scale: [1, 1.1, 1],
      rotate: [0, 45, 0],
      y: [0, -15, 0]
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

const Hero = ({ slice }: HeroProps) => {
  const imageUrl = slice.primary.image?.url;
  const hasImage = typeof imageUrl === 'string' && imageUrl.length > 0;

  return (
    <section className="relative min-h-[70vh] lg:min-h-[calc(100vh-4rem)] w-full flex items-center pt-12 pb-20 lg:pt-0 lg:pb-0 overflow-hidden bg-white">
      {/* Premium Background Objects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/10 rounded-full blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />

        <FloatingObject className="top-[20%] left-[10%] text-primary" delay={0}>
          <Stethoscope className="w-12 h-12" />
        </FloatingObject>
        <FloatingObject className="top-[15%] right-[15%] text-secondary" delay={1.5}>
          <Heart className="w-10 h-10" />
        </FloatingObject>
        <FloatingObject className="bottom-[20%] right-[20%] text-primary" delay={2}>
          <Activity className="w-14 h-14" />
        </FloatingObject>
        <FloatingObject className="bottom-[15%] left-[15%] text-secondary" delay={0.5}>
          <HeartPulse className="w-12 h-12" />
        </FloatingObject>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[55%] text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-[11px] sm:text-[13px] mb-8 border border-primary/20 uppercase tracking-wider mx-auto lg:mx-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>{slice.primary.badge || "Bharat Care Excellence"}</span>
          </motion.div>

          <div className="text-[3rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8 text-zinc-900 drop-shadow-sm">
            <PrismicRichText field={slice.primary.title} />
          </div>

          {slice.primary.subtitle && (
            <div className="text-lg lg:text-xl text-zinc-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              <PrismicRichText field={slice.primary.subtitle} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
            <PrismicLink
              field={slice.primary.button_link}
              className="inline-flex items-center justify-center px-10 py-5 rounded-full font-bold bg-primary text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 text-lg group"
            >
              {slice.primary.button_text || "Explore Bharat Care"}
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </PrismicLink>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[45%] h-full relative min-h-[400px] lg:min-h-0"
        >
          <div className="relative w-full h-full flex justify-center lg:justify-end items-end pointer-events-none z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 bg-linear-to-tr from-primary/15 to-secondary/15 rounded-full blur-3xl opacity-60" />

            {hasImage ? (
              <PrismicNextImage
                field={slice.primary.image}
                fallbackAlt=""
                className="w-full h-auto max-h-[50vh] lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] object-contain object-bottom drop-shadow-[20px_20px_60px_rgba(0,0,0,0.2)]"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=85&w=1200"
                alt="Bharat Care Health Professional"
                className="w-full h-auto max-h-[50vh] lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] object-contain object-bottom drop-shadow-[20px_20px_60px_rgba(0,0,0,0.2)]"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
