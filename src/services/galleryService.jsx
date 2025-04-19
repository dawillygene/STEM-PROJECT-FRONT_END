
import API from './api';

const galleryService = {

  getGalleryItems: async (category = 'all') => {
    try {
      const params = category !== 'all' ? { category } : {};
      const response = await API.get('/gallery/items', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  },
  

  getCategories: async () => {
    try {
      const response = await API.get('/gallery/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery categories:', error);
      throw error;
    }
  }
};

export default galleryService;
