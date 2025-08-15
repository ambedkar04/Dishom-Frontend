import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarouselHome from "@/components/CarouselHome";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="space-y-0">
        <CarouselHome />
        <HeroSection />
        <Footer />
      </div>
      
    </div>
  );
};

export default Home;
