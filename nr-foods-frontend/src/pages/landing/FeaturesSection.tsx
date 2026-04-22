import { Droplet, Waves, Brain, Filter } from "lucide-react";

const features = [
  {
    icon: <Droplet size={45} strokeWidth={1.5} className="text-blue-500" />,
    title: "Maxium Purity",
  },
  {
    icon: <Waves size={45} strokeWidth={1.5} className="text-blue-500" />,
    title: "Total Home Solution",
  },
  {
    icon: <Brain size={45} strokeWidth={1.5} className="text-blue-500" />,
    title: "Healthy Composition",
  },
  {
    icon: <Filter size={45} strokeWidth={1.5} className="text-blue-500" />,
    title: "05 Steps Filtration",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#f5f9ff] py-20">
      
      {/* TOP TEXT */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
          OUR SERVICES
        </p>

        <h2 className="text-3xl font-bold text-blue-900 leading-snug max-w-3xl mx-auto">
          How to integrate your Solar Panel System with your home{" "}
          <span className="text-blue-500 italic">Our Mineral Water.</span>
        </h2>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-8 px-10 max-w-7xl mx-auto">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white/60 backdrop-blur-sm p-10 text-center rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.03)] hover:shadow-md transition"
          >
            {/* ICON */}
            <div className="flex justify-center mb-5">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-blue-800 font-semibold text-lg mb-4">
              {item.title}
            </h3>

            {/* TEXT */}
            <p className="text-gray-500 text-sm leading-7 mb-8">
              Nunc laoreet, mi sed fermentum fringilla, eros metus pellentesque
              urna, in lobortis massa turpis id tortor. In velit metus.
            </p>

            {/* BUTTON */}
            <button className="px-7 py-3 rounded-full bg-blue-100 text-blue-700 text-sm font-medium tracking-wide hover:bg-blue-600 hover:text-white transition-all duration-300">
              Learn More →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;