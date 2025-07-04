import { useState, useEffect, useMemo } from 'react';
import { motion } from "framer-motion";
import aboutService from '../services/aboutService';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import AboutSearch from '../components/Search/AboutSearch';
import ProjectTimeline from '../components/Timeline/ProjectTimeline';

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

  // Fetch data on component mount
  useEffect(() => {
    fetchAboutData();
  }, []);

  /**
   * Fetch all about page data from API
   */
  const fetchAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all about data in parallel for better performance
      const [aboutResponse, backgroundResponse, justificationResponse, objectivesResponse, stemBenefitsResponse, statisticsResponse] = await Promise.allSettled([
        aboutService.getAboutContent(),
        aboutService.getBackgroundInfo(),
        aboutService.getJustification(),
        aboutService.getObjectives(),
        aboutService.getStemBenefits(),
        aboutService.getStatistics()
      ]);

      // Handle successful responses
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
      
      if (stemBenefitsResponse.status === 'fulfilled' && stemBenefitsResponse.value.success) {
        setStemBenefits(stemBenefitsResponse.value.data.benefits || []);
      }
      
      if (statisticsResponse.status === 'fulfilled' && statisticsResponse.value.success) {
        setStatistics(statisticsResponse.value.data);
      }

      // Fallback to hardcoded data if API fails
      if (!aboutData && !backgroundData && !justificationData && !objectivesData) {
        setFallbackData();
      }
      
    } catch (err) {
      console.error('Error fetching about data:', err);
      setError('Failed to load about page content');
      setFallbackData();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Set fallback data when API fails
   */
  const setFallbackData = () => {
    // Fallback STEM benefits
    setStemBenefits([
      { id: 1, benefit: "Creates active, creative, critical, and communicative individuals", category: "personal-development", order: 1 },
      { id: 2, benefit: "Contributes to scientific and technological innovations and advancement", category: "innovation", order: 2 },
      { id: 3, benefit: "Enhances fight against diseases, food production, and environmental protection", category: "health-environment", order: 3 },
      { id: 4, benefit: "Drives industrial development and innovations", category: "industry", order: 4 },
      { id: 5, benefit: "Promotes tolerance, democracy, political awareness, and respect for dignity", category: "social", order: 5 },
      { id: 6, benefit: "Increases employment opportunities in the fastest-growing job categories", category: "employment", order: 6 }
    ]);

    // Fallback objectives
    setObjectivesData({
      title: "Project Objectives",
      general: "This project intends to strengthen the science related subjects in secondary schools by building capacity to science teachers on STEM related subjects to improve the quality of education that will enable the Tanzanian nation to have graduates who can survive in a competitive economy and labor market place of the 21st century.",
      specific: [
        { id: 1, title: "Teacher Training", description: "Training science teachers in secondary schools to enhance their capacity and teaching methodologies.", order: 1 },
        { id: 2, title: "Decision-Maker Involvement", description: "Training decision-makers to recognize the necessity of emphasizing science subjects in secondary education.", order: 2 },
        { id: 3, title: "Community Engagement", description: "Training local community members and parents to participate actively in the education of their children.", order: 3 },
        { id: 4, title: "Laboratory Enhancement", description: "Strengthening laboratory services for effective teaching and learning of science subjects.", order: 4 }
      ]
    });
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

    // Add background information
    if (backgroundData) {
      content.push({
        id: 'background-section',
        title: 'Project Background',
        content: backgroundData.description || '',
        section: 'Background',
        category: 'background'
      });
    }

    // Add justification
    if (justificationData) {
      content.push({
        id: 'justification-section',
        title: 'Project Justification',
        content: justificationData.description || '',
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
      content.push({
        id: `benefit-${benefit.id}`,
        title: 'STEM Benefit',
        content: benefit.benefit,
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
  }, [backgroundData, justificationData, objectivesData, stemBenefits, statistics]);

  /**
   * Handle search results
   */
  const handleSearchResults = (results) => {
    setSearchResults(results);
    setIsSearchActive(results.length > 0);
  };

  /**
   * Handle search term change
   */
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setIsSearchActive(term.length > 0);
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
          <AboutSearch 
            searchableContent={searchableContent}
            onSearchChange={handleSearchChange}
            onSearchResults={handleSearchResults}
          />
        </div>
      </section>

      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-primary mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {backgroundData?.title || "Background Information"}
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
                {backgroundData?.sections?.[0]?.title || "The Importance of Science Education"}
              </h3>
              <div className="text-gray-700">
                {backgroundData?.sections?.[0]?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: backgroundData.sections[0].content }} />
                ) : (
                  <>
                    <p className="mb-4">
                      The science education field has been acknowledged to play a significant role in sustainable development all over the world. In the 21st century, science education is vital for countries' economic competitiveness, peace and security, and general quality of life.
                    </p>
                    <p className="mb-4">
                      Integration of science activities cultivates students' critical thinking skills for them to be able to analyze, evaluate, and make arguments and conclusions correctly and logically about the problems and how they can solve them.
                    </p>
                    <p>
                      Science education is thought to improve livelihood and an important tool for the advancement of socio-economic development in almost all countries. Indeed, Science, Mathematics, and Technology (SMT) is thought to accelerate socio-economic development.
                    </p>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div 
              className="bg-gray-50 p-8 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">STEM Education Benefits</h3>
              <ul className="text-gray-700 space-y-3">
                {stemBenefits && stemBenefits.length > 0 ? (
                  stemBenefits.map((benefit, index) => (
                    <motion.li 
                      key={benefit.id || index}
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <span className="text-tertiary mr-2">
                        <i className="fas fa-check-circle mt-1"></i>
                      </span>
                      <span>{benefit.benefit || benefit}</span>
                    </motion.li>
                  ))
                ) : (
                  // Fallback benefits if API fails
                  [
                    "Creates active, creative, critical, and communicative individuals",
                    "Contributes to scientific and technological innovations and advancement",
                    "Enhances fight against diseases, food production, and environmental protection",
                    "Drives industrial development and innovations",
                    "Promotes tolerance, democracy, political awareness, and respect for dignity",
                    "Increases employment opportunities in the fastest-growing job categories"
                  ].map((benefit, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <span className="text-tertiary mr-2">
                        <i className="fas fa-check-circle mt-1"></i>
                      </span>
                      <span>{benefit}</span>
                    </motion.li>
                  ))
                )}
              </ul>
            </motion.div>
          </motion.div>

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

          {/* Justification Section */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-primary mb-12">
              {justificationData?.title || "Justification of the Project"}
            </h2>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <div className="text-gray-700">
                {justificationData?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: justificationData.content }} />
                ) : (
                  <>
                    <p className="mb-4">
                      The STEM-related workforce has been increasingly becoming important in the 21st century and many societies tend to integrate STEM education into the education curriculum with the intention of bringing about meaningful learning among the students.
                    </p>
                    <p className="mb-4">
                      According to Smith (2019), the fastest-growing job categories are related to STEM, and about 90 percent of future jobs will require people with specialization in information and communication technology (ICT) skills.
                    </p>
                    <p className="mb-4">
                      However, it has been observed that many students tend not to join STEM-related subjects and courses in both secondary schools and universities. A recent survey of 2017 in the Dodoma Region in Tanzania indicated a serious problem of lack of science laboratories and a shortage of teachers for science subjects in secondary schools.
                    </p>
                    <p>
                      Matete's (2022) literature-based study in Tanzania also observed a shortage of science teachers and a lack of laboratories in secondary schools that forced teachers to teach science subjects using theories instead of practical ones.
                    </p>
                  </>
                )}
              </div>
              
              {/* References Section */}
              {justificationData?.references && justificationData.references.length > 0 && (
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
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-primary mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {objectivesData?.title || "Project Objectives"}
          </motion.h2>

          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-gray-700 mb-6">
              {objectivesData?.general ? (
                <div dangerouslySetInnerHTML={{ __html: objectivesData.general }} />
              ) : (
                <p>
                  This project intends to strengthen the science related subjects in secondary schools by building capacity to science teachers on STEM related subjects to improve the quality of education that will enable the Tanzanian nation to have graduates who can survive in a competitive economy and labor market place of the 21st century.
                </p>
              )}
            </div>

            <h3 className="text-xl font-semibold text-primary mb-4">Specific Objectives:</h3>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {objectivesData?.specific && objectivesData.specific.length > 0 ? (
                objectivesData.specific.map((obj, index) => (
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
                ))
              ) : (
                // Fallback objectives if API fails
                [
                  {
                    title: "Teacher Training",
                    description: "Training science teachers in secondary schools to enhance their capacity and teaching methodologies."
                  },
                  {
                    title: "Decision-Maker Involvement",
                    description: "Training decision-makers to recognize the necessity of emphasizing science subjects in secondary education."
                  },
                  {
                    title: "Community Engagement",
                    description: "Training local community members and parents to participate actively in the education of their children."
                  },
                  {
                    title: "Laboratory Enhancement",
                    description: "Strengthening laboratory services for effective teaching and learning of science subjects."
                  }
                ].map((obj, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg border-l-4 border-secondary hover:shadow-md transition-shadow"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-semibold text-tertiary mb-2">{obj.title}</h4>
                    <p className="text-gray-700">{obj.description}</p>
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>

          {/* Partners Section - New Dynamic Content */}
          {statistics?.partners && statistics.partners.length > 0 && (
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold text-primary mb-8 text-center">Project Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statistics.partners.map((partner, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg text-center"
                    variants={itemVariants}
                    custom={index}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-handshake text-primary text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{partner.name}</h4>
                    <p className="text-gray-600 text-sm">{partner.type}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-primary mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Project Timeline
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ProjectTimeline 
              timelineData={[]} // Can be populated from API in future
              loading={loading}
              onPhaseClick={(phase) => {
                console.log('Phase clicked:', phase);
              }}
            />
          </motion.div>
        </div>
      </section>

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
                    <div className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: result.content }} />
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