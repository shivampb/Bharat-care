import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, Briefcase, CheckCircle2, Star, UserCircle, Hospital } from "lucide-react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { getDoctorByUID, getAllDoctors } from "@/lib/prismic";
import { DoctorSelectButton } from "./DoctorSelectButton";

type Props = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  try {
    const doc = await getDoctorByUID(uid);
    const name = doc.data.name || "Doctor";
    const specialty = doc.data.specialty || "Specialist";
    return {
      title: doc.data.meta_title || `${name} — ${specialty} in India | Bharat Care`,
      description: doc.data.meta_description || `Book a consultation with ${name}, a leading ${specialty} with ${doc.data.experience || "years of"} experience. World-class medical care in India.`,
      openGraph: {
        title: doc.data.meta_title || `${name} — ${specialty}`,
        description: doc.data.meta_description || `${doc.data.experience} experience. Book now.`,
        images: doc.data.meta_image?.url
          ? [{ url: doc.data.meta_image.url }]
          : doc.data.image?.url 
            ? [{ url: doc.data.image.url }] 
            : [],
      },
    };
  } catch {
    return { title: "Doctor | Bharat Care" };
  }
}

export async function generateStaticParams() {
  const docs = await getAllDoctors();
  return docs.map((doc) => ({ uid: doc.uid }));
}

export default async function DoctorDetailPage({ params }: Props) {
  const { uid } = await params;
  let doc;
  try {
    doc = await getDoctorByUID(uid);
  } catch {
    notFound();
  }

  const { data } = doc;
  const hospitalLink = data.hospital as any;
  const hospitalName = hospitalLink?.data?.name || "";
  const hospitalLocation = hospitalLink?.data?.location || "";
  const hospitalImage = hospitalLink?.data?.image?.url || "";
  const hospitalUid = hospitalLink?.uid || "";

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Header */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 w-full bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
          <div className="w-full md:w-auto self-start">
            <Link href="/doctors" className="inline-flex items-center text-white/70 hover:text-white transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Link>
          </div>

          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl shrink-0">
            {data.image?.url ? (
              <PrismicNextImage field={data.image} className="w-full h-full object-cover" fallbackAlt="" />
            ) : (
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover" />
            )}
          </div>

          <div className="flex-1 text-center md:text-left mt-2 lg:mt-6 text-white text-sm">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-100 border border-teal-500/30 text-xs font-semibold tracking-wider mb-4">
              <UserCircle className="w-3 h-3 mr-1" /> Specialist Profile
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-3">
              {data.name}
            </h1>
            <p className="text-lg lg:text-xl text-primary-200 font-medium mb-6">
              {data.specialty}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center bg-slate-800/80 rounded-xl px-4 py-2 border border-slate-700">
                <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                <span className="font-medium">{data.experience} Exp.</span>
              </div>
              <div className="flex items-center bg-slate-800/80 rounded-xl px-4 py-2 border border-slate-700">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span className="font-medium">{data.rating || "4.9/5 Rating"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-border mt-8 lg:mt-0">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Meet {data.name}</h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                {Array.isArray(data.biography) && data.biography.length > 0 ? (
                  <PrismicRichText field={data.biography as any} />
                ) : typeof data.biography === 'string' ? (
                  <p>{data.biography}</p>
                ) : (
                  <>
                    <p>
                      <strong>{data.name}</strong> is a highly respected <strong>{data.specialty}</strong> with
                      over <strong>{data.experience}</strong> of dedicated experience in the field.
                    </p>
                    <p className="mt-4">
                      Detailed information regarding educational background, research publications, awards, case studies, and a
                      comprehensive portfolio of complex procedures will be available through our CMS integration.
                    </p>
                  </>
                )}
              </div>
            </div>

            {hospitalName && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <h2 className="text-xl font-bold mb-6 text-foreground flex items-center">
                  <Hospital className="w-5 h-5 mr-2 text-secondary" /> Primary Affiliation
                </h2>
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 mr-4 border border-slate-100 bg-slate-50">
                    {hospitalImage ? (
                      <img src={hospitalImage} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{hospitalName}</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-2">Located in {hospitalLocation}</p>
                    {hospitalUid && (
                      <Link href={`/hospitals/${hospitalUid}`} className="text-primary text-sm font-medium hover:underline">
                        View Hospital Details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 border border-border">
              <h3 className="text-xl font-bold mb-2">Consultation Details</h3>
              <p className="text-muted-foreground text-sm mb-6 pb-6 border-b border-border">
                Confirm {data.name} as your preferred specialist to lead your treatment.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex flex-col mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-sm mb-1">Availability</span>
                  <span className="font-bold text-foreground tracking-tight">{data.accepting_patients === false ? "Currently fully booked" : "Accepting new international patients"}</span>
                </div>
                {(data.free_consultation !== false) && (
                  <div className="flex items-center text-green-600 text-sm font-medium mt-4 bg-green-50 p-3 rounded-xl border border-green-100">
                    <CheckCircle2 className="w-5 h-5 mr-2 shrink-0" /> Free initial video consultation
                  </div>
                )}
              </div>

              <DoctorSelectButton
                doctor={{
                  id: doc.uid!,
                  uid: doc.uid!,
                  name: data.name || "",
                  specialty: data.specialty || "",
                  experience: data.experience || "",
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
