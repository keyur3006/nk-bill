import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";
import api from "../api/axios";
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
  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
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
    await api.post("/customers", { name, block, shopNo });

    setName("");
    setBlock("");
    setShopNo("");

    fetchCustomers();

    setShowTable(true);
    setShowForm(false) // 👈 table show karva mate
  } catch (error) {
       toast.error("Failed to create customer");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const toggleStatus = async (id: number, currentStatus?: string) => {
    const newStatus = currentStatus === "Paid" ? "Pending" : "Paid";

    try {
      await api.put(`/customers/${id}/status`, {
        status: newStatus,
      });

      fetchCustomers();
    } catch (error) {
     toast.error("Status update failed");
    }
  };

  const filteredCustomers = customers.filter((c) => {
    // Search filter
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shopNo.toString().includes(searchQuery);

    // Block filter
    const matchBlock = selectedBlock === "" || c.block === selectedBlock;

    // If search is active, search across all blocks
    if (searchQuery !== "") {
      return matchSearch;
    }

    // Otherwise apply block filter
    return matchBlock;
  });

  return (
    <MainLayout>
      <div className="space-y-12 pb-10">
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Customer <span className="text-blue-600">Base</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Oversee and manage your growing customer community.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-white p-1.5 rounded-[1.25rem] border border-slate-200/60 shadow-sm">
              <div className="relative">
                <button
                  onClick={() => setShowCategories(!showCategories)}
                  className="px-5 py-2.5 rounded-xl text-[13px] font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <Tag size={16} className="text-blue-600" />
                  {selectedBlock || "All Blocks"}
                  <ChevronRight size={14} className={`transition-transform duration-300 ${showCategories ? 'rotate-90' : ''}`} />
                </button>

                <AnimatePresence>
                  {showCategories && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute mt-3 w-56 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl shadow-slate-200/50 z-50 overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        <button
                          onClick={() => {
                            setSelectedBlock("");
                            setShowCategories(false);
                          }}
                          className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:text-blue-600 transition-all"
                        >
                          All Blocks
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                              selectedBlock === cat.name ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-white hover:text-blue-600"
                            }`}
                            onClick={() => {
                              setSelectedBlock(cat.name);
                              setBlock(cat.name);
                              setShowCategories(false);
                              setShowTable(true);
                            }}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="relative group max-w-sm w-full md:w-80">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
              />
              <input
                type="text"
                placeholder="Find customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-sm shadow-sm"
              />
            </div>

            {!showForm && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowForm(true);
                  setShowTable(false);
                }}
                className="bg-blue-600 text-white px-7 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <UserPlus size={18} />
                Add New Customer
              </motion.button>
            )}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] max-w-4xl mx-auto w-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-50 to-indigo-50/30 -mr-20 -mt-20 rounded-full opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <UserPlus size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Customer</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-0.5">Registration form</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Customer Full Name</label>
                    <div className="relative group">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value.toUpperCase())}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-bold text-sm uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Block Designation</label>
                    <div className="relative group">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <select
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-bold text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Select a block</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                      <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Shop / Unit Number</label>
                    <div className="relative group">
                      <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="number"
                        placeholder="e.g. 104"
                        value={shopNo}
                        onChange={(e) => setShopNo(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-bold text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-slate-50 pt-10">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setShowTable(true);
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all text-sm"
                  >
                    Cancel & Return
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 text-sm"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                        Complete Registration
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {showTable && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30 border-b border-slate-100/50">
                      <th className="pl-10 pr-6 py-7 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">ID</th>
                      <th className="px-6 py-7 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer Identity</th>
                      <th className="px-6 py-7 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Block / Section</th>
                      <th className="px-6 py-7 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Shop No</th>
                      <th className="px-6 py-7 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Account Status</th>
                      <th className="pl-6 pr-10 py-7 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <AnimatePresence>
                      {filteredCustomers.map((c, index) => (
                        <motion.tr
                          key={c.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group hover:bg-slate-50/80 transition-all duration-300"
                        >
                          <td className="pl-10 pr-6 py-6">
                            <span className="font-black text-slate-400 text-xs">#{c.id}</span>
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center font-black text-sm shadow-sm border border-blue-100/30">
                                {c.name.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-black text-slate-900 leading-none mb-1 group-hover:text-blue-600 transition-colors">
                                  {c.name}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">verified client</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              <span className="font-bold text-slate-600 text-[13px]">{c.block}</span>
                            </div>
                          </td>
                          <td className="px-6 py-6 font-bold text-slate-900 text-[13px]">{c.shopNo}</td>
                          <td className="px-6 py-6">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${
                              c.status === "Paid" 
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50" 
                                : "bg-rose-50 text-rose-600 border border-rose-100/50"
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${c.status === "Paid" ? "bg-emerald-500" : "bg-rose-500 animate-pulse"}`} />
                              {c.status || "Pending"}
                            </div>
                          </td>
                          <td className="pl-6 pr-10 py-6 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                              <button
                                onClick={() => toggleStatus(c.id, c.status)}
                                className={`px-4 py-2 text-[11px] font-black rounded-xl transition-all shadow-sm ${
                                  c.status === "Paid" 
                                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/10"
                                }`}
                              >
                                {c.status === "Paid" ? "Reset" : "Mark Paid"}
                              </button>
                              <button
                                onClick={() => handleDelete(c.id)}
                                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                title="Remove Customer"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                    {filteredCustomers.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-10 py-32 text-center">
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-4 max-w-xs mx-auto text-slate-400"
                          >
                            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-2">
                              <User size={40} strokeWidth={1} />
                            </div>
                            <h5 className="text-lg font-black text-slate-900">No Customers Found</h5>
                            <p className="text-sm font-medium leading-relaxed italic">
                              We couldn't find any results matching your current filters or search request.
                            </p>
                            <button 
                              onClick={() => {setSearchQuery(""); setSelectedBlock("");}}
                              className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all"
                            >
                              Reset All Filters
                            </button>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default Customers;
