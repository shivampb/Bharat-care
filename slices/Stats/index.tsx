"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";

/**
 * Props for `Stats`.
 */
export type StatsProps = SliceComponentProps<any>;

/**
 * Component for "Stats" Slices.
 */
const Stats = ({ slice }: StatsProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-24 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {slice.primary.title && (
              <div className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                <PrismicRichText field={slice.primary.title} />
              </div>
            )}
            {slice.primary.description && (
              <div className="text-zinc-600 text-lg">
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {slice.items.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-100 shadow-xl shadow-zinc-200/50 text-center group hover:border-emerald-500/30 transition-colors"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {item.value}
              </div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
