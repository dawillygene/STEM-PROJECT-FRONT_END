import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Search component for About page content
 * 
 * @author Elia William Mariki (@dawillygene)
 * @param {Object} props - Component props
 * @param {Array} props.searchableContent - Array of searchable content items
 * @param {Function} props.onSearchResults - Callback function for search results
 * @param {Function} props.onSearchChange - Callback function for search term change
 */
const AboutSearch = ({ searchableContent = [], onSearchResults, onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Search function
  const performSearch = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowResults(false);
      onSearchResults?.([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API search delay
    setTimeout(() => {
      const results = searchableContent.filter(item => {
        const searchableText = `${item.title} ${item.content} ${item.description || ''} ${item.category || ''}`.toLowerCase();
        return searchableText.includes(term.toLowerCase());
      });

      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
      onSearchResults?.(results);
    }, 300);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange?.(term);
    performSearch(term);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
    onSearchResults?.([]);
    onSearchChange?.('');
  };

  // Highlight search term in text
  const highlightText = (text, term) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 text-yellow-800 font-medium">
          {part}
        </span>
      ) : part
    );
  };

  // Get search result categories
  const getResultCategories = () => {
    const categories = {};
    searchResults.forEach(result => {
      const category = result.category || 'general';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(result);
    });
    return categories;
  };

  return (
    <div className="relative mb-8">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search about page content..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        )}
      </div>

      {/* Search Status */}
      {isSearching && (
        <div className="mt-2 text-sm text-gray-600">
          Searching...
        </div>
      )}

      {/* Search Results */}
      <AnimatePresence>
        {showResults && searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
          >
            {searchResults.length > 0 ? (
              <div className="p-4">
                <div className="mb-2 text-sm text-gray-600">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </div>
                
                {/* Results by Category */}
                {Object.entries(getResultCategories()).map(([category, results]) => (
                  <div key={category} className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                      {category.replace('-', ' ')}
                    </h4>
                    <div className="space-y-2">
                      {results.map((result, index) => (
                        <motion.div
                          key={`${category}-${index}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.1 }}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => {
                            // Scroll to section if it has an id
                            if (result.id) {
                              const element = document.getElementById(result.id);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                                setShowResults(false);
                              }
                            }
                          }}
                        >
                          <div className="font-medium text-gray-900 mb-1">
                            {highlightText(result.title, searchTerm)}
                          </div>
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {highlightText(result.content?.substring(0, 150) + '...', searchTerm)}
                          </div>
                          {result.section && (
                            <div className="text-xs text-blue-600 mt-1">
                              {result.section}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No results found for "{searchTerm}"</p>
                <p className="text-sm mt-1">Try different keywords or check spelling</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutSearch;
