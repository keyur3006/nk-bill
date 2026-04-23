import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "./landing/Footer";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+88 012 345 678 90",
      subDetails: "Mon-Sat: 10am - 7pm",
      color: "bg-blue-500"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "support@nrfoods.com",
      subDetails: "24/7 Online Support",
      color: "bg-indigo-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: "123 Water Street",
      subDetails: "New York, NY 10001",
      color: "bg-cyan-500"
    }
  ];

  const faqs = [
    { q: "What are your delivery hours?", a: "We deliver Monday through Saturday from 8:00 AM to 8:00 PM." },
    { q: "Do you offer subscription plans?", a: "Yes, we have weekly and monthly plans with special discounts." },
    { q: "Is your water mineral-enriched?", a: "Absolutely! Our water is processed to keep essential minerals intact." }
  ];

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-20"
          style={{ backgroundImage: "url('/images/contact-hero.png')" }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 to-surface-50"></div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-6"
          >
            How Can We <span className="text-gradient">Help You?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Have a question about our water delivery service? Our team is here to provide you with the best hydration experience.
          </motion.p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="px-6 -mt-12 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-5xl border border-white hover:shadow-2xl transition-all group"
            >
              <div className={`${info.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-200`}>
                {info.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{info.title}</h3>
              <p className="text-lg font-semibold text-gray-800">{info.details}</p>
              <p className="text-gray-500 text-sm mt-1">{info.subDetails}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT: FORM & MAP */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* CONTACT FORM */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-14 rounded-5xl shadow-2xl shadow-blue-900/5"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-1 bg-blue-500 rounded-full"></div>
                <h2 className="text-3xl font-bold text-blue-900">Send us a Message</h2>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                  <input type="text" placeholder="Inquiry about Delivery" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Your Message</label>
                  <textarea rows={5} placeholder="How can we help you?" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all resize-none"></textarea>
                </div>

                <button type="submit" className="premium-gradient text-white w-full py-5 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 group">
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>

            {/* INFO & FAQ */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">Common Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-default">
                      <h4 className="font-bold text-blue-950 mb-2">{faq.q}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-5xl border-2 border-dashed border-blue-100 bg-linear-to-br from-blue-50/30 to-transparent">
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-2xl bg-white shadow-md">
                    <MessageCircle className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Need a fast response?</h3>
                    <p className="text-gray-600 mb-4">Chat with our customer representative on WhatsApp for instant support during business hours.</p>
                    <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      Chat on WhatsApp →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MAP SECTION (Placeholder) */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto h-[450px] rounded-5xl bg-gray-200 overflow-hidden relative shadow-inner">
          <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-60">
            <div className="glass-card p-6 rounded-3xl text-center">
              <MapPin className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900">NR FOODS Headquarters</h3>
              <p className="text-gray-600">Click to open directions</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;