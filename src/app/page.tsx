import About from "../components/home/About";
import Contact from "../components/home/Contact";
import Courses from "../components/home/Courses";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <main className="page-shell">
      <Navbar />
      <Hero />
      <About />
      <Courses preview />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
