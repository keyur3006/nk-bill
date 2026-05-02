import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full shadow-sm">

      {/* TOP BAR */}
      <div className="bg-blue-900 h-2 w-full"></div>

      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4 md:py-6 bg-white relative">

        {/* LEFT MENU (Desktop) */}
        <div className="hidden md:flex gap-6 text-blue-900 font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Login
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl text-blue-900"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 md:top-6 bg-white px-4 md:px-6 py-2 rounded-full shadow">
          <span className="text-blue-600 font-bold text-sm md:text-lg">
            KD Water Delivery
          </span>
        </div>

        {/* RIGHT SIDE (Desktop only) */}
        <div className="hidden md:flex items-center gap-6">

          {/* PHONE */}
          <div className="flex items-center gap-2 text-blue-900">
            <span className="text-xl">📞</span>
            <div className="text-sm">
              <p className="text-blue-400">24/7 Phone Services</p>
              <p className="font-bold">555 666 999 00</p>
            </div>
          </div>

          {/* CART */}
          <div className="flex items-center gap-2 text-blue-900 cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
              🛒
            </div>
            <div className="text-sm">
              <p className="font-semibold">Add to Cart</p>
              <p className="text-blue-400">(Item: 02)</p>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 space-y-4 text-blue-900 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block bg-blue-600 text-white px-4 py-2 rounded text-center"
          >
            Login
          </Link>

          {/* Mobile extra */}
          <div className="pt-4 border-t">
            <p className="text-sm text-blue-400">📞 24/7 Phone Services</p>
            <p className="font-bold">555 666 999 00</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;