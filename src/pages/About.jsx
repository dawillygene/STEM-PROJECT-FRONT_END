import { useState, useEffect, useMemo } from 'react';
import { motion } from "framer-motion";
import aboutService from '../services/aboutService';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import AboutSearch from '../components/Search/AboutSearch';

/**
 * About page component with dynamic API integration
 * 
 * @author Elia William Mariki (@dawillygene)
 */
const About = () => {
  // State management for API data
  const [aboutData, setAboutData] = useState(null);
  const [backgroundData, setBackgroundData] = useState(null);
  const [justificationData, setJustificationData] = useState(null);
  const [objectivesData, setObjectivesData] = useState(null);
  const [stemBenefits, setStemBenefits] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search state management
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchAboutData();
  }, []);

  /**
   * Fetch all about page data from API - Dynamic content only
   */
  const fetchAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all about data in parallel for better performance
      const [aboutResponse, backgroundResponse, justificationResponse, objectivesResponse, benefitsResponse] = await Promise.allSettled([
        aboutService.getAboutContent(),
        aboutService.getBackgroundContent(),
        aboutService.getJustificationContent(),
        aboutService.getObjectivesContent(),
        aboutService.getStemBenefits()
      ]);

      // Handle successful responses - only set data if API call succeeds
      if (aboutResponse.status === 'fulfilled' && aboutResponse.value.success) {
        setAboutData(aboutResponse.value.data);
      }
      
      if (backgroundResponse.status === 'fulfilled' && backgroundResponse.value.success) {
        setBackgroundData(backgroundResponse.value.data);
      }
      
      if (justificationResponse.status === 'fulfilled' && justificationResponse.value.success) {
        setJustificationData(justificationResponse.value.data);
      }
      
      if (objectivesResponse.status === 'fulfilled' && objectivesResponse.value.success) {
        setObjectivesData(objectivesResponse.value.data);
      }
      
      if (benefitsResponse.status === 'fulfilled' && benefitsResponse.value.success) {
        const benefitsData = benefitsResponse.value.data;
        // Ensure benefits is always an array
        const benefits = Array.isArray(benefitsData) ? benefitsData : 
                        benefitsData?.benefits ? benefitsData.benefits : 
                        [];
        setStemBenefits(benefits);
      }

      // No fallback data - only dynamic content
      
    } catch (err) {
      console.error('Error fetching about data:', err);
      setError('Failed to load about page content. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retry loading data
   */
  const handleRetry = () => {
    fetchAboutData();
  };

  /**
   * Generate searchable content from all data
   */
  const searchableContent = useMemo(() => {
    const content = [];

    // Add overview
    if (aboutData?.overview) {
      content.push({
        id: 'overview-section',
        title: 'Project Overview',
        content: aboutData.overview,
        section: 'Overview',
        category: 'overview'
      });
    }

    // Add background information
    if (backgroundData) {
      content.push({
        id: 'background-section',
        title: 'Project Background',
        content: backgroundData.description || backgroundData.sections?.[0]?.content || '',
        section: 'Background',
        category: 'background'
      });
    }

    // Add justification
    if (justificationData) {
      content.push({
        id: 'justification-section',
        title: 'Project Justification',
        content: justificationData.content || justificationData.description || '',
        section: 'Justification',
        category: 'justification'
      });
    }

    // Add objectives
    if (objectivesData) {
      content.push({
        id: 'objectives-section',
        title: 'Project Objectives',
        content: objectivesData.general || '',
        section: 'Objectives',
        category: 'objectives'
      });

      // Add specific objectives
      objectivesData.specific?.forEach(objective => {
        content.push({
          id: `objective-${objective.id}`,
          title: objective.title,
          content: objective.description,
          section: 'Specific Objectives',
          category: 'objectives'
        });
      });
    }

    // Add STEM benefits
    stemBenefits.forEach(benefit => {
      const benefitText = typeof benefit === 'string' 
        ? benefit 
        : benefit.benefit || benefit.description || benefit.title || 'Benefit content';
      
      content.push({
        id: `benefit-${benefit.id || Math.random()}`,
        title: 'STEM Benefit',
        content: benefitText,
        section: 'STEM Benefits',
        category: 'stem-benefits'
      });
    });

    // Add statistics
    if (statistics) {
      Object.entries(statistics).forEach(([key, value]) => {
        if (typeof value === 'object' && value.value) {
          content.push({
            id: `stat-${key}`,
            title: value.label || key,
            content: `${value.value} ${value.description || ''}`,
            section: 'Statistics',
            category: 'statistics'
          });
        }
      });
    }

    return content;
  }, [aboutData, backgroundData, justificationData, objectivesData, stemBenefits, statistics]);

  /**
   * Handle content export
   */
  const handleExportContent = async (format = 'json') => {
    try {
      setIsExporting(true);
      
      const exportData = await aboutService.exportContent(format, {
        sections: ['overview', 'background', 'benefits', 'justification', 'objectives'],
        includeMetadata: true
      });
      
      if (format === 'json') {
        // For JSON, create a download link
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `about-content-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // For other formats, handle as blob
        const url = URL.createObjectURL(exportData);
        const a = document.createElement('a');
        a.href = url;
        a.download = `about-content-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting content:', error);
      alert('Failed to export content. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  /**
   * Handle search results from backend API
   */
  const handleSearchResults = async (results) => {
    if (results.length === 0) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }
    
    setSearchResults(results);
    setIsSearchActive(results.length > 0);
  };

  /**
   * Handle search term change and fetch results from API
   */
  const handleSearchChange = async (term) => {
    setSearchTerm(term);
    
    if (term.length === 0) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }
    
    if (term.length < 3) {
      // Don't search for very short terms
      setIsSearchActive(false);
      return;
    }
    
    try {
      // Use backend search API
      const response = await aboutService.searchContent(term, {
        sections: ['overview', 'background', 'benefits', 'justification', 'objectives'],
        includeMetadata: true,
        limit: 10
      });
      
      if (response.success && response.data.results) {
        setSearchResults(response.data.results);
        setIsSearchActive(response.data.results.length > 0);
      } else {
        setSearchResults([]);
        setIsSearchActive(false);
      }
    } catch (error) {
      console.error('Error searching content:', error);
      // Fallback to local search if backend search fails
      setSearchResults([]);
      setIsSearchActive(false);
    }
  };

  /**
   * Filter content based on search results
   */
  const shouldShowSection = (sectionId) => {
    if (!isSearchActive) return true;
    return searchResults.some(result => 
      result.id === sectionId || 
      result.id.startsWith(sectionId.replace('-section', ''))
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Loading */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse mb-12 max-w-md"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse mr-2 mt-1"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Justification Loading */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse mb-12 max-w-md"></div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Objectives Loading */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse mb-12 max-w-md"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 max-w-xs"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-200">
                    <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-2xl text-red-500"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Content</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <i className="fas fa-redo mr-2"></i>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search Component - Inline at the top */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1">
              <AboutSearch 
                searchableContent={searchableContent}
                onSearchChange={handleSearchChange}
                onSearchResults={handleSearchResults}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleExportContent('json')}
                disabled={isExporting}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <i className="fas fa-download"></i>
                {isExporting ? 'Exporting...' : 'Export JSON'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Overview Section - Dynamic Content Only */}
          {aboutData?.overview ? (
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-primary mb-6">About Our Project</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-600 mb-8">
                  {typeof aboutData.overview === 'string' ? aboutData.overview : 'Overview content will be loaded from API'}
                </p>
                {/* Feature highlights will be loaded from API if available */}
                {aboutData.highlights && aboutData.highlights.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {aboutData.highlights.map((highlight, index) => (
                      <div key={highlight.id || index} className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className={`${highlight.icon || 'fas fa-info-circle'} text-primary text-2xl`}></i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{highlight.title}</h3>
                        <p className="text-gray-600">{highlight.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="text-center mb-16 p-8 bg-gray-50 rounded-lg">
              <i className="fas fa-info-circle text-gray-400 text-4xl mb-4"></i>
              <p className="text-gray-600">Project overview will be loaded from the backend API.</p>
            </div>
          )}

          {/* Background Section - Dynamic Content Only */}
          {backgroundData ? (
            <>
              <motion.h2 
                className="text-3xl font-bold text-primary mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {backgroundData.title || "Background Information"}
              </motion.h2>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="bg-gray-50 p-8 rounded-lg shadow-lg"
                  variants={itemVariants}
                >
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    {backgroundData.sections?.[0]?.title || "Background Information"}
                  </h3>
                  <div className="text-gray-700">
                    {backgroundData.sections?.[0]?.content ? (
                      <div dangerouslySetInnerHTML={{ __html: String(backgroundData.sections[0].content) }} />
                    ) : backgroundData.content ? (
                      <div dangerouslySetInnerHTML={{ __html: String(backgroundData.content) }} />
                    ) : (
                      <div className="text-center py-8">
                        <i className="fas fa-info-circle text-gray-400 text-2xl mb-2"></i>
                        <p className="text-gray-500">Background content will be loaded from API</p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Benefits Section - Dynamic Content Only */}
                <motion.div 
                  className="bg-gray-50 p-8 rounded-lg shadow-lg"
                  variants={itemVariants}
                >
                  <h3 className="text-2xl font-semibold text-primary mb-4">STEM Education Benefits</h3>
                  {stemBenefits && stemBenefits.length > 0 ? (
                    <ul className="text-gray-700 space-y-3">
                      {stemBenefits.map((benefit, index) => (
                        <motion.li 
                          key={benefit.id || index}
                          className="flex items-start"
                          variants={itemVariants}
                        >
                          <span className="text-tertiary mr-2">
                            <i className="fas fa-check-circle mt-1"></i>
                          </span>
                          <span>
                            {typeof benefit === 'string' 
                              ? benefit 
                              : benefit.benefit || benefit.description || benefit.title || 'Benefit content'}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-8">
                      <i className="fas fa-info-circle text-gray-400 text-2xl mb-2"></i>
                      <p className="text-gray-500">Benefits will be loaded from API</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </>
          ) : (
            <div className="text-center mb-16 p-8 bg-gray-50 rounded-lg">
              <i className="fas fa-info-circle text-gray-400 text-4xl mb-4"></i>
              <p className="text-gray-600">Background information will be loaded from the backend API.</p>
            </div>
          )}

          {/* Statistics Section - New Dynamic Content */}
          {statistics && (
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold text-primary mb-8 text-center">Project Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statistics.targets && Object.entries(statistics.targets).map(([key, value], index) => (
                  <motion.div 
                    key={key}
                    className="bg-white p-6 rounded-lg shadow-lg text-center border-l-4 border-secondary"
                    variants={itemVariants}
                    custom={index}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                    <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Justification Section - Dynamic Content Only */}
          {justificationData ? (
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl font-bold text-primary mb-12">
                {justificationData.title || "Justification of the Project"}
              </h2>
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <div className="text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: String(justificationData.content || '') }} />
                </div>
                
                {/* References Section */}
                {justificationData.references && justificationData.references.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">References</h4>
                    <ul className="space-y-2">
                      {justificationData.references.map((ref, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {ref.author} ({ref.year}). {ref.title}. 
                          {ref.journal && <em> {ref.journal}</em>}
                          {ref.type && <span> - {ref.type}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="mt-16 text-center p-8 bg-gray-50 rounded-lg">
              <i className="fas fa-info-circle text-gray-400 text-4xl mb-4"></i>
              <p className="text-gray-600">Project justification will be loaded from the backend API.</p>
            </div>
          )}
        </div>
      </section>

      {/* Objectives Section - Dynamic Content Only */}
      {objectivesData ? (
        <section id="objectives" className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-primary mb-12"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {objectivesData.title || "Project Objectives"}
            </motion.h2>

            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-gray-700 mb-6">
                <div dangerouslySetInnerHTML={{ __html: String(objectivesData.general || '') }} />
              </div>

              {objectivesData.specific && objectivesData.specific.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-primary mb-4">Specific Objectives:</h3>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {objectivesData.specific.map((obj, index) => (
                      <motion.div 
                        key={obj.id || index}
                        className="bg-gray-50 p-6 rounded-lg border-l-4 border-secondary hover:shadow-md transition-shadow"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className="font-semibold text-tertiary mb-2">{obj.title}</h4>
                        <p className="text-gray-700 mb-3">{obj.description}</p>
                        
                        {/* Target Metrics */}
                        {obj.targetMetrics && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h5 className="text-sm font-semibold text-gray-600 mb-2">Target Metrics:</h5>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(obj.targetMetrics).map(([key, value]) => (
                                <span 
                                  key={key}
                                  className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                                >
                                  {value} {key}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <i className="fas fa-info-circle text-gray-400 text-4xl mb-4"></i>
              <p className="text-gray-600">Project objectives will be loaded from the backend API.</p>
            </div>
          </div>
        </section>
      )}
      {/* Search Results Display */}
      {isSearchActive && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-primary mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Search Results {searchResults.length > 0 && `(${searchResults.length})`}
            </motion.h2>

            {searchResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No results found for "<span className="font-semibold">{searchTerm}</span>". Please try again with different keywords.
                </p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {searchResults.map((result, index) => (
                  <motion.div 
                    key={result.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                    variants={itemVariants}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h4 className="text-xl font-semibold text-primary mb-3">{result.title}</h4>
                    <div className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: String(result.content || '') }} />
                    <div className="text-sm text-blue-600">{result.section}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default About;