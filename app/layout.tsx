import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

export const metadata: Metadata = {
  title: "Bharat Care - Your Medical Journey, Perfectly Planned",
  description:
    "Seamlessly plan your medical trip to India. Choose from leading procedures, top-rated hospitals, expert doctors, and luxury accommodations all in one place.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

