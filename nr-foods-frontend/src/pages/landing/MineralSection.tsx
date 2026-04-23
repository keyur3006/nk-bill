const MineralSection = () => {
  return (
    <section className="bg-[#f7fbff] py-20 px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE */}
        <div>
          {/* HEADING */}
          <div className="mb-6">
            <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm">
              H2O
            </span>
            <h2 className="text-3xl font-bold text-blue-900 mt-3">
              Our <br /> Mineral composition
            </h2>
          </div>

          {/* TEXT */}
          <p className="text-gray-500 border-l-4 border-green-400 pl-4 mb-6">
            WE FIGHT FOR JUSTICE, WE ARE ALWAYS READY TO BEST SOLUTION
            FOR YOUR PROBLEM.
          </p>

          {/* IMAGE */}
          <div className="relative">
            <img
              src="/images/video.jpg" // 👈 tamari image
              className="rounded-lg w-100 h-70 object-cover"
            />

            {/* PLAY BUTTON */}
           
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* LIST */}
          <div className="mt-25">
            <h3 className="text-blue-500 font-semibold mb-4 flex items-center gap-2">
              Mineralization
              <span className="bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                Ca2+
              </span>
            </h3>

            <ul className="space-y-3 text-blue-900">
              <li>Magnesium +</li>
              <li>Sodium +</li>
              <li>Calcium +</li>
              <li>Chlorine +</li>
            </ul>
          </div>

          {/* CONTENT */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">
              Mineralization
            </h2>

            <p className="text-green-500 font-semibold mb-3">
              ✔ 20-25 mg/dm3
            </p>

            <p className="text-gray-500 text-sm">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration.
            </p>
          </div>

        </div>
      </div>

      {/* BOTTOM WAVE */}
      <div className="mt-20">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-25"
          preserveAspectRatio="none"
        >
          <path
            fill="#eaf4ff"
            d="M0,160L80,144C160,128,320,96,480,101.3C640,107,800,149,960,160C1120,171,1280,149,1360,138.7L1440,128L1440,200L0,200Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default MineralSection;