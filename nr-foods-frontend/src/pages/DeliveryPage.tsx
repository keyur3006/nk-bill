import { useEffect, useState } from "react";
import api from "../utils/api"; // ✅ IMPORTANT

const DeliveryPage = () => {
  const [form, setForm] = useState({
    workerName: "",
    date: "",
    bottles: "",
    shopNo: "",
    block: ""
  });

  const [data, setData] = useState<any[]>([]);
  const [monthly, setMonthly] = useState<any[]>([]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    try {
      await api.post("/delivery", {
        ...form,
        bottles: Number(form.bottles) // 🔥 important
      });

      alert("Delivery Added ✅");
      fetchData();
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    }
  };

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      const res = await api.get("/delivery");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ MONTHLY
  const getMonthly = async () => {
    try {
      const res = await api.get(
        "/delivery/monthly?month=04&year=2026"
      );
      setMonthly(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Delivery <span className="text-blue-600">Management</span>
      </h2>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add Delivery</h3>

        <div className="grid grid-cols-5 gap-4">
          <input name="workerName" placeholder="Karigar Name" onChange={handleChange} className="input" />
          <input type="date" name="date" onChange={handleChange} className="input" />
          <input name="bottles" placeholder="Bottles" onChange={handleChange} className="input" />
          <input name="shopNo" placeholder="Shop No" onChange={handleChange} className="input" />
          <input name="block" placeholder="Block" onChange={handleChange} className="input" />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">All Entries</h3>

        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-500">
              <th>Name</th>
              <th>Date</th>
              <th>Bottles</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: any) => (
              <tr key={item.id} className="border-b">
                <td>{item.workerName}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{item.bottles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MONTHLY */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Report</h3>

        <button
          onClick={getMonthly}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Get Monthly Report
        </button>

        <div className="mt-4">
          {monthly.map((item: any, index) => (
            <div key={index}>
              {item.workerName} → {item._sum.bottles}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;