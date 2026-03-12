import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const insertInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  country: z.string().min(2),
  age: z.number().min(1).max(120),
  procedureId: z.number(),
  hospitalId: z.number(),
  doctorId: z.number(),
  accommodationId: z.number(),
  medicalNotes: z.string().min(10),
  visaStatus: z.string().min(1),
});

let nextId = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = insertInquirySchema.parse(body);

    const inquiry = {
      ...validated,
      id: nextId++,
      status: "pending",
      createdAt: new Date(),
    };

    return NextResponse.json(inquiry, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      const zodErr = err as z.ZodError;
      return NextResponse.json(
        { message: zodErr.issues[0].message, field: zodErr.issues[0].path.join(".") },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
