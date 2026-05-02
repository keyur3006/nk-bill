import { motion } from "framer-motion";
import { Droplet, ShieldCheck, Truck, Recycle, Award, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "./landing/Footer";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Droplet className="w-8 h-8 text-blue-500" />,
      title: "100% Pure Mineral Water",
      description: "Our water goes through 7 stages of filtration including UV and RO treatment to ensure absolute purity."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      title: "Quality Certified",
      description: "We adhere to international health standards and are fully certified by local and national health boards."
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      title: "Express Delivery",
      description: "Get your water delivered within hours. Our dedicated fleet ensures you never run out of hydration."
    },
    {
      icon: <Recycle className="w-8 h-8 text-blue-500" />,
      title: "Sustainability Focused",
      description: "We use BPA-free, recyclable materials and optimize our routes to reduce our carbon footprint."
    }
  ];

  const stats = [
    { value: "10+", label: "Years Experience", icon: <Award className="w-5 h-5" /> },
    { value: "50k+", label: "Happy Customers", icon: <Users className="w-5 h-5" /> },
    { value: "100%", label: "Pure Water", icon: <Droplet className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{ backgroundImage: "url('/images/about-hero.png')" }}
        >
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px]"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Pure Water, <span className="text-blue-300">Pure Life.</span>
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto font-medium drop-shadow-md">
            Dedicated to providing the cleanest, most refreshing drinking water for your home and office since 2014.
          </p>
        </motion.div>
      </section>

      {/* STATS OVERLAY */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-5xl text-center flex flex-col items-center group hover:bg-white transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-blue-900">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MISSION SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Mission</span>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Commitment to Exceptional <br /> 
              <span className="text-gradient">Quality & Purity</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              At KD Water Delivery, we believe that access to clean, safe drinking water is a fundamental right. Our journey started with a simple goal: to provide residents with bottled water that doesn't just meet standards, but exceeds them.
            </p>
            <div className="space-y-4">
              {["Advanced UV Purification", "Eco-friendly Packaging", "Doorstep Delivery Excellence"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-semibold text-blue-950">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-100 rounded-5xl -rotate-2 z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1523362628242-f513a30efde2?auto=format&fit=crop&q=80&w=800" 
              alt="Lab testing water" 
              className="relative z-10 rounded-4xl shadow-2xl grayscale-20 hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">Why People Trust Us</h2>
            <div className="w-24 h-1.5 premium-gradient mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-4xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 transition-all bg-white group"
              >
                <div className="mb-6 p-4 rounded-2xl bg-blue-50 inline-block group-hover:bg-blue-500 transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto premium-gradient rounded-5xl p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Experience the Purity Today</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of happy families and businesses who trust KD Water Delivery for their daily hydration needs.
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl relative z-10">
            Check Our Products
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
