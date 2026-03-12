import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAllDoctors } from "@/lib/prismic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hospitalUid = searchParams.get("hospitalUid");

  try {
    const docs = await getAllDoctors();
    let doctorsList = docs.map((doc) => ({
      uid: doc.uid,
      category: (doc.data as any).category || "Standard Medical",
      name: doc.data.name || "",
      specialty: doc.data.specialty || "",
      experience: doc.data.experience || "",
      hospitalUid: (doc.data.hospital as any)?.uid || "",
      hospitalName: (doc.data.hospital as any)?.data?.name || "",
      image: doc.data.image?.url || "",
      rating: doc.data.rating || "4.9/5 Rating",
      acceptingPatients: doc.data.accepting_patients ?? true,
      freeConsultation: doc.data.free_consultation ?? false,
    }));

    if (hospitalUid) {
      doctorsList = doctorsList.filter((d) => d.hospitalUid === hospitalUid);
    }

    return NextResponse.json(doctorsList);
  } catch {
    const { doctors } = await import("@/lib/data");
    const hospitalId = searchParams.get("hospitalId");
    if (hospitalId) {
      const filtered = doctors.filter((d) => d.hospitalId === parseInt(hospitalId));
      return NextResponse.json(filtered);
    }
    return NextResponse.json(doctors);
  }
}
