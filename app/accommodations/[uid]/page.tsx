import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, DollarSign, Hotel, MapPin, Navigation, Star } from "lucide-react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { getAccommodationByUID, getAllAccommodations } from "@/lib/prismic";
import { AccommodationSelectButton } from "./AccommodationSelectButton";

type Props = {
  params: Promise<{ uid: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  try {
    const doc = await getAccommodationByUID(uid);
    const name = doc.data.name || "Accommodation";
    return {
      title: doc.data.meta_title || `${name} — Medical Stay Near Hospital | Bharat Care`,
      description: doc.data.meta_description || `Stay at ${name} during your medical trip. ${doc.data.price_range || "Affordable"} per night, ${doc.data.distance || "close"} from hospital. Recovery-focused amenities included.`,
      openGraph: {
        title: doc.data.meta_title || `${name} — Partner Stay for Medical Tourists`,
        description: doc.data.meta_description || `${doc.data.price_range}. ${doc.data.distance} from hospital.`,
        images: doc.data.meta_image?.url
          ? [{ url: doc.data.meta_image.url }]
          : doc.data.image?.url 
            ? [{ url: doc.data.image.url }] 
            : [],
      },
    };
  } catch {
    return { title: "Accommodation | Bharat Care" };
  }
}

export async function generateStaticParams() {
  const docs = await getAllAccommodations();
  return docs.map((doc) => ({ uid: doc.uid }));
}

export default async function AccommodationDetailPage({ params }: Props) {
  const { uid } = await params;
  let doc;
  try {
    doc = await getAccommodationByUID(uid);
  } catch {
    notFound();
  }

  const { data } = doc;
  const hospitalLink = data.nearby_hospital as any;
  const hospitalName = hospitalLink?.data?.name || "";
  const hospitalLocation = hospitalLink?.data?.location || "";
  const hospitalUid = hospitalLink?.uid || "";

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[400px] w-full bg-slate-900 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          {data.image?.url ? (
            <PrismicNextImage field={data.image} className="w-full h-full object-cover opacity-40" fallbackAlt="" />
          ) : (
            <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/accommodations" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Accommodations
          </Link>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Hotel className="w-3 h-3 mr-1" /> Partnered Stay
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
            {data.name}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center text-slate-300 gap-4 mb-6 text-sm lg:text-base">
            <span className="flex items-center text-green-300 font-medium bg-green-900/40 px-3 py-1 rounded-full border border-green-800">
              <DollarSign className="w-4 h-4" /> {data.price_range} / night
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">
              <Star className="w-5 h-5 mr-1 text-yellow-500 fill-yellow-500" /> {data.rating || "4.8 Guest Rating"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6 text-foreground">About This Stay</h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                {Array.isArray(data.description) && data.description.length > 0 ? (
                  <PrismicRichText field={data.description as any} />
                ) : typeof data.description === 'string' ? (
                  <p>{data.description}</p>
                ) : (
                  <>
                    <p><strong>{data.name}</strong> offers comprehensive comfort and care amenities tailored specifically for international medical tourists.</p>
                    <p className="mt-4">Rich content about room types, accessibility details, on-call nursing services, dietary meal plan integrations, and real-time availability will be fetched from the CMS.</p>
                  </>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <Navigation className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Location & Access</h3>
                {hospitalName ? (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Conveniently located just <strong>{data.distance}</strong> from <strong>{hospitalName}</strong>.
                    Complimentary daily shuttle services are provided between the hotel and the medical facility.
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Strategically located just <strong>{data.distance}</strong> from key partner hospitals.
                    Complimentary shuttle services are provided.
                  </p>
                )}
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <CheckCircle2 className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Recovery Amenities</h3>
                {Array.isArray(data.features) && data.features.length > 0 ? (
                  <div className="text-sm text-muted-foreground">
                    <PrismicRichText field={data.features as any} />
                  </div>
                ) : typeof data.features === 'string' ? (
                  <div className="text-sm text-muted-foreground">
                    <p>{data.features}</p>
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Wheelchair accessible rooms</li>
                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Specialized dietary menus</li>
                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> 24/7 on-call medical desk</li>
                    <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Translation services available</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl shadow-primary/5 border border-border">
              <h3 className="text-xl font-bold mb-2">Booking Details</h3>
              <p className="text-muted-foreground text-sm mb-6 pb-6 border-b border-border">
                Select this accommodation as your preferred stay during your medical journey.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-medium">Est. Nightly Rate</span>
                  <span className="font-bold text-lg text-green-600">{data.price_range}</span>
                </div>
                {hospitalName && (
                  <div className="flex items-start mt-4 bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-800">
                    <MapPin className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold mb-0.5">Perfect Location</p>
                      <p className="text-xs">Only {data.distance} from chosen hospital ({hospitalName}).</p>
                    </div>
                  </div>
                )}
              </div>

              <AccommodationSelectButton
                accommodation={{
                  id: doc.uid!,
                  uid: doc.uid!,
                  name: data.name || "",
                  distance: data.distance || "",
                  priceRange: data.price_range || "",
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
