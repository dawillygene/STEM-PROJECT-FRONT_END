// // import API from './api';
// import API from './mockAPI';

// const blogService = {

//   getBlogData: async () => {
//     try {
//       const response = await API.get('/blog/data');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching blog data:', error);
//       throw error;
//     }
//   },
  

//   getBlogPosts: async (category = 'all') => {
//     try {
//       const params = category !== 'all' ? { category } : {};
//       const response = await API.get('/blog/posts', { params });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching blog posts:', error);
//       throw error;
//     }
//   },
  

//   getCategories: async () => {
//     try {
//       const response = await API.get('/blog/categories');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       throw error;
//     }
//   },
  

//   getComments: async () => {
//     try {
//       const response = await API.get('/blog/comments');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//       throw error;
//     }
//   },
  

//   getPopularArticles: async () => {
//     try {
//       const response = await API.get('/blog/popular-articles');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching popular articles:', error);
//       throw error;
//     }
//   },
  

//   searchPosts: async (query) => {
//     try {
//       const response = await API.get('/blog/search', { params: { query } });
//       return response.data;
//     } catch (error) {
//       console.error('Error searching posts:', error);
//       throw error;
//     }
//   },
  
//   // Post a comment
//   postComment: async (commentData) => {
//     try {
//       const response = await API.post('/blog/comments', commentData);
//       return response.data;
//     } catch (error) {
//       console.error('Error posting comment:', error);
//       throw error;
//     }
//   },
  
//   // Subscribe to newsletter
//   subscribeNewsletter: async (email) => {
//     try {
//       const response = await API.post('/blog/subscribe', { email });
//       return response.data;
//     } catch (error) {
//       console.error('Error subscribing to newsletter:', error);
//       throw error;
//     }
//   },
  
//   // Toggle post like
//   togglePostLike: async (postId) => {
//     try {
//       const response = await API.post(`/blog/posts/${postId}/toggle-like`);
//       return response.data;
//     } catch (error) {
//       console.error('Error toggling post like:', error);
//       throw error;
//     }
//   },
  
//   // Toggle comment like
//   toggleCommentLike: async (commentId) => {
//     try {
//       const response = await API.post(`/blog/comments/${commentId}/toggle-like`);
//       return response.data;
//     } catch (error) {
//       console.error('Error toggling comment like:', error);
//       throw error;
//     }
//   }
// };

// export default blogService;

import API from './api';

const blogService = {
  getBlogData: async () => {
    try {
      const response = await API.get('/blogData.json');
      return response.data.blogData;
    } catch (error) {
      console.error('Error fetching blog data:', error);
      throw error;
    }
  },

  getBlogPosts: async (category = 'all') => {
    try {
      const response = await API.get('/blogData.json');
      const allPosts = response.data.blogPosts;
      
      if (category === 'all') {
        return allPosts;
      } else {
        return allPosts.filter(post => post.categoryId === category);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await API.get('/blogData.json');
      return response.data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getPopularArticles: async () => {
    try {
      const response = await API.get('/blogData.json');
      return response.data.popularArticles;
    } catch (error) {
      console.error('Error fetching popular articles:', error);
      throw error;
    }
  },


  async subscribeNewsletter(email) {
    try {
      // API call to subscribe to newsletter
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  postComment: async (commentData) => {
        try {
          const response = await API.post('/blog/comments', commentData);
          return response.data;
        } catch (error) {
          console.error('Error posting comment:', error);
          throw error;
        }
      },

  getComments: async () => {
    try {
      const response = await API.get('/blogData.json');
      return response.data.comments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }
};

export default blogService;