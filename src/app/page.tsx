import About from "../components/home/About";
import Contact from "../components/home/Contact";
import CoursesSection from "../components/home/CoursesSection";
import Footer from "../components/home/Footer";
import HomeGallerySection from "../components/home/HomeGallerySection";
import Hero from "../components/home/Hero";
import LearningJourney from "../components/home/LearningJourney";
import Navbar from "../components/home/Navbar";
import StudentWorkShowcaseSection from "../components/home/StudentWorkShowcaseSection";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <main className="page-shell">
      <Navbar />
      <Hero />
      <About />
      <CoursesSection preview />
      <HomeGallerySection />
      <StudentWorkShowcaseSection />
      <Testimonials />
      <LearningJourney />
      <Contact />
      <Footer />
    </main>
  );
}
