import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

// SOUND FILE
const audio = new Audio("/notification.mp3");

const AdminOrders = () => {

  const [orders, setOrders] = useState<any[]>([]);
  const [lastCount, setLastCount] = useState(0);

  // ASK NOTIFICATION PERMISSION
  useEffect(() => {

    if ("Notification" in window) {
      Notification.requestPermission();
    }

  }, []);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const res = await api.get("/orders/all");

        // NEW ORDER DETECT
        if (
          lastCount !== 0 &&
          res.data.length > lastCount
        ) {

          // TOAST
          toast.success("🛒 New Order Received");

          // BROWSER NOTIFICATION
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {

            new Notification(
              "🛒 New Order Received",
              {
                body: "A customer placed a new order",
                icon: "/vite.svg",
              }
            );
          }

          // SOUND
          audio.currentTime = 0;

          audio.play().catch((err) => {
            console.log(
              "Audio blocked:",
              err
            );
          });
        }

        // UPDATE ORDER COUNT
        setLastCount(res.data.length);

        // SAVE ORDERS
        setOrders(res.data);

      } catch (err) {

        console.error(err);

      }
    };

    // FIRST FETCH
    fetchOrders();

    // AUTO REFRESH EVERY 5 SEC
    const interval = setInterval(() => {

      fetchOrders();

    }, 5000);

    return () => clearInterval(interval);

  }, [lastCount]);

  // TOTAL REVENUE
  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.amount,
    0
  );

  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          📦 All Orders (Admin)
        </h1>

        <div className="bg-white shadow px-4 py-2 rounded-lg">

          <p className="text-sm text-gray-500">
            Total Revenue
          </p>

          <p className="text-xl font-bold text-green-600">
            ₹{totalRevenue}
          </p>

        </div>

      </div>

      {/* ORDERS */}

      {orders.length === 0 ? (

        <p className="text-gray-500">
          No orders found
        </p>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
            >

              {/* PRODUCT */}

              <h3 className="text-lg font-semibold text-gray-800 mb-2">

                {order.product}

              </h3>

              {/* DETAILS */}

              <div className="space-y-1 text-sm text-gray-600">

                <p>
                  👤{" "}
                  <span className="font-medium">
                    {order.user?.email}
                  </span>
                </p>

                <p>
                  💰 ₹{order.amount}
                </p>

                <p>
                  💳 {order.paymentMethod}
                </p>

                {/* PAYMENT STATUS */}

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

              {/* ADDRESS */}

              <div className="mt-4 border-t pt-3 text-sm text-gray-700">

                <p className="font-semibold mb-1">
                  📍 Delivery Address
                </p>

                <p>{order.customerName}</p>

                <p>{order.mobile}</p>

                <p>{order.address}</p>

                <p>
                  {order.city} - {order.pincode}
                </p>

              </div>

              {/* DELIVERY STATUS */}

              {/* DELIVERY STATUS */}

<div className="mt-6">

  <p className="font-bold text-lg mb-5">
    Delivery Tracking
  </p>

  {/* TRACKER */}

  <div className="relative flex items-center justify-between mb-8">

    {/* Background Line */}
    <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 rounded-full"></div>

    {/* Active Line */}
    <div
      className={`absolute top-4 left-0 h-1 bg-green-500 rounded-full
      ${
        order.deliveryStatus === "Ordered"
          ? "w-[10%]"
          : order.deliveryStatus === "Confirmed"
          ? "w-[38%]"
          : order.deliveryStatus === "Out For Delivery"
          ? "w-[70%]"
          : "w-full"
      }`}
    ></div>

    {/* Ordered */}
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
        ✓
      </div>

      <p className="text-xs mt-2 font-medium">
        Ordered
      </p>
    </div>

    {/* Confirmed */}
    <div className="relative z-10 flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
        ${
          order.deliveryStatus === "Confirmed" ||
          order.deliveryStatus === "Out For Delivery" ||
          order.deliveryStatus === "Delivered"
            ? "bg-green-500"
            : "bg-gray-300"
        }`}
      >
        ✓
      </div>

      <p className="text-xs mt-2 font-medium">
        Confirmed
      </p>
    </div>

    {/* Out For Delivery */}
    <div className="relative z-10 flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
        ${
          order.deliveryStatus ===
            "Out For Delivery" ||
          order.deliveryStatus === "Delivered"
            ? "bg-green-500"
            : "bg-gray-300"
        }`}
      >
        🚚
      </div>

      <p className="text-xs mt-2 font-medium text-center">
        Out For Delivery
      </p>
    </div>

    {/* Delivered */}
    <div className="relative z-10 flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
        ${
          order.deliveryStatus === "Delivered"
            ? "bg-green-500"
            : "bg-gray-300"
        }`}
      >
        📦
      </div>

      <p className="text-xs mt-2 font-medium">
        Delivered
      </p>
    </div>

  </div>

  {/* SELECT BOX */}

  <select
    value={order.deliveryStatus}
    onChange={async (e) => {

      try {

        await api.put(
          `/orders/update-status/${order.id}`,
          {
            deliveryStatus:
              e.target.value,
          }
        );

        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id
              ? {
                  ...o,
                  deliveryStatus:
                    e.target.value,
                }
              : o
          )
        );

        toast.success(
          "Status Updated"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Update Failed"
        );
      }
    }}
    className="w-full border rounded-xl px-4 py-3 font-medium"
  >

    <option>Ordered</option>

    <option>Confirmed</option>

    <option>Out For Delivery</option>

    <option>Delivered</option>

  </select>

</div>

              {/* DATE */}

              <p className="text-xs text-gray-400 mt-4">

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

export default AdminOrders;