import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/img/logo.png';
import {
  FaEnvelope,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaBook,
  FaFlask,
  FaNewspaper,
  FaHandshake,
  FaCalendarAlt,
  FaChevronRight
} from 'react-icons/fa';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Text content constants
  const CONTENT = {
    university: {
      name: "STEM EDUCATION",
      shortName: "STEM EDU",
      description: "Enhancing Mathematics and Science Education in Secondary Schools in Tanzania - A partnership program with MoEST sponsored by UNICEF."
    },
    quickLinks: {
      title: "Quick Links",
      links: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/objectives", label: "Objectives" },
        { to: "/activities", label: "Activities" },
        { to: "/team", label: "Team" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { to: "/blog", label: "Publications", icon: <FaBook /> },
        { to: "/research", label: "Research", icon: <FaFlask /> },
        { to: "/gallery", label: "Media", icon: <FaNewspaper /> },
        { to: "/partners", label: "Partners", icon: <FaHandshake /> },
        { to: "/events", label: "Events", icon: <FaCalendarAlt /> }
      ]
    },
    newsletter: {
      title: "Newsletter",
      description: "Subscribe to our newsletter for updates on our program activities.",
      placeholder: "Your email",
      buttonText: "Subscribe",
      successMessage: "Thank you for subscribing!"
    },
    contact: {
      title: "Contact Us",
      address: "P.O. Box 259, Dodoma, Tanzania",
      phone: "+255 753 225 961",
      email: "info@stemdodoma.edu"
    },
    legal: {
      copyright: "© {year} STEM EDUCATION. All rights reserved.",
      links: [
        { to: "/privacy-policy", label: "Privacy Policy" },
        { to: "/terms-of-service", label: "Terms of Service" },
        { to: "/sitemap", label: "Sitemap" }
      ]
    }
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <footer className="relative">
      {/* Top curved effect */}
      <div className="absolute top-0 left-0 right-0 h-6 overflow-hidden">
        <div className="w-full h-12 rounded-b-[100%] bg-white"></div>
      </div>

      {/* Main footer content with gradient background */}
      <div
        className="pt-12 pb-8 text-white"
        style={{
          background: 'linear-gradient(135deg, #0066CC 0%, #004d99 100%)',
          boxShadow: 'inset 0 4px 30px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* University Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-14 h-14 rounded-full mr-4 flex items-center justify-center relative group"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: 'linear-gradient(135deg, #FFAD03 0%, #FD9148 100%)',
                    boxShadow: '0 4px 15px rgba(255, 173, 3, 0.3)'
                  }}
                >
                  <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={Logo}
                      alt={CONTENT.university.shortName}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                </motion.div>
                <div className="text-xl font-bold">{CONTENT.university.name}</div>
              </div>
              <p className="text-white text-opacity-80 leading-relaxed mb-6">
                {CONTENT.university.description}
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-6">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <Icon className="text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-6 relative inline-block">
                {CONTENT.quickLinks.title}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#FFAD03] to-[#FD9148] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                ></motion.span>
              </h3>
              <ul className="space-y-3">
                {CONTENT.quickLinks.links.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to={link.to}
                      className="text-white text-opacity-80 hover:text-opacity-100 flex items-center transition-colors group"
                    >
                      <motion.span
                        className="mr-2 opacity-0 group-hover:opacity-100"
                        initial={{ x: -5 }}
                        animate={{ x: 0 }}
                      >
                        <FaChevronRight className="text-[#FFAD03]" size={12} />
                      </motion.span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-6 relative inline-block">
                {CONTENT.resources.title}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#FFAD03] to-[#FD9148] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                ></motion.span>
              </h3>
              <ul className="space-y-3">
                {CONTENT.resources.links.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <a
                      href={link.to}
                      className="text-white text-opacity-80 hover:text-opacity-100 flex items-center transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center mr-3">
                        {link.icon}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Contact Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-6 relative inline-block">
                {CONTENT.newsletter.title}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#FFAD03] to-[#FD9148] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                ></motion.span>
              </h3>
              <p className="text-white text-opacity-80 mb-4">
                {CONTENT.newsletter.description}
              </p>
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={CONTENT.newsletter.placeholder}
                    className="px-4 py-3 w-full rounded-l-lg border-y border-l border-white border-opacity-20 bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-[#FFAD03] focus:border-transparent"
                  />
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-[#FFAD03] to-[#FD9148] px-4 py-3 rounded-r-lg hover:from-[#FD9148] hover:to-[#FFAD03] transition-all text-white focus:outline-none focus:ring-2 focus:ring-[#FFAD03] focus:ring-offset-2 focus:ring-offset-[#0066CC]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubscribed ? (
                      <FaEnvelope />
                    ) : (
                      <FaPaperPlane />
                    )}
                  </motion.button>
                </div>
                {isSubscribed && (
                  <motion.p
                    className="text-[#FFAD03] mt-2 text-sm font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {CONTENT.newsletter.successMessage}
                  </motion.p>
                )}
              </form>

              {/* Contact Information */}
              <h3 className="text-xl font-semibold mb-5 relative inline-block">
                {CONTENT.contact.title}
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#FFAD03] to-[#FD9148] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                ></motion.span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center mr-3 mt-0.5">
                    <FaMapMarkerAlt className="text-[#FFAD03]" />
                  </div>
                  <p className="text-white text-opacity-80">{CONTENT.contact.address}</p>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center mr-3">
                    <FaPhoneAlt className="text-[#FFAD03]" />
                  </div>
                  <a
                    href={`tel:${CONTENT.contact.phone}`}
                    className="text-white text-opacity-80 hover:text-[#FFAD03] transition-colors"
                  >
                    {CONTENT.contact.phone}
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center mr-3">
                    <FaEnvelope className="text-[#FFAD03]" />
                  </div>
                  <a
                    href={`mailto:${CONTENT.contact.email}`}
                    className="text-white text-opacity-80 hover:text-[#FFAD03] transition-colors"
                  >
                    {CONTENT.contact.email}
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Divider with gradient */}
          <div className="mt-12 mb-8 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-opacity-70 text-center md:text-left">
              {CONTENT.legal.copyright.replace('{year}', currentYear)}
            </p>
            <div className="mt-6 md:mt-0 flex flex-wrap justify-center">
              {CONTENT.legal.links.map((link, index) => (
                <React.Fragment key={index}>
                  <a
                    href={link.to}
                    className="text-white text-opacity-70 hover:text-[#FFAD03] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                  {index < CONTENT.legal.links.length - 1 && (
                    <span className="mx-3 text-white text-opacity-30">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div
        className="h-8 w-full bg-[#0066CC]"
        style={{
          maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1200 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' opacity=\'.25\'%3E%3C/path%3E%3Cpath d=\'M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z\' opacity=\'.5\'%3E%3C/path%3E%3Cpath d=\'M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z\'%3E%3C/path%3E%3C/svg%3E")',
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: 'bottom'
        }}
      ></div>
    </footer>
  );
};

export default Footer;