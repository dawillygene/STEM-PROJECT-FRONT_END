// components/Comments/CommentForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CommentForm = ({ postId, parentId, onSubmit, onCancel, isReply = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.content) {
      setError('All fields are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Call the provided submit handler
      if (onSubmit) {
        await onSubmit({
          postId,
          parentId,
          name: formData.name,
          email: formData.email,
          content: formData.content
        });
      }
      
      // Show success message
      setSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', content: '' });
        setSubmitted(false);
        
        // Close form if it's a reply
        if (isReply && onCancel) {
          onCancel();
        }
      }, 2000);
    } catch (error) {
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className={`bg-white ${!isReply ? 'p-6 rounded-xl shadow-md mb-8' : 'p-4 rounded-lg bg-gray-50'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {error && (
        <div className="bg-red-50 p-3 rounded mb-4 text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={isReply ? 3 : 4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-3">
          {isReply && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-gray-600 font-medium transition border border-gray-300"
            >
              Cancel
            </button>
          )}
          <motion.button
            type="submit"
            className="px-6 py-2 rounded-lg text-white font-medium transition"
            style={{ backgroundColor: "#0066CC" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {submitted ? (
              <span className="flex items-center">
                <i className="fas fa-check mr-2"></i> Posted!
              </span>
            ) : isSubmitting ? (
              <span>Posting...</span>
            ) : (
              <span>Post {isReply ? 'Reply' : 'Comment'}</span>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CommentForm;
