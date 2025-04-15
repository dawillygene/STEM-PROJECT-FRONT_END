import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white rounded-full mr-3 flex items-center justify-center">
                  <div className="font-bold text-primary text-xl">UDOM</div>
                </div>
                <div className="text-xl font-bold">University of Dodoma</div>
              </div>
              <p className="text-gray-300">
                Enhancing Mathematics and Science Education in Secondary Schools in Tanzania - A partnership program with MoEST sponsored by UNICEF.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-secondary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/objectives" className="text-gray-300 hover:text-secondary transition-colors">
                    Objectives
                  </Link>
                </li>
                <li>
                  <Link to="/activities" className="text-gray-300 hover:text-secondary transition-colors">
                    Activities
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-300 hover:text-secondary transition-colors">
                    Team
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/publications" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Publications
                  </a>
                </li>
                <li>
                  <a 
                    href="/research" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Research
                  </a>
                </li>
                <li>
                  <a 
                    href="/media" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Media
                  </a>
                </li>
                <li>
                  <a 
                    href="/partners" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a 
                    href="/events" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for updates on our program activities.
              </p>
              <form>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 w-full rounded-l-lg border border-gray-400 bg-white text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <button
                    type="submit"
                    className="bg-secondary px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors border-l border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">© {currentYear} The University of Dodoma. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a 
                href="/privacy-policy" 
                className="text-gray-300 hover:text-secondary transition-colors mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service" 
                className="text-gray-300 hover:text-secondary transition-colors mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>
              <a 
                href="/sitemap" 
                className="text-gray-300 hover:text-secondary transition-colors mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;