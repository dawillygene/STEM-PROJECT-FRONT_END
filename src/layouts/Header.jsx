import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import Logo from '../assets/img/logo.png'; 
import { Link } from 'react-router-dom'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-full sticky top-0 z-50"> {/* Added sticky positioning and z-index */}

      {/* Top Contact Bar */}
      <div className="hidden md:flex bg-blue-600 text-white py-2 px-4 flex-wrap justify-between items-center">
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
        <Link to="/contact" className="flex items-center space-x-1">
          <FaUser className="text-sm" />
          <span className="text-sm">Contact Us</span>
        </Link>
      </div>

      {/* Main Navbar */}
      <div className="bg-gradient-to-r from-orange-200 to-orange-100 flex flex-wrap justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src={Logo}
              alt="STEM IN DODOMA UNIVERSITY Logo" 
              className="h-12 w-12 mr-2"
            />
          </Link>
          <Link to="/" className="text-black font-bold text-lg md:text-xl uppercase">
            STEM IN DODOMA UNIVERSITY
          </Link>
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
          <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>
          <Link to="/blog" className="hover:text-blue-600 transition-colors duration-200">
            Blog
          </Link>
          <Link to="/team" className="hover:text-blue-600 transition-colors duration-200">
            Our Team
          </Link>
          <Link to="/gallery" className="hover:text-blue-600 transition-colors duration-200">
            Gallery
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors duration-200">
            About Us
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
          <div className="md:hidden bg-orange-100 w-full absolute top-full left-0">
            <nav className="flex flex-col py-2">
              <Link to="/" className="px-4 py-2 hover:bg-orange-200" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/blog" className="px-4 py-2 hover:bg-orange-200" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link to="/team" className="px-4 py-2 hover:bg-orange-200" onClick={() => setIsMenuOpen(false)}>
                Our Team
              </Link>
              <Link to="/gallery" className="px-4 py-2 hover:bg-orange-200" onClick={() => setIsMenuOpen(false)}>
                Gallery
              </Link>
              <Link to="/about" className="px-4 py-2 hover:bg-orange-200" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              {/* Added Contact Us to mobile menu */}
              <Link to="/contact" className="px-4 py-2 hover:bg-orange-200" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </nav>
          </div>
        )}
    </div>
  );
};

export default Header;