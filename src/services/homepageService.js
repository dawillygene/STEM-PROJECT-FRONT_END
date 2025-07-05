import API from './api.js';

class HomepageService {
  /**
   * Get all homepage content in one request
   */
  async getHomepageContent() {
    try {
      const response = await API.get('/homepage-content');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      throw error;
    }
  }

  /**
   * Get hero section content
   */
  async getHeroContent() {
    try {
      const response = await API.get('/homepage-content/hero');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching hero content:', error);
      throw error;
    }
  }

  /**
   * Get activities section content
   */
  async getActivitiesContent() {
    try {
      const response = await API.get('/homepage-content/activities');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching activities content:', error);
      throw error;
    }
  }

  /**
   * Get outcomes section content
   */
  async getOutcomesContent() {
    try {
      const response = await API.get('/homepage-content/outcomes');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching outcomes content:', error);
      throw error;
    }
  }

  /**
   * Get monitoring section content
   */
  async getMonitoringContent() {
    try {
      const response = await API.get('/homepage-content/monitoring');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching monitoring content:', error);
      throw error;
    }
  }

  /**
   * Get ethics section content
   */
  async getEthicsContent() {
    try {
      const response = await API.get('/homepage-content/ethics');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ethics content:', error);
      throw error;
    }
  }
}

const homepageService = new HomepageService();
export default homepageService;
