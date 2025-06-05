import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import galleryService from '../services/galleryService';
import GalleryModal from '../components/Gallery/GalleryModal';
import GallerySearch from '../components/Gallery/GallerySearch';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryData, setGalleryData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // Load gallery data and categories
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both gallery data and categories from API
        const [galleryData, categoriesData] = await Promise.all([
          galleryService.getAllGalleryItems(),
          galleryService.getCategories()
        ]);

        setGalleryData(galleryData || []);
        setFilteredItems(galleryData || []);
        setCategories([{ id: 'all', name: 'All' }, ...(categoriesData || [])]);

      } catch (err) {
        console.error('Error loading gallery data:', err);
        setError('Failed to load gallery data. Please check your connection and try again.');
        setGalleryData([]);
        setFilteredItems([]);
        setCategories([{ id: 'all', name: 'All' }]);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryData();
  }, []);

  // Handle category filter change
  const handleFilterChange = async (filterId) => {
    setActiveFilter(filterId);
    setSearchActive(false);
    
    try {
      if (filterId === 'all') {
        setFilteredItems(galleryData);
      } else {
        // Try to fetch category-specific data from API
        const categoryData = await galleryService.getGalleryItemsByCategory(filterId);
        if (categoryData && categoryData.length > 0) {
          setFilteredItems(categoryData);
        } else {
          // Fallback to local filtering if API doesn't return data
          const filtered = galleryData.filter(item => {
            const categoryId = typeof item.category === 'string' ? item.category : item.category?.id;
            return categoryId === filterId;
          });
          setFilteredItems(filtered);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch category-specific data, using local filtering:', err);
      // Fallback to local filtering
      const filtered = galleryData.filter(item => {
        const categoryId = typeof item.category === 'string' ? item.category : item.category?.id;
        return categoryId === filterId;
      });
      setFilteredItems(filtered);
    }
  };

  // Handle search results
  const handleSearchResults = (results) => {
    if (results.length > 0) {
      setFilteredItems(results);
      setActiveFilter('all');
      setSearchActive(true);
    } else {
      setFilteredItems(galleryData);
      setSearchActive(false);
    }
  };

  // Handle tag filter from search
  const handleTagFilter = async (tag) => {
    try {
      const tagResults = await galleryService.getGalleryItemsByTag(tag);
      setFilteredItems(tagResults);
      setActiveFilter('all');
      setSearchActive(true);
    } catch (err) {
      console.warn('Tag search API failed, using local search:', err);
      // Fallback to local filtering
      const tagFiltered = galleryData.filter(item =>
        item.tags?.some(itemTag =>
          (typeof itemTag === 'string' ? itemTag : itemTag.name)
            .toLowerCase().includes(tag.toLowerCase())
        )
      );
      setFilteredItems(tagFiltered);
      setSearchActive(true);
    }
  };

  // Handle view count increment and open modal
  const handleImageClick = async (item) => {
    try {
      await galleryService.incrementViewCount(item.id);
      // Update local state to reflect new view count
      const updatedItem = { ...item, viewCount: (item.viewCount || 0) + 1 };
      setGalleryData(prev => prev.map(prevItem => 
        prevItem.id === item.id ? updatedItem : prevItem
      ));
      setFilteredItems(prev => prev.map(prevItem => 
        prevItem.id === item.id ? updatedItem : prevItem
      ));
      setSelectedItem(updatedItem);
    } catch (err) {
      console.warn('Failed to increment view count:', err);
      setSelectedItem(item);
    }
    setIsModalOpen(true);
  };

  // Modal navigation
  const handleModalNext = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handleModalPrevious = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    setSelectedItem(filteredItems[prevIndex]);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <header className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </header>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-10 bg-gray-200 rounded-full w-24 animate-pulse"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-white py-8">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl font-bold text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Gallery
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore visual highlights from our STEM education enhancement programs
          </motion.p>
          <motion.div 
            className="flex items-center mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-tertiary">
              <i className="fas fa-home mr-2"></i>
            </span>
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary font-medium">Gallery</span>
          </motion.div>
        </div>
      </header>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {error && (
            <motion.div 
              className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="font-medium">Notice: {error}</p>
              <p className="text-sm">Displaying offline content.</p>
            </motion.div>
          )}

          {/* Search Component */}
          <GallerySearch 
            onSearchResults={handleSearchResults}
            onTagFilter={handleTagFilter}
          />

          {/* Results Info */}
          {searchActive && (
            <motion.div 
              className="mb-6 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-gray-600">
                Showing {filteredItems.length} search result{filteredItems.length !== 1 ? 's' : ''}
                <button 
                  onClick={() => {
                    setFilteredItems(galleryData);
                    setSearchActive(false);
                    setActiveFilter('all');
                  }}
                  className="ml-2 text-primary hover:underline"
                >
                  Clear search
                </button>
              </p>
            </motion.div>
          )}

          {/* Filters */}
          {!searchActive && (
            <motion.div 
              className="mb-8 flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  className={`px-4 py-2 rounded-full border font-medium transition-all ${
                    activeFilter === category.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
                  }`}
                  onClick={() => handleFilterChange(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </motion.div>
          )}

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredItems.map((item, index) => (
              <GalleryItem 
                key={item.id} 
                item={item} 
                index={index}
                onClick={() => handleImageClick(item)}
              />
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
              <p className="text-gray-500">
                {searchActive 
                  ? "Try adjusting your search terms or browse by category." 
                  : "Try selecting a different category or check back later."
                }
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={handleModalNext}
        onPrevious={handleModalPrevious}
      />
    </motion.div>
  );
};

const GalleryItem = ({ item, index, onClick }) => {
  const getTagColor = (tagName) => {
    switch(tagName) {
      case 'Campus Life': return '#0066CC';
      case 'STEM Education': return '#FD9148';
      case 'Laboratories': return '#FFAD03';
      case 'Teacher Training': return '#0066CC';
      case 'Community Engagement': return '#FD9148';
      case 'experiment': return '#9333EA';
      case 'physics': return '#EF4444';
      case 'coding': return '#10B981';
      case 'robots': return '#F59E0B';
      case 'chemistry': return '#8B5CF6';
      default: return '#0066CC';
    }
  };

  // Handle both old format (tags as strings) and new format (tags as objects)
  const tags = item.tags || [];
  const displayTags = tags.map(tag => 
    typeof tag === 'string' ? tag : tag.name
  );

  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* Featured badge */}
      {item.featured && (
        <div className="absolute top-4 left-4 bg-secondary text-white px-2 py-1 rounded-full text-xs font-medium z-10">
          Featured
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* View count overlay */}
        {item.viewCount > 0 && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
            <i className="fas fa-eye mr-1"></i>
            {item.viewCount}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <i className="fas fa-expand text-white text-2xl"></i>
          </motion.div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        {/* Author information */}
        {item.createdBy && (
          <div className="flex items-center mb-3 text-xs text-gray-500">
            <i className="fas fa-user mr-1"></i>
            {item.createdBy.name}
            {item.createdAt && (
              <>
                <span className="mx-2">•</span>
                {new Date(item.createdAt).toLocaleDateString()}
              </>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {displayTags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="text-xs text-white px-2 py-1 rounded-full"
              style={{ backgroundColor: getTagColor(tag) }}
            >
              {tag}
            </span>
          ))}
          {displayTags.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1 rounded-full bg-gray-100">
              +{displayTags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;