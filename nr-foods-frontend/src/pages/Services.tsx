import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Droplets,
  Truck,
  Building2,
  CalendarCheck,
  ShieldCheck,
  Clock3,
  Star,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "./landing/Footer";

const Services = () => {
  const services = [
    {
      icon: <Droplets className="w-10 h-10 text-blue-500" />,
      title: "20L Water Bottle Delivery",
      description:
        "Get pure and hygienic 20L mineral water bottles delivered directly to your home quickly and safely.",
    },
    {
      icon: <Building2 className="w-10 h-10 text-cyan-500" />,
      title: "Office Water Supply",
      description:
        "Reliable bulk water supply solutions for offices, shops, schools, and commercial spaces in Ahmedabad.",
    },
    {
      icon: <CalendarCheck className="w-10 h-10 text-indigo-500" />,
      title: "Monthly Subscription Plans",
      description:
        "Affordable weekly and monthly water delivery subscriptions with priority customer support.",
    },
    {
      icon: <Truck className="w-10 h-10 text-sky-500" />,
      title: "Fast Home Delivery",
      description:
        "Same-day and scheduled water delivery services available across multiple areas in Ahmedabad.",
    },
  ];

  const benefits = [
    "100% Pure & Safe Drinking Water",
    "Fast Delivery Service",
    "Affordable Pricing Plans",
    "Professional Customer Support",
    "Trusted by Local Customers",
    "Easy Online Ordering",
  ];

  return (
    <>
      {/* SEO META TAGS */}
      <title>
        Water Delivery Services Ahmedabad | KD Water Delivery
      </title>

      <meta
        name="description"
        content="KD Water Delivery provides pure mineral water bottle delivery, office water supply, and monthly subscription plans in Ahmedabad. Fast and affordable service."
      />

      <meta
        name="keywords"
        content="water delivery Ahmedabad, mineral water service Ahmedabad, 20L water bottle delivery, office water supply, drinking water delivery"
      />

      <meta name="author" content="KD Water Delivery" />

      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white overflow-hidden">
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative py-28 px-6">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold tracking-wide mb-6">
                Premium Water Services
              </span>

              <h1 className="text-5xl md:text-7xl font-black text-blue-950 leading-tight">
                Pure Water Delivery
                <span className="block text-blue-500">
                  Services in Ahmedabad
                </span>
              </h1>

              <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-gray-600 leading-relaxed">
                KD Water Delivery provides fast, safe, and reliable drinking
                water delivery services for homes, offices, and businesses
                across Ahmedabad.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-5">
                <button className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl hover:scale-105 transition-all">
                  Order Water Now
                </button>
                
                <Link to="/area">
                <button className="px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all">
                  View Pricing
                </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-5">
                Our Water Delivery Services
              </h2>

              <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                We provide premium drinking water services with fast delivery,
                affordable pricing, and trusted quality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white p-8 rounded-[32px] shadow-lg hover:shadow-2xl border border-blue-50 hover:-translate-y-3 transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-7 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-blue-950 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 px-6 bg-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent_40%)]"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-cyan-300 uppercase tracking-[0.3em] text-sm font-bold">
                  Why Choose Us
                </span>

                <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-8">
                  Trusted Water Delivery Company
                </h2>

                <p className="text-blue-100 text-lg leading-relaxed mb-10">
                  We focus on quality, hygiene, customer satisfaction, and fast
                  delivery to provide the best water delivery experience in
                  Ahmedabad.
                </p>

                <div className="grid sm:grid-cols-2 gap-5">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl"
                    >
                      <CheckCircle2 className="text-cyan-300 w-6 h-6 shrink-0" />
                      <span className="text-white font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-[40px] p-10 shadow-2xl">
                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-blue-600" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-blue-950">
                          Safe & Hygienic
                        </h3>
                        <p className="text-gray-600">
                          Advanced purification process.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">
                        <Clock3 className="w-8 h-8 text-cyan-600" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-blue-950">
                          Fast Delivery
                        </h3>
                        <p className="text-gray-600">
                          Same-day delivery available.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                        <Star className="w-8 h-8 text-indigo-600" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-blue-950">
                          Trusted Service
                        </h3>
                        <p className="text-gray-600">
                          Loved by local customers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-14 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Order Pure Water?
            </h2>

            <p className="text-blue-50 text-lg max-w-2xl mx-auto mb-10">
              Experience premium mineral water delivery service with affordable
              pricing and fast doorstep delivery in Ahmedabad.
            </p>

            <button className="bg-white text-blue-700 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">
              Order Now
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Services;