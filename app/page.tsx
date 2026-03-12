import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { getHomePage } from "@/lib/prismic";
import { components } from "@/slices";
import HomeClientFallback from "./HomeClientFallback";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage();

  if (!page) {
    return {
      title: "Bharat Care - Your Medical Journey, Perfectly Planned",
      description: "Seamlessly plan your medical trip to India. Choose from leading procedures, top-rated hospitals, expert doctors, and luxury accommodations all in one place.",
    };
  }

  return {
    title: page.data.meta_title || "Bharat Care",
    description: page.data.meta_description || "",
    openGraph: {
      title: page.data.meta_title || "Bharat Care",
      description: page.data.meta_description || "",
      images: page.data.meta_image?.url ? [{ url: page.data.meta_image.url }] : [],
    },
  };
}

export default async function Page() {
  // Currently falling back to hardcoded design per user request
  // You can re-enable Prismic here once you've perfected your slices
  return <HomeClientFallback />;
}
