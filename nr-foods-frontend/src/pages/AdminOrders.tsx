import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const audio = new Audio("/notification.mp3");

const AdminOrders = () => {
  useEffect(() => {
  Notification.requestPermission();
}, []);
  const [orders, setOrders] = useState<any[]>([]);
  const [lastCount, setLastCount] =
    useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(
          "/orders/all"
        );

        // ✅ NEW ORDER NOTIFICATION
        if (
          lastCount !== 0 &&
          res.data.length > lastCount
        ) {
          toast.success(
            "🛒 New Order Received"
            
          );
new Notification(
  "🛒 New Order Received",
  {
    body: "A customer placed a new order",
    icon: "/vite.svg",
  }
);
          audio.currentTime = 0;

          audio
            .play()
            .catch((err) => {
              console.log(
                "Audio blocked:",
                err
              );
            });
        }

        setLastCount(
          res.data.length
        );

        setOrders(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    // FIRST FETCH
    fetchOrders();

    // AUTO REFRESH EVERY 5 SEC
    const interval =
      setInterval(() => {
        fetchOrders();
      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const totalRevenue =
    orders.reduce(
      (sum, o) =>
        sum + o.amount,
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
                  💳{" "}
                  {
                    order.paymentMethod
                  }
                </p>

                {/* PAYMENT STATUS */}

                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    order.status ===
                    "confirmed"
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

                <p>
                  {
                    order.customerName
                  }
                </p>

                <p>
                  {order.mobile}
                </p>

                <p>
                  {order.address}
                </p>

                <p>
                  {order.city} -{" "}
                  {
                    order.pincode
                  }
                </p>

              </div>

              {/* DELIVERY STATUS */}

              <div className="mt-4">

                <p className="font-semibold mb-2">
                  Delivery Status
                </p>

                <select
                  value={
                    order.deliveryStatus
                  }
                  onChange={async (
                    e
                  ) => {
                    try {

                      await api.put(
                        `/orders/update-status/${order.id}`,
                        {
                          deliveryStatus:
                            e.target
                              .value,
                        }
                      );

                      setOrders(
                        (
                          prev
                        ) =>
                          prev.map(
                            (
                              o
                            ) =>
                              o.id ===
                              order.id
                                ? {
                                    ...o,
                                    deliveryStatus:
                                      e
                                        .target
                                        .value,
                                  }
                                : o
                          )
                      );

                    } catch (
                      error
                    ) {

                      console.error(
                        error
                      );
                    }
                  }}
                  className="w-full border rounded-lg px-3 py-2"
                >

                  <option>
                    Ordered
                  </option>

                  <option>
                    Confirmed
                  </option>

                  <option>
                    Out For Delivery
                  </option>

                  <option>
                    Delivered
                  </option>

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