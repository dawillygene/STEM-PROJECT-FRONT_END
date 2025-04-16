import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.section 
      id="contact"
      className="py-16 bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-primary mb-12 section-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Contact Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg shadow-custom"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-6">Get in Touch</h3>
            <form>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    {['Full Name', 'Email Address', 'Subject', 'Message'][i]}
                  </label>
                  {i === 3 ? (
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <input
                      type={['text', 'email', 'text'][i]}
                      id={['name', 'email', 'subject'][i]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  )}
                </motion.div>
              ))}
              <motion.button
                type="submit"
                className="btn-primary px-6 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg shadow-custom"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-tertiary rounded-full flex items-center justify-center text-white">
                    <i className={`fas fa-${item.icon}`}></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-gray-700 mt-1">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h4 className="font-semibold text-gray-800 mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <i className={`fab fa-${social.icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Helper data arrays
const contactItems = [
  {
    icon: 'map-marker-alt',
    title: 'Address',
    content: 'The University of Dodoma\nP.O. Box 523, Dodoma, Tanzania'
  },
  {
    icon: 'phone',
    title: 'Phone',
    content: '+255 26 2310000'
  },
  {
    icon: 'envelope',
    title: 'Email',
    content: 'info@udom.ac.tz'
  },
  {
    icon: 'globe',
    title: 'Website',
    content: 'www.udom.ac.tz'
  }
];

const socialLinks = [
  { icon: 'facebook-f' },
  { icon: 'twitter' },
  { icon: 'instagram' },
  { icon: 'linkedin-in' }
];

export default Contact;