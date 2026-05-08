import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

interface Order {
  id: number;

  product: string;

  amount: number;

  paymentMethod: string;

  status: string;

  deliveryStatus: string;

  createdAt: string;

  quantity: number;

  customerName: string;

  mobile: string;

  address: string;

  city: string;

  pincode: string;
}

const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<
    Order[]
  >([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res = await api.get(
          "/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "Orders API:",
          res.data
        );

        setOrders(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      } catch (error) {

        console.error(
          "Fetch Orders Error:",
          error
        );
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          My Orders
        </h2>

        <button
          onClick={() =>
            navigate("/")
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Back To Home
        </button>

      </div>

      {/* ================= EMPTY ================= */}

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow">

          No orders found

        </div>
      ) : (

        <div className="grid gap-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              {/* PRODUCT */}

              <h3 className="text-2xl font-bold mb-2">

                {order.product}

              </h3>

              {/* PRICE */}

              <p className="text-lg font-semibold text-green-600">

                ₹{order.amount}

              </p>

              {/* QUANTITY */}

              <p className="mt-2">

                Quantity: {order.quantity}

              </p>

              {/* PAYMENT */}

              <p className="mt-2">

                Payment Method:{" "}

                {order.paymentMethod}

              </p>

              {/* PAYMENT STATUS */}

              <p className="mt-2">

                Payment Status:

                <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded text-sm">

                  {order.status}

                </span>

              </p>

              {/* DELIVERY STATUS */}

              <p className="mt-3">

                Delivery Status:

                <span className="ml-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                  {order.deliveryStatus}

                </span>

              </p>

              {/* ADDRESS */}

              <div className="mt-4 border-t pt-4">

                <h4 className="font-bold mb-2">

                  Delivery Address

                </h4>

                <p>
                  {order.customerName}
                </p>

                <p>
                  {order.mobile}
                </p>

                <p>
                  {order.address}
                </p>

                <p>
                  {order.city} -{" "}
                  {order.pincode}
                </p>

              </div>

              {/* DATE */}

              <p className="text-sm text-gray-500 mt-4">

                Ordered on:{" "}

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