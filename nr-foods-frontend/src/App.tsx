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
import OrderPage from "./pages/OrderPage";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
// import VerifyOtp from "./pages/VerifyOtp";
// 🌐 PUBLIC PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import DeliveryAreas from "./pages/areas";
import ProductSection from "./pages/product";


function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* 🌐 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/area" element={<DeliveryAreas/>} /> 
        <Route path="/ProductSection" element={<ProductSection/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<Profile />} />
        

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
          <Route path="/users" element={<Users />} />
          {/* <Route
  path="/verify-otp"
  element={<VerifyOtp />}
/> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;