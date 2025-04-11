import HeroSection from "../../components/HeroSection";
import QualitySection from "../../components/QualitySection";
import ServicesSection from "../../components/ServicesSection";
import WorkInProgressSection from "../../components/WorkInProgressSection";
import ProjectsSection from "../../components/ProjectsSection";
import GallerySection from "../../components/GallerySection";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <QualitySection />
      <ServicesSection />
      <ProjectsSection />
      <WorkInProgressSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </div>
  );
}
