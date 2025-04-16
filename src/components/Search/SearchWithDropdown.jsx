import { useState, useEffect, useRef } from 'react';

const SearchWithDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  
 
  const CONTENT = {
    header: {
      searchPlaceholder: "Search articles, publications...",
    },
    searchResults: [
      { title: "STEM Curriculum Update", description: "Latest changes in secondary school curriculum" },
      { title: "Teacher Training Program", description: "2023 workshop schedule and materials" },
      { title: "Lab Equipment Guide", description: "New laboratory setup recommendations" }
    ]
  };


  const filteredResults = CONTENT.searchResults.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      // Handle selection here
      console.log('Selected:', filteredResults[selectedIndex]);
      setIsOpen(false);
    }
  };

  return (
    <div className="search-container mb-6 relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          placeholder={CONTENT.header.searchPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />
        <button 
          className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>

      {isOpen && (
        <div 
          className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
          role="listbox"
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <div
                key={index}
                className={`py-2 px-4 hover:bg-blue-50 cursor-pointer transition-colors ${
                  index === selectedIndex ? 'bg-blue-50' : ''
                }`}
                onClick={() => {
                  // Handle selection here
                  console.log('Selected:', result);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <h4 className="font-medium text-gray-800">{result.title}</h4>
                <p className="text-sm text-gray-600">{result.description}</p>
              </div>
            ))
          ) : (
            <div className="py-2 px-4 text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithDropdown;