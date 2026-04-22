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
  const [editData, setEditData] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const role = localStorage.getItem("role");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD DELIVERY
  const handleSubmit = async () => {
    if (!form.workerName || !form.date || !form.bottles) {
      return alert("Fill all required fields");
    }

    try {
      setLoading(true);

      await api.post("/delivery", {
        ...form,
        bottles: Number(form.bottles)
      });

      alert("Delivery Added ✅");

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
      setTableLoading(true);
      const res = await api.get("/delivery");
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTableLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this entry?")) return;

    try {
      setActionLoading(true);

      await api.delete(`/delivery/${id}`);
      alert("Deleted ✅");
      fetchData();
    } catch {
      alert("Delete failed ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ EDIT
  const handleEdit = (item: any) => {
    setEditData(item);
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      setActionLoading(true);

      await api.put(`/delivery/${editData.id}`, {
        ...editData,
        bottles: Number(editData.bottles)
      });

      alert("Updated ✅");
      setEditData(null);
      fetchData();
    } catch {
      alert("Update failed ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ MONTHLY
  const getMonthly = async () => {
    try {
      const res = await api.get("/delivery/monthly?month=04&year=2026");
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
      <div className="bg-white rounded-2xl shadow border p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add Delivery</h3>

        <div className="grid grid-cols-5 gap-4">
          <input name="workerName" value={form.workerName} onChange={handleChange} placeholder="Karigar Name" className="input" />
          <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
          <input name="bottles" value={form.bottles} onChange={handleChange} placeholder="Bottles" className="input" />
          <input name="shopNo" value={form.shopNo} onChange={handleChange} placeholder="Shop No" className="input" />
          <input name="block" value={form.block} onChange={handleChange} placeholder="Block" className="input" />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">All Entries</h3>

        {tableLoading ? (
          <div className="text-center py-10 text-gray-400">
            Loading deliveries...
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No deliveries found
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-gray-500">
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
                  <td>{item.date ? item.date.split("T")[0] : "-"}</td>
                  <td>{item.bottles}</td>

                  {role === "ADMIN" && (
                    <td>
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 mr-3"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={actionLoading}
                        className="text-red-500"
                      >
                        {actionLoading ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* EDIT */}
      {editData && (
        <div className="bg-yellow-100 p-4 mt-6 rounded">
          <h3 className="font-bold mb-2">Edit Delivery</h3>

          <input
            value={editData.workerName}
            onChange={(e) =>
              setEditData({ ...editData, workerName: e.target.value })
            }
            className="border p-2 mr-2"
          />

          <input
            type="date"
            value={editData.date?.split("T")[0]}
            onChange={(e) =>
              setEditData({ ...editData, date: e.target.value })
            }
            className="border p-2 mr-2"
          />

          <input
            value={editData.bottles}
            onChange={(e) =>
              setEditData({ ...editData, bottles: e.target.value })
            }
            className="border p-2 mr-2"
          />

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-1 mr-2"
          >
            {actionLoading ? "Updating..." : "Update"}
          </button>

          <button
            onClick={() => setEditData(null)}
            className="bg-gray-500 text-white px-4 py-1"
          >
            Cancel
          </button>
        </div>
      )}

      {/* MONTHLY */}
      <div className="bg-white rounded-2xl shadow border p-6 mt-6">
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