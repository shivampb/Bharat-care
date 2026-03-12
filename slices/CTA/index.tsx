"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PrismicLink } from "@prismicio/react";

type CTASliceProps = {
  slice: {
    primary: {
      title?: any;
      description?: any;
      button_text?: string;
      button_link?: any;
      secondary_button_text?: string;
    };
  };
};

const CTA = ({ slice }: CTASliceProps) => {
  const titleText =
    typeof slice.primary.title === "string"
      ? slice.primary.title
      : slice.primary.title?.[0]?.text || "Start Planning Your Medical Trip Today";

  const descText =
    typeof slice.primary.description === "string"
      ? slice.primary.description
      : slice.primary.description?.[0]?.text ||
        "Join thousands of patients who have successfully completed their medical treatments with us.";

  return (
    <section className="relative py-16 lg:py-20 bg-linear-to-r from-primary/10 to-teal-500/10 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground">
            {titleText}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {descText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {slice.primary.button_link ? (
              <PrismicLink
                field={slice.primary.button_link}
                className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold bg-linear-to-r from-primary to-teal-500 text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                {slice.primary.button_text || "Begin Your Journey"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </PrismicLink>
            ) : (
              <Link
                href="/procedures"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold bg-linear-to-r from-primary to-teal-500 text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                {slice.primary.button_text || "Begin Your Journey"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
            {slice.primary.secondary_button_text && (
              <button className="inline-flex items-center justify-center px-10 py-4 rounded-full font-semibold bg-white text-foreground border-2 border-border shadow-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                {slice.primary.secondary_button_text}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
