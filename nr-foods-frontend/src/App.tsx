import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";

// 🔐 Admin Pages
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Customers from "./pages/Customers";
import CreateBill from "./pages/CreateBill";
import Bills from "./pages/Bills";
import Categories from "./pages/categories/categories";
import BottleVariety from "./pages/categories/BottleVariety";
import Generated from "./pages/Generated";
import DeliveryPage from "./pages/DeliveryPage";
import MyOrders from "../src/pages/landing/MyOrders";
import AdminOrders from "./pages/AdminOrders";

// 🌐 PUBLIC PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* 🌐 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* 🔐 ADMIN WITH SIDEBAR */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/create-bill" element={<CreateBill />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/bottle-variety" element={<BottleVariety />} />
          <Route path="/generated" element={<Generated />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;