import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  Receipt,
  Calendar,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Bill {
  id: number;
  month: number;
  year: number;
  totalBottles: number;
  totalAmount: number;
  status: string;
  customer: {
    name: string;
  };
}

const Bills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const fetchBills = async () => {
    try {
      const res = await api.get("/bills");
      setBills(res.data);
    } catch (error) {
      console.error("Failed to fetch bills", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const markAsPaid = async (id: number) => {
    try {
      await api.patch(`/bills/${id}/status`, { status: "Paid" });
      toast.success("Bill marked as Paid");
      fetchBills();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const groupedBills = bills.reduce((acc: any, bill: Bill) => {
    const key = `${monthNames[bill.month - 1]} ${bill.year}`;

    if (!acc[key]) acc[key] = [];

    acc[key].push(bill);

    return acc;
  }, {});

  return (
    <MainLayout>
      <div className="space-y-12 pb-10">

        <header className="flex justify-between items-center">
          <h2 className="text-4xl font-black text-slate-900">
            Billing <span className="text-blue-600">History</span>
          </h2>
        </header>

        <div className="bg-white rounded-3xl shadow overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-5 text-left">Transaction</th>
                <th className="p-5 text-left">Customer</th>
                <th className="p-5 text-left">Billing Period</th>
                <th className="p-5 text-left">Usage</th>
                <th className="p-5 text-left">Amount</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody>

              {Object.entries(groupedBills).map(([month, monthBills]: any) => (
                <tr key={month}>
                  <td colSpan={7} className="p-0">

                    <table className="w-full">

                      {/* MONTH HEADER */}
                      <thead>
                        <tr>
                          <td colSpan={7} className="bg-slate-100 px-6 py-3 font-bold">
                            {month}
                          </td>
                        </tr>
                      </thead>

                      <tbody>

                        <AnimatePresence>

                          {monthBills.map((bill: Bill, index: number) => (

                            <motion.tr
                              key={bill.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b hover:bg-slate-50"
                            >

                              <td className="p-5 font-bold text-slate-400">
                                #{bill.id}
                              </td>

                              <td className="p-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center font-bold text-blue-600">
                                    {bill.customer.name.charAt(0)}
                                  </div>
                                  {bill.customer.name}
                                </div>
                              </td>

                              <td className="p-5 flex items-center gap-2">
                                <Calendar size={14}/>
                                {monthNames[bill.month - 1]} {bill.year}
                              </td>

                              <td className="p-5 flex items-center gap-2">
                                <Package size={14}/>
                                {bill.totalBottles} Units
                              </td>

                              <td className="p-5 font-bold text-blue-600">
                                ₹{bill.totalAmount}
                              </td>

                              <td className="p-5">
                                {bill.status === "Paid" ? (
                                  <span className="text-green-600 font-bold">
                                    PAID
                                  </span>
                                ) : (
                                  <span className="text-orange-500 font-bold">
                                    PENDING
                                  </span>
                                )}
                              </td>

                              <td className="p-5 text-right space-x-2">

                                <button
                                  onClick={() => {
                                    toast.success("Opening bill PDF...");
                                    window.open(`http://localhost:5000/api/bills/${bill.id}/pdf`, "_blank");
                                  }}
                                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                >
                                  View PDF
                                </button>

                                {bill.status === "Pending" && (
                                  <button
                                    onClick={() => markAsPaid(bill.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                  >
                                    Settle
                                  </button>
                                )}

                              </td>

                            </motion.tr>

                          ))}

                        </AnimatePresence>

                      </tbody>

                    </table>

                  </td>
                </tr>
              ))}

              {bills.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="text-center p-20">
                    <Receipt size={40} className="mx-auto mb-3"/>
                    No Bills Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </MainLayout>
  );
};

export default Bills;