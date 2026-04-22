import { useNavigate } from "react-router-dom";

const ProductSection = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "20L Bottle",
      price: 50,
      image: "/images/p1.png",
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "10L Bottle",
      price: 30,
      image: "/images/p2.png",
      tag: "Popular",
    },
    {
      id: 3,
      name: "1L Pack",
      price: 60,
      image: "/images/p3.png",
      tag: "Hot",
    },
  ];

  return (
    <div id="products" className="mt-20 px-10 bg-[#f6f9fc] py-16">
      
      {/* HEADING */}
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Available Bottles 💧
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            
            {/* IMAGE */}
            <div className="bg-gray-50 p-6 relative">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-contain"
              />

              {/* TAG */}
              <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                {p.tag}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-900">
                {p.name}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Fresh mineral water for daily use.
              </p>

              {/* PRICE */}
              <div className="mt-4 text-blue-600 text-xl font-bold">
                ₹{p.price}
              </div>

              {/* BUTTON */}
              <button
                onClick={() => navigate(`/order/${p.id}`)}
                className="mt-6 w-full bg-blue-200 text-blue-700 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
              >
                🛒 Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;