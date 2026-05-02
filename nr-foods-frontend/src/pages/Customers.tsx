import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import api from "../utils/api";

interface Customer {
  id: number;
  name: string;
  block: string;
  shopNo: number;
  status?: "Paid" | "Pending";
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState("");
  const [block, setBlock] = useState("A Block");
  const [shopNo, setShopNo] = useState<number | "">("");
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("All");

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers", getAuthHeader());
      setCustomers(res.data);
    } catch {
      toast.error("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreate = async () => {
    if (!name || !block || !shopNo) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await api.post(
        "/customers",
        { name, block, shopNo },
        getAuthHeader()
      );

      setName("");
      setBlock("A Block");
      setShopNo("");
      setShowForm(false);

      fetchCustomers();
      toast.success("Customer added");
    } catch {
      toast.error("Create failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete customer?")) return;

    try {
      await api.delete(`/customers/${id}`, getAuthHeader());
      fetchCustomers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleStatus = async (id: number, status?: string) => {
    const newStatus = status === "Paid" ? "Pending" : "Paid";

    try {
      await api.put(
        `/customers/${id}/status`,
        { status: newStatus },
        getAuthHeader()
      );
      fetchCustomers();
    } catch {
      toast.error("Status update failed");
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shopNo.toString().includes(searchQuery);

    const matchBlock =
      selectedBlock === "All" || c.block === selectedBlock;

    return matchSearch && matchBlock;
  });

  return (
   
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            Customer <span className="text-blue-600">Base</span>
          </h2>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            + Add Customer
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <input
            placeholder="Search customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="border p-2 rounded"
          >
            <option>All</option>
            <option>A Block</option>
            <option>B Block</option>
            <option>C Block</option>
          </select>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-4 rounded shadow flex gap-3">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2"
            />
            <input
              placeholder="Block"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
              className="border p-2"
            />
            <input
              type="number"
              placeholder="Shop No"
              value={shopNo}
              onChange={(e) =>
                setShopNo(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="border p-2"
            />
            <button
              onClick={handleCreate}
              className="bg-green-600 text-white px-4"
            >
              Save
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th>Name</th>
                <th>Block</th>
                <th>Shop</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-6">
                    No Customers Found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.block}</td>
                    <td>{c.shopNo}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          c.status === "Paid"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {c.status || "Pending"}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button
                        onClick={() => toggleStatus(c.id, c.status)}
                        className="text-blue-600"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
   
  );
};

export default Customers;