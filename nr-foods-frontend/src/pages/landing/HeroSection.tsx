const HeroSection = () => {
  return (
    <section
      className="relative w-full h-200 bg-no-repeat bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/images/slider-1.jpg')", // 👈 tamari image
      }}
    >
      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-10 w-full">

        {/* TEXT BOX */}
        <div className="max-w-xl mb-72">

          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3105/3105813.png"
              className="w-8"
            />
            <span className="text-blue-500 font-semibold">KD Water Delivery</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight">
            Drinking Mineral <br />
            Water Delivery.
          </h1>

          <p className="mt-6 text-gray-600">
            Fresh, safe and healthy mineral water delivered directly to your
            home with fast and reliable service.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700">
              Learn More →
            </button>

            <div className="flex items-center gap-2 text-white-600 cursor-pointer">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                ▶
              </div>
              <span className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700">Watch Video</span>
            </div>
          </div>

        </div>
      </div>

      {/* OPTIONAL OVERLAY (readability mate) */}

    </section>
  );
};

export default HeroSection;