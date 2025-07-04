import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import aboutService from '../services/aboutService';

/**
 * About page component - Display dynamic content from backend APIs
 * 
 * API Documentation: http://192.168.1.150:8000/api/about-content
 * GET /about-content → All content
 * GET /about-content/background → Background section
 * GET /about-content/benefits → Benefits array
 * GET /about-content/justification → Justification section
 * GET /about-content/objectives → Objectives section
 * GET /about-content/export?format=json → Export content
 * GET /about-content/search?q=STEM → Search content
 * 
 * @author Elia William Mariki (@dawillygene)
 * @date July 4, 2025
 */
const About = () => {
  // State management for API data
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchAboutContent();
  }, []);

  /**
   * Fetch complete about content from API
   */
  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch complete about content from API
      const response = await aboutService.getAboutContent();
      
      if (response.success) {
        setAboutContent(response.data);
      } else {
        setError('Failed to load about content from API');
      }
      
    } catch (err) {
      console.error('Error fetching about content:', err);
      setError('Failed to connect to the backend API. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retry loading data if API call fails
   */
  const handleRetry = () => {
    fetchAboutContent();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content from backend API...</p>
        </div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Background Section */}
      {aboutContent?.background && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-primary mb-6 text-center">
                {aboutContent.background.title}
              </h2>
              
              <div className="max-w-4xl mx-auto mb-12">
                <div 
                  className="text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: aboutContent.background.mainContent }}
                />
              </div>

              {/* Background Sections */}
              {aboutContent.background.sections && aboutContent.background.sections.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {aboutContent.background.sections
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((section, index) => (
                      <motion.div
                        key={section.id}
                        className="bg-gray-50 p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          {section.title}
                        </h3>
                        <div 
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </motion.div>
                    ))}
                </div>
              )}

              {/* Call to Action */}
              {aboutContent.background.ctaText && aboutContent.background.ctaLink && (
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <a
                    href={aboutContent.background.ctaLink}
                    className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    {aboutContent.background.ctaText}
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {aboutContent?.benefits && aboutContent.benefits.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold text-primary mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              STEM Education Benefits
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutContent.benefits
                .filter(benefit => benefit.isActive)
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <i className={`${benefit.icon} text-primary text-lg`}></i>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Justification Section */}
      {aboutContent?.justification && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold text-primary mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {aboutContent.justification.title}
            </motion.h2>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gray-50 p-8 rounded-lg shadow-md mb-8">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: aboutContent.justification.content }}
                />
                
                {aboutContent.justification.conclusion && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div 
                      className="text-gray-700 font-medium"
                      dangerouslySetInnerHTML={{ __html: aboutContent.justification.conclusion }}
                    />
                  </div>
                )}
              </div>

              {/* References */}
              {aboutContent.justification.references && aboutContent.justification.references.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-primary mb-4">References</h3>
                  <div className="space-y-3">
                    {aboutContent.justification.references
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((reference, index) => (
                        <div key={reference.id} className="flex items-start">
                          <span className="text-primary font-medium mr-3">[{index + 1}]</span>
                          <div>
                            <p className="text-gray-700">
                              <strong>{reference.author}</strong> ({reference.publicationDate}). 
                              {reference.url ? (
                                <a 
                                  href={reference.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline ml-1"
                                >
                                  {reference.title}
                                </a>
                              ) : (
                                <span className="ml-1">{reference.title}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Objectives Section */}
      {aboutContent?.objectives && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold text-primary mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {aboutContent.objectives.title}
            </motion.h2>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <div 
                  className="text-gray-700 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: aboutContent.objectives.introduction }}
                />

                {/* Specific Objectives */}
                {aboutContent.objectives.specificObjectives && aboutContent.objectives.specificObjectives.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-primary mb-6">Specific Objectives</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {aboutContent.objectives.specificObjectives
                        .filter(obj => obj.isActive)
                        .sort((a, b) => a.displayOrder - b.displayOrder)
                        .map((objective, index) => (
                          <motion.div
                            key={objective.id}
                            className="bg-gray-50 p-6 rounded-lg border-l-4 border-secondary"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          >
                            <h4 className="font-semibold text-tertiary mb-2">
                              {objective.title}
                            </h4>
                            <p className="text-gray-700">{objective.description}</p>
                          </motion.div>
                        ))}
                    </div>
                  </>
                )}

                {aboutContent.objectives.conclusion && (
                  <div className="pt-6 border-t border-gray-200">
                    <div 
                      className="text-gray-700 font-medium"
                      dangerouslySetInnerHTML={{ __html: aboutContent.objectives.conclusion }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Last Updated Info */}
      {aboutContent?.lastUpdated && (
        <section className="py-8 bg-white border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="text-center text-sm text-gray-500">
              <i className="fas fa-clock mr-2"></i>
              Last updated: {new Date(aboutContent.lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </section>
      )}

      {/* No Content Message */}
      {!aboutContent && !loading && !error && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="bg-gray-50 p-12 rounded-lg">
              <i className="fas fa-info-circle text-gray-400 text-6xl mb-6"></i>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Content Available</h3>
              <p className="text-gray-600">
                About content will be loaded from the backend API when available.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;