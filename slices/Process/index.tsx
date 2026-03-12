"use client";

import { motion } from "framer-motion";

type ProcessSliceProps = {
  slice: {
    primary: {
      title?: any;
      description?: any;
    };
    items: Array<{
      step_number?: string;
      title?: string;
      description?: string;
    }>;
  };
};

const Process = ({ slice }: ProcessSliceProps) => {
  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          {slice.primary.title && (
            <h2 className="text-3xl font-display font-bold mb-4">
              {typeof slice.primary.title === "string"
                ? slice.primary.title
                : slice.primary.title?.[0]?.text || "How It Works"}
            </h2>
          )}
          {slice.primary.description && (
            <p className="text-muted-foreground text-lg">
              {typeof slice.primary.description === "string"
                ? slice.primary.description
                : slice.primary.description?.[0]?.text || "Your medical journey in simple steps."}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {slice.items.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mx-auto mb-5">
                {step.step_number || String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-bold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

              {i < slice.items.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
