import type { Metadata } from "next";

import ContactCatalog from "../../components/home/ContactCatalog";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";

export const metadata: Metadata = {
  title: "Contact | Agamya Eduventure",
  description:
    "Contact Agamya Eduventure to discuss programs, student fit, admissions, and the right next step for learning.",
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <Navbar />
      <ContactCatalog />
      <Footer />
    </main>
  );
}
