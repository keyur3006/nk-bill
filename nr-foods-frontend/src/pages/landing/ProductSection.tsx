import { useNavigate } from "react-router-dom";

const ProductSection = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "20L Bottle", price: 50 },
    { id: 2, name: "10L Bottle", price: 30 },
    { id: 3, name: "1L Pack", price: 60 },
  ];

  return (
    <div id="products" className="mt-20 px-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Available Bottles 💧
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border p-5 rounded-xl">
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button
              onClick={() => navigate(`/order/${p.id}`)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;