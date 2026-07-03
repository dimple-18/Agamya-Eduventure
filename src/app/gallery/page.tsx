import type { Metadata } from "next";

import Footer from "../../components/home/Footer";
import GalleryCatalog from "../../components/home/GalleryCatalog";
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
      <GalleryCatalog />
      <Footer />
    </main>
  );
}
