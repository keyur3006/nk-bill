import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const DeliveryInfoSection = () => {
  return (
    <>
      {/* SEO META TAGS */}
      <Helmet>
        <title>
          Fast Water Delivery Within 20KM | KD Water Delivery Ahmedabad
        </title>

        <meta
          name="description"
          content="Get fast and reliable mineral water delivery within 20KM in Ahmedabad. Pure drinking water, free delivery, and 7 days a week service by KD Water Delivery."
        />

        <meta
          name="keywords"
          content="water delivery Ahmedabad, fast water delivery, mineral water Ahmedabad, 20L water bottle delivery, free water delivery, KD Water Delivery"
        />

        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Fast Water Delivery Within 20KM"
        />

        <meta
          property="og:description"
          content="Quick and reliable mineral water delivery services across Ahmedabad."
        />

        <meta
          property="og:image"
          content="https://www.keyurbill.online/images/banner-bg.jpg"
        />

        <meta
          property="og:url"
          content="https://www.keyurbill.online/"
        />

        <meta property="og:type" content="website" />

        <link
          rel="canonical"
          href="https://www.keyurbill.online/"
        />
      </Helmet>

      {/* SECTION */}
      <section
        className="w-full min-h-112 md:min-h-150 bg-no-repeat bg-cover bg-center flex items-center justify-center text-center px-4 sm:px-6 py-16 relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/banner-bg.jpg')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl bg-white/35 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-4xl shadow-2xl border border-white/20"
        >
          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-blue-950 leading-tight mb-6">
            Fast Delivery <br />

            <span className="text-blue-600">
              Within 20 KM.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-700 text-base sm:text-lg leading-7 sm:leading-8 mb-8">
            We provide quick and reliable water delivery services across a
            20KM radius to ensure you never run out of pure hydration for
            homes, offices, and businesses in Ahmedabad.
          </p>

          {/* FEATURES */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-semibold text-sm border border-green-100 shadow-sm">
              <span>✔</span>
              Free Delivery
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-semibold text-sm border border-blue-100 shadow-sm">
              <span>✔</span>
              7 Days a Week
            </div>
          </div>

        
        </motion.div>
      </section>
    </>
  );
};

export default DeliveryInfoSection;