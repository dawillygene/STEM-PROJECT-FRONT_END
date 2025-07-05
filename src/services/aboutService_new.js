import API from './api.js';

/**
 * About Service for handling about page content API calls
 * Based on API Documentation: http://192.168.1.150:8000/api/about-content
 * 
 * @author Elia William Mariki (@dawillygene)
 * @date July 4, 2025
 */
class AboutService {
  /**
   * Get all about page content
   * GET /about-content
   * @returns {Promise<Object>} Complete about content data
   */
  async getAboutContent() {
    try {
      const response = await API.get('/about-content');
      return await response.json();
    } catch (error) {
      console.error('Error fetching about content:', error);
      throw error;
    }
  }

  /**
   * Get specific section content
   * GET /about-content/{section}
   * @param {string} section - Section name (background, benefits, justification, objectives)
   * @returns {Promise<Object>} Section specific data
   */
  async getSectionContent(section) {
    try {
      const response = await API.get(`/about-content/${section}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${section} content:`, error);
      throw error;
    }
  }

  /**
   * Get background section
   * GET /about-content/background
   * @returns {Promise<Object>} Background section data
   */
  async getBackgroundContent() {
    return this.getSectionContent('background');
  }

  /**
   * Get benefits section
   * GET /about-content/benefits
   * @returns {Promise<Object>} Benefits array data
   */
  async getBenefitsContent() {
    return this.getSectionContent('benefits');
  }

  /**
   * Get justification section
   * GET /about-content/justification
   * @returns {Promise<Object>} Justification section data
   */
  async getJustificationContent() {
    return this.getSectionContent('justification');
  }

  /**
   * Get objectives section
   * GET /about-content/objectives
   * @returns {Promise<Object>} Objectives section data
   */
  async getObjectivesContent() {
    return this.getSectionContent('objectives');
  }

  /**
   * Get analytics data (Admin only)
   * GET /about-content/analytics
   * @returns {Promise<Object>} Analytics and statistics
   */
  async getAnalytics() {
    try {
      const response = await API.get('/about-content/analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  /**
   * Export content in different formats
   * GET /about-content/export?format={format}
   * @param {string} format - Export format (json, csv, pdf)
   * @returns {Promise<Object|Blob>} Export data or file blob
   */
  async exportContent(format = 'json') {
    try {
      const response = await API.get(`/about-content/export?format=${format}`);
      
      if (format === 'json') {
        return await response.json();
      } else {
        // For CSV/PDF, return blob for download
        return await response.blob();
      }
    } catch (error) {
      console.error(`Error exporting content as ${format}:`, error);
      throw error;
    }
  }

  /**
   * Search content across all sections
   * GET /about-content/search?q={query}&section={section}
   * @param {string} query - Search query string
   * @param {string} section - Optional section filter
   * @returns {Promise<Object>} Search results
   */
  async searchContent(query, section = null) {
    try {
      let url = `/about-content/search?q=${encodeURIComponent(query)}`;
      if (section) {
        url += `&section=${section}`;
      }
      
      const response = await API.get(url);
      return await response.json();
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  }

  // Backward compatibility aliases
  async getStemBenefits() {
    return this.getBenefitsContent();
  }
}

// Create and export a singleton instance
const aboutService = new AboutService();
export default aboutService;

// Export the class for testing purposes
export { AboutService };
