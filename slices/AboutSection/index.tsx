"use client";

import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import * as LucideIcons from "lucide-react";

export type AboutSectionProps = SliceComponentProps<any>;

const AboutSection = ({ slice }: AboutSectionProps) => {
  const isImageRight = slice.variation === "imageRight";

  const imageUrl = slice?.primary?.image?.url;
  const hasImage = typeof imageUrl === "string" && imageUrl.length > 0;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 lg:py-24 overflow-hidden relative"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
        <div
          className={clsx(
            "absolute w-[50vw] h-[50vw] rounded-full blur-[120px]",
            isImageRight
              ? "top-[-10%] right-[-10%] bg-primary/10"
              : "top-[-10%] left-[-10%] bg-secondary/10"
          )}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={clsx(
            "flex flex-col gap-12 lg:gap-20 lg:items-center",
            isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
          )}
        >
          {/* Text */}
          <div className="w-full lg:w-[55%]">
            <motion.div
              initial={{ opacity: 0, x: isImageRight ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-6 border border-primary/20">
                {slice?.primary?.badge || "Our Story"}
              </span>

              {slice?.primary?.title && (
                <div className="text-3xl md:text-5xl font-bold mb-8 leading-[1.1] tracking-tight text-zinc-900">
                  <PrismicRichText field={slice.primary.title} />
                </div>
              )}

              <div className="prose prose-lg max-w-none mb-12 text-zinc-600">
                <PrismicRichText field={slice.primary.content} />
              </div>

              {/* Features */}
              {slice?.items?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {slice.items.map((item: any, index: number) => {
                    const iconName = item?.feature_icon as keyof typeof LucideIcons;

                    const IconComponent =
                      (LucideIcons as any)[iconName] || LucideIcons.ShieldCheck;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="flex gap-4 p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>

                        <div>
                          <h4 className="font-bold text-zinc-900">
                            {item?.feature_title || "Hospitality"}
                          </h4>
                          <p className="text-sm text-zinc-500">
                            {item?.feature_description ||
                              "Luxury medical stay."}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end lg:pr-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg aspect-square md:aspect-4/3 lg:aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-xl bg-zinc-100 border border-zinc-200"
            >
              {hasImage ? (
                <PrismicNextImage
                  field={slice.primary.image}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  alt=""
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=85&w=1200"
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}

              <div className="absolute inset-0 bg-primary/20 mix-blend-soft-light opacity-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default AboutSection;