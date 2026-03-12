import { createClient } from "@/prismicio";

/**
 * Prismic data-fetching helpers.
 * All functions return typed Prismic documents and are designed for
 * use in React Server Components (RSC) — no "use client" needed.
 */

// ─── Procedures ────────────────────────────────────────────────────────────────

export async function getAllProcedures() {
  const client = createClient();
  return client.getAllByType("procedure", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
  });
}

export async function getProcedureByUID(uid: string) {
  const client = createClient();
  return client.getByUID("procedure", uid);
}

// ─── Hospitals ─────────────────────────────────────────────────────────────────

export async function getAllHospitals() {
  const client = createClient();
  return client.getAllByType("hospital", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
  });
}

export async function getHospitalByUID(uid: string) {
  const client = createClient();
  return client.getByUID("hospital", uid);
}

// ─── Doctors ───────────────────────────────────────────────────────────────────

export async function getAllDoctors() {
  const client = createClient();
  return client.getAllByType("doctor", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
    fetchLinks: ["hospital.name"],
  });
}

export async function getDoctorByUID(uid: string) {
  const client = createClient();
  return client.getByUID("doctor", uid, {
    fetchLinks: ["hospital.name", "hospital.location", "hospital.image"],
  });
}

// ─── Accommodations ────────────────────────────────────────────────────────────

export async function getAllAccommodations() {
  const client = createClient();
  return client.getAllByType("accommodation", {
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
    fetchLinks: ["hospital.name"],
  });
}

export async function getAccommodationByUID(uid: string) {
  const client = createClient();
  return client.getByUID("accommodation", uid, {
    fetchLinks: ["hospital.name", "hospital.location", "hospital.image"],
  });
}

// ─── Pages (Sliceable) ────────────────────────────────────────────────────────

export async function getPageByUID(uid: string) {
  const client = createClient();
  return client.getByUID("page", uid);
}

export async function getHomePage() {
  const client = createClient();
  try {
    return await client.getByUID("page", "homepage");
  } catch {
    // Homepage may not exist in Prismic yet — return null so we fall back
    return null;
  }
}
