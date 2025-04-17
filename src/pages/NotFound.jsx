import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa';
import Logo from '../assets/img/logo.png';

const NotFound = () => {
  const navigate = useNavigate();
  
  // Text content constants
  const CONTENT = {
    title: "Page Not Found",
    subtitle: "Oops! The page you're looking for seems to have vanished.",
    description: "The page might have been moved, deleted, or perhaps never existed. Let's get you back on track.",
    buttons: {
      home: "Back to Home",
      previous: "Go Back",
      search: "Search Website"
    },
    suggestions: {
      title: "You might be looking for:",
      links: [
        { to: "/about", label: "About Us" },
        { to: "/blog", label: "Blog Articles" },
        { to: "/team", label: "Our Team" },
        { to: "/contact", label: "Contact Information" }
      ]
    }
  };

  useEffect(() => {
    // Set document title when component mounts
    document.title = '404 - Page Not Found | STEM in Dodoma University';
    
    // Optional: Track the 404 error in analytics
    // if (window.gtag) {
    //   window.gtag('event', '404_error', {
    //     'page_path': window.location.pathname
    //   });
    // }
  }, []);

  // Handle the back button click
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl w-full space-y-12">
        {/* Logo and 404 Text */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <div className="relative mb-6">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#FFAD03] to-[#FD9148] opacity-75 blur-md"></div>
            <div className="relative h-24 w-24 rounded-full p-1 bg-gradient-to-r from-[#FFAD03] to-[#FD9148]">
              <div className="h-full w-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src={Logo} alt="STEM IN DODOMA UNIVERSITY Logo" className="h-16 w-16 object-contain" />
              </div>
            </div>
          </div>
          
          <motion.h1 
            className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] to-[#004d99]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            404
          </motion.h1>
          
          <motion.div
            className="text-center mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{CONTENT.title}</h2>
            <p className="text-xl text-gray-600 mb-4">{CONTENT.subtitle}</p>
            <p className="text-gray-500 max-w-lg mx-auto">{CONTENT.description}</p>
          </motion.div>
        </motion.div>
        
        {/* Animated Astronaut Illustration */}
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7, type: 'spring' }}
        >
          <div className="w-64 h-64 relative">
            {/* This is where you would normally put an SVG illustration */}
            {/* For this example, let's create a simple animated 404 graphic */}
            <div className="relative h-full w-full">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#0066CC] to-[#004d99] opacity-10 rounded-full"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4
                }}
              />
              
              <motion.div 
                className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5
                }}
              >
                <div className="w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0066CC] text-7xl font-bold">
                  404
                </div>
              </motion.div>
              
              {/* Orbiting circles */}
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-[#FFAD03] to-[#FD9148]"
                  style={{
                    top: '50%',
                    left: '50%',
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  animate={{
                    x: Math.cos(i * (Math.PI * 2 / 3)) * 90,
                    y: Math.sin(i * (Math.PI * 2 / 3)) * 90,
                    rotate: 360
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 1.5
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Navigation Links */}
        <motion.div 
          className="flex flex-col space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={handleGoBack}
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-semibold shadow-sm transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft className="mr-2" />
              {CONTENT.buttons.previous}
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/" 
                className="flex items-center px-6 py-3 bg-gradient-to-r from-[#0066CC] to-[#004d99] hover:from-[#004d99] hover:to-[#0066CC] rounded-full text-white font-semibold shadow-md transition-all"
              >
                <FaHome className="mr-2" />
                {CONTENT.buttons.home}
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/search" 
                className="flex items-center px-6 py-3 bg-gradient-to-r from-[#FFAD03] to-[#FD9148] hover:from-[#FD9148] hover:to-[#FFAD03] rounded-full text-white font-semibold shadow-md transition-all"
              >
                <FaSearch className="mr-2" />
                {CONTENT.buttons.search}
              </Link>
            </motion.div>
          </div>
          
          {/* Suggested links */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-4">{CONTENT.suggestions.title}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {CONTENT.suggestions.links.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={link.to} 
                    className="inline-block px-4 py-2 bg-white border border-gray-200 rounded-lg text-[#0066CC] hover:text-[#FFAD03] hover:border-[#FFAD03] font-medium shadow-sm transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Footer note */}
        <motion.div 
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          If you believe this is an error, please <Link to="/contact" className="text-[#0066CC] hover:text-[#FFAD03] underline">contact our support team</Link>.
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;