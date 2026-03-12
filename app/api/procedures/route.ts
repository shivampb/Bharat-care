import { NextResponse } from "next/server";
import { getAllProcedures } from "@/lib/prismic";

export async function GET() {
  try {
    const docs = await getAllProcedures();
    const procedures = docs.map((doc) => ({
      uid: doc.uid,
      category: (doc.data as any).category || "Standard Medical",
      name: doc.data.name || "",
      description: doc.data.description || "",
      costRange: doc.data.cost_range || "",
      image: doc.data.image?.url || "",
      recoveryTime: doc.data.recovery_time || "7-14 Days",
      successRate: (doc.data.success_rate_text as any)?.[0]?.text || "99% Success Rate",
    }));
    return NextResponse.json(procedures);
  } catch {
    // Fallback to hardcoded data if Prismic is unavailable
    const { procedures } = await import("@/lib/data");
    return NextResponse.json(procedures);
  }
}
