import { useEffect, useState } from "react";
import api from "../../utils/api";

interface Order {
  id: number;
  product: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ token localStorage mathi
        const token = localStorage.getItem("token");

        const res = await api.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Orders API:", res.data);

        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Fetch Orders Error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded shadow"
            >
              <h3 className="font-semibold">
                {order.product}
              </h3>

              <p>₹{order.amount}</p>

              <p>
                Method: {order.paymentMethod}
              </p>

              <p>Status: {order.status}</p>

              <p className="text-sm text-gray-500">
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;