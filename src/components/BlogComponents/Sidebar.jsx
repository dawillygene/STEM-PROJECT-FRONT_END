import { motion } from "framer-motion";
import CONTENT from "../../constants/content";

const Sidebar = ({ 
  popularArticles, 
  subscribedState, 
  setSubscribedState, 
  formData, 
  setFormData, 
  handleSubscribe,
  isSubscribing 
}) => {
  return (
    <div className="lg:w-1/3 mt-12 lg:mt-0">
      <div className="sticky top-44">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md mb-8 newsletter-animation"
          style={{ background: "linear-gradient(135deg, #0066CC, #0052a3)" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4 text-white">{CONTENT.sidebar.newsletter.title}</h3>
          <p className="text-gray-100 mb-4">{CONTENT.sidebar.newsletter.description}</p>
          <form className="space-y-3">
            <div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={CONTENT.sidebar.newsletter.placeholder}
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Email for newsletter subscription"
                disabled={isSubscribing}
              />
            </div>
            <button
              onClick={handleSubscribe}
              type="submit"
              className="w-full py-2 rounded-lg font-medium transition relative"
              style={{ backgroundColor: "#FFAD03", color: "#333" }}
              disabled={isSubscribing}
            >
              {subscribedState ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-check mr-2"></i> {CONTENT.sidebar.newsletter.successText}
                </span>
              ) : isSubscribing ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center"
                >
                  <motion.svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </motion.svg>
                  Subscribing...
                </motion.span>
              ) : (
                <span>{CONTENT.sidebar.newsletter.buttonText}</span>
              )}
            </button>
          </form>
        </motion.div>

        {/* Rest of the sidebar remains unchanged */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: "#0066CC" }}>
            {CONTENT.sidebar.popularArticles.title}
          </h3>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                className="flex items-start related-post"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <img src={article.image} alt={article.alt} className="w-16 h-16 rounded-md object-cover mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800 hover:text-blue-600 transition">{article.title}</h4>
                  <p className="text-sm text-gray-500">{article.views}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4" style={{ color: "#0066CC" }}>
            {CONTENT.sidebar.tags.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {CONTENT.sidebar.tags.items.map((tag, index) => (
              <motion.a
                key={index}
                href="#"
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
                whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;