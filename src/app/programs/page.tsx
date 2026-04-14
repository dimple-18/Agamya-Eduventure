import type { Metadata } from "next";

import Courses from "../../components/home/Courses";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";

export const metadata: Metadata = {
  title: "Programs | Agamya Eduventure",
  description:
    "Explore Agamya Eduventure programs including programming tracks, technical modules, projects, internships, certifications, and interview preparation.",
};

export default function ProgramsPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <Courses />
      <Footer />
    </main>
  );
}
