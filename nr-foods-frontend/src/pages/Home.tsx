import Navbar from "../components/Navbar";
import HeroSection from "./landing/HeroSection";
import ProductSection from "./landing/ProductSection";
import Footer from "./landing/Footer";
import FeaturesSection from "./landing/FeaturesSection";
import DeliveryInfoSection from "./landing/DeliveryInfoSection";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
   
      
      <FeaturesSection />

<DeliveryInfoSection />
<ProductSection />
      
      <Footer />
    </div>
  );
};

export default Home;