import { Metadata } from "next";
import BlogClientFallback from "./BlogClientFallback";

export const metadata: Metadata = {
  title: "Blog & Insights | Bharat Care - Medical Tourism in India",
  description: "Stay updated with the latest in medical tourism, health tips, and success stories from Bharat Care. Expert insights on procedures, hospitals, and recovery in India.",
};

export default function BlogPage() {
  return <BlogClientFallback />;
}
