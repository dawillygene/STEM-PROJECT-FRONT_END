import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryModal = ({ item, isOpen, onClose, onNext, onPrevious }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-80"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-h-[70vh] object-contain"
              />
              
              {/* Featured badge */}
              {item.featured && (
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}

              {/* View count */}
              {item.viewCount > 0 && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  <i className="fas fa-eye mr-2"></i>
                  {item.viewCount} views
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-white px-2 py-1 rounded-full"
                    style={{ backgroundColor: getTagColor(typeof tag === 'string' ? tag : tag.name) }}
                  >
                    {typeof tag === 'string' ? tag : tag.name}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-primary mb-3">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>

              {/* Author and date info */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  {item.createdBy && (
                    <>
                      <i className="fas fa-user mr-2"></i>
                      <span>{item.createdBy.name}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center">
                  {item.createdAt && (
                    <>
                      <i className="fas fa-calendar mr-2"></i>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper function for tag colors
const getTagColor = (tagName) => {
  switch(tagName) {
    case 'Campus Life': return '#0066CC';
    case 'STEM Education': return '#FD9148';
    case 'Laboratories': return '#FFAD03';
    case 'Teacher Training': return '#0066CC';
    case 'Community Engagement': return '#FD9148';
    default: return '#0066CC';
  }
};

export default GalleryModal;