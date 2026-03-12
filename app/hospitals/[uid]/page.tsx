import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, Building2, CheckCircle2, MapPin, Stethoscope } from "lucide-react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { getHospitalByUID, getAllHospitals } from "@/lib/prismic";
import { HospitalSelectButton } from "./HospitalSelectButton";

type Props = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  try {
    const doc = await getHospitalByUID(uid);
    const name = doc.data.name || "Hospital";
    const location = doc.data.location || "India";
    return {
      title: doc.data.meta_title || `${name}, ${location} — JCI Accredited Hospital | Bharat Care`,
      description: doc.data.meta_description || `${name} in ${location}. ${doc.data.specialties || "Multi-specialty"} hospital with ${doc.data.accreditations || "international"} accreditations. Plan your medical trip today.`,
      openGraph: {
        title: doc.data.meta_title || `${name} — Top Hospital in ${location}`,
        description: doc.data.meta_description || `${doc.data.specialties}. ${doc.data.accreditations} accredited.`,
        images: doc.data.meta_image?.url
          ? [{ url: doc.data.meta_image.url }]
          : doc.data.image?.url 
            ? [{ url: doc.data.image.url }] 
            : [],
      },
    };
  } catch {
    return { title: "Hospital | Bharat Care" };
  }
}

export async function generateStaticParams() {
  const docs = await getAllHospitals();
  return docs.map((doc) => ({ uid: doc.uid }));
}

export default async function HospitalDetailPage({ params }: Props) {
  const { uid } = await params;
  let doc;
  try {
    doc = await getHospitalByUID(uid);
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
            <PrismicNextImage field={data.image} className="w-full h-full object-cover opacity-40" fallbackAlt="" />
          ) : (
            <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/hospitals" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Hospitals
          </Link>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-100 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3 h-3 mr-1" /> Medical Facility
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
            {data.name}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center text-slate-300 gap-4 mb-6 text-sm lg:text-base">
            <span className="flex items-center">
              <MapPin className="w-5 h-5 mr-1 text-secondary" /> {data.location}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center text-blue-300 font-medium bg-blue-900/40 px-3 py-1 rounded-full border border-blue-800">
              <Award className="w-4 h-4 mr-1" /> {data.accreditations}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6 text-foreground">About This Hospital</h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                {Array.isArray(data.description) && data.description.length > 0 ? (
                  <PrismicRichText field={data.description as any} />
                ) : typeof data.description === 'string' ? (
                  <p>{data.description}</p>
                ) : (
                  <>
                    <p><strong>{data.name}</strong> is one of the premier healthcare institutions in India, located in the heart of {data.location}.</p>
                    <p className="mt-4">Comprehensive information about the hospital&apos;s world-class amenities, international patient counters, robotic surgical systems, and visa-assistance desks will be available soon through the Prismic CMS integration.</p>
                  </>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <Stethoscope className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Key Specialties</h3>
                <p className="text-foreground font-medium text-sm leading-relaxed mb-3">{data.specialties}</p>
                <div className="text-muted-foreground text-sm">
                  {Array.isArray(data.key_specialties_text) && data.key_specialties_text.length > 0 ? (
                    <PrismicRichText field={data.key_specialties_text as any} />
                  ) : typeof data.key_specialties_text === 'string' ? (
                    <p>{data.key_specialties_text}</p>
                  ) : (
                    <p>Renowned departments equipped with state-of-the-art diagnostic and surgical machinery.</p>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <Award className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Global Accreditations</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Proudly carrying <span className="text-foreground font-medium">{data.accreditations}</span> accreditations, proving their commitment to international quality and patient safety standards.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 border border-border">
              <h3 className="text-xl font-bold mb-2">Facility Details</h3>
              <p className="text-muted-foreground text-sm mb-6 pb-6 border-b border-border">
                Confirm this hospital for your medical trip to proceed with choosing a dedicated specialist.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex flex-col mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-sm mb-1">Primary Location</span>
                  <span className="font-bold text-foreground">{data.location}, India</span>
                </div>
                {(data.free_airport_transfers !== false) && (
                  <div className="flex items-center text-blue-600 text-sm font-medium mt-4 bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <CheckCircle2 className="w-5 h-5 mr-2 shrink-0" /> Free airport transfers included
                  </div>
                )}
                {(data.international_translators !== false) && (
                  <div className="flex items-center text-green-600 text-sm font-medium mt-4 bg-green-50 p-3 rounded-xl border border-green-100">
                    <CheckCircle2 className="w-5 h-5 mr-2 shrink-0" /> Dedicated international translators
                  </div>
                )}
              </div>

              <HospitalSelectButton
                hospital={{
                  id: doc.uid!,
                  uid: doc.uid!,
                  name: data.name || "",
                  location: data.location || "",
                  specialties: data.specialties || "",
                  accreditations: data.accreditations || "",
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
