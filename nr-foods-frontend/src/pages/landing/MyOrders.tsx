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

    // HEADER
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("KD Water Delivery", 20, 20);

    // RESET COLOR
    doc.setTextColor(0, 0, 0);

    // TITLE
    doc.setFontSize(18);
    doc.text("ORDER INVOICE", 20, 45);

    // LINE
    doc.setDrawColor(200);
    doc.line(20, 50, 190, 50);

    // ORDER DETAILS
    doc.setFontSize(13);

    let y = 65;

    const addRow = (label: string, value: any) => {
      doc.setFont("helvetica", "bold");

      doc.text(`${label}:`, 20, y);

      doc.setFont("helvetica", "normal");

      doc.text(value, 80, y);

      // ✅ Auto line height
      if (Array.isArray(value)) {
        y += value.length * 10;
      } else {
        y += 12;
      }
    };

    addRow("Product", order.product);

    addRow("Quantity", String(order.quantity));

    addRow("Amount", `Rs. ${order.amount}`);

    addRow("Payment", order.paymentMethod);

    addRow("Payment Status", order.status);

    addRow("Delivery Status", order.deliveryStatus);

    addRow("Customer", order.customerName);

    addRow("Mobile", order.mobile);

    addRow("Address", doc.splitTextToSize(order.address || "-", 100));

    addRow("City / Pincode", `${order.city} - ${order.pincode}`);

    addRow("Order Date", new Date(order.createdAt).toLocaleString());

    // FOOTER
    doc.setFontSize(11);

    doc.setTextColor(120);

    doc.text("Thank you for ordering from KD Water Delivery", 20, 270);

    doc.save(`invoice-${order.id}.pdf`);
  };

  /* ================= PRINT BILL ================= */

  const printBill = (order: Order) => {
    const printWindow = window.open("", "_blank", "width=900,height=900");

    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Invoice-${order.id}</title>

        <style>

          body{
            font-family: Arial, sans-serif;
            background:#f3f4f6;
            padding:40px;
          }

          .invoice{
            max-width:700px;
            margin:auto;
            background:white;
            padding:40px;
            border-radius:20px;
            box-shadow:0 0 15px rgba(0,0,0,0.1);
          }

          .header{
            background:#2563eb;
            color:white;
            padding:20px;
            border-radius:15px;
          }

          .header h1{
            margin:0;
          }

          .title{
            margin-top:30px;
            font-size:28px;
            font-weight:bold;
            color:#111827;
          }

          .row{
            display:flex;
            margin-top:14px;
          }

          .label{
            width:220px;
            font-weight:bold;
            color:#374151;
          }

          .value{
            color:#111827;
          }

          hr{
            margin:25px 0;
            border:none;
            border-top:1px solid #ddd;
          }

          .footer{
            margin-top:40px;
            text-align:center;
            color:#6b7280;
            font-size:14px;
          }

          .badge{
            display:inline-block;
            padding:6px 12px;
            border-radius:999px;
            background:#dcfce7;
            color:#15803d;
            font-size:14px;
            font-weight:bold;
          }

          @media print{
            body{
              background:white;
              padding:0;
            }

            .invoice{
              box-shadow:none;
              border:none;
            }
          }

        </style>
      </head>

      <body>

        <div class="invoice">

          <div class="header">
            <h1>KD Water Delivery</h1>
            <p>Order Invoice</p>
          </div>

          <div class="title">
            Invoice #${order.id}
          </div>

          <hr/>

          <div class="row">
            <div class="label">Product</div>
            <div class="value">${order.product}</div>
          </div>

          <div class="row">
            <div class="label">Quantity</div>
            <div class="value">${order.quantity}</div>
          </div>

          <div class="row">
            <div class="label">Amount</div>
            <div class="value">₹${order.amount}</div>
          </div>

          <div class="row">
            <div class="label">Payment Method</div>
            <div class="value">${order.paymentMethod}</div>
          </div>

          <div class="row">
            <div class="label">Payment Status</div>
            <div class="value">
              <span class="badge">
                ${order.status}
              </span>
            </div>
          </div>

          <div class="row">
            <div class="label">Delivery Status</div>
            <div class="value">
              ${order.deliveryStatus}
            </div>
          </div>

          <hr/>

          <h2>Customer Details</h2>

          <div class="row">
            <div class="label">Customer Name</div>
            <div class="value">
              ${order.customerName || "-"}
            </div>
          </div>

          <div class="row">
            <div class="label">Mobile</div>
            <div class="value">
              ${order.mobile || "-"}
            </div>
          </div>

          <div class="row">
            <div class="label">Address</div>
            <div class="value">
              ${order.address || "-"}
            </div>
          </div>

          <div class="row">
            <div class="label">City / Pincode</div>
            <div class="value">
              ${order.city || "-"} - ${order.pincode || "-"}
            </div>
          </div>

          <hr/>

          <div class="row">
            <div class="label">Order Date</div>
            <div class="value">
              ${new Date(order.createdAt).toLocaleString()}
            </div>
          </div>

          <div class="footer">
            Thank you for ordering from KD Water Delivery ❤️
          </div>

        </div>

        <script>
          window.onload = function(){
            window.print();
          }
        </script>

      </body>
    </html>
  `);

    printWindow.document.close();
  };
  /* ================= FETCH ORDERS ================= */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(Array.isArray(res.data) ? res.data : []);
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
        <h2 className="text-3xl font-bold">My Orders</h2>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Back To Home
        </button>
      </div>

      {/* EMPTY */}

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow">No orders found</div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow">
              {/* TOP */}

              <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* LEFT */}

                <div>
                  <h3 className="text-3xl font-bold mb-2">{order.product}</h3>

                  <p className="text-2xl font-bold text-green-600">
                    ₹{order.amount}
                  </p>

                  <p className="mt-3">Quantity: {order.quantity}</p>

                  <p className="mt-2">Payment Method: {order.paymentMethod}</p>

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

              {/* DELIVERY TRACKER */}

              <div className="mt-10">
                <h3 className="text-xl font-bold mb-8">Delivery Tracking</h3>

                <div className="relative flex items-center justify-between">
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
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-lg shadow-lg">
                      ✓
                    </div>
                    <p className="mt-2 text-sm font-semibold">Ordered</p>
                  </div>

                  {/* Confirmed */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-lg
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

                    <p className="mt-2 text-sm font-semibold">Confirmed</p>
                  </div>

                  {/* Out For Delivery */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-lg
        ${
          order.deliveryStatus === "Out For Delivery" ||
          order.deliveryStatus === "Delivered"
            ? "bg-green-500"
            : "bg-gray-300"
        }`}
                    >
                      🚚
                    </div>

                    <p className="mt-2 text-sm font-semibold text-center">
                      Out For Delivery
                    </p>
                  </div>

                  {/* Delivered */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-lg
        ${
          order.deliveryStatus === "Delivered" ? "bg-green-500" : "bg-gray-300"
        }`}
                    >
                      📦
                    </div>

                    <p className="mt-2 text-sm font-semibold">Delivered</p>
                  </div>
                </div>
              </div>

              {/* ADDRESS */}

              <div className="mt-8 border-t pt-6">
                <h4 className="font-bold text-xl mb-3">Delivery Address</h4>

                <div className="space-y-1 text-gray-700">
                  <p>{order.customerName || "-"}</p>

                  <p>{order.mobile || "-"}</p>

                  <p>{order.address || "-"}</p>

                  <p>
                    {order.city || "-"} - {order.pincode || "-"}
                  </p>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => downloadBill(order)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Download PDF
                </button>

                <button
                  onClick={() => printBill(order)}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Print Bill
                </button>
              </div>

              {/* CANCEL */}

              {order.deliveryStatus === "Ordered" && (
                <div className="mt-6">
                  <button className="border border-red-500 text-red-500 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition font-semibold">
                    Cancel Order
                  </button>
                </div>
              )}

              {/* DATE */}

              <p className="text-sm text-gray-500 mt-8">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
