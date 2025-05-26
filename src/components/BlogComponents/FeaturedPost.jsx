import React from 'react';
import { motion } from 'framer-motion';

const FeaturedPost = ({ post }) => {

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg max-w-5xl mx-auto mb-16 blog-card hover:shadow-xl transition-shadow"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="md:flex">
        <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <img src={post.author.image} alt="Featured blog post" className="w-full h-full object-cover object-center" />
        </motion.div>
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <motion.div
              className="flex items-center mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-semibold mr-2"
                  style={{ backgroundColor: tag.color, color: tag.textColor }}
                >
                  {tag.label}
                </span>
              ))}
            </motion.div>
            <motion.h2
              className="text-2xl font-bold mb-3"
              style={{ color: "#0066CC" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {post.title}
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {post.excerpt}
            </motion.p>
          </div>
          <motion.div
            className="flex items-center justify-between mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center">
              <motion.div
                className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-gray-600 font-bold">{post.author.initials}</span>
              </motion.div>
              <div>
                <p className="font-medium text-gray-800">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.date} · {post.readTime}</p>
              </div>
            </div>
            <motion.button
              className="px-4 py-2 rounded-lg text-white font-medium transition"
              style={{ backgroundColor: post.button.color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {post.button.label}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedPost;