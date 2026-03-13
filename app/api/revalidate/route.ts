import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  console.log("Revalidating prismic tag via POST...");
  // Use the arguments that the environment expects
  // @ts-ignore
  revalidateTag("prismic", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function GET() {
  console.log("Revalidating prismic tag via GET...");
  // @ts-ignore
  revalidateTag("prismic", "max");

  return NextResponse.json({ revalidated: true, now: Date.now(), message: "Revalidation triggered successfully. Please refresh your main page." });
}
