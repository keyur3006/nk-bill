import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

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

  /* ================= PDF DOWNLOAD ================= */

  const downloadBill = (order: Order) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("KD Water Delivery", 20, 20);

    doc.setFontSize(16);
    doc.text("Order Invoice", 20, 35);

    doc.setFontSize(12);

    doc.text(`Product: ${order.product}`, 20, 55);
    doc.text(`Quantity: ${order.quantity}`, 20, 65);
    doc.text(`Amount: ₹${order.amount}`, 20, 75);
    doc.text(
      `Payment: ${order.paymentMethod}`,
      20,
      85
    );

    doc.text(`Status: ${order.status}`, 20, 95);

    doc.text(
      `Delivery Status: ${order.deliveryStatus}`,
      20,
      105
    );

    doc.text(
      `Customer: ${order.customerName}`,
      20,
      120
    );

    doc.text(`Mobile: ${order.mobile}`, 20, 130);

    doc.text(`Address: ${order.address}`, 20, 140);

    doc.text(
      `${order.city} - ${order.pincode}`,
      20,
      150
    );

    doc.text(
      `Date: ${new Date(
        order.createdAt
      ).toLocaleString()}`,
      20,
      165
    );

    doc.save(`invoice-${order.id}.pdf`);
  };

  /* ================= FETCH ORDERS ================= */

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

        setOrders(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

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

      {/* EMPTY */}

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

              {/* TOP */}

              <div className="flex flex-col lg:flex-row justify-between gap-6">

                {/* LEFT */}

                <div>

                  <h3 className="text-3xl font-bold mb-2">
                    {order.product}
                  </h3>

                  <p className="text-2xl font-bold text-green-600">
                    ₹{order.amount}
                  </p>

                  <p className="mt-3">
                    Quantity: {order.quantity}
                  </p>

                  <p className="mt-2">
                    Payment Method:{" "}
                    {order.paymentMethod}
                  </p>

                  {/* PAYMENT STATUS */}

                  <p className="mt-2">

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

              {/* DELIVERY STATUS */}

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

              </div>

              {/* ADDRESS */}

              <div className="mt-8 border-t pt-6">

                <h4 className="font-bold text-xl mb-3">
                  Delivery Address
                </h4>

                <div className="space-y-1 text-gray-700">

                  <p>
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

              {/* BUTTONS */}

              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    downloadBill(order)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Download PDF
                </button>

                <button
                  onClick={() => window.print()}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Print Bill
                </button>

              </div>

              {/* CANCEL */}

              {order.deliveryStatus ===
                "Ordered" && (

                <div className="mt-6">

                  <button
                    className="border border-red-500 text-red-500 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition font-semibold"
                  >
                    Cancel Order
                  </button>

                </div>
              )}

              {/* DATE */}

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
    </div>
  );
};

export default MyOrders;