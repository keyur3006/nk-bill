import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// 🔐 Admin Pages
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Customers from "./pages/Customers";
import CreateBill from "./pages/CreateBill";
import Bills from "./pages/Bills";
import Categories from "./pages/categories/categories";
import BottleVariety from "./pages/categories/BottleVariety";
import Generated from "./pages/Generated";
import DeliveryPage from "./pages/DeliveryPage";

// 🌐 NEW PUBLIC PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>

        {/* 🌐 PUBLIC WEBSITE */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 ADMIN PANEL */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-bill"
          element={
            <ProtectedRoute>
              <CreateBill />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <Bills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bottle-variety"
          element={
            <ProtectedRoute>
              <BottleVariety />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generated"
          element={
            <ProtectedRoute>
              <Generated />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delivery"
          element={
            <ProtectedRoute>
              <DeliveryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;