import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import {
  MapPin,
  Truck,
  Clock3,
  ShieldCheck,
  Phone,
  Star,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "./landing/Footer";

const DeliveryAreas = () => {
  const areas = [
    {
      name: "Kankaria",
      desc: "Fast and pure mineral water bottle delivery service in Kankaria Ahmedabad.",
    },
    {
      name: "Maninagar",
      desc: "Same-day water bottle home delivery available in Maninagar area.",
    },
    {
      name: "Isanpur",
      desc: "Affordable 20L water bottle delivery service in Nikol Ahmedabad.",
    },
    {
      name: "Raipur",
      desc: "Pure drinking water delivery for homes and offices in Bapunagar.",
    },
    {
      name: "Paldi",
      desc: "Trusted mineral water supply service available in Naroda.",
    },
    {
      name: "CTM",
      desc: "Premium water bottle delivery service in Satellite Ahmedabad.",
    },
    {
      name: "nikol",
      desc: "Fast doorstep water bottle delivery service in Gota area.",
    },
    {
      name: "Vastral",
      desc: "Healthy and hygienic mineral water delivery in Vastral Ahmedabad.",
    },
     {
      name: "Bhulabhai park",
      desc: "Healthy and hygienic mineral water delivery in Vastral Ahmedabad.",
    },
    {
      name: "Ellisbridge",
      desc: "Healthy and hygienic mineral water delivery in Vastral Ahmedabad.",
    },
     {
      name: "Shah Alam",
      desc: "Healthy and hygienic mineral water delivery in Vastral Ahmedabad.",
    },
    {
      name: "Khokhra",
      desc: "Healthy and hygienic mineral water delivery in Vastral Ahmedabad.",
    },
  ];

  return (
    <>
      {/* SEO META TAGS */}
      <Helmet>
        <title>
          Water Delivery Areas Ahmedabad | KD Water Delivery
        </title>

        <meta
          name="description"
          content="KD Water Delivery provides fast mineral water bottle delivery services across Ahmedabad including Kankaria, Maninagar, Nikol, Naroda, Satellite, and more."
        />

        <meta
          name="keywords"
          content="water delivery Ahmedabad, mineral water Kankaria, water bottle delivery Maninagar, drinking water Nikol, Naroda water supply"
        />

        <meta name="author" content="KD Water Delivery" />

        <meta
          property="og:title"
          content="Water Delivery Service Areas in Ahmedabad"
        />

        <meta
          property="og:description"
          content="Explore all delivery locations where KD Water Delivery provides pure drinking water services in Ahmedabad."
        />

        <meta
          property="og:image"
          content="https://keyurbill.online/images/banner.png"
        />

        <meta
          property="og:url"
          content="https://keyurbill.online/delivery-areas"
        />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        <link
          rel="canonical"
          href="https://keyurbill.online/delivery-areas"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white overflow-hidden">
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-6"
            >
              Delivery Locations
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-7xl font-black text-blue-950 leading-tight"
            >
              Water Delivery
              <span className="block text-blue-500">
                Areas in Ahmedabad
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto mt-8 text-lg text-gray-600 leading-relaxed"
            >
              KD Water Delivery provides fast, safe,
              and affordable mineral water delivery services
              across multiple areas in Ahmedabad.
            </motion.p>
          </div>
        </section>

        {/* AREA CARDS */}
        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {areas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[35px] p-8 shadow-xl hover:shadow-2xl border border-blue-50 hover:-translate-y-3 transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center mb-7">
                    <MapPin className="w-10 h-10 text-blue-600" />
                  </div>

                  <h2 className="text-3xl font-black text-blue-950 mb-5">
                    {area.name}
                  </h2>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {area.desc}
                  </p>

                  {/* FEATURES */}
                  <div className="space-y-4 mt-8">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Truck className="w-5 h-5 text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                      <span>Pure Drinking Water</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock3 className="w-5 h-5 text-cyan-500" />
                      <span>Same Day Service</span>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:scale-105">
                    Order in {area.name}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 px-6 bg-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent_40%)]"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-[35px] p-10">
                <Truck className="w-14 h-14 text-cyan-300 mb-6" />

                <h3 className="text-3xl font-black text-white mb-4">
                  Fast Delivery
                </h3>

                <p className="text-blue-100 leading-relaxed">
                  Same-day and scheduled water delivery
                  services available across Ahmedabad.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-[35px] p-10">
                <Star className="w-14 h-14 text-yellow-300 mb-6" />

                <h3 className="text-3xl font-black text-white mb-4">
                  Trusted Service
                </h3>

                <p className="text-blue-100 leading-relaxed">
                  Trusted by homes, offices,
                  and businesses for clean drinking water.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-[35px] p-10">
                <Phone className="w-14 h-14 text-green-300 mb-6" />

                <h3 className="text-3xl font-black text-white mb-4">
                  24/7 Support
                </h3>

                <p className="text-blue-100 leading-relaxed">
                  Quick customer support and easy order booking service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-14 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Need Water Delivery Near You?
            </h2>

            <p className="text-blue-50 text-lg max-w-2xl mx-auto mb-10">
              Contact KD Water Delivery today for fast and affordable
              mineral water delivery services in Ahmedabad.
            </p>

            <button className="bg-white text-blue-700 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">
              Contact Now
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DeliveryAreas;