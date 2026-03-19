import MainLayout from "../layouts/MainLayout";
import { Users, Package, IndianRupee, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const Dashboard = () => {
const revenueData = [
  { day: "1", revenue: 400 },
  { day: "5", revenue: 900 },
  { day: "10", revenue: 700 },
  { day: "15", revenue: 1200 },
  { day: "20", revenue: 1000 },
  { day: "25", revenue: 1500 },
  { day: "30", revenue: 1300 },
];
const [stats, setStats] = useState<any[]>([]);


useEffect(() => {

  const fetchDashboard = async () => {

    const toastId = toast.loading("Loading dashboard...");

    try {

      const res = await api.get("/dashboard/stats");

      setStats([
        {
          label: "Total Customers",
          value: res.data.totalCustomers,
          icon: Users,
          gradient: "from-blue-600 to-indigo-600",
          trend: "+12%",
          description: "Active subscribers"
        },
        {
          label: "Bottles Delivered",
          value: res.data.bottlesDelivered,
          icon: Package,
          gradient: "from-violet-600 to-purple-600",
          trend: "+8%",
          description: "Total bottles delivered"
        },
        {
          label: "Total Revenue",
          value: `₹${res.data.totalRevenue}`,
          icon: IndianRupee,
          gradient: "from-emerald-600 to-teal-600",
          trend: "+15%",
          description: "Total revenue generated"
        },
        {
          label: "Pending Payments",
          value: `₹${res.data.pendingPayments}`,
          icon: Clock,
          gradient: "from-rose-600 to-pink-600",
          trend: "-2%",
          description: "Pending bill payments"
        }
      ]);

      toast.success("Dashboard loaded successfully", { id: toastId });

    } catch (error) {

      console.error("Dashboard fetch error", error);

      toast.error("Failed to load dashboard", { id: toastId });

    } finally {
      
    }
  };

  fetchDashboard();

}, []);

  return (
    <MainLayout>
      <div className="space-y-12 pb-10">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Dashboard <span className="text-blue-600">Overview</span>
            </h2>

            <p className="text-slate-500 font-medium">
              Welcome back, Administrator. Here's your business at a glance.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >

            <button
              onClick={() => toast.success("Report exported successfully")}
              className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              Export Report
            </button>

            <Link to="/create-bill">
              <button className="px-5 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                Create New Bill
              </button>
            </Link>

          </motion.div>

        </header>


        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((stat, index) => (

            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow hover:shadow-lg transition-all"
            >

              <div className="flex justify-between items-start mb-8">

                <div className={`p-4 rounded-2xl bg-linear-to-br ${stat.gradient} text-white`}>
                  <stat.icon size={26} />
                </div>

                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${stat.trend.startsWith("+") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  <ArrowUpRight size={14} />
                  {stat.trend}
                </div>

              </div>

              <div>

                <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                  {stat.label}
                </p>

                <h3 className="text-3xl font-black text-slate-900">
                  {stat.value}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {stat.description}
                </p>

              </div>

            </motion.div>

          ))}

        </div>


        {/* ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-2 bg-white rounded-3xl p-10 shadow"
          >

            <h4 className="text-xl font-black text-slate-900 mb-2">
              Revenue Analytics
            </h4>

            <p className="text-sm text-slate-400 mb-8">
              Last 30 days performance
            </p>

            <div className="h-80">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={revenueData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

      <XAxis
        dataKey="day"
        tick={{ fill: "#64748b", fontSize: 12 }}
      />

      <YAxis
        tick={{ fill: "#64748b", fontSize: 12 }}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: "#0f172a",
          border: "none",
          borderRadius: "10px",
          color: "#fff",
        }}
      />

      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#2563eb"
        strokeWidth={3}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

          </motion.div>


          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-10 shadow flex flex-col"
          >

            <h4 className="text-xl font-black text-slate-900 mb-6">
              Recent Activity
            </h4>

            <div className="space-y-5">

              {[1,2,3].map((i)=>(
                <div key={i} className="flex gap-4">

                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <IndianRupee size={18}/>
                  </div>

                  <div>
                    <p className="font-bold text-sm">
                      New bill created
                    </p>

                    <p className="text-xs text-slate-400">
                      2 minutes ago
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </motion.div>

        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;