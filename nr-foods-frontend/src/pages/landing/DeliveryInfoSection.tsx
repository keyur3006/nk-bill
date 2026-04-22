import React from "react";

const HeroSection = () => {
  return (<section
  className="w-full h-[500px] bg-no-repeat bg-cover bg-center flex items-center justify-center text-center"
  style={{
    backgroundImage: "url('/images/banner-bg.jpg')",
  }}
>
  <div className="max-w-xl">
    
    <h1 className="text-4xl font-bold text-blue-900 mb-4 ml-25">
      Water Delivery 20 K.m.
    </h1>

    <p className="text-gray-600 mb-5 ml-25 text-1xl">
      There are many variations of passages of Lorem Ipsum available,
      but the majority have suffered alteration.
    </p>

    <div className="mb-6 space-y-2">
      <p className="text-green-600">✔ Free Delivery</p>
      <p className="text-blue-500">✔ 7 days a week</p>
    </div>

    <button className="bg-blue-700 text-white px-6 py-3 rounded-full">
      Learn More →
    </button>

  </div>
</section>
  );
};

export default HeroSection;