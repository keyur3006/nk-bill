import { Droplet, Waves, Brain, Filter } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Droplet size={45} strokeWidth={1.5} className="text-blue-500" />,
    title: "Maximum Purity",
    description: "Our water goes through advanced filtration to ensure the highest level of purity for your health."
  },
  {
    icon: <Waves size={45} strokeWidth={1.5} className="text-blue-500" />,
    title: "Total Home Solution",
    description: "From single bottles to bulk supplies, we provide complete hydration solutions for your entire household."
  },
  {
    icon: <Brain size={45} strokeWidth={1.5} className="text-blue-500" />,
    title: "Healthy Composition",
    description: "Rich in essential minerals, our water helps maintain your body's natural balance and vitality."
  },
  {
    icon: <Filter size={45} strokeWidth={1.5} className="text-blue-500" />,
    title: "05 Steps Filtration",
    description: "Our rigorous 5-step filtration process removes all impurities while retaining vital minerals."
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-blue-50/50 py-24">
      
      {/* TOP TEXT */}
      <div className="text-center mb-16 px-6">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.2em] text-blue-400 font-bold uppercase mb-4"
        >
          OUR SERVICES
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-blue-950 leading-tight max-w-3xl mx-auto"
        >
          Providing the Best Hydration with <br />
          <span className="text-blue-600 italic">Our Mineral Water.</span>
        </motion.h2>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-10 max-w-7xl mx-auto">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 text-center rounded-3xl shadow-sm border border-blue-100/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            {/* ICON */}
            <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <div className="p-4 rounded-2xl bg-blue-50 group-hover:bg-blue-500 transition-colors duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-blue-900 font-bold text-xl mb-4">
              {item.title}
            </h3>

            {/* TEXT */}
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {item.description}
            </p>

            {/* BUTTON */}
            <button className="w-full sm:w-auto px-7 py-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-blue-100 group-hover:border-blue-600 shadow-sm">
              Learn More →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;