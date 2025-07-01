import API from './api.js';

/**
 * About Service for handling about page content related API calls
 */
class AboutService {
  /**
   * Get all about page content
   * @param {Object} params - Query parameters
   * @param {string} params.section - Filter by specific section
   * @param {boolean} params.published - Filter by published status
   * @returns {Promise<Object>} About page content data
   */
  async getAboutContent(params = {}) {
    try {
      const queryString = new URLSearchParams();
      
      if (params.section) queryString.append('section', params.section);
      if (params.published !== undefined) queryString.append('published', params.published);

      const endpoint = `/about-content${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await API.get(endpoint);
      return await response.json();
    } catch (error) {
      console.error('Error fetching about content:', error);
      throw error;
    }
  }

  /**
   * Get specific section content
   * @param {string} section - Section name (background, benefits, justification, objectives)
   * @returns {Promise<Object>} Section content data
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
   * Update section content (Admin only)
   * @param {string} section - Section name
   * @param {Object} contentData - Updated content data
   * @returns {Promise<Object>} Updated content data
   */
  async updateSectionContent(section, contentData) {
    try {
      const response = await API.put(`/about-content/${section}`, contentData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating ${section} content:`, error);
      throw error;
    }
  }

  /**
   * Get background information content
   * @returns {Promise<Object>} Background section data
   */
  async getBackgroundContent() {
    return this.getSectionContent('background');
  }

  /**
   * Get STEM benefits list
   * @returns {Promise<Object>} STEM benefits data
   */
  async getStemBenefits() {
    return this.getSectionContent('benefits');
  }

  /**
   * Get project justification content
   * @returns {Promise<Object>} Justification section data
   */
  async getJustificationContent() {
    return this.getSectionContent('justification');
  }

  /**
   * Get project objectives content
   * @returns {Promise<Object>} Objectives section data
   */
  async getObjectivesContent() {
    return this.getSectionContent('objectives');
  }

  /**
   * Create a new STEM benefit (Admin only)
   * @param {Object} benefitData - Benefit data
   * @param {string} benefitData.text - Benefit text
   * @param {string} benefitData.icon - Icon class
   * @param {number} benefitData.order - Display order
   * @returns {Promise<Object>} Created benefit data
   */
  async createBenefit(benefitData) {
    try {
      const response = await API.post('/about-content/benefits', benefitData);
      return await response.json();
    } catch (error) {
      console.error('Error creating benefit:', error);
      throw error;
    }
  }

  /**
   * Update a STEM benefit (Admin only)
   * @param {number} id - Benefit ID
   * @param {Object} benefitData - Updated benefit data
   * @returns {Promise<Object>} Updated benefit data
   */
  async updateBenefit(id, benefitData) {
    try {
      const response = await API.put(`/about-content/benefits/${id}`, benefitData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating benefit ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a STEM benefit (Admin only)
   * @param {number} id - Benefit ID
   * @returns {Promise<Object>} Success message
   */
  async deleteBenefit(id) {
    try {
      const response = await API.delete(`/about-content/benefits/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting benefit ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new specific objective (Admin only)
   * @param {Object} objectiveData - Objective data
   * @param {string} objectiveData.title - Objective title
   * @param {string} objectiveData.description - Objective description
   * @param {string} objectiveData.icon - Icon class
   * @param {string} objectiveData.color - Color class
   * @param {number} objectiveData.order - Display order
   * @returns {Promise<Object>} Created objective data
   */
  async createObjective(objectiveData) {
    try {
      const response = await API.post('/about-content/objectives', objectiveData);
      return await response.json();
    } catch (error) {
      console.error('Error creating objective:', error);
      throw error;
    }
  }

  /**
   * Update a specific objective (Admin only)
   * @param {number} id - Objective ID
   * @param {Object} objectiveData - Updated objective data
   * @returns {Promise<Object>} Updated objective data
   */
  async updateObjective(id, objectiveData) {
    try {
      const response = await API.put(`/about-content/objectives/${id}`, objectiveData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating objective ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a specific objective (Admin only)
   * @param {number} id - Objective ID
   * @returns {Promise<Object>} Success message
   */
  async deleteObjective(id) {
    try {
      const response = await API.delete(`/about-content/objectives/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting objective ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get page analytics (Admin only)
   * @returns {Promise<Object>} Analytics data
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
   * Reorder benefits (Admin only)
   * @param {Array} benefitIds - Array of benefit IDs in new order
   * @returns {Promise<Object>} Success message
   */
  async reorderBenefits(benefitIds) {
    try {
      const response = await API.put('/about-content/benefits/reorder', { 
        benefit_ids: benefitIds 
      });
      return await response.json();
    } catch (error) {
      console.error('Error reordering benefits:', error);
      throw error;
    }
  }

  /**
   * Reorder objectives (Admin only)
   * @param {Array} objectiveIds - Array of objective IDs in new order
   * @returns {Promise<Object>} Success message
   */
  async reorderObjectives(objectiveIds) {
    try {
      const response = await API.put('/about-content/objectives/reorder', { 
        objective_ids: objectiveIds 
      });
      return await response.json();
    } catch (error) {
      console.error('Error reordering objectives:', error);
      throw error;
    }
  }

  /**
   * Batch update multiple sections (Admin only)
   * @param {Object} updates - Object containing updates for multiple sections
   * @returns {Promise<Object>} Updated content data
   */
  async batchUpdateContent(updates) {
    try {
      const response = await API.put('/about-content/batch-update', updates);
      return await response.json();
    } catch (error) {
      console.error('Error batch updating content:', error);
      throw error;
    }
  }

  /**
   * Preview content changes before publishing (Admin only)
   * @param {string} section - Section name
   * @param {Object} contentData - Content data to preview
   * @returns {Promise<Object>} Preview data
   */
  async previewContent(section, contentData) {
    try {
      const response = await API.post(`/about-content/${section}/preview`, contentData);
      return await response.json();
    } catch (error) {
      console.error(`Error previewing ${section} content:`, error);
      throw error;
    }
  }

  /**
   * Get content history/versions (Admin only)
   * @param {string} section - Section name
   * @param {number} limit - Number of versions to retrieve
   * @returns {Promise<Object>} Content history data
   */
  async getContentHistory(section, limit = 10) {
    try {
      const response = await API.get(`/about-content/${section}/history?limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${section} content history:`, error);
      throw error;
    }
  }

  /**
   * Restore content to a previous version (Admin only)
   * @param {string} section - Section name
   * @param {number} versionId - Version ID to restore
   * @returns {Promise<Object>} Restored content data
   */
  async restoreContentVersion(section, versionId) {
    try {
      const response = await API.post(`/about-content/${section}/restore`, { 
        version_id: versionId 
      });
      return await response.json();
    } catch (error) {
      console.error(`Error restoring ${section} content version:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const aboutService = new AboutService();
export default aboutService;

// Export the class for testing purposes
export { AboutService };
