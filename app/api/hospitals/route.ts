import { NextResponse } from "next/server";
import { getAllHospitals } from "@/lib/prismic";
import { formatRating } from "@/lib/utils";

export async function GET() {
  try {
    const docs = await getAllHospitals();
    const hospitals = docs.map((doc) => ({
      uid: doc.uid,
      category: (doc.data as any).category || "Standard Medical",
      name: doc.data.name || "",
      location: doc.data.location || "",
      specialties: doc.data.specialties || "",
      accreditations: doc.data.accreditations || "",
      image: doc.data.image?.url || "",
      rating: formatRating((doc.data as any).rating),
      freeAirportTransfers: doc.data.free_airport_transfers ?? false,
      internationalTranslators: doc.data.international_translators ?? false,
    }));
    return NextResponse.json(hospitals);
  } catch {
    const { hospitals } = await import("@/lib/data");
    return NextResponse.json(hospitals);
  }
}
