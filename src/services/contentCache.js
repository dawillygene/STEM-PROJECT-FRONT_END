/**
 * Content caching service for About page
 * Implements localStorage caching with expiration
 * 
 * @author Elia William Mariki (@dawillygene)
 */

class ContentCache {
  constructor() {
    this.cachePrefix = 'stem_about_';
    this.defaultExpiration = 30 * 60 * 1000; // 30 minutes in milliseconds
  }

  /**
   * Generate cache key
   * @param {string} key - The cache key
   * @returns {string} Prefixed cache key
   */
  getCacheKey(key) {
    return `${this.cachePrefix}${key}`;
  }

  /**
   * Check if localStorage is available
   * @returns {boolean} True if localStorage is available
   */
  isLocalStorageAvailable() {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Set cache with expiration
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {number} expiration - Expiration time in milliseconds (optional)
   */
  set(key, data, expiration = this.defaultExpiration) {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage not available, skipping cache');
      return;
    }

    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        expiration
      };

      localStorage.setItem(this.getCacheKey(key), JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error setting cache:', error);
      // Clear some old cache if storage is full
      this.clearExpired();
    }
  }

  /**
   * Get cached data
   * @param {string} key - Cache key
   * @returns {any|null} Cached data or null if not found/expired
   */
  get(key) {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    try {
      const cachedItem = localStorage.getItem(this.getCacheKey(key));
      if (!cachedItem) {
        return null;
      }

      const cacheData = JSON.parse(cachedItem);
      const now = Date.now();

      // Check if expired
      if (now - cacheData.timestamp > cacheData.expiration) {
        this.remove(key);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.error('Error getting cache:', error);
      this.remove(key);
      return null;
    }
  }

  /**
   * Remove cached item
   * @param {string} key - Cache key
   */
  remove(key) {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(this.getCacheKey(key));
    } catch (error) {
      console.error('Error removing cache:', error);
    }
  }

  /**
   * Clear all expired cache items
   */
  clearExpired() {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    try {
      const now = Date.now();
      const keysToRemove = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.cachePrefix)) {
          const cachedItem = localStorage.getItem(key);
          if (cachedItem) {
            const cacheData = JSON.parse(cachedItem);
            if (now - cacheData.timestamp > cacheData.expiration) {
              keysToRemove.push(key);
            }
          }
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing expired cache:', error);
    }
  }

  /**
   * Clear all cache items
   */
  clearAll() {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    try {
      const keysToRemove = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.cachePrefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getStats() {
    if (!this.isLocalStorageAvailable()) {
      return { totalItems: 0, totalSize: 0, expiredItems: 0 };
    }

    try {
      let totalItems = 0;
      let totalSize = 0;
      let expiredItems = 0;
      const now = Date.now();

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.cachePrefix)) {
          const cachedItem = localStorage.getItem(key);
          if (cachedItem) {
            totalItems++;
            totalSize += cachedItem.length;

            const cacheData = JSON.parse(cachedItem);
            if (now - cacheData.timestamp > cacheData.expiration) {
              expiredItems++;
            }
          }
        }
      }

      return {
        totalItems,
        totalSize,
        expiredItems,
        totalSizeKB: Math.round(totalSize / 1024)
      };
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return { totalItems: 0, totalSize: 0, expiredItems: 0 };
    }
  }

  /**
   * Check if cache has valid data
   * @param {string} key - Cache key
   * @returns {boolean} True if cache has valid data
   */
  has(key) {
    return this.get(key) !== null;
  }
}

// Export singleton instance
const contentCache = new ContentCache();

export default contentCache;
