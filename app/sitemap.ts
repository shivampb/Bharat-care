import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bharatcare.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/procedures`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hospitals`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/doctors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/accommodations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/planner`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic routes from Prismic
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const [procedures, hospitals, doctors, accommodations] = await Promise.all([
      client.getAllByType("procedure"),
      client.getAllByType("hospital"),
      client.getAllByType("doctor"),
      client.getAllByType("accommodation"),
    ]);

    const procedureRoutes = procedures.map((doc) => ({
      url: `${BASE_URL}/procedures/${doc.uid}`,
      lastModified: new Date(doc.last_publication_date || doc.first_publication_date || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const hospitalRoutes = hospitals.map((doc) => ({
      url: `${BASE_URL}/hospitals/${doc.uid}`,
      lastModified: new Date(doc.last_publication_date || doc.first_publication_date || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const doctorRoutes = doctors.map((doc) => ({
      url: `${BASE_URL}/doctors/${doc.uid}`,
      lastModified: new Date(doc.last_publication_date || doc.first_publication_date || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const accommodationRoutes = accommodations.map((doc) => ({
      url: `${BASE_URL}/accommodations/${doc.uid}`,
      lastModified: new Date(doc.last_publication_date || doc.first_publication_date || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    dynamicRoutes = [
      ...procedureRoutes,
      ...hospitalRoutes,
      ...doctorRoutes,
      ...accommodationRoutes,
    ];
  } catch {
    // If Prismic is unavailable, just return static routes
  }

  return [...staticRoutes, ...dynamicRoutes];
}
