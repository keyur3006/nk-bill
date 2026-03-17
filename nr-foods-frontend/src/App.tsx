import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Customers from "./pages/Customers";
import CreateBill from "./pages/CreateBill";
import Bills from "./pages/Bills";
import Categories from "./pages/categories/categories";
import BottleVariety from "./pages/categories/BottleVariety";
import Generated from "./pages/Generated";

function App() {
  return (
    <>
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Login />} />

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
          path="/Categories"
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

        <Route path="/Generated" element={<Generated />} />
      </Routes>
    </>
  );
}

export default App;