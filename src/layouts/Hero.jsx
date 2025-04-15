import React, { useEffect } from 'react';
import hero_img from '../assets/img/hero.png';
import { motion } from 'framer-motion';


const Hero = () => {
  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <>
      <section id="home" className="py-20 bg-gradient-to-r from-[#0066CC] to-[#FD9148] text-white overflow-hidden relative">
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#FFAD03]/30 blur-3xl"></div>
        </motion.div>

        <div className="w-full px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left content - Text and buttons */}
            <motion.div 
              className="w-full md:w-1/2 mb-10 md:mb-0 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
               <motion.h1
    className="text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    Enhancing Mathematics and <br />
    Science Education in Secondary <br />
    Schools in Tanzania
  </motion.h1>
              
              <motion.p 
                className="text-xl mb-8 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by The United Nations Children's Fund (UNICEF)
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a 
                  href="#about" 
                  className="px-6 py-3 rounded-lg font-semibold text-center bg-[#FFAD03] hover:bg-[#FFAD03]/90 transition-all text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="px-6 py-3 rounded-lg font-semibold text-center bg-white text-[#0066CC] hover:bg-gray-100 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right content - Search form with image behind it */}
            <motion.div 
              className="w-full md:w-1/2 flex justify-center items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-md">
                {/* Image positioned behind the search form */}
                <motion.div 
                  className="absolute inset-0 rounded-xl overflow-hidden z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1.2 }}
                >
                  <img 
                    src={hero_img} 
                    alt="University of Dodoma" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0066CC]/70 to-[#FD9148]/70"></div>
                </motion.div>
                
                {/* Search form with glass morphism effect */}
                <motion.div 
                  className="relative p-6 rounded-xl backdrop-blur-md bg-black/30 border border-white/20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <form className="flex flex-col sm:flex-row gap-2 items-center">
                    <motion.input
                      type="text"
                      placeholder="Search for programs, resources, or events..."
                      className="w-full px-4 py-3 rounded-full border border-white/30 bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:border-white focus:bg-white/20"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-white text-[#0066CC] hover:bg-gray-100 transition-all font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Search
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated floating elements */}
        <motion.div 
          className="absolute bottom-5 left-1/4 w-6 h-6 rounded-full bg-[#FFAD03]"
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
          className="absolute top-10 right-1/4 w-4 h-4 rounded-full bg-white"
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
      </section>
    </>
  );
};

export default Hero;
