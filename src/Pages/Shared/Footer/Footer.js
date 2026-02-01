const Footer = () => {
  return (
    <footer className="bg-[#FAF7F6] border-t border-pink-100">
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#7A4A3A]">
              EverAfter
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Creating timeless wedding moments with elegance, love, and
              unforgettable experiences.
            </p>

            <p className="mt-6 text-sm text-gray-500 italic">
              Where love stories begin ✨
            </p>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-lg font-semibold text-[#7A4A3A] mb-5">
              Our Services
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-pink-600 transition cursor-pointer">
                Wedding Planning
              </li>
              <li className="hover:text-pink-600 transition cursor-pointer">
                Bridal Makeup
              </li>
              <li className="hover:text-pink-600 transition cursor-pointer">
                Venue Decoration
              </li>
              <li className="hover:text-pink-600 transition cursor-pointer">
                Photography & Film
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-[#7A4A3A] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-pink-600 transition cursor-pointer">
                About Us
              </li>
              <li className="hover:text-pink-600 transition cursor-pointer">
                Packages
              </li>
              <li className="hover:text-pink-600 transition cursor-pointer">
                Gallery
              </li>
              <li className="hover:text-pink-600 transition cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold text-[#7A4A3A] mb-5">
              Stay Connected
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>Email: hello@everafter.com</li>
              <li>Phone: +880 1234 567890</li>
              <li>Dhaka, Bangladesh</li>
            </ul>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">
              {["Facebook", "Instagram", "Pinterest"].map((item) => (
                <span
                  key={item}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-pink-300 text-pink-600 hover:bg-pink-600 hover:text-white transition cursor-pointer"
                >
                  {item[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-pink-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 EverAfter Weddings. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-pink-600 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-pink-600 cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
