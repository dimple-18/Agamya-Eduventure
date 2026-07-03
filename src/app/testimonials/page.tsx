import type { Metadata } from "next";

import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";
import TestimonialsCatalog from "../../components/home/TestimonialsCatalog";

export const metadata: Metadata = {
  title: "Testimonials | Agamya Eduventure",
  description:
    "Read student and parent feedback about the learning approach, mentoring style, and confidence-building experience at Agamya Eduventure.",
};

export default function TestimonialsPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <TestimonialsCatalog />
      <Footer />
    </main>
  );
}
