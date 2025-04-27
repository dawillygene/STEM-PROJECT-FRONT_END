// components/Comments/CommentItem.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { commentService } from '../../services/BlogServiceapi';
import CommentForm from './CommentForm';

const CommentItem = ({ comment, onReplyAdded, onCommentUpdated }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);

  const handleLike = async () => {
    if (!liked) {
      try {
        await commentService.likeComment(comment.id);
        setLiked(true);
        setLikesCount(prev => prev + 1);
        if (onCommentUpdated) {
          onCommentUpdated(comment.id, { ...comment, likes: likesCount + 1 });
        }
      } catch (error) {
        console.error('Failed to like comment', error);
      }
    }
  };

  const handleReplySubmit = async (replyData) => {
    try {
      const response = await commentService.addComment({
        ...replyData,
        parentId: comment.id
      });
      
      if (response.success && onReplyAdded) {
        onReplyAdded(comment.id, response.comment);
      }
      setShowReplyForm(false);
    } catch (error) {
      console.error('Failed to add reply', error);
    }
  };

  return (
    <div className="comment-item">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 font-bold">{comment.initials}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-800">{comment.author}</h4>
            <p className="text-sm text-gray-500">{comment.time}</p>
          </div>
          <p className="text-gray-700 mt-2">{comment.content}</p>

          <div className="mt-3 flex items-center space-x-4">
            <button 
              className="text-sm text-gray-500 hover:text-blue-600 transition"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              Reply
            </button>
            <button 
              className={`reaction-btn text-sm ${liked ? "text-blue-600" : "text-gray-500"}`}
              onClick={handleLike}
            >
              <i className="far fa-thumbs-up"></i>
              <span className="ml-1">{likesCount}</span>
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-4">
              <CommentForm 
                postId={comment.postId} 
                parentId={comment.id}
                onSubmit={handleReplySubmit}
                onCancel={() => setShowReplyForm(false)}
                isReply={true}
              />
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map(reply => (
                <div key={reply.id} className="ml-6 pl-4 border-l-2 border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 font-bold">{reply.initials}</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-gray-800">{reply.author}</h5>
                        <p className="text-sm text-gray-500">{reply.time}</p>
                      </div>
                      <p className="text-gray-700 mt-2">{reply.content}</p>
                      <div className="mt-2">
                        <button 
                          className="text-sm text-gray-500 hover:text-blue-600 transition mr-3"
                          onClick={() => setShowReplyForm(!showReplyForm)}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
