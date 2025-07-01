import { useState, useEffect } from 'react';
import Hero from '../layouts/Hero';
import Card from '../components/Cards/ActivityCard';
import OutcomeItem from '../components/Cards/OutcomeItem';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import homeService from '../services/homeService';

const Home = () => {
  // State management
  const [homepageContent, setHomepageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch content on component mount
  useEffect(() => {
    fetchHomepageContent();
  }, []);

  /**
   * Fetch all homepage content from API
   */
  const fetchHomepageContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await homeService.getHomepageContent({ published: true });
      
      if (response.success) {
        setHomepageContent(response.data);
        
        // Track page view for analytics
        homeService.trackInteraction({
          section: 'homepage',
          action: 'view',
          element: 'page',
          metadata: {
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
          }
        });
      } else {
        setError('Failed to load homepage content');
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
      fetchHomepageContent();
    }, delay);
  };

  /**
   * Handle activity card click for analytics tracking
   */
  const handleActivityClick = (activity) => {
    homeService.trackInteraction({
      section: 'activities',
      action: 'click',
      element: `activity-${activity.id}`,
      metadata: {
        activity_title: activity.title,
        activity_color: activity.color
      }
    });
  };

  /**
   * Handle outcome item interaction
   */
  const handleOutcomeInteraction = (outcome) => {
    homeService.trackInteraction({
      section: 'outcomes',
      action: 'view',
      element: `outcome-${outcome.id}`,
      metadata: {
        outcome_title: outcome.title,
        progress_percentage: outcome.metrics?.percentage || 0
      }
    });
  };

  /**
   * Render activities section
   */
  const renderActivitiesSection = (activitiesData) => {
    if (!activitiesData || !activitiesData.activities) return null;

    const publishedActivities = activitiesData.activities
      .filter(activity => activity.is_published)
      .sort((a, b) => a.order - b.order);

    if (publishedActivities.length === 0) return null;

    return (
      <section id="activities" className={`py-16 ${activitiesData.background_color || 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
            {activitiesData.title}
          </h2>
          {activitiesData.subtitle && (
            <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
              {activitiesData.subtitle}
            </p>
          )}
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min(publishedActivities.length, 3)} gap-8`}>
            {publishedActivities.map((activity) => (
              <div key={activity.id} onClick={() => handleActivityClick(activity)}>
                <Card 
                  title={activity.title}
                  description={activity.description}
                  iconClass={activity.icon_class}
                  color={activity.color}
                  link={activity.link}
                  image={activity.image}
                  progress={activity.progress}
                  tags={activity.tags}
                  additionalInfo={activity.additional_info}
                />
              </div>
            ))}
          </div>
          
          {/* Show activity progress summary if available */}
          {publishedActivities.some(activity => activity.progress) && (
            <div className="mt-12 text-center">
              <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold text-primary mb-4">Project Progress Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {publishedActivities.filter(a => a.progress?.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {publishedActivities.filter(a => a.progress?.status === 'in-progress').length}
                    </div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {publishedActivities.filter(a => a.progress?.status === 'planned').length}
                    </div>
                    <div className="text-sm text-gray-600">Planned</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  /**
   * Render outcomes section
   */
  const renderOutcomesSection = (outcomesData) => {
    if (!outcomesData || !outcomesData.outcomes) return null;

    const publishedOutcomes = outcomesData.outcomes
      .filter(outcome => outcome.is_published)
      .sort((a, b) => a.order - b.order);

    if (publishedOutcomes.length === 0) return null;

    return (
      <section id="outcomes" className={`py-16 ${outcomesData.background_color || 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
            {outcomesData.title}
          </h2>
          <div className={`${outcomesData.content_background || 'bg-white'} p-8 rounded-lg shadow-custom`}>
            {outcomesData.description && (
              <p className="text-gray-700 mb-6">
                {outcomesData.description}
              </p>
            )}

            <div className="space-y-6">
              {publishedOutcomes.map((outcome) => (
                <div key={outcome.id} onMouseEnter={() => handleOutcomeInteraction(outcome)}>
                  <OutcomeItem 
                    title={outcome.title}
                    description={outcome.description}
                    icon={outcome.icon_class}
                    metrics={outcome.metrics}
                    status={outcome.status}
                    milestones={outcome.milestones}
                  />
                </div>
              ))}
            </div>

            {/* Overall progress indicator */}
            {outcomesData.overall_progress !== undefined && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Project Progress</span>
                  <span className="text-sm font-medium text-gray-700">{outcomesData.overall_progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${outcomesData.overall_progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  /**
   * Render monitoring section
   */
  const renderMonitoringSection = (monitoringData) => {
    if (!monitoringData) return null;

    return (
      <section className={`py-16 ${monitoringData.background_color || 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
            {monitoringData.title}
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-custom">
            <p className="text-gray-700 mb-4">
              {monitoringData.content}
            </p>
            
            {/* Render monitoring methods if available */}
            {monitoringData.methods && monitoringData.methods.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Monitoring Methods:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {monitoringData.methods.map((method) => (
                    <div key={method.id} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">{method.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Frequency: {method.frequency}</span>
                        <span>Participants: {method.participants.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  /**
   * Render ethics section
   */
  const renderEthicsSection = (ethicsData) => {
    if (!ethicsData) return null;

    return (
      <section className={`py-16 ${ethicsData.background_color || 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-8 section-heading">
            {ethicsData.title}
          </h2>
          <div className={`${ethicsData.content_background || 'bg-white'} p-8 rounded-lg shadow-custom`}>
            <p className="text-gray-700 mb-4">
              {ethicsData.content}
            </p>

            {/* Render ethical requirements if available */}
            {ethicsData.requirements && ethicsData.requirements.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Ethical Requirements:</h3>
                <div className="space-y-3">
                  {ethicsData.requirements.map((requirement) => (
                    <div key={requirement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{requirement.requirement}</h4>
                        <p className="text-sm text-gray-600">{requirement.description}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        requirement.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : requirement.status === 'ongoing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {requirement.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  // Loading state
  if (loading) {
    return (
      <>
        {/* Hero skeleton */}
        <div className="py-10 sm:py-16 md:py-20 bg-gradient-to-r from-[#0066CC] to-[#FD9148]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-2/3 mb-10 md:mb-0">
                <div className="h-12 bg-white/20 rounded mb-4 animate-pulse"></div>
                <div className="h-6 bg-white/20 rounded mb-6 animate-pulse"></div>
                <div className="h-12 bg-white/20 rounded w-32 animate-pulse"></div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="h-64 bg-white/20 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities skeleton */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="h-8 bg-gray-200 rounded w-80 mb-12 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SkeletonLoader count={3} height={200} />
            </div>
          </div>
        </section>

        {/* Outcomes skeleton */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="h-8 bg-gray-200 rounded w-72 mb-12 animate-pulse"></div>
            <div className="bg-white p-8 rounded-lg shadow-custom">
              <div className="h-4 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <SkeletonLoader count={4} height={80} />
            </div>
          </div>
        </section>
      </>
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
            <h3 className="text-xl font-semibold mb-2">Unable to Load Homepage</h3>
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
  if (!homepageContent) {
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
      {/* Hero Section - Pass dynamic content to Hero component */}
      <Hero heroContent={homepageContent.hero} />
      
      {/* Activities Section */}
      {homepageContent.activities && renderActivitiesSection(homepageContent.activities)}
      
      {/* Outcomes Section */}
      {homepageContent.outcomes && renderOutcomesSection(homepageContent.outcomes)}
      
      {/* Monitoring Section */}
      {homepageContent.monitoring && renderMonitoringSection(homepageContent.monitoring)}
      
      {/* Ethics Section */}
      {homepageContent.ethics && renderEthicsSection(homepageContent.ethics)}
    </>
  );
};

export default Home;
