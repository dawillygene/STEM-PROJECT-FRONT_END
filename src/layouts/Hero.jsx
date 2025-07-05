import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hero_img from '../assets/img/hero.png';
import { motion } from 'framer-motion';
import { searchContent, executeSearch } from '../utils/searchUtils';

const Hero = ({ heroData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
    };
  }, []);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchMessage('');
    
    try {
      // Use the search utility to process the search
      const searchResult = searchContent(searchQuery);
      const result = executeSearch(searchResult, navigate);
      
      if (result.success) {
        setSearchMessage(result.message);
        // Clear the search input after successful search
        setTimeout(() => {
          setSearchQuery('');
          setSearchMessage('');
        }, 2000);
      } else {
        setSearchMessage(result.message);
        // Clear error message after 5 seconds
        setTimeout(() => {
          setSearchMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchMessage('Search functionality is temporarily unavailable. Please try again later.');
      setTimeout(() => {
        setSearchMessage('');
      }, 3000);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Use dynamic data if available, otherwise fall back to static content
  const title = heroData?.title || 'Enhancing Mathematics and Science Education in Secondary Schools in Tanzania';
  const subtitle = heroData?.subtitle || 'A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by The United Nations Children\'s Fund (UNICEF)';
  const description = heroData?.description || '';
  const ctaText = heroData?.cta_text || 'Learn More';
  const ctaLink = heroData?.cta_link || '/about';
  const searchPlaceholder = heroData?.search_placeholder || 'Search for programs...';
  const searchEnabled = heroData?.search_enabled !== false;
  // Always use static background image and gradient
  const backgroundImage = hero_img;
  const backgroundGradient = 'from-[#0066CC] to-[#FD9148]';

  return (
    <>
      <section className={`py-10 sm:py-16 md:py-20 bg-gradient-to-r ${backgroundGradient} text-white overflow-hidden relative`}>
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-20 sm:w-40 h-20 sm:h-40 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-30 sm:w-60 h-30 sm:h-60 rounded-full bg-[#FFAD03]/30 blur-3xl"></div>
        </motion.div>

        <div className="container mx-auto  lg:mx-16  px-4 sm:px-6 lg:px-0 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">

            <motion.div
              className="w-full md:w-2/3 lg:w-7/12 mb-10 md:mb-0 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-md font-inter max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 font-inter max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, x: 0, sm: { x: 20 }, md: { x: 50 } }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
              {description && (
                <motion.p
                  className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-white/80 font-inter max-w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {description}
                </motion.p>
              )}

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, x: 0, sm: { x: 20 }, md: { x: 50 } }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href={ctaLink}
                  className="px-6 py-3 rounded-lg font-semibold text-center bg-[#FFAD03] hover:bg-[#FFAD03]/90 transition-all text-white w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {ctaText}
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full sm:w-4/5 md:w-1/2 lg:w-7/12 xl:w-6/12 flex justify-center md:justify-end items-center md:ml-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto md:mx-0">
                <motion.div
                  className="absolute inset-0 rounded-xl overflow-hidden z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1.2 }}
                >
                  <img
                    src={backgroundImage}
                    alt="University of Dodoma"
                    className="w-full h-full object-cover object-left"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC]/70 to-[#FD9148]/70"></div>
                </motion.div>

                {searchEnabled && (
                  <motion.div
                    className="relative p-4 sm:p-6 rounded-xl backdrop-blur-md bg-black/30 border border-white/20"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 items-center sm:items-end w-full">
                      <motion.input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-white/30 bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:bg-white/20 text-sm sm:text-base"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.button
                        type="submit"
                        disabled={isSearching}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white text-[#0066CC] hover:bg-gray-100 transition-all font-semibold text-sm sm:text-base mt-2 sm:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: isSearching ? 1 : 1.05 }}
                        whileTap={{ scale: isSearching ? 1 : 0.98 }}
                      >
                        {isSearching ? 'Searching...' : 'Search'}
                      </motion.button>
                    </form>
                    
                    {/* Search Message */}
                    {searchMessage && (
                      <motion.div
                        className="mt-3 p-2 rounded-lg bg-white/10 border border-white/20"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white text-sm text-center">
                          {searchMessage}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-5 left-1/4 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-[#FFAD03] hidden sm:block"
              animate={{
                y: [0, -15, 0],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />

            <motion.div
              className="absolute top-10 right-1/4 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white hidden sm:block"
              animate={{
                y: [0, 15, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;