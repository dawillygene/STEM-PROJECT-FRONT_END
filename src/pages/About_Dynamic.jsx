import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import aboutService from '../services/aboutService';
import SkeletonLoader from '../components/Common/SkeletonLoader';

const About = () => {
  // State management
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

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

  // Fetch content on component mount
  useEffect(() => {
    fetchAboutContent();
  }, []);

  /**
   * Fetch all about page content from API
   */
  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await aboutService.getAboutContent({ published: true });
      
      if (response.success) {
        setAboutContent(response.data);
      } else {
        setError('Failed to load content');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retry fetching data with exponential backoff
   */
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Max 10 seconds
    
    setTimeout(() => {
      fetchAboutContent();
    }, delay);
  };

  /**
   * Render background sections
   */
  const renderBackgroundSections = (backgroundData) => {
    if (!backgroundData || !backgroundData.sections) return null;

    return backgroundData.sections
      .filter(section => section.is_published)
      .sort((a, b) => a.order - b.order)
      .map((section, index) => (
        <motion.div 
          key={section.id}
          className={`${section.background_color || 'bg-gray-50'} p-8 rounded-lg shadow-lg`}
          variants={itemVariants}
        >
          <h3 className="text-2xl font-semibold text-primary mb-4">{section.title}</h3>
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="text-gray-700 mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </motion.div>
      ));
  };

  /**
   * Render STEM benefits
   */
  const renderStemBenefits = (benefitsData) => {
    if (!benefitsData || !benefitsData.benefits) return null;

    return (
      <motion.div 
        className={`${benefitsData.background_color || 'bg-gray-50'} p-8 rounded-lg shadow-lg`}
        variants={itemVariants}
      >
        <h3 className="text-2xl font-semibold text-primary mb-4">{benefitsData.title}</h3>
        <ul className="text-gray-700 space-y-3">
          {benefitsData.benefits
            .filter(benefit => benefit.is_published)
            .sort((a, b) => a.order - b.order)
            .map((benefit) => (
              <motion.li 
                key={benefit.id}
                className="flex items-start"
                variants={itemVariants}
              >
                <span className="text-tertiary mr-2">
                  <i className={benefit.icon || 'fas fa-check-circle'}></i>
                </span>
                <span>{benefit.text}</span>
              </motion.li>
            ))}
        </ul>
      </motion.div>
    );
  };

  /**
   * Render justification section
   */
  const renderJustification = (justificationData) => {
    if (!justificationData) return null;

    return (
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl font-bold text-primary mb-12">{justificationData.title}</h2>
        <div className={`${justificationData.background_color || 'bg-gray-50'} p-8 rounded-lg shadow-lg`}>
          {justificationData.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
          
          {/* Render references if available */}
          {justificationData.references && justificationData.references.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-primary mb-3">References:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {justificationData.references
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((ref, index) => (
                    <li key={ref.id}>
                      {ref.author} ({ref.year}). {ref.title}. 
                      {ref.journal && <em> {ref.journal}</em>}
                      {ref.url && (
                        <a 
                          href={ref.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 ml-1"
                        >
                          [Link]
                        </a>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  /**
   * Render objectives section
   */
  const renderObjectives = (objectivesData) => {
    if (!objectivesData) return null;

    return (
      <section id="objectives" className={`py-16 ${objectivesData.section_color || 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-primary mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {objectivesData.title}
          </motion.h2>

          <motion.div 
            className={`${objectivesData.background_color || 'bg-white'} p-8 rounded-lg shadow-lg`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-gray-700 mb-6">
              {objectivesData.main_objective}
            </p>

            <h3 className="text-xl font-semibold text-primary mb-4">Specific Objectives:</h3>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {objectivesData.specific_objectives
                .filter(obj => obj.is_published)
                .sort((a, b) => a.order - b.order)
                .map((obj) => (
                  <motion.div 
                    key={obj.id}
                    className={`bg-gray-50 p-6 rounded-lg border-l-4 border-${obj.color || 'secondary'} hover:shadow-md transition-shadow`}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-2">
                      {obj.icon && (
                        <i className={`${obj.icon} text-${obj.color || 'tertiary'} mr-2`}></i>
                      )}
                      <h4 className={`font-semibold text-${obj.color === 'secondary' ? 'tertiary' : obj.color || 'tertiary'}`}>
                        {obj.title}
                      </h4>
                    </div>
                    <p className="text-gray-700">{obj.description}</p>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Background section skeleton */}
          <div className="mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <SkeletonLoader count={1} height={300} />
              <SkeletonLoader count={1} height={300} />
            </div>
          </div>
          
          {/* Justification section skeleton */}
          <div className="mt-16 mb-16">
            <div className="h-8 bg-gray-200 rounded w-80 mb-8 animate-pulse"></div>
            <SkeletonLoader count={1} height={400} />
          </div>
        </div>
        
        {/* Objectives section skeleton */}
        <div className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
            <div className="bg-white p-8 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonLoader count={2} height={120} />
                <SkeletonLoader count={2} height={120} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <i className="fas fa-exclamation-triangle text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Unable to Load Content</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-x-4">
              <button
                onClick={handleRetry}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Retrying...
                  </>
                ) : (
                  'Try Again'
                )}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Refresh Page
              </button>
            </div>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Retry attempt: {retryCount}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Main render
  if (!aboutContent) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <p className="text-gray-600">No content available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Background Information Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {aboutContent.background && (
            <>
              <motion.h2 
                className="text-3xl font-bold text-primary mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {aboutContent.background.title}
              </motion.h2>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {renderBackgroundSections(aboutContent.background)}
                {aboutContent.stem_benefits && renderStemBenefits(aboutContent.stem_benefits)}
              </motion.div>
            </>
          )}

          {/* Justification Section */}
          {aboutContent.justification && renderJustification(aboutContent.justification)}
        </div>
      </section>

      {/* Objectives Section */}
      {aboutContent.objectives && renderObjectives(aboutContent.objectives)}
    </>
  );
};

export default About;
