import { useEffect, useState } from "react";
import api from "../utils/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/all");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          📦 All Orders (Admin)
        </h1>

        <div className="bg-white shadow px-4 py-2 rounded-lg">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold text-green-600">
            ₹{totalRevenue}
          </p>
        </div>
      </div>

      {/* Orders Grid */}
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
            >
              {/* Product */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {order.product}
              </h3>

              {/* Details */}
              <div className="space-y-1 text-sm text-gray-600">
                <p>👤 <span className="font-medium">{order.user?.email}</span></p>
                <p>💰 ₹{order.amount}</p>
                <p>💳 {order.paymentMethod}</p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    order.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-3">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;