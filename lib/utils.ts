import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRating(rating: string | number | undefined | null): string {
  if (!rating) return "4.8 / 5";
  const r = String(rating);
  // If it already has /5 or / 5, return it
  if (r.includes("/5") || r.includes("/ 5")) return r;
  // If it's just a number (possibly with text after it), append / 5
  // But usually it's just a number like "4.5"
  return `${r} / 5`;
}
