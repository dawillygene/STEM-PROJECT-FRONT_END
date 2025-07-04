import API from './api.js';
import contentCache from './contentCache.js';

/**
 * About Service for handling about page content related API calls
 * Now with caching support
 */
class AboutService {
  constructor() {
    this.cacheExpiration = 30 * 60 * 1000; // 30 minutes
  }

  /**
   * Get all about page content with caching
   * @param {Object} params - Query parameters
   * @param {string} params.section - Filter by specific section
   * @param {boolean} params.published - Filter by published status
   * @param {boolean} params.useCache - Whether to use cache (default: true)
   * @returns {Promise<Object>} About page content data
   */
  async getAboutContent(params = {}) {
    const cacheKey = `about-content-${JSON.stringify(params)}`;
    
    // Check cache first unless explicitly disabled
    if (params.useCache !== false) {
      const cachedData = contentCache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    try {
      const queryString = new URLSearchParams();
      
      if (params.section) queryString.append('section', params.section);
      if (params.published !== undefined) queryString.append('published', params.published);

      const endpoint = `/about-content${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await API.get(endpoint);
      const data = await response.json();
      
      // Cache the result
      if (data.success) {
        contentCache.set(cacheKey, data, this.cacheExpiration);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching about content:', error);
      throw error;
    }
  }

  /**
   * Get specific section content with caching
   * @param {string} section - Section name (background, benefits, justification, objectives)
   * @param {boolean} useCache - Whether to use cache (default: true)
   * @returns {Promise<Object>} Section content data
   */
  async getSectionContent(section, useCache = true) {
    const cacheKey = `section-content-${section}`;
    
    // Check cache first unless explicitly disabled
    if (useCache) {
      const cachedData = contentCache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    try {
      const response = await API.get(`/about-content/${section}`);
      const data = await response.json();
      
      // Cache the result
      if (data.success) {
        contentCache.set(cacheKey, data, this.cacheExpiration);
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching ${section} content:`, error);
      throw error;
    }
  }

  /**
   * Update section content (Admin only) - clears cache
   * @param {string} section - Section name
   * @param {Object} contentData - Updated content data
   * @returns {Promise<Object>} Updated content data
   */
  async updateSectionContent(section, contentData) {
    try {
      const response = await API.put(`/about-content/${section}`, contentData);
      const data = await response.json();
      
      // Clear cache for this section
      contentCache.remove(`section-content-${section}`);
      
      return data;
    } catch (error) {
      console.error(`Error updating ${section} content:`, error);
      throw error;
    }
  }

  /**
   * Get background information content with caching
   * @param {boolean} useCache - Whether to use cache (default: true)
   * @returns {Promise<Object>} Background section data
   */
  async getBackgroundContent(useCache = true) {
    return this.getSectionContent('background', useCache);
  }

  /**
   * Get STEM benefits list with caching
   * @param {boolean} useCache - Whether to use cache (default: true)
   * @returns {Promise<Object>} STEM benefits data
   */
  async getStemBenefits(useCache = true) {
    return this.getSectionContent('benefits', useCache);
  }

  /**
   * Get project justification content with caching
   * @param {boolean} useCache - Whether to use cache (default: true)
   * @returns {Promise<Object>} Justification section data
   */
  async getJustificationContent(useCache = true) {
    return this.getSectionContent('justification', useCache);
  }

  /**
   * Get project objectives content with caching
   * @param {boolean} useCache - Whether to use cache (default: true)
   * @returns {Promise<Object>} Objectives section data
   */
  async getObjectivesContent(useCache = true) {
    return this.getSectionContent('objectives', useCache);
  }

  // Alias methods for backward compatibility
  async getBackgroundInfo(useCache = true) {
    return this.getBackgroundContent(useCache);
  }

  async getJustification(useCache = true) {
    return this.getJustificationContent(useCache);
  }

  async getObjectives(useCache = true) {
    return this.getObjectivesContent(useCache);
  }

  async getStatistics(useCache = true) {
    const cacheKey = 'statistics-data';
    
    // Check cache first unless explicitly disabled
    if (useCache) {
      const cachedData = contentCache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    try {
      const response = await API.get('/about-content/statistics');
      const data = await response.json();
      
      // Cache the result
      if (data.success) {
        contentCache.set(cacheKey, data, this.cacheExpiration);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
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
   * Export about content in specified format
   * @param {string} format - Export format (json, pdf, excel, etc.)
   * @param {Object} options - Export options
   * @returns {Promise<Blob|Object>} Exported content
   */
  async exportContent(format = 'json', options = {}) {
    try {
      const queryString = new URLSearchParams();
      queryString.append('format', format);
      
      if (options.sections) {
        queryString.append('sections', options.sections.join(','));
      }
      if (options.includeMetadata !== undefined) {
        queryString.append('includeMetadata', options.includeMetadata);
      }
      if (options.dateRange) {
        queryString.append('dateRange', options.dateRange);
      }

      const response = await API.get(`/about-content/export?${queryString.toString()}`);
      
      if (format === 'json') {
        return await response.json();
      } else {
        // For other formats, return as blob
        return await response.blob();
      }
    } catch (error) {
      console.error(`Error exporting content in ${format} format:`, error);
      throw error;
    }
  }

  /**
   * Search about content
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @param {string[]} options.sections - Sections to search in
   * @param {boolean} options.includeMetadata - Include metadata in results
   * @param {number} options.limit - Maximum number of results
   * @param {boolean} useCache - Whether to use cache (default: true)
   * @returns {Promise<Object>} Search results
   */
  async searchContent(query, options = {}, useCache = true) {
    const cacheKey = `search-${query}-${JSON.stringify(options)}`;
    
    // Check cache first unless explicitly disabled
    if (useCache) {
      const cachedData = contentCache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    try {
      const queryString = new URLSearchParams();
      queryString.append('q', query);
      
      if (options.sections) {
        queryString.append('sections', options.sections.join(','));
      }
      if (options.includeMetadata !== undefined) {
        queryString.append('includeMetadata', options.includeMetadata);
      }
      if (options.limit) {
        queryString.append('limit', options.limit);
      }

      const response = await API.get(`/about-content/search?${queryString.toString()}`);
      const data = await response.json();
      
      // Cache the result for 10 minutes (shorter cache time for search)
      if (data.success) {
        contentCache.set(cacheKey, data, 10 * 60 * 1000); // 10 minutes
      }
      
      return data;
    } catch (error) {
      console.error('Error searching content:', error);
      throw error;
    }
  }

  /**
   * Clear cache for about content
   * @param {string} section - Specific section to clear (optional)
   */
  clearCache(section = null) {
    if (section) {
      contentCache.remove(`about-content-${section}`);
    } else {
      // Clear all about content cache
      contentCache.clearAll();
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return contentCache.getStats();
  }
}

// Create and export a singleton instance
const aboutService = new AboutService();
export default aboutService;

// Export the class for testing purposes
export { AboutService };
