"use client";

import { SliceComponentProps, PrismicRichText, PrismicLink } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<any>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] w-full flex items-center pt-20 lg:pt-0 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-primary/5 blur-[100px] lg:blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] lg:w-[45vw] lg:h-[45vw] rounded-full bg-secondary/5 blur-[100px] lg:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full flex flex-col lg:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[55%] pt-10 lg:pt-0"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-primary/10 text-primary font-medium text-xs sm:text-[13px] mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <PrismicRichText field={slice.primary.subtitle} />
          </div>

          <div className="text-[3.5rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-bold leading-[1.05] tracking-tight mb-6 text-foreground">
            <PrismicRichText field={slice.primary.title} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <PrismicLink
              field={slice.primary.button_link}
              className="inline-flex items-center justify-center px-10 py-5 rounded-full font-bold bg-primary text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 text-lg group"
            >
              {slice.primary.button_text}
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </PrismicLink>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="w-full lg:w-[45%] h-full relative"
        >
          <div className="relative w-full h-full flex justify-end items-end pointer-events-none z-10">
            <PrismicNextImage 
              field={slice.primary.image}
              className="h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] w-auto object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
