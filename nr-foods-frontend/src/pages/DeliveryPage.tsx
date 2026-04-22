import { useEffect, useState } from "react";
import api from "../utils/api";

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
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ ROLE
  const role = localStorage.getItem("role")?.toUpperCase();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SUBMIT / UPDATE
  const handleSubmit = async () => {
    if (!form.workerName || !form.date || !form.bottles) {
      alert("Fill required fields");
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        // 🔥 UPDATE
        await api.put(`/delivery/${editingId}`, {
          ...form,
          bottles: Number(form.bottles),
        });

        alert("Updated ✅");
        setEditingId(null);
      } else {
        // 🔥 CREATE
        await api.post("/delivery", {
          ...form,
          bottles: Number(form.bottles),
        });

        alert("Added ✅");
      }

      setForm({
        workerName: "",
        date: "",
        bottles: "",
        shopNo: "",
        block: ""
      });

      fetchData();
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH
  const fetchData = async () => {
    try {
      const res = await api.get("/delivery");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this entry?")) return;

    try {
      await api.delete(`/delivery/${id}`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ EDIT
  const handleEdit = (item: any) => {
    setForm({
      workerName: item.workerName,
      date: item.date.split("T")[0],
      bottles: item.bottles,
      shopNo: item.shopNo || "",
      block: item.block || "",
    });

    setEditingId(item.id);
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

      <h2 className="text-2xl font-bold mb-6">
        Delivery <span className="text-blue-600">Management</span>
      </h2>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-4">
          {editingId ? "Update Delivery" : "Add Delivery"}
        </h3>

        <div className="grid grid-cols-5 gap-4">
          <input name="workerName" placeholder="Name" value={form.workerName} onChange={handleChange} className="input" />
          <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
          <input name="bottles" placeholder="Bottles" value={form.bottles} onChange={handleChange} className="input" />
          <input name="shopNo" placeholder="Shop No" value={form.shopNo} onChange={handleChange} className="input" />
          <input name="block" placeholder="Block" value={form.block} onChange={handleChange} className="input" />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
        >
          {loading ? "Processing..." : editingId ? "Update" : "Submit"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">All Entries</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Date</th>
              <th>Bottles</th>

              {role === "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((item: any) => (
              <tr key={item.id} className="border-b">
                <td>{item.workerName}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{item.bottles}</td>

                {role === "ADMIN" && (
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MONTHLY */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h3 className="font-semibold mb-4">Monthly Report</h3>

        <button
          onClick={getMonthly}
          className="bg-green-600 text-white px-5 py-2 rounded"
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