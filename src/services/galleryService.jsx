import API from './api';

const galleryService = {
  // Get all gallery items
  getAllGalleryItems: async () => {
    try {
      const response = await API.get('/gallery');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  },

  // Get gallery item by ID
  getGalleryItemById: async (id) => {
    try {
      const response = await API.get(`/gallery/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching gallery item:', error);
      throw error;
    }
  },

  // Get gallery items by category
  getGalleryItemsByCategory: async (categoryId) => {
    try {
      const response = await API.get(`/gallery/category/${categoryId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching gallery items by category:', error);
      throw error;
    }
  },

  // Get gallery items by tag
  getGalleryItemsByTag: async (tag) => {
    try {
      const response = await API.get(`/gallery/tag/${tag}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching gallery items by tag:', error);
      throw error;
    }
  },

  // Get featured gallery items
  getFeaturedGalleryItems: async () => {
    try {
      const response = await API.get('/gallery/featured');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching featured gallery items:', error);
      throw error;
    }
  },

  // Increment view count
  incrementViewCount: async (id) => {
    try {
      const response = await API.post(`/gallery/${id}/view`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error incrementing view count:', error);
      throw error;
    }
  },

  // Legacy method for backward compatibility
  getGalleryItems: async (category = 'all') => {
    try {
      if (category === 'all') {
        return await this.getAllGalleryItems();
      } else {
        return await this.getGalleryItemsByCategory(category);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  },


  getCategories: async () => {
    try {
      const response = await API.get('/gallery/categories');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching gallery categories:', error);
      throw error;
    }
  }
};

export default galleryService;
