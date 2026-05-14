import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* SEO META TAGS */}
      <Helmet>

        <title>
          KD Water Delivery Ahmedabad | Pure Mineral Water Service
        </title>

        <meta
          name="description"
          content="KD Water Delivery provides fast and reliable mineral water bottle delivery services in Ahmedabad. Order 20L water bottles, pure RO + UV purified drinking water, and same-day delivery."
        />

        <meta
          name="keywords"
          content="water delivery Ahmedabad, mineral water delivery, 20L water bottle, pure drinking water, RO water delivery, KD Water Delivery, fast water delivery"
        />

        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="KD Water Delivery Ahmedabad"
        />

        <meta
          property="og:description"
          content="Best mineral water bottle delivery service in Ahmedabad."
        />

        <meta
          property="og:image"
          content="https://www.keyurbill.online/images/slider-1.jpg"
        />

        <meta
          property="og:url"
          content="https://www.keyurbill.online/"
        />

        <meta property="og:type" content="website" />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://www.keyurbill.online/"
        />

      </Helmet>
<footer className="bg-[#0b2c6a] text-white mt-40 relative">

  {/* CTA BOX */}
  <div className="absolute left-1/2 -translate-x-1/2 -top-24 w-full max-w-6xl px-6 z-20">

    <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-[30px] px-8 md:px-10 py-10 md:py-4 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">

      {/* TEXT */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 leading-tight max-w-3xl">

        Ready to get started? <br />

        Get in touch, or create an account.

      </h2>

      {/* BUTTON */}
      <button className="bg-[#1d2f8d] hover:bg-[#16246d] transition-all duration-300 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-lg whitespace-nowrap">

        Subscribe Now →

      </button>

    </div>

  </div>

  {/* MAIN FOOTER */}
 <div className="max-w-7xl mx-auto px-6 md:px-10 pt-52 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* LOGO + DESC */}
          <div>

            <h1 className="text-3xl font-extrabold text-blue-300 mb-4">
              KD Water Delivery
            </h1>

            <p className="text-gray-300 text-sm leading-7">
              Fast and reliable mineral water bottle delivery service in Ahmedabad for homes, offices, and businesses.
            </p>

            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-300">

              <Link to="/about" className="hover:text-white transition">
                About
              </Link>

              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>

              <Link to="/services" className="hover:text-white transition">
                Services
              </Link>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300 text-sm">

              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>

              <li>
                <Link to="/area" className="hover:text-white transition">
                  Delivery Area
                </Link>
              </li>

            </ul>

          </div>

          {/* PRODUCTS */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Products
            </h3>

            <ul className="space-y-3 text-gray-300 text-sm">

              <li>20L Cold Bottle</li>

              <li>20L Hot Bottle</li>

              <li>Bisleri 200ml</li>

              <li>Yes 200ml</li>

              <li>Mineral Water Delivery</li>

            </ul>

          </div>

          {/* IMPORTANT PAGES */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Important Pages
            </h3>

            <ul className="space-y-3 text-gray-300 text-sm">

              <li>
                <Link to="/login" className="hover:text-white transition">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/my-orders" className="hover:text-white transition">
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/ProductSection" className="hover:text-white transition">
                  Products
                </Link>
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Contact Us
            </h3>

            <p className="text-sm text-gray-300 mb-3 leading-7">
              📞 +91 9316163469
            </p>

            <p className="text-sm text-gray-300 leading-7">
              📍 Ahmedabad, Gujarat, India
            </p>

            <p className="text-sm text-gray-300 mt-3">
              ✉ support@keyurbill.online
            </p>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-sm text-gray-300 py-5 border-t border-blue-800 px-4">

          © 2026
          <span className="text-blue-400 font-semibold">
            {" "}KD Water Delivery
          </span>
          . All Rights Reserved.

        </div>

      </footer>
    </>
  );
};

export default Footer;