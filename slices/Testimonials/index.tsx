"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

type TestimonialsSliceProps = {
  slice: {
    primary: {
      title?: any;
      description?: any;
    };
    items: Array<{
      name?: string;
      country?: string;
      procedure?: string;
      text?: string;
      rating?: number;
    }>;
  };
};

const Testimonials = ({ slice }: TestimonialsSliceProps) => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          {slice.primary.title && (
            <h2 className="text-3xl font-display font-bold mb-4">
              {typeof slice.primary.title === "string"
                ? slice.primary.title
                : slice.primary.title?.[0]?.text || "Patient Testimonials"}
            </h2>
          )}
          {slice.primary.description && (
            <p className="text-muted-foreground text-lg">
              {typeof slice.primary.description === "string"
                ? slice.primary.description
                : slice.primary.description?.[0]?.text || "Real stories from satisfied patients who trusted us with their health."}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {slice.items.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array(testimonial.rating || 5)
                  .fill(0)
                  .map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
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
  );
};

export default Testimonials;
