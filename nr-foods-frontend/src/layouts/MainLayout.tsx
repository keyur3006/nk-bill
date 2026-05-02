import type { ReactNode } from "react";
import { Truck } from "lucide-react"; // 👈 TOP par add kar
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Receipt, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Tag,
  FileText,
  Bell,
  Search     
} from "lucide-react";
import { useState,  } from "react";
import { ShoppingCart } from "lucide-react";


const MainLayout = () => {
  
  
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

const user = JSON.parse(localStorage.getItem("user") || "{}");
const role = user?.role || "KARIGAR";

const navItems =
  role === "ADMIN"
    ? [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Customers", path: "/customers", icon: Users },
        { label: "Bills", path: "/create-bill", icon: Receipt },
        { label: "Categories", path: "/categories", icon: Tag },
{ label: "Generated Bills", path: "/generated", icon: FileText },
        { label: "Delivery", path: "/delivery", icon: Truck },
        { label: "Orders", path: "/admin-orders", icon: ShoppingCart },
        { label: "Admin Panel", path: "/admin", icon: Users },
      ]
    : [
        { label: "Delivery", path: "/delivery", icon: Truck },
      ];

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed top-5 left-5 z-50 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-500/10 border border-white/50 text-blue-600"
          >
            <Menu size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? "300px" : "0px",
          x: isSidebarOpen ? 0 : -300
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed lg:sticky top-0 h-screen bg-white/70 backdrop-blur-2xl border-r border-white/40 shadow-[20px_0_40px_rgba(0,0,0,0.02)] z-40 flex flex-col overflow-y-auto"
      >
        <div className="p-10 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-linear-to-tr from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              <span className="font-black text-2xl tracking-tighter">NR</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight leading-none">
                NR <span className="text-blue-600">FOODS</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Management</span>
            </div>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2.5 hover:bg-slate-100/50 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-6 py-4 space-y-2.5">
          {navItems.map((item) => {
            const isActive = location.pathname.toLowerCase() === item.path.toLowerCase();
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group relative ${
                  isActive 
                    ? "text-blue-600" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNavBG" 
                    className="absolute inset-0 bg-blue-50/50 rounded-2xl border border-blue-100/50 shadow-sm"
                  />
                )}
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-2 rounded-xl transition-colors duration-300 ${isActive ? "bg-white shadow-sm text-blue-600" : "bg-transparent text-slate-400 group-hover:text-slate-600"}`}>
                    <item.icon size={20} />
                  </div>
                  <span className="font-bold text-[15px]">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10 text-blue-600"
                  >
                    <ChevronRight size={16} strokeWidth={3} />
                  </motion.div>
                )}

                
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-900/5 rounded-3xl p-5 mb-4 border border-slate-900/5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Need help?</p>
            <p className="text-sm font-medium text-slate-600 leading-relaxed mb-3">Check our documentation for advanced features.</p>
            <button className="w-full py-2.5 bg-white rounded-xl text-xs font-bold text-slate-900 shadow-sm hover:shadow-md transition-all">
              View Guide
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-5 py-4 text-slate-500 font-bold hover:bg-rose-50/50 hover:text-rose-600 rounded-2xl transition-all duration-300 group"
          >
            <div className="p-2 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
              <LogOut size={20} />
            </div>
            <span className="text-[15px]">Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="h-24 border-b border-slate-100/50 bg-white/60 backdrop-blur-xl sticky top-0 z-30 px-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`lg:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 ${isSidebarOpen ? 'hidden' : 'block'}`}
            >
              <Menu size={22} />
            </button>
            <div className="hidden md:flex items-center bg-slate-100/50 px-4 py-2.5 rounded-2xl border border-slate-200/50 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-blue-500/5 transition-all w-80">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none focus:ring-0 text-sm font-medium ml-3 w-full placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2.5 bg-slate-100/50 rounded-xl text-slate-500 hover:text-slate-900 transition-colors group">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-tight">Administrator</p>
                <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">Super Admin</p>
              </div>
              <div className="w-12 h-12 rounded-2xl border-2 border-white p-0.5 bg-linear-to-tr from-blue-100 to-indigo-100 shadow-md">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Admin Avatar"
                  className="w-full h-full rounded-[14px] object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-10 lg:p-14 max-w-400 mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -15 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              <Outlet />   
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;