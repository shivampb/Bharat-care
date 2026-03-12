"use client";

import { motion } from "framer-motion";

type FeaturesSliceProps = {
  slice: {
    primary: {
      title?: any;
      description?: any;
    };
    items: Array<{
      icon?: string;
      title?: string;
      description?: string;
    }>;
  };
};

const Features = ({ slice }: FeaturesSliceProps) => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          {slice.primary.title && (
            <h2 className="text-3xl font-display font-bold mb-4">
              {typeof slice.primary.title === "string"
                ? slice.primary.title
                : slice.primary.title?.[0]?.text || "Why Choose India for Medical Treatment?"}
            </h2>
          )}
          {slice.primary.description && (
            <p className="text-muted-foreground text-lg">
              {typeof slice.primary.description === "string"
                ? slice.primary.description
                : slice.primary.description?.[0]?.text || "Experience world-class healthcare at a fraction of global costs."}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {slice.items.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:bg-white transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon || "🏥"}</div>
              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
