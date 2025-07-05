
import React, { useState, useEffect } from 'react';
import Hero from '../layouts/Hero';
import Card from '../components/Cards/ActivityCard';
import OutcomeItem from '../components/Cards/OutcomeItem';
import MonitoringSection from '../components/Homepage/MonitoringSection';
import EthicsSection from '../components/Homepage/EthicsSection';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import homepageService from '../services/homepageService';
import { FALLBACK_HOMEPAGE_DATA } from '../constants/fallbackData';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homepageData, setHomepageData] = useState({
    hero: null,
    activities: null,
    outcomes: null,
    monitoring: null,
    ethics: null
  });

  useEffect(() => {
    const loadHomepageContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch all content at once, fall back to individual calls if needed
        try {
          const response = await homepageService.getHomepageContent();
          if (response.success && response.data) {
            setHomepageData(response.data);
          } else {
            throw new Error('Failed to fetch homepage content');
          }
        } catch (allContentError) {
          console.warn('Fallback to individual API calls:', allContentError);
          
          // Fallback to individual section calls
          const [heroRes, activitiesRes, outcomesRes, monitoringRes, ethicsRes] = await Promise.allSettled([
            homepageService.getHeroContent(),
            homepageService.getActivitiesContent(),
            homepageService.getOutcomesContent(),
            homepageService.getMonitoringContent(),
            homepageService.getEthicsContent()
          ]);

          setHomepageData({
            hero: heroRes.status === 'fulfilled' && heroRes.value.success ? heroRes.value.data : null,
            activities: activitiesRes.status === 'fulfilled' && activitiesRes.value.success ? activitiesRes.value.data : null,
            outcomes: outcomesRes.status === 'fulfilled' && outcomesRes.value.success ? outcomesRes.value.data : null,
            monitoring: monitoringRes.status === 'fulfilled' && monitoringRes.value.success ? monitoringRes.value.data : null,
            ethics: ethicsRes.status === 'fulfilled' && ethicsRes.value.success ? ethicsRes.value.data : null
          });
        }
      } catch (error) {
        console.error('Error loading homepage content:', error);
        console.log('Using fallback data due to API failure');
        // Use fallback data when API fails
        setHomepageData(FALLBACK_HOMEPAGE_DATA);
      } finally {
        setLoading(false);
      }
    };

    loadHomepageContent();
  }, []);

  if (loading) {
    return (
      <>
        <Hero />
        <div className="py-16">
          <div className="container mx-auto px-6">
            <SkeletonLoader />
          </div>
        </div>
      </>
    );
  }

  // Use fallback data for any missing sections
  const displayData = {
    hero: homepageData.hero || FALLBACK_HOMEPAGE_DATA.hero,
    activities: homepageData.activities || FALLBACK_HOMEPAGE_DATA.activities,
    outcomes: homepageData.outcomes || FALLBACK_HOMEPAGE_DATA.outcomes,
    monitoring: homepageData.monitoring || FALLBACK_HOMEPAGE_DATA.monitoring,
    ethics: homepageData.ethics || FALLBACK_HOMEPAGE_DATA.ethics
  };

  return (
    <>
      <Hero heroData={displayData.hero} />
      
      {/* Activities Section */}
      <section id="activities" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
            {displayData.activities?.title || 'Main Activities of the Project'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayData.activities?.activities?.length > 0 ? (
              displayData.activities.activities
                .filter(activity => activity.is_published)
                .sort((a, b) => a.order - b.order)
                .map((activity) => (
                  <Card 
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    iconClass={activity.icon_class}
                    color={activity.color}
                    link={activity.link}
                    link_text={activity.link_text}
                    is_featured={activity.is_featured}
                  />
                ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No activities available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Outcomes Section */}
      <section id="outcomes" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
            {displayData.outcomes?.title || 'Proposed Project Outcomes'}
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-custom">
            <p className="text-gray-700 mb-6">
              {displayData.outcomes?.description || 'After the project implementation, it is expected to yield the following outcomes:'}
            </p>

            <div className="space-y-6">
              {displayData.outcomes?.outcomes?.length > 0 ? (
                displayData.outcomes.outcomes
                  .filter(outcome => outcome.is_published)
                  .sort((a, b) => a.order - b.order)
                  .map((outcome) => (
                    <OutcomeItem 
                      key={outcome.id}
                      title={outcome.title}
                      description={outcome.description}
                      value={outcome.value}
                      unit={outcome.unit}
                      additional_info={outcome.additional_info}
                      icon_class={outcome.icon_class}
                      color={outcome.color}
                    />
                  ))
              ) : (
                <div className="text-center text-gray-500">
                  No outcomes available at the moment.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <MonitoringSection data={displayData.monitoring} />

      {/* Ethics Section */}
      <EthicsSection data={displayData.ethics} />
    </>
  );
};

export default Home;