
const API_BASE_URL = import.meta.env.DEV 
  ? '/api'
  : import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.109:8000/api';

class APIService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    const response = await this.request(endpoint, {
      method: 'GET',
      ...options,
    });
    return response;
  }

  async post(endpoint, data = null, options = {}) {
    const response = await this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
      ...options,
    });
    return response;
  }

  async put(endpoint, data = null, options = {}) {
    const response = await this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
      ...options,
    });
    return response;
  }

  async delete(endpoint, options = {}) {
    const response = await this.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
    return response;
  }
}

const API = new APIService();
export default API;