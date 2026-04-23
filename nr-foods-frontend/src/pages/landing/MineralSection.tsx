import { motion } from "framer-motion";

const MineralSection = () => {
  return (
    <section className="bg-blue-50/30 py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {/* HEADING */}
          <div className="mb-8">
            <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest">
              COMPOSITION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mt-4 leading-tight">
              Essential <br /> <span className="text-blue-600">Mineral Balance</span>
            </h2>
          </div>

          {/* TEXT */}
          <div className="border-l-4 border-blue-500 pl-6 mb-10">
            <p className="text-gray-700 text-lg font-medium leading-relaxed">
              Our water is carefully balanced with essential minerals to provide not just hydration, but vital nutrients for your well-being.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-linear-to-t from-blue-950/60 to-transparent z-10"></div>
            <img
              src="/images/video.jpg"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              alt="mineral water"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
               <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:bg-white/40 transition-colors">
                  <span className="text-white text-2xl ml-1">▶</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-10 items-start"
        >
          
          {/* LIST */}
          <div className="bg-white p-8 rounded-4xl shadow-sm border border-blue-100">
            <h3 className="text-blue-600 font-bold mb-6 flex items-center gap-2">
              Mineralization
              <span className="bg-blue-100 text-blue-600 text-xs px-2.5 py-1 rounded-full font-bold">
                Natural
              </span>
            </h3>

            <ul className="space-y-4 text-blue-900 font-bold">
              {[
                { name: "Magnesium", value: "Mg2+" },
                { name: "Sodium", value: "Na+" },
                { name: "Calcium", value: "Ca2+" },
                { name: "Chlorine", value: "Cl-" }
              ].map((m, i) => (
                <li key={i} className="flex justify-between items-center bg-blue-50/50 p-3 rounded-xl border border-blue-100/30">
                  <span>{m.name}</span>
                  <span className="text-blue-400 text-xs">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTENT */}
          <div className="pt-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Health & Life
            </h2>

            <div className="flex items-center gap-2 text-green-600 font-bold mb-6 bg-green-50 px-4 py-2 rounded-xl border border-green-100/50">
              <span>✔</span> 20-25 mg/dm3
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              Every drop is enriched with nature's goodness. Our water is processed to maintain a healthy composition that supports your active lifestyle.
            </p>
          </div>

        </motion.div>
      </div>

    </section>
  );
};

export default MineralSection;