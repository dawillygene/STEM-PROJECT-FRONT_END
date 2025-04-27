// services/api.js
const API_URL = '/api';

// Posts API
export const postService = {
  // Get all posts with pagination
  getPosts: async (page = 1, limit = 10) => {
    try {
      const response = await fetch(`${API_URL}/blog/posts?page=${page}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  
  // Get single post
  getPost: async (id) => {
    try {
      const response = await fetch(`${API_URL}/blog/posts/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },
  
  // Create new post
  createPost: async (postData) => {
    try {
      const response = await fetch(`${API_URL}/blog/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  
  // Update post
  updatePost: async (id, postData) => {
    try {
      const response = await fetch(`${API_URL}/blog/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },
  
  // Delete post
  deletePost: async (id) => {
    try {
      const response = await fetch(`${API_URL}/blog/posts/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
};

// Comments API
export const commentService = {
  // Get comments for a post
  getCommentsByPost: async (postId) => {
    try {
      const response = await fetch(`${API_URL}/comments/by-post/${postId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  
  // Add a comment
  addComment: async (commentData) => {
    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },
  
  // Like a comment
  likeComment: async (commentId) => {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' })
      });
      return await response.json();
    } catch (error) {
      console.error('Error liking comment:', error);
      throw error;
    }
  },
  
  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
};
