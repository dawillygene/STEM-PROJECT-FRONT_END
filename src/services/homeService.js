import API from './api.js';

/**
 * Home Service for handling homepage content related API calls
 */
class HomeService {
  /**
   * Get all homepage content
   * @param {Object} params - Query parameters
   * @param {string} params.section - Filter by specific section
   * @param {boolean} params.published - Filter by published status
   * @param {boolean} params.featured - Filter featured content only
   * @returns {Promise<Object>} Homepage content data
   */
  async getHomepageContent(params = {}) {
    try {
      const queryString = new URLSearchParams();
      
      if (params.section) queryString.append('section', params.section);
      if (params.published !== undefined) queryString.append('published', params.published);
      if (params.featured !== undefined) queryString.append('featured', params.featured);

      const endpoint = `/homepage-content${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await API.get(endpoint);
      return await response.json();
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      throw error;
    }
  }

  /**
   * Get specific section content
   * @param {string} section - Section name (hero, activities, outcomes, monitoring, ethics)
   * @returns {Promise<Object>} Section content data
   */
  async getSectionContent(section) {
    try {
      const response = await API.get(`/homepage-content/${section}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${section} content:`, error);
      throw error;
    }
  }

  /**
   * Get hero section content
   * @returns {Promise<Object>} Hero section data
   */
  async getHeroContent() {
    return this.getSectionContent('hero');
  }

  /**
   * Get activities section content
   * @param {Object} params - Query parameters
   * @param {boolean} params.featured - Filter featured activities only
   * @param {number} params.limit - Number of activities to return
   * @param {string} params.color - Filter by color theme
   * @returns {Promise<Object>} Activities section data
   */
  async getActivitiesContent(params = {}) {
    try {
      const queryString = new URLSearchParams();
      
      if (params.featured !== undefined) queryString.append('featured', params.featured);
      if (params.limit) queryString.append('limit', params.limit);
      if (params.color) queryString.append('color', params.color);

      const endpoint = `/homepage-content/activities${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await API.get(endpoint);
      return await response.json();
    } catch (error) {
      console.error('Error fetching activities content:', error);
      throw error;
    }
  }

  /**
   * Get outcomes section content
   * @returns {Promise<Object>} Outcomes section data
   */
  async getOutcomesContent() {
    return this.getSectionContent('outcomes');
  }

  /**
   * Get monitoring section content
   * @returns {Promise<Object>} Monitoring section data
   */
  async getMonitoringContent() {
    return this.getSectionContent('monitoring');
  }

  /**
   * Get ethics section content
   * @returns {Promise<Object>} Ethics section data
   */
  async getEthicsContent() {
    return this.getSectionContent('ethics');
  }

  /**
   * Search homepage content
   * @param {string} query - Search query
   * @param {Object} params - Additional search parameters
   * @param {string} params.section - Limit search to specific section
   * @param {number} params.limit - Number of results to return
   * @returns {Promise<Object>} Search results
   */
  async searchContent(query, params = {}) {
    try {
      const queryString = new URLSearchParams();
      queryString.append('q', query);
      
      if (params.section) queryString.append('section', params.section);
      if (params.limit) queryString.append('limit', params.limit);

      const response = await API.get(`/homepage-content/search?${queryString.toString()}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  }

  /**
   * Update hero content (Admin only)
   * @param {Object} heroData - Hero content data
   * @returns {Promise<Object>} Updated hero data
   */
  async updateHeroContent(heroData) {
    try {
      const response = await API.put('/homepage-content/hero', heroData);
      return await response.json();
    } catch (error) {
      console.error('Error updating hero content:', error);
      throw error;
    }
  }

  /**
   * Create a new activity (Admin only)
   * @param {Object} activityData - Activity data
   * @param {string} activityData.title - Activity title
   * @param {string} activityData.description - Activity description
   * @param {string} activityData.icon_class - Icon class
   * @param {string} activityData.color - Color theme
   * @param {number} activityData.order - Display order
   * @param {boolean} activityData.is_featured - Featured status
   * @returns {Promise<Object>} Created activity data
   */
  async createActivity(activityData) {
    try {
      const response = await API.post('/homepage-content/activities', activityData);
      return await response.json();
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }

  /**
   * Update an activity (Admin only)
   * @param {number} id - Activity ID
   * @param {Object} activityData - Updated activity data
   * @returns {Promise<Object>} Updated activity data
   */
  async updateActivity(id, activityData) {
    try {
      const response = await API.put(`/homepage-content/activities/${id}`, activityData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating activity ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete an activity (Admin only)
   * @param {number} id - Activity ID
   * @returns {Promise<Object>} Success message
   */
  async deleteActivity(id) {
    try {
      const response = await API.delete(`/homepage-content/activities/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting activity ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new outcome (Admin only)
   * @param {Object} outcomeData - Outcome data
   * @param {string} outcomeData.title - Outcome title
   * @param {string} outcomeData.description - Outcome description
   * @param {string} outcomeData.icon_class - Icon class
   * @param {number} outcomeData.order - Display order
   * @param {Object} outcomeData.metrics - Metrics data
   * @returns {Promise<Object>} Created outcome data
   */
  async createOutcome(outcomeData) {
    try {
      const response = await API.post('/homepage-content/outcomes', outcomeData);
      return await response.json();
    } catch (error) {
      console.error('Error creating outcome:', error);
      throw error;
    }
  }

  /**
   * Update an outcome (Admin only)
   * @param {number} id - Outcome ID
   * @param {Object} outcomeData - Updated outcome data
   * @returns {Promise<Object>} Updated outcome data
   */
  async updateOutcome(id, outcomeData) {
    try {
      const response = await API.put(`/homepage-content/outcomes/${id}`, outcomeData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating outcome ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete an outcome (Admin only)
   * @param {number} id - Outcome ID
   * @returns {Promise<Object>} Success message
   */
  async deleteOutcome(id) {
    try {
      const response = await API.delete(`/homepage-content/outcomes/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting outcome ${id}:`, error);
      throw error;
    }
  }

  /**
   * Update section content (Admin only)
   * @param {string} section - Section name (monitoring, ethics)
   * @param {Object} contentData - Updated content data
   * @returns {Promise<Object>} Updated content data
   */
  async updateSectionContent(section, contentData) {
    try {
      const response = await API.put(`/homepage-content/${section}`, contentData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating ${section} content:`, error);
      throw error;
    }
  }

  /**
   * Reorder content items (Admin only)
   * @param {string} section - Section name (activities, outcomes)
   * @param {Array} items - Array of {id, order} objects
   * @returns {Promise<Object>} Success message
   */
  async reorderContent(section, items) {
    try {
      const response = await API.put(`/homepage-content/${section}/reorder`, { items });
      return await response.json();
    } catch (error) {
      console.error(`Error reordering ${section} content:`, error);
      throw error;
    }
  }

  /**
   * Get homepage analytics (Admin only)
   * @param {Object} params - Query parameters
   * @param {string} params.dateFrom - Start date for analytics
   * @param {string} params.dateTo - End date for analytics
   * @param {string} params.section - Filter by section
   * @returns {Promise<Object>} Analytics data
   */
  async getAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams();
      
      if (params.dateFrom) queryString.append('dateFrom', params.dateFrom);
      if (params.dateTo) queryString.append('dateTo', params.dateTo);
      if (params.section) queryString.append('section', params.section);

      const endpoint = `/homepage-content/analytics${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await API.get(endpoint);
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  /**
   * Track user interaction (for analytics)
   * @param {Object} interactionData - Interaction data
   * @param {string} interactionData.section - Section name
   * @param {string} interactionData.action - Action type (view, click, etc.)
   * @param {string} interactionData.element - Element identifier
   * @param {Object} interactionData.metadata - Additional metadata
   * @returns {Promise<Object>} Success message
   */
  async trackInteraction(interactionData) {
    try {
      const response = await API.post('/homepage-content/analytics/track', interactionData);
      return await response.json();
    } catch (error) {
      console.error('Error tracking interaction:', error);
      // Don't throw error for analytics tracking to avoid disrupting user experience
      return { success: false };
    }
  }

  /**
   * Get search suggestions
   * @param {string} query - Partial search query
   * @param {number} limit - Number of suggestions to return
   * @returns {Promise<Object>} Search suggestions
   */
  async getSearchSuggestions(query, limit = 5) {
    try {
      const response = await API.get(`/homepage-content/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      throw error;
    }
  }

  /**
   * Get activity progress updates
   * @param {number} activityId - Activity ID (optional, if not provided returns all)
   * @returns {Promise<Object>} Activity progress data
   */
  async getActivityProgress(activityId = null) {
    try {
      const endpoint = activityId 
        ? `/homepage-content/activities/${activityId}/progress`
        : '/homepage-content/activities/progress';
      const response = await API.get(endpoint);
      return await response.json();
    } catch (error) {
      console.error('Error fetching activity progress:', error);
      throw error;
    }
  }

  /**
   * Update activity progress (Admin only)
   * @param {number} activityId - Activity ID
   * @param {Object} progressData - Progress update data
   * @param {number} progressData.percentage - Progress percentage
   * @param {string} progressData.status - Progress status
   * @param {string} progressData.last_updated - Last update timestamp
   * @returns {Promise<Object>} Updated progress data
   */
  async updateActivityProgress(activityId, progressData) {
    try {
      const response = await API.put(`/homepage-content/activities/${activityId}/progress`, progressData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating activity ${activityId} progress:`, error);
      throw error;
    }
  }

  /**
   * Get outcome metrics and milestones
   * @param {number} outcomeId - Outcome ID (optional, if not provided returns all)
   * @returns {Promise<Object>} Outcome metrics data
   */
  async getOutcomeMetrics(outcomeId = null) {
    try {
      const endpoint = outcomeId 
        ? `/homepage-content/outcomes/${outcomeId}/metrics`
        : '/homepage-content/outcomes/metrics';
      const response = await API.get(endpoint);
      return await response.json();
    } catch (error) {
      console.error('Error fetching outcome metrics:', error);
      throw error;
    }
  }

  /**
   * Update outcome metrics (Admin only)
   * @param {number} outcomeId - Outcome ID
   * @param {Object} metricsData - Metrics update data
   * @returns {Promise<Object>} Updated metrics data
   */
  async updateOutcomeMetrics(outcomeId, metricsData) {
    try {
      const response = await API.put(`/homepage-content/outcomes/${outcomeId}/metrics`, metricsData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating outcome ${outcomeId} metrics:`, error);
      throw error;
    }
  }

  /**
   * Export content data (Admin only)
   * @param {string} format - Export format (json, csv, xlsx)
   * @param {Array} sections - Sections to export
   * @returns {Promise<Blob>} Exported data
   */
  async exportContent(format = 'json', sections = []) {
    try {
      const queryString = new URLSearchParams();
      queryString.append('format', format);
      if (sections.length > 0) {
        sections.forEach(section => queryString.append('sections', section));
      }

      const response = await API.get(`/homepage-content/export?${queryString.toString()}`);
      return response.blob();
    } catch (error) {
      console.error('Error exporting content:', error);
      throw error;
    }
  }

  /**
   * Debounced search for real-time search suggestions
   * @param {string} query - Search query
   * @param {number} delay - Debounce delay in milliseconds
   * @returns {Promise<Object>} Search results
   */
  debounceSearch(query, delay = 300) {
    return new Promise((resolve) => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        try {
          const result = await this.searchContent(query);
          resolve(result);
        } catch (error) {
          console.error('Error in debounced search:', error);
          throw error;
        }
      }, delay);
    });
  }
}

// Create and export a singleton instance
const homeService = new HomeService();
export default homeService;

// Export the class for testing purposes
export { HomeService };
