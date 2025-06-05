import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import galleryService from '../../services/galleryService';

const GallerySearch = ({ onSearchResults, onTagFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [popularTags, setPopularTags] = useState([]);
  const searchRef = useRef(null);

  // Mock popular tags (you can replace with API call)
  useEffect(() => {
    setPopularTags([
      'experiment', 'physics', 'coding', 'robots', 'mathematics', 
      'chemistry', 'biology', 'technology', 'education', 'research'
    ]);
  }, []);

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      // Try to search using API (you could implement a search endpoint)
      // For now, we'll simulate search by filtering all gallery items
      const allItems = await galleryService.getAllGalleryItems();
      const filtered = allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags?.some(tag => 
          (typeof tag === 'string' ? tag : tag.name).toLowerCase().includes(query.toLowerCase())
        )
      );
      
      setSearchResults(filtered.slice(0, 6)); // Limit to 6 results
      setShowResults(true);
      onSearchResults(filtered);
    } catch (error) {
      console.warn('Search failed, using fallback:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    onTagFilter(tag);
    setShowResults(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    onSearchResults([]);
  };

  return (
    <div className="mb-8" ref={searchRef}>
      {/* Search Input */}
      <div className="relative max-w-md mx-auto mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search gallery items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
            className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {isSearching ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <i className="fas fa-spinner text-gray-400"></i>
              </motion.div>
            ) : (
              <i className="fas fa-search text-gray-400"></i>
            )}
          </div>

          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && searchResults.length > 0 && (
          <motion.div
            className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 border-b">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              {searchResults.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
                  onClick={() => {
                    onSearchResults([item]);
                    setShowResults(false);
                  }}
                  whileHover={{ x: 5 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tags?.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                        >
                          {typeof tag === 'string' ? tag : tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {showResults && searchQuery && searchResults.length === 0 && !isSearching && (
          <motion.div
            className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-4 text-center text-gray-500">
              <i className="fas fa-search text-2xl mb-2"></i>
              <p>No results found for "{searchQuery}"</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Popular Tags */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-3">Popular tags:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularTags.slice(0, 8).map((tag, index) => (
            <motion.button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-primary hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySearch;