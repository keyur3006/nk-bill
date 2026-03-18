import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../utils/api";
import toast from "react-hot-toast";

const Generated = () => {

  const [generated, setGenerated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGenerated = async () => {

    const toastId = toast.loading("Loading billing history...");

    try {

      const res = await api.get("/bills/generated-bills");

      setGenerated(res.data);

      toast.success("Billing history loaded successfully", { id: toastId });

    } catch (error) {

      console.error("Fetch error", error);

      toast.error("Failed to load billing history", { id: toastId });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenerated();
  }, []);


  // Group bills by month/year
  const groupedBills = generated.reduce((acc: any, bill: any) => {

    const key = `${bill.month}/${bill.year}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(bill);

    return acc;

  }, {});


  return (
    <MainLayout>

      <h1 className="text-2xl font-bold mb-6">
        Billing History
      </h1>

      {loading && (
        <p className="text-slate-500">Loading bills...</p>
      )}

      {!loading && generated.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow text-center text-slate-500">
          No generated bills found
        </div>
      )}

      {Object.keys(groupedBills).map((month) => {

        const bills = groupedBills[month];

        const total = bills.reduce(
          (sum: number, b: any) => sum + b.totalAmount,
          0
        );

        return (

          <div key={month} className="mb-8">

            {/* Month Header */}
            <h2 className="text-xl font-bold mb-3">

              {month}

              <span className="text-green-600 ml-3">
                Total ₹{total}
              </span>

            </h2>


            {/* Bills List */}
            <div className="space-y-3">

              {bills.map((bill: any) => (

                <div
                  key={bill.id}
                  className="flex justify-between bg-white p-4 rounded-xl shadow hover:bg-slate-50 transition"
                >

                  <span className="font-medium">
                    {bill.customer.name}
                  </span>

                  <span className="text-blue-600 font-bold">
                    ₹{bill.totalAmount}
                  </span>

                </div>

              ))}

            </div>

          </div>

        );
      })}

    </MainLayout>
  );
};

export default Generated;