"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";

/**
 * Props for `Team`.
 */
export type TeamProps = SliceComponentProps<any>;

/**
 * Component for "Team" Slices.
 */
const Team = ({ slice }: TeamProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-24 bg-zinc-50/50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {slice.primary.title && (
              <div className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-zinc-900">
                <PrismicRichText field={slice.primary.title} />
              </div>
            )}
            {slice.primary.description && (
              <div className="text-zinc-600 text-lg leading-relaxed">
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {slice.items.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-zinc-200/50 border border-zinc-100 group hover:shadow-emerald-100/50 transition-all"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <PrismicNextImage
                  field={item.image}
                  fallbackAlt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8">
                <div className="text-xl font-bold text-zinc-900 mb-1">{item.name}</div>
                <div className="text-primary font-semibold mb-3 text-sm uppercase tracking-wider">
                  {item.role}
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
