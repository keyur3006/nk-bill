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

    // RESET
    doc.setTextColor(0, 0, 0);

    // TITLE
    doc.setFontSize(18);
    doc.text("ORDER INVOICE", 20, 45);

    // LINE
    doc.setDrawColor(200);
    doc.line(20, 50, 190, 50);

    let y = 65;

    const addRow = (
      label: string,
      value: string
    ) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 20, y);

      doc.setFont("helvetica", "normal");
      doc.text(value || "-", 80, y);

      y += 12;
    };

    addRow("Product", order.product);

    addRow(
      "Quantity",
      String(order.quantity)
    );

    addRow(
      "Amount",
      `Rs. ${order.amount}`
    );

    addRow(
      "Payment",
      order.paymentMethod
    );

    addRow(
      "Payment Status",
      order.status
    );

    addRow(
      "Delivery Status",
      order.deliveryStatus
    );

    addRow(
      "Customer",
      order.customerName || "-"
    );

    addRow(
      "Mobile",
      order.mobile || "-"
    );

    addRow(
      "Address",
      order.address || "-"
    );

    addRow(
      "City / Pincode",
      `${order.city || "-"} - ${
        order.pincode || "-"
      }`
    );

    addRow(
      "Order Date",
      new Date(
        order.createdAt
      ).toLocaleString()
    );

    // FOOTER
    doc.setFontSize(11);

    doc.setTextColor(120);

    doc.text(
      "Thank you for ordering from KD Water Delivery",
      20,
      270
    );

    doc.save(`invoice-${order.id}.pdf`);
  };

  /* ================= PRINT BILL ================= */

  const printBill = (order: Order) => {
    const printWindow = window.open(
      "",
      "_blank"
    );

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>

          <style>
            body{
              font-family: Arial;
              padding:40px;
            }

            h1{
              color:#2563eb;
            }

            .box{
              border:1px solid #ddd;
              padding:20px;
              border-radius:10px;
            }

            p{
              margin:10px 0;
              font-size:16px;
            }
          </style>
        </head>

        <body>

          <div class="box">

            <h1>KD Water Delivery</h1>

            <h2>Order Invoice</h2>

            <p><b>Product:</b> ${
              order.product
            }</p>

            <p><b>Quantity:</b> ${
              order.quantity
            }</p>

            <p><b>Amount:</b> ₹${
              order.amount
            }</p>

            <p><b>Payment:</b> ${
              order.paymentMethod
            }</p>

            <p><b>Payment Status:</b> ${
              order.status
            }</p>

            <p><b>Delivery Status:</b> ${
              order.deliveryStatus
            }</p>

            <hr/>

            <p><b>Customer:</b> ${
              order.customerName || "-"
            }</p>

            <p><b>Mobile:</b> ${
              order.mobile || "-"
            }</p>

            <p><b>Address:</b> ${
              order.address || "-"
            }</p>

            <p><b>City:</b> ${
              order.city || "-"
            }</p>

            <p><b>Pincode:</b> ${
              order.pincode || "-"
            }</p>

            <hr/>

            <p>
              <b>Date:</b>
              ${new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

          </div>

          <script>
            window.onload = function() {
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

              <p className="mt-2">

                Payment Status:

                <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {order.status}
                </span>

              </p>

              <div className="mt-6 flex gap-3 flex-wrap">

                <button
                  onClick={() =>
                    downloadBill(order)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Download PDF
                </button>

                <button
                  onClick={() =>
                    printBill(order)
                  }
                  className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl font-semibold"
                >
                  Print Bill
                </button>

              </div>

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