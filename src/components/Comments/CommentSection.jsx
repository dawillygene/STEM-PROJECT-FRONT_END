// components/Comments/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import { commentService } from '../../services/BlogServiceapi';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await commentService.getCommentsByPost(postId);
        setComments(data);
        setError('');
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Handle new comment submission
  const handleCommentSubmit = async (commentData) => {
    try {
      const response = await commentService.addComment(commentData);
      
      if (response.success) {
        // Add the new comment to the list
        setComments([response.comment, ...comments]);
        return response;
      }
    } catch (error) {
      console.error('Failed to submit comment', error);
      throw error;
    }
  };

  // Handle reply to a comment
  const handleReplyAdded = (parentId, newReply) => {
    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    }));
  };

  // Handle comment update (e.g., likes)
  const handleCommentUpdated = (commentId, updatedComment) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, ...updatedComment } : comment
    ));
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#0066CC" }}>
          Join the Discussion
        </h2>

        <CommentForm postId={postId} onSubmit={handleCommentSubmit} />

        {loading ? (
          <div className="text-center py-8">
            <div className="spinner"></div>
            <p className="mt-2 text-gray-600">Loading comments...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-600 my-4">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment, index) => (
                <CommentItem 
                  key={comment.id} 
                  comment={comment}
                  onReplyAdded={handleReplyAdded}
                  onCommentUpdated={handleCommentUpdated}
                />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
