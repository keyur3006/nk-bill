const Footer = () => {
  return (
    <footer className="bg-[#0b2c6a] text-white mt-20 relative">
      
      {/* TOP CTA BOX */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl px-10 py-10 flex justify-between items-center -mt-16 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
            Ready to get started? <br />
            Get in touch, or create an account.
          </h2>

          <button className="bg-blue-900 text-white px-6 py-3 rounded-full">
            Subscribe Now →
          </button>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-10 py-16 grid md:grid-cols-5 gap-10">
        
        {/* LOGO + DESC */}
        <div>
          <h1 className="text-2xl font-bold text-blue-300 mb-4">
            Aqualife
          </h1>
          <p className="text-gray-300 text-sm">
            There are many variations of passages of Ipsum available but the majority.
          </p>

          <div className="flex gap-4 mt-6 text-sm text-gray-300">
            <span>Privacy</span>
            <span>Terms & Conditions</span>
            <span>Blog</span>
          </div>
        </div>

        {/* RECENT BLOG */}
        <div>
          <h3 className="font-semibold mb-4">Recent Blog</h3>

          <div className="flex gap-3 mb-4">
            <img
              src="https://via.placeholder.com/50"
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="text-sm">Fusce magna</p>
              <span className="text-xs text-gray-400">June 26, 2020</span>
            </div>
          </div>

          <div className="flex gap-3">
            <img
              src="https://via.placeholder.com/50"
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="text-sm">Fusce magna</p>
              <span className="text-xs text-gray-400">June 26, 2020</span>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Home</li>
            <li>Testimonials</li>
            <li>Team</li>
            <li>Career</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Home</li>
            <li>Testimonials</li>
            <li>Team</li>
            <li>Career</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-300 mb-2">
            📞 +88 012 345 678 90
          </p>
          <p className="text-sm text-gray-300">
            📍 123 Street New York City, United States
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-gray-300 py-4 border-t border-blue-800">
        Copyright by <span className="text-blue-400">@nrfoods</span>. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
