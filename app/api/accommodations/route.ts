import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAllAccommodations } from "@/lib/prismic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hospitalUid = searchParams.get("hospitalUid");

  try {
    const docs = await getAllAccommodations();
    let accList = docs.map((doc) => ({
      uid: doc.uid,
      name: doc.data.name || "",
      distance: doc.data.distance || "",
      priceRange: doc.data.price_range || "",
      hospitalUid: (doc.data.nearby_hospital as any)?.uid || "",
      hospitalName: (doc.data.nearby_hospital as any)?.data?.name || "",
      image: doc.data.image?.url || "",
      rating: doc.data.rating || "4.8 Guest Rating",
    }));

    if (hospitalUid) {
      accList = accList.filter((a) => a.hospitalUid === hospitalUid);
    }

    return NextResponse.json(accList);
  } catch {
    const { accommodations } = await import("@/lib/data");
    const hospitalId = searchParams.get("hospitalId");
    if (hospitalId) {
      const filtered = accommodations.filter((a) => a.hospitalId === parseInt(hospitalId));
      return NextResponse.json(filtered);
    }
    return NextResponse.json(accommodations);
  }
}
