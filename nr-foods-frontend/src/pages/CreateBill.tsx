import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api/axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { User, Calendar, Receipt, IndianRupee, Package, FileDown, Loader2, ChevronRight, Tag } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Customer {
  id: number;
  name: string;
}
interface Bottle {
  id: number;
  name: string;
  price: number;
}

const CreateBill = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState<number | "">("");
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year] = useState<number>(new Date().getFullYear());
  const [bottles, setBottles] = useState<Bottle[]>([]);
const [selectedBottle, setSelectedBottle] = useState<number | "">("");
const [bottlePrice, setBottlePrice] = useState<number>(0);
  const [quantityPerDay, setQuantityPerDay] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<number>(30);
  const [totalBottles, setTotalBottles] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  const fetchBottles = async () => {
  try {
    const res = await api.get("/bottles");
    setBottles(res.data);
  } catch (error) {
    console.error("Failed to fetch bottles", error);
  }
};

  useEffect(() => {
    fetchCustomers();
      fetchBottles();
  }, []);

  const handleBottleChange = (id: number) => {
  const bottle = bottles.find((b) => b.id === id);

  if (bottle) {
    setSelectedBottle(id);
    setBottlePrice(bottle.price);
  }
};

const fetchGeneratedBills = async () => {
  try {
     await api.get("/bills");  // ✅ fixed API
   
  } catch (error) {
    console.error("Failed to fetch bills", error);
  }
};

useEffect(() => {
  fetchGeneratedBills();
}, []);
 useEffect(() => {
  const bottles = quantityPerDay * days;
  const amount = bottles * bottlePrice;

  setTotalBottles(bottles);
  setTotalAmount(amount);
}, [quantityPerDay, days, bottlePrice]);

  const daysInMonth = new Date(year, month, 0).getDate();

  const generatePDF = () => {
    const doc = new jsPDF();
    const customerName = customers.find((c) => c.id === customerId)?.name || "Customer";

    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text("NR FOODS", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text("Premium Water Supply & Billing Services", 105, 26, { align: "center" });

    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.line(20, 35, 190, 35);

    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text(`Customer Name: ${customerName}`, 20, 50);
    doc.text(`Billing Period:  ${monthNames[month - 1]} ${year}`, 130, 50);

    autoTable(doc, {
      startY: 60,
      head: [["Description", "Details", "Unit Price", "Total"]],
      body: [
        ["Water Bottles (Daily Supply)", `${quantityPerDay} qty/day × ${daysInMonth} days`, `RS ${bottlePrice}`, `${totalBottles} Bottles`],
      ],
      headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: "bold" },
      bodyStyles: { textColor: [15, 23, 42] },
      alternateRowStyles: { fillColor: [248, 250, 252] },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text(`GRAND TOTAL: RS ${totalAmount}`, 190, finalY + 10, { align: "right" });

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // Slate-400
    doc.text("Thank you for your business!", 105, finalY + 40, { align: "center" });

    doc.save(`Bill_${customerName}_${monthNames[month - 1]}.pdf`);
  };

  const handleCreateBill = async () => {
  if (!customerId) {
     toast.error("Please select a customer first.");
    return;
  }

  setLoading(true);
  try {
    await api.post("/bills", {
      customerId,
      month,
      year,
      bottleName: "Water Bottle", // add this
      bottlePrice,
      quantityPerDay
    });

    generatePDF();
    fetchGeneratedBills();

    toast.success("Bill generated and saved successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to generate bill.");
  } finally {
    setLoading(false);
  }
};

  return (
    <MainLayout>
      <div className="space-y-12 pb-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Create <span className="text-blue-600">Invoice</span>
            </h2>
            <p className="text-slate-500 font-medium"> Generate professional, high-fidelity PDF bills for your premium clients. </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-7 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-50 to-indigo-50/30 -mr-20 -mt-20 rounded-full opacity-50" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Receipt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Invoice Details</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Bill configuration</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Select Client</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(Number(e.target.value))}
                    className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-bold text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Choose a verified customer</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" />
                </div>
              </div>

              <div className="space-y-3">
  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
    Select Bottle
  </label>

  <select
    value={selectedBottle}
    onChange={(e) => handleBottleChange(Number(e.target.value))}
    className="w-full pl-4 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm"
  >
    <option value="">Choose bottle</option>

    {bottles.map((b) => (
      <option key={b.id} value={b.id}>
        {b.name}
      </option>
    ))}
  </select>
</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Price per Bottle (RS)</label>
                  <div className="relative">
                    <IndianRupee size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      value={bottlePrice}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-slate-100 border border-slate-200 rounded-2xl font-black text-slate-400 cursor-not-allowed text-sm"
                    />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight italic ml-1">* Fixed company rate</p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Daily Quantity</label>
                  <div className="relative group">
                    <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="number"
                      value={quantityPerDay}
                      onChange={(e) => setQuantityPerDay(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-bold text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Total Billing Days</label>
                  <div className="relative group">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Billing Month</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                      <Tag size={18} />
                    </div>
                    <select
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 focus:bg-white transition-all font-bold text-sm appearance-none cursor-pointer"
                    >
                      {monthNames.map((m, index) => (
                        <option key={index} value={index + 1}>{m} {year}</option>
                      ))}
                    </select>
                    <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCreateBill}
                disabled={loading}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 mt-6 tracking-tight text-sm uppercase"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <FileDown size={20} className="group-hover:translate-y-0.5 transition-transform" />
                    Generate & Finalize Invoice
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-5 bg-slate-900 text-white p-10 rounded-[2.5rem] border border-slate-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Receipt size={240} strokeWidth={1} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-500 flex items-center justify-center border border-blue-500/20">
                  <Package size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight text-white">Live <span className="text-blue-500">Preview</span></h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-0.5">Summary analytics</p>
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">Duration</span>
                    <span className="text-slate-300 font-bold italic">{monthNames[month - 1]} period</span>
                  </div>
                  <span className="font-black text-xl text-white">{days} <span className="text-slate-500 text-xs uppercase ml-1">Days</span></span>
                </div>

                <div className="flex justify-between items-start py-5 border-b border-slate-800/50">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">Supply Volume</span>
                    <span className="text-slate-300 font-bold italic">{quantityPerDay} qty/day frequency</span>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl text-white">{totalBottles} <span className="text-slate-500 text-xs uppercase ml-1">Units</span></p>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">Total monthly load</p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-slate-800/50">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">Unit Value</span>
                    <span className="text-slate-300 font-bold italic">Corporate standard</span>
                  </div>
                  <span className="font-black text-xl text-white">₹{bottlePrice} <span className="text-slate-500 text-xs uppercase ml-1">/ unit</span></span>
                </div>
              </div>

              <div className="mt-16 bg-blue-600/10 border border-blue-500/10 p-8 rounded-4xl text-center backdrop-blur-sm">
                <p className="text-slate-400 font-black uppercase tracking-[0.25em] text-[10px] mb-3 leading-none">Net Payable Amount</p>
                <div className="flex items-center justify-center gap-3">
                  <IndianRupee size={32} className="text-blue-500" strokeWidth={3} />
                  <span className="text-6xl font-black tracking-tighter text-white tabular-nums">
                    {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateBill;
