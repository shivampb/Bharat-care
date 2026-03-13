import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { getPageByUID } from "@/lib/prismic";
import { components } from "@/slices";
import AboutClientFallback from "./AboutClientFallback";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPageByUID("about");
    
    return {
      title: page.data.meta_title || "About Bharat Care - Our Mission & Story",
      description: page.data.meta_description || "Learn about Bharat Care, India's leading medical tourism facilitator. Discover our story, our team, and how we help patients find the best healthcare in India.",
      openGraph: {
        title: page.data.meta_title || "About Bharat Care",
        description: page.data.meta_description || "Learn about Bharat Care and our mission to provide accessible healthcare.",
        images: page.data.meta_image?.url ? [{ url: page.data.meta_image.url }] : [],
      },
    };
  } catch {
    return {
      title: "About Us | Bharat Care",
      description: "Learn more about Bharat Care and our commitment to excellence in medical tourism.",
    };
  }
}

export default async function Page() {
  let page;
  try {
    page = await getPageByUID("about");
  } catch (error) {
    // If Prismic document doesn't exist yet, show a beautiful fallback
    return <AboutClientFallback />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": page.data.meta_title || "About Bharat Care",
    "description": page.data.meta_description || "Learn about Bharat Care",
    "publisher": {
      "@type": "Organization",
      "name": "Bharat Care",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bharatcare.com/logo.png" // Placeholder
      }
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
