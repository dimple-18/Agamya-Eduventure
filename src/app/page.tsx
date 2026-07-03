import About from "../components/home/About";
import Contact from "../components/home/Contact";
import Courses from "../components/home/Courses";
import Footer from "../components/home/Footer";
import HomeGallery from "../components/home/HomeGallery";
import Hero from "../components/home/Hero";
import LearningJourney from "../components/home/LearningJourney";
import Navbar from "../components/home/Navbar";
import StudentWorkShowcase from "../components/home/StudentWorkShowcase";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <main className="page-shell">
      <Navbar />
      <Hero />
      <About />
      <Courses preview />
      <HomeGallery />
      <StudentWorkShowcase />
      <Testimonials />
      <LearningJourney />
      <Contact />
      <Footer />
    </main>
  );
}
