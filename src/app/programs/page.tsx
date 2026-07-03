import type { Metadata } from "next";

import Courses from "../../components/home/Courses";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";

export const metadata: Metadata = {
  title: "Programs | Agamya Eduventure",
  description:
    "Find the right learning path by filtering categories and reviewing detailed program tracks at Agamya Eduventure.",
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
