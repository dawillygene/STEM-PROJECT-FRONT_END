import API from './api.js';

/**
 * Team Service for handling team member related API calls
 */
class TeamService {
  /**
   * Get all team members with optional search and pagination
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search term for filtering
   * @param {number} params.limit - Number of results to return
   * @param {number} params.offset - Number of results to skip
   * @param {string} params.sort - Sort field (name, role, qualification)
   * @param {string} params.order - Sort order (asc, desc)
   * @returns {Promise<Object>} Team members data
   */
  async getTeamMembers(params = {}) {
    try {
      const queryString = new URLSearchParams();
      
      if (params.search) queryString.append('search', params.search);
      if (params.limit) queryString.append('limit', params.limit);
      if (params.offset) queryString.append('offset', params.offset);
      if (params.sort) queryString.append('sort', params.sort);
      if (params.order) queryString.append('order', params.order);

      const endpoint = `/team-members${queryString.toString() ? `?${queryString.toString()}` : ''}`;
      const response = await API.get(endpoint);
      return await response.json();
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  }

  /**
   * Get a single team member by ID
   * @param {number} id - Team member ID
   * @returns {Promise<Object>} Team member data
   */
  async getTeamMember(id) {
    try {
      const response = await API.get(`/team-members/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching team member ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new team member (Admin only)
   * @param {Object} teamMemberData - Team member data
   * @returns {Promise<Object>} Created team member data
   */
  async createTeamMember(teamMemberData) {
    try {
      const response = await API.post('/team-members', teamMemberData);
      return await response.json();
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  }

  /**
   * Update an existing team member (Admin only)
   * @param {number} id - Team member ID
   * @param {Object} teamMemberData - Updated team member data
   * @returns {Promise<Object>} Updated team member data
   */
  async updateTeamMember(id, teamMemberData) {
    try {
      const response = await API.put(`/team-members/${id}`, teamMemberData);
      return await response.json();
    } catch (error) {
      console.error(`Error updating team member ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a team member (Admin only)
   * @param {number} id - Team member ID
   * @returns {Promise<Object>} Success message
   */
  async deleteTeamMember(id) {
    try {
      const response = await API.delete(`/team-members/${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting team member ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search team members with debounced input
   * @param {string} searchTerm - Search term
   * @param {number} delay - Debounce delay in milliseconds (default: 300)
   * @returns {Promise<Object>} Filtered team members
   */
  async searchTeamMembers(searchTerm, delay = 300) {
    return new Promise((resolve) => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        try {
          const result = await this.getTeamMembers({ search: searchTerm });
          resolve(result);
        } catch (error) {
          console.error('Error searching team members:', error);
          throw error;
        }
      }, delay);
    });
  }
}

// Create and export a singleton instance
const teamService = new TeamService();
export default teamService;

// Export the class for testing purposes
export { TeamService };
