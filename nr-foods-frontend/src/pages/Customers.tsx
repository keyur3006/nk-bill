import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";
import api from "../utils/api";
import {
  UserPlus,
  Trash2,
  Search,
  User,
  MapPin,
  Hash,
  Loader2,
  Tag,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Customer {
  id: number;
  name: string;
  block: string;
  shopNo: number;
  status?: "Paid" | "Pending";
}

interface Category {
  id: number;
  name: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState("");
  const [block, setBlock] = useState("A Block");
  const [shopNo, setShopNo] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState("A Block");

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers", getAuthHeader());
      setCustomers(res.data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories", getAuthHeader());
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name || !block || !shopNo) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await api.post(
        "/customers",
        { name, block, shopNo },
        getAuthHeader()
      );

      setName("");
      setBlock("");
      setShopNo("");

      fetchCustomers();

      setShowTable(true);
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to create customer");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      await api.delete(`/customers/${id}`, getAuthHeader());
      fetchCustomers();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const toggleStatus = async (id: number, currentStatus?: string) => {
    const newStatus = currentStatus === "Paid" ? "Pending" : "Paid";

    try {
      await api.put(
        `/customers/${id}/status`,
        { status: newStatus },
        getAuthHeader()
      );

      fetchCustomers();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shopNo.toString().includes(searchQuery);

    const matchBlock = selectedBlock === "" || c.block === selectedBlock;

    if (searchQuery !== "") return matchSearch;

    return matchBlock;
  });

  return (
    <MainLayout>
      <div className="space-y-12 pb-10">
        <h2 className="text-3xl font-bold">
          Customer <span className="text-blue-600">Base</span>
        </h2>

        {/* Add Customer Button */}
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setShowTable(false);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Add Customer
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded shadow">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              placeholder="Block"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
              className="border p-2 mr-2"
            />
            <input
              type="number"
              placeholder="Shop No"
              value={shopNo}
              onChange={(e) =>
                setShopNo(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="border p-2 mr-2"
            />
            <button
              onClick={handleCreate}
              className="bg-green-600 text-white px-4 py-2"
            >
              Create
            </button>
          </div>
        )}

        {/* Table */}
        {showTable && (
          <table className="w-full border">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Block</th>
                <th>Shop</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.block}</td>
                  <td>{c.shopNo}</td>
                  <td>{c.status || "Pending"}</td>
                  <td>
                    <button onClick={() => toggleStatus(c.id, c.status)}>
                      Toggle
                    </button>
                    <button onClick={() => handleDelete(c.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
};

export default Customers;