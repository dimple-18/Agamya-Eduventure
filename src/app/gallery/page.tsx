import type { Metadata } from "next";

import Footer from "../../components/home/Footer";
import GalleryCatalogSection from "../../components/home/GalleryCatalogSection";
import Navbar from "../../components/home/Navbar";

export const metadata: Metadata = {
  title: "Gallery | Agamya Eduventure",
  description:
    "Explore event-wise photos from Agamya Eduventure including workshops, institute occasions, practical sessions, project work, and student activities.",
};

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <GalleryCatalogSection />
      <Footer />
    </main>
  );
}
