import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarouselHome from "@/components/CarouselHome";

const TestSeries = () => {
  return (
    <div>
      <Navbar />
      <CarouselHome />
      <div className="text-center">
        <h2>Welcome to Test Series Page</h2>
      </div>
      <Footer />
    </div>
  );
};

export default TestSeries;
