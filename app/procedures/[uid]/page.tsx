import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { getProcedureByUID, getAllProcedures } from "@/lib/prismic";

import { ProcedureSelectButton } from "./ProcedureSelectButton";

type Props = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;

  try {
    const doc = await getProcedureByUID(uid);
    const name = doc.data.name || "Medical Procedure";
    const description = doc.data.description || "";

    return {
      title: doc.data.meta_title || `${name} in India — Cost, Recovery & Top Hospitals | Bharat Care`,
      description: doc.data.meta_description || description || `Learn about ${name} treatment in India. Affordable world-class care with JCI-accredited hospitals. Get cost estimates and plan your medical trip.`,
      openGraph: {
        title: doc.data.meta_title || `${name} — Affordable Treatment in India`,
        description: doc.data.meta_description || description,
        images: doc.data.meta_image?.url
          ? [{ url: doc.data.meta_image.url }]
          : doc.data.image?.url 
            ? [{ url: doc.data.image.url }] 
            : [],
      },
    };
  } catch {
    return { title: "Procedure | Bharat Care" };
  }
}

export async function generateStaticParams() {
  const docs = await getAllProcedures();
  return docs.map((doc) => ({ uid: doc.uid }));
}

export default async function ProcedureDetailPage({ params }: Props) {
  const { uid } = await params;

  let doc;
  try {
    doc = await getProcedureByUID(uid);
  } catch {
    notFound();
  }

  const { data } = doc;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[400px] w-full bg-slate-900 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          {data.image?.url ? (
            <PrismicNextImage
              field={data.image}
              className="w-full h-full object-cover opacity-40"
              fallbackAlt=""
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80"
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/procedures" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Procedures
          </Link>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 text-primary-50 border border-primary/30 text-xs font-semibold uppercase tracking-wider mb-4">
            Medical Procedure
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {data.name}
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Overview</h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                {Array.isArray(data.rich_description) && data.rich_description.length > 0 ? (
                  <PrismicRichText field={data.rich_description as any} />
                ) : typeof data.rich_description === 'string' ? (
                  <p>{data.rich_description}</p>
                ) : (
                  <>
                    <p>
                      <strong>{data.name}</strong> is a world-class medical procedure available at our partner hospitals in India.
                    </p>
                    <p className="mt-4">
                      This procedure generally costs around <span className="font-semibold text-foreground">{data.cost_range}</span>{" "}
                      when performed in our partner hospitals, saving you significantly over local costs while maintaining
                      top international JCI-certified care standards.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Info Blocks */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">High Success Rates</h3>
                <div className="text-muted-foreground text-sm leading-relaxed">
                  {Array.isArray(data.success_rate_text) && data.success_rate_text.length > 0 ? (
                    <PrismicRichText field={data.success_rate_text as any} />
                  ) : typeof data.success_rate_text === 'string' ? (
                    <p>{data.success_rate_text}</p>
                  ) : (
                    <p>Our network of hospitals boasts a 99% success and safety rate for this specific procedure, utilizing modern robotic-assisted techniques.</p>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <Clock className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">Estimated Recovery</h3>
                <div className="text-muted-foreground text-sm leading-relaxed">
                  {Array.isArray(data.recovery_text) && data.recovery_text.length > 0 ? (
                    <PrismicRichText field={data.recovery_text as any} />
                  ) : typeof data.recovery_text === 'string' ? (
                    <p>{data.recovery_text}</p>
                  ) : (
                    <p>Most patients can travel back home safely within 2 to 3 weeks post-surgery following clearance by the lead consultant.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 border border-border">
              <h3 className="text-xl font-bold mb-2">Plan Your Trip</h3>
              <p className="text-muted-foreground text-sm mb-6 pb-6 border-b border-border">
                Add this procedure to your medical trip planner to unlock hospital and specialist options.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Estimated Cost</span>
                  <span className="font-bold text-foreground text-lg">{data.cost_range}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-medium text-foreground">{data.recovery_time || "7 - 14 Days"}</span>
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium mt-4 bg-green-50 p-3 rounded-xl border border-green-100">
                  <CheckCircle2 className="w-5 h-5 mr-2 shrink-0" /> Fast-tracked appointments available
                </div>
              </div>

              <ProcedureSelectButton
                procedure={{
                  id: doc.uid!,
                  uid: doc.uid!,
                  name: data.name || "",
                  description: data.description || "",
                  costRange: data.cost_range || "",
                  image: data.image?.url || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
