import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import aboutService from '../services/aboutService';

/**
 * Professional About Page Component - Redesigned with modern UI/UX
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

// Animation variants for smooth transitions
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

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

  // Loading state with modern spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin mx-auto" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Content</h3>
          <p className="text-gray-600">Fetching data from backend API...</p>
        </div>
      </div>
    );
  }

  // Error state with modern design
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-md w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-exclamation-triangle text-3xl text-red-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Unable to Load Content</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-redo mr-2"></i>
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section - Redesigned to match Home page */}
      <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-r from-[#0066CC] to-[#FD9148] text-white overflow-hidden relative">
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-20 sm:w-40 h-20 sm:h-40 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-30 sm:w-60 h-30 sm:h-60 rounded-full bg-[#FFAD03]/30 blur-3xl"></div>
        </motion.div>

        <div className="container mx-auto lg:mx-16 px-4 sm:px-6 lg:px-0 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="w-full md:w-2/3 lg:w-7/12 mb-10 md:mb-0 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-md font-inter max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                About Our <span className="text-[#FFAD03]">STEM</span> Initiative
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 font-inter max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Empowering the next generation through innovative Science, Technology, Engineering, and Mathematics education
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href="#background"
                  className="px-6 py-3 rounded-lg font-semibold text-center bg-[#FFAD03] hover:bg-[#FFAD03]/90 transition-all text-white w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full sm:w-4/5 md:w-1/2 lg:w-7/12 xl:w-6/12 flex justify-center md:justify-end items-center md:ml-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto md:mx-0">
                <motion.div
                  className="relative p-4 sm:p-6 rounded-xl backdrop-blur-md bg-black/30 border border-white/20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <i className="fas fa-graduation-cap text-3xl text-white"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">STEM Education</h3>
                    <p className="text-white/80 text-sm">
                      Building tomorrow's innovators through quality education
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute bottom-5 left-1/4 w-4 sm:w-6 h-4 sm:h-6 rounded-full bg-[#FFAD03] hidden sm:block"
              animate={{
                y: [0, -15, 0],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />

            <motion.div
              className="absolute top-10 right-1/4 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-white hidden sm:block"
              animate={{
                y: [0, 15, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
        </div>
      </section>

      {/* Background Section */}
      {aboutContent?.background && (
        <BackgroundSection background={aboutContent.background} />
      )}

      {/* Benefits Section */}
      {aboutContent?.benefits && aboutContent.benefits.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold text-primary mb-12 section-heading"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                    className="bg-white p-6 rounded-lg shadow-custom hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center mr-4">
                        <i className={`${benefit.icon || 'fas fa-star'} text-white text-lg`}></i>
                      </div>
                      <h3 className="text-lg font-semibold text-primary">
                        {benefit.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
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
              className="text-3xl font-bold text-primary mb-12 section-heading"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {aboutContent.justification.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-custom mb-8">
                <div 
                  className="text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: aboutContent.justification.content }}
                />
                
                {aboutContent.justification.conclusion && (
                  <div className="mt-8 pt-6 border-t border-gray-200 bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-primary mb-3">Conclusion</h4>
                    <div 
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: aboutContent.justification.conclusion }}
                    />
                  </div>
                )}
              </div>

              {/* References */}
              {aboutContent.justification.references && aboutContent.justification.references.length > 0 && (
                <div className="bg-white p-8 rounded-lg shadow-custom">
                  <h3 className="text-xl font-semibold text-primary mb-6">References</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aboutContent.justification.references
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((reference, index) => (
                        <div key={reference.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-1">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-gray-700 text-sm">
                              <strong className="text-primary">{reference.author}</strong> ({reference.publicationDate}). 
                              {reference.url ? (
                                <a 
                                  href={reference.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-secondary hover:text-tertiary ml-1 font-medium"
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
              className="text-3xl font-bold text-primary mb-12 section-heading"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {aboutContent.objectives.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-custom mb-8">
                <div 
                  className="text-lg text-gray-700 leading-relaxed mb-8"
                  dangerouslySetInnerHTML={{ __html: aboutContent.objectives.introduction }}
                />

                {/* Specific Objectives */}
                {aboutContent.objectives.specificObjectives && aboutContent.objectives.specificObjectives.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-primary mb-6">Specific Objectives</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {aboutContent.objectives.specificObjectives
                        .filter(obj => obj.isActive)
                        .sort((a, b) => a.displayOrder - b.displayOrder)
                        .map((objective, index) => (
                          <motion.div
                            key={objective.id}
                            className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          >
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                {index + 1}
                              </div>
                              <h4 className="font-semibold text-primary">
                                {objective.title}
                              </h4>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{objective.description}</p>
                          </motion.div>
                        ))}
                    </div>
                  </>
                )}

                {aboutContent.objectives.conclusion && (
                  <div className="pt-6 border-t border-gray-200 bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-primary mb-3">Conclusion</h4>
                    <div 
                      className="text-gray-700"
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
        <LastUpdatedSection lastUpdated={aboutContent.lastUpdated} />
      )}

      {/* No Content Message */}
      {!aboutContent && !loading && !error && (
        <NoContentSection />
      )}
    </div>
  );
};

// Background Section Component
const BackgroundSection = ({ background }) => (
  <section id="background" className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
            {background.title}
          </h2>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-custom border border-gray-100">
            <div 
              className="text-lg text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: background.mainContent }}
            />
          </div>
        </motion.div>

        {/* Background Sections */}
        {background.sections && background.sections.length > 0 && (
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {background.sections
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((section, index) => (
                <motion.div
                  key={section.id}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-lg shadow-custom hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {section.title}
                  </h3>
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </motion.div>
              ))}
          </motion.div>
        )}

        {/* Call to Action */}
        {background.ctaText && background.ctaLink && (
          <motion.div variants={fadeInUp} className="text-center">
            <a
              href={background.ctaLink}
              className="px-6 py-3 rounded-lg font-semibold text-center bg-[#FFAD03] hover:bg-[#FFAD03]/90 transition-all text-white inline-flex items-center gap-2"
            >
              {background.ctaText}
              <i className="fas fa-arrow-right"></i>
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  </section>
);

// Benefits Section Component
const BenefitsSection = ({ benefits }) => (
  <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-orange-50/30"></div>
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            STEM Education Benefits
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-tertiary mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover the transformative power of STEM education and its impact on future leaders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {benefits
            .filter(benefit => benefit.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((benefit, index) => (
              <motion.div
                key={benefit.id}
                variants={fadeInUp}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <div className="p-8 relative">
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${
                    index % 3 === 0 ? 'from-primary to-secondary' : 
                    index % 3 === 1 ? 'from-secondary to-tertiary' : 
                    'from-tertiary to-primary'
                  }`}></div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center mr-4">
                      <i className={`${benefit.icon || 'fas fa-star'} text-white text-lg`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-primary">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  </section>
);

// Justification Section Component
const JustificationSection = ({ justification }) => (
  <section className="py-20 bg-white relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent"></div>
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            {justification.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-tertiary mx-auto mb-8"></div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary"></div>
            <div 
              className="text-lg sm:text-xl text-gray-700 leading-relaxed pl-8"
              dangerouslySetInnerHTML={{ __html: justification.content }}
            />
            
            {justification.conclusion && (
              <div className="mt-12 pt-8 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl ml-8">
                <h4 className="text-2xl font-bold text-primary mb-4 flex items-center">
                  <i className="fas fa-lightbulb mr-3 text-secondary"></i>
                  Conclusion
                </h4>
                <div 
                  className="text-gray-700 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: justification.conclusion }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* References */}
        {justification.references && justification.references.length > 0 && (
          <motion.div variants={fadeInUp}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-secondary to-tertiary"></div>
              <h3 className="text-3xl font-bold text-primary mb-8 pl-8 flex items-center">
                <i className="fas fa-book-open mr-3 text-secondary"></i>
                References
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-8">
                {justification.references
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((reference, index) => (
                    <div key={reference.id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-tertiary text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700">
                            <strong className="text-primary text-lg">{reference.author}</strong>
                            <span className="text-gray-500 ml-2">({reference.publicationDate})</span>
                          </p>
                          <p className="mt-2">
                            {reference.url ? (
                              <a 
                                href={reference.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-secondary font-medium transition-colors duration-300 hover:underline"
                              >
                                {reference.title}
                              </a>
                            ) : (
                              <span className="text-gray-800 font-medium">{reference.title}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  </section>
);

// Objectives Section Component
const ObjectivesSection = ({ objectives }) => (
  <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-orange-50/20"></div>
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            {objectives.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-tertiary mx-auto mb-8"></div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-tertiary to-secondary"></div>
            <div 
              className="text-lg sm:text-xl text-gray-700 leading-relaxed pl-8 mb-12"
              dangerouslySetInnerHTML={{ __html: objectives.introduction }}
            />

            {/* Specific Objectives */}
            {objectives.specificObjectives && objectives.specificObjectives.length > 0 && (
              <div className="pl-8">
                <h3 className="text-3xl font-bold text-primary mb-8 flex items-center">
                  <i className="fas fa-target mr-3 text-tertiary"></i>
                  Specific Objectives
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {objectives.specificObjectives
                    .filter(obj => obj.isActive)
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((objective, index) => (
                      <motion.div
                        key={objective.id}
                        variants={fadeInUp}
                        className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-secondary to-tertiary text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                          </div>
                          <h4 className="text-xl font-bold text-primary group-hover:text-primary/90 transition-colors">
                            {objective.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed pl-16">{objective.description}</p>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {objectives.conclusion && (
              <div className="pt-8 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl ml-8">
                <h4 className="text-2xl font-bold text-primary mb-4 flex items-center">
                  <i className="fas fa-flag-checkered mr-3 text-tertiary"></i>
                  Conclusion
                </h4>
                <div 
                  className="text-gray-700 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: objectives.conclusion }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Last Updated Section Component
const LastUpdatedSection = ({ lastUpdated }) => (
  <section className="py-8 bg-white border-t border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 rounded-full border border-gray-200">
          <i className="fas fa-clock text-secondary"></i>
          <span className="text-sm font-medium text-gray-600">
            Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

// No Content Section Component
const NoContentSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 p-16 rounded-2xl shadow-xl border border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-secondary to-tertiary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <i className="fas fa-info-circle text-white text-4xl"></i>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">No Content Available</h3>
          <p className="text-xl text-gray-600 leading-relaxed">
            About content will be loaded from the backend API when available.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;