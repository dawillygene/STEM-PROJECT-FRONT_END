import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import Logo from '../assets/img/logo.png'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap items-center space-x-6">
          <a href="tel:+225753225961" className="flex items-center space-x-1">
            <FaPhone className="text-sm" />
            <span className="text-sm">+225 753225961</span>
          </a>
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="text-sm" />
            <span className="text-sm">Dodoma, Tanzania</span>
          </div>
          <a href="mailto:info@stemdodoma.edu" className="flex items-center space-x-1">
            <FaEnvelope className="text-sm" />
            <span className="text-sm">info@stemdodoma.edu</span>
          </a>
        </div>
        <a href="/contact" className="flex items-center space-x-1">
          <FaUser className="text-sm" />
          <span className="text-sm">Contact Us</span>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="bg-gradient-to-r from-orange-200 to-orange-100 flex flex-wrap justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <img 
            src={Logo}
            alt="STEM IN DODOMA UNIVERSITY Logo" 
            className="h-12 w-12 mr-2"
          />
          <h1 className="text-black font-bold text-lg md:text-xl uppercase">
            STEM IN DODOMA UNIVERSITY
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-blue-600 transition-colors duration-200">
            Home
          </a>
          <a href="/blog" className="hover:text-blue-600 transition-colors duration-200">
            Blog
          </a>
          <a href="/team" className="hover:text-blue-600 transition-colors duration-200">
            Our Team
          </a>
          <a href="/gallery" className="hover:text-blue-600 transition-colors duration-200">
            Gallery
          </a>
          <a href="/about" className="hover:text-blue-600 transition-colors duration-200">
            About Us
          </a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-orange-100 w-full">
          <nav className="flex flex-col py-2">
            <a href="/" className="px-4 py-2 hover:bg-orange-200">
              Home
            </a>
            <a href="/blog" className="px-4 py-2 hover:bg-orange-200">
              Blog
            </a>
            <a href="/team" className="px-4 py-2 hover:bg-orange-200">
              Our Team
            </a>
            <a href="/gallery" className="px-4 py-2 hover:bg-orange-200">
              Gallery
            </a>
            <a href="/about" className="px-4 py-2 hover:bg-orange-200">
              About Us
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
