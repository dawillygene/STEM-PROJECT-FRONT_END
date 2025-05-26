import React, { useState, useEffect } from 'react';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaUser, 
  FaHome, 
  FaBlog, 
  FaUsers, 
  FaImages, 
  FaInfoCircle, 
  FaChevronDown 
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/img/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Text content constants
  const CONTENT = {
    contactInfo: {
      phone: "+225 753225961",
      location: "Dodoma, Tanzania",
      email: "info@stemdodoma.edu"
    },
    navItems: [
      { path: "/", label: "Home", icon: <FaHome /> },
      { path: "/blog", label: "Blog", icon: <FaBlog /> },
      { path: "/team", label: "Our Team", icon: <FaUsers /> },
      { path: "/gallery", label: "Gallery", icon: <FaImages /> },
      { path: "/about", label: "About Us", icon: <FaInfoCircle /> }
    ]
  };

  // Detect scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if a navigation link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-50 shadow-lg">
      {/* Top Contact Bar */}
      <div 
        className="hidden md:flex text-white py-2.5 px-6 justify-between items-center"
        style={{ backgroundColor: '#0066CC' }}
      >
        <div className="flex flex-wrap items-center space-x-8">
          <motion.a 
            href={`tel:${CONTENT.contactInfo.phone}`} 
            className="flex items-center space-x-2 hover:text-opacity-80 transition-all"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-white bg-opacity-20 p-1.5 rounded-full">
              <FaPhone className="text-sm" />
            </div>
            <span className="text-sm font-medium">{CONTENT.contactInfo.phone}</span>
          </motion.a>
          
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-white bg-opacity-20 p-1.5 rounded-full">
              <FaMapMarkerAlt className="text-sm" />
            </div>
            <span className="text-sm font-medium">{CONTENT.contactInfo.location}</span>
          </motion.div>
          
          <motion.a 
            href={`mailto:${CONTENT.contactInfo.email}`} 
            className="flex items-center space-x-2 hover:text-opacity-80 transition-all"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-white bg-opacity-20 p-1.5 rounded-full">
              <FaEnvelope className="text-sm" />
            </div>
            <span className="text-sm font-medium">{CONTENT.contactInfo.email}</span>
          </motion.a>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link 
            to="/contact" 
            className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-1.5 rounded-full hover:bg-opacity-30 transition-all"
          >
            <FaUser className="text-sm" />
            <span className="text-sm font-medium">Contact Us</span>
          </Link>
        </motion.div>
      </div>

      {/* Main Navbar */}
      <div 
        className={`${scrolled ? 'py-2' : 'py-3'} flex justify-between items-center px-6 transition-all duration-300`}
        style={{ 
          background: `linear-gradient(135deg, #FFAD03 60%, #FD9148 100%)`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="relative group">
            <div className="absolute -inset-1.5 rounded-full bg-white bg-opacity-30 blur-lg group-hover:bg-opacity-40 transition-all duration-300 -z-10"></div>
            <img 
              src={Logo}
              alt="STEM IN DODOMA UNIVERSITY Logo" 
              className="h-14 w-14 object-contain p-1 bg-white rounded-full shadow-md"
            />
          </Link>
          
          <div className="ml-3 flex flex-col">
            <Link to="/" className="text-white font-bold text-xl md:text-2xl tracking-tight">
              STEM EDUCATION
            </Link>
            <span className="text-white text-opacity-80 text-sm font-medium">TANZANIA</span>
          </div>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden p-2 bg-white bg-opacity-20 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </motion.button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {CONTENT.navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              label={item.label}
              icon={item.icon}
              isActive={isActive(item.path)}
            />
          ))}
          
          {/* <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2"
          >
            <Link 
              to="/contact" 
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-white ${isActive('/contact') ? 'bg-[#0066CC]' : 'hover:bg-white hover:bg-opacity-20'} transition-all duration-200`}
              style={{ boxShadow: isActive('/contact') ? '0 4px 10px rgba(0, 102, 204, 0.4)' : 'none' }}
            >
              <FaUser />
              <span>Contact</span>
              {isActive('/contact') && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 w-full bg-white rounded-full"
                  layoutId="underline"
                />
              )}
            </Link>
          </motion.div> */}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden w-full absolute top-full left-0 overflow-hidden shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            background: 'linear-gradient(180deg, #FD9148 0%, #FFAD03 100%)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <nav className="flex flex-col py-2">
            {CONTENT.navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center space-x-3 px-6 py-3 ${isActive(item.path) ? 'bg-[#0066CC] text-white font-medium' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={`${isActive(item.path) ? 'bg-white bg-opacity-20' : 'bg-[#0066CC] bg-opacity-10'} p-2 rounded-full`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
            <Link 
              to="/contact" 
              className={`flex items-center space-x-3 px-6 py-3 ${isActive('/contact') ? 'bg-[#0066CC] text-white font-medium' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={`${isActive('/contact') ? 'bg-white bg-opacity-20' : 'bg-[#0066CC] bg-opacity-10'} p-2 rounded-full`}>
                <FaUser />
              </div>
              <span>Contact Us</span>
            </Link>
          </nav>
        </motion.div>
      )}
    </div>
  );
};

// Navigation link component for desktop
const NavLink = ({ to, label, icon, isActive }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={to} 
        className={`relative flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-[#0066CC] text-white' 
            : 'text-white hover:bg-white hover:bg-opacity-20'
        }`}
        style={{ 
          boxShadow: isActive ? '0 4px 10px rgba(0, 102, 204, 0.4)' : 'none',
        }}
      >
        {icon}
        <span>{label}</span>
        {isActive && (
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 mx-auto h-1 w-10 bg-white rounded-full"
            layoutId="activeIndicator"
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Header;