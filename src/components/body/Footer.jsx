const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-3">
            FoodFinder
          </h2>
          <p className="text-gray-400">
            Discover the best food & deals in your city. Fast, fresh, and at
            your fingertips.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-gray-400">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Help & Support</h3>
          <ul className="space-y-1 text-gray-400">
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f hover:text-white"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram hover:text-white"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter hover:text-white"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in hover:text-white"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300 text-xs">
        © {new Date().getFullYear()} FoodFinder by Aquib Sayyed. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
