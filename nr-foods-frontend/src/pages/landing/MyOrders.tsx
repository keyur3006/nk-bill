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

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(
          "/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Orders API:", res.data);

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
          onClick={() => navigate("/")}
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

              {/* ================= TOP SECTION ================= */}

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

                {/* LEFT */}

                <div>

                  {/* PRODUCT */}

                  <h3 className="text-3xl font-bold mb-2">

                    {order.product}

                  </h3>

                  {/* PRICE */}

                  <p className="text-2xl font-bold text-green-600">

                    ₹{order.amount}

                  </p>

                  {/* QUANTITY */}

                  <p className="mt-3 text-gray-700">

                    Quantity: {order.quantity}

                  </p>

                  {/* PAYMENT */}

                  <p className="mt-2 text-gray-700">

                    Payment Method:{" "}

                    <span className="font-semibold">

                      {order.paymentMethod}

                    </span>

                  </p>

                  {/* PAYMENT STATUS */}

                  <p className="mt-2 text-gray-700">

                    Payment Status:

                    <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                      {order.status}

                    </span>

                  </p>

                </div>

                {/* RIGHT */}

                <div className="bg-green-50 border border-green-200 rounded-2xl p-5 min-w-[250px]">

                  <p className="font-bold text-green-700 text-lg">

                    Estimated Delivery

                  </p>

                  <p className="text-green-600 mt-2 text-xl font-semibold">

                    Tomorrow, 5:00 PM

                  </p>

                  <p className="text-sm text-gray-500 mt-2">

                    Fast & Safe Delivery

                  </p>

                </div>

              </div>

              {/* ================= DELIVERY STATUS ================= */}

              <div className="mt-8">

                <p className="mb-6 text-lg font-semibold">

                  Delivery Status:

                  <span
                    className={`ml-3 px-4 py-1 rounded-full text-sm font-bold ${
                      order.deliveryStatus === "Ordered"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.deliveryStatus === "Confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : order.deliveryStatus ===
                          "Out For Delivery"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.deliveryStatus}
                  </span>

                </p>

                {/* ================= TRACKER ================= */}

                <div className="relative mt-10">

                  {/* LINE */}

                  <div className="absolute top-5 left-0 w-full h-1 bg-gray-200"></div>

                  <div className="relative flex justify-between">

                    {/* ORDERED */}

                    <div className="flex flex-col items-center z-10">

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                          [
                            "Ordered",
                            "Confirmed",
                            "Out For Delivery",
                            "Delivered",
                          ].includes(order.deliveryStatus)
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                        }`}
                      >
                        ✓
                      </div>

                      <p className="mt-3 text-sm font-medium">

                        Ordered

                      </p>

                    </div>

                    {/* CONFIRMED */}

                    <div className="flex flex-col items-center z-10">

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                          [
                            "Confirmed",
                            "Out For Delivery",
                            "Delivered",
                          ].includes(order.deliveryStatus)
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      >
                        ✓
                      </div>

                      <p className="mt-3 text-sm font-medium">

                        Confirmed

                      </p>

                    </div>

                    {/* OUT FOR DELIVERY */}

                    <div className="flex flex-col items-center z-10">

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                          [
                            "Out For Delivery",
                            "Delivered",
                          ].includes(order.deliveryStatus)
                            ? "bg-orange-500"
                            : "bg-gray-300"
                        }`}
                      >
                        🚚
                      </div>

                      <p className="mt-3 text-sm font-medium text-center">

                        Out For Delivery

                      </p>

                    </div>

                    {/* DELIVERED */}

                    <div className="flex flex-col items-center z-10">

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                          order.deliveryStatus ===
                          "Delivered"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      >
                        ✓
                      </div>

                      <p className="mt-3 text-sm font-medium">

                        Delivered

                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* ================= ADDRESS ================= */}

              <div className="mt-10 border-t pt-6">

                <h4 className="font-bold text-xl mb-3">

                  Delivery Address

                </h4>

                <div className="text-gray-700 space-y-1">

                  <p className="font-semibold">

                    {order.customerName || "-"}

                  </p>

                  <p>
                    {order.mobile || "-"}
                  </p>

                  <p>
                    {order.address || "-"}
                  </p>

                  <p>
                    {order.city || "-"} -{" "}
                    {order.pincode || "-"}
                  </p>

                </div>

              </div>

              {/* ================= CANCEL BUTTON ================= */}

              {order.deliveryStatus ===
                "Ordered" && (

                <div className="mt-8">

                  <button
                    className="border border-red-500 text-red-500 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition font-semibold"
                  >
                    Cancel Order
                  </button>

                  <p className="text-sm text-red-500 mt-2">

                    You can cancel this order

                  </p>

                </div>
              )}

              {/* ================= DATE ================= */}

              <p className="text-sm text-gray-500 mt-8">

                Ordered on:{" "}

                {new Date(
                  order.createdAt
                ).toLocaleString()}

              </p>

            </div>
          ))}

        </div>
      )}

      {/* ================= FOOTER NOTE ================= */}

      <div className="mt-10 bg-blue-50 border border-blue-200 p-4 rounded-xl">

        <p className="text-blue-700 font-medium">

          ℹ️ Note: You can cancel an
          order only when the delivery
          status is "Ordered".

        </p>

      </div>

    </div>
  );
};

export default MyOrders;