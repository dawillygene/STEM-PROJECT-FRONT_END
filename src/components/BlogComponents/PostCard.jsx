import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

const PostCard = ({
    post,
    activeCommentPostId,
    setActiveCommentPostId,
    postComments,
    setPostComments,
    commentLikes,
    handleCommentLike,
  }) => {
    const [reactionStates, setReactionStates] = useState({ [`post-${post.id}-like`]: false });
    const [newComment, setNewComment] = useState({ name: "", email: "", content: "" });
    const [replyForm, setReplyForm] = useState({ postId: null, commentId: null, name: "", email: "", content: "" });
    const [showReplyForm, setShowReplyForm] = useState({ postId: null, commentId: null });
  
    const handleReactionClick = useCallback((key) => {
      setReactionStates((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);
  
    const handleCommentClick = useCallback(() => {
      setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id);
    }, [activeCommentPostId, post.id, setActiveCommentPostId]);
  
    const handleNewCommentSubmit = useCallback(
      (e) => {
        e.preventDefault();
        if (!newComment.name || !newComment.content) return;
        const newCommentObj = {
          id: (postComments[post.id]?.length || 0) + 1,
          author: newComment.name,
          initials: newComment.name.split(" ").map((n) => n[0]).join(""),
          time: "Just now",
          content: newComment.content,
          likes: 0,
          replies: [],
        };
        setPostComments((prev) => ({
          ...prev,
          [post.id]: [...(prev[post.id] || []), newCommentObj],
        }));
        setNewComment({ name: "", email: "", content: "" });
      },
      [newComment, post.id, postComments, setPostComments]
    );
  
    const handleReplyClick = useCallback(
      (postId, commentId) => {
        setShowReplyForm({ postId, commentId });
        setReplyForm({ ...replyForm, postId, commentId });
      },
      [replyForm]
    );
  
    const handleReplySubmit = useCallback(
      (e) => {
        e.preventDefault();
        if (!replyForm.name || !replyForm.content) return;
        const { postId, commentId } = replyForm;
        const newReply = {
          id: postComments[postId].find((c) => c.id === commentId).replies.length + 1,
          author: replyForm.name,
          initials: replyForm.name.split(" ").map((n) => n[0]).join(""),
          time: "Just now",
          content: replyForm.content,
          likes: 0,
        };
        setPostComments((prev) => {
          const updatedComments = [...prev[postId]];
          const commentIndex = updatedComments.findIndex((c) => c.id === commentId);
          if (commentIndex !== -1) {
            updatedComments[commentIndex] = {
              ...updatedComments[commentIndex],
              replies: [...updatedComments[commentIndex].replies, newReply],
            };
          }
          return { ...prev, [postId]: updatedComments };
        });
        setReplyForm({ postId: null, commentId: null, name: "", email: "", content: "" });
        setShowReplyForm({ postId: null, commentId: null });
      },
      [replyForm, postComments, setPostComments]
    );
  
    return (
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow-md blog-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={post.image} alt={post.alt} className="w-full max-h-auto object-cover object-center" />
        <div className="p-6">
          <div className="flex items-center mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "#0066CC", color: "white" }}
            >
              {post.category.name}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3" style={{ color: "#0066CC" }}>
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4">{post.content}</p>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-bold">{post.author.initials}</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.date}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                className="reaction-btn text-gray-500 hover:text-blue-600"
                onClick={() => handleReactionClick(`post-${post.id}-like`)}
                aria-label="Like post"
              >
                <i className={`${reactionStates[`post-${post.id}-like`] ? "fas" : "far"} fa-thumbs-up`}></i>
                <span className="ml-1">{post.reactions.likes}</span>
              </button>
              <button
                className={`reaction-btn ${activeCommentPostId === post.id ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                onClick={handleCommentClick}
                aria-label="Comment on post"
              >
                <i className={`${activeCommentPostId === post.id ? "fas" : "far"} fa-comment`}></i>
                <span className="ml-1">{(postComments[post.id]?.length || 0)}</span>
              </button>
              <button className="share-btn text-gray-500 hover:text-blue-600" aria-label="Share post">
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
          {activeCommentPostId === post.id && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-bold mb-4">Comments</h4>
              <div className="space-y-4 mb-6">
                {postComments[post.id]?.length > 0 ? (
                  postComments[post.id].map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-bold">{comment.initials}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-gray-800">{comment.author}</h5>
                            <p className="text-xs text-gray-500">{comment.time}</p>
                          </div>
                          <p className="text-gray-700 mt-1">{comment.content}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <button
                              className="text-xs text-gray-500 hover:text-blue-600 transition"
                              onClick={() => handleReplyClick(post.id, comment.id)}
                              aria-label="Reply to comment"
                            >
                              Reply
                            </button>
                            <button
                              className={`text-xs ${
                                commentLikes[`post-${post.id}-comment-${comment.id}`]
                                  ? "text-blue-600"
                                  : "text-gray-500 hover:text-blue-600"
                              }`}
                              onClick={() => handleCommentLike(`post-${post.id}-comment-${comment.id}`)}
                              aria-label="Like comment"
                            >
                              <i
                                className={`${
                                  commentLikes[`post-${post.id}-comment-${comment.id}`] ? "fas" : "far"
                                } fa-thumbs-up`}
                              ></i>
                              <span className="ml-1">{comment.likes}</span>
                            </button>
                          </div>
                          {showReplyForm.postId === post.id && showReplyForm.commentId === comment.id && (
                            <form className="mt-3 pl-4" onSubmit={handleReplySubmit}>
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <input
                                  type="text"
                                  placeholder="Your name"
                                  className="px-3 py-1 border rounded text-sm"
                                  value={replyForm.name}
                                  onChange={(e) => setReplyForm({ ...replyForm, name: e.target.value })}
                                />
                                <input
                                  type="email"
                                  placeholder="Your email"
                                  className="px-3 py-1 border rounded text-sm"
                                  value={replyForm.email}
                                  onChange={(e) => setReplyForm({ ...replyForm, email: e.target.value })}
                                />
                              </div>
                              <textarea
                                placeholder="Your reply"
                                className="w-full px-3 py-1 border rounded text-sm mb-2"
                                rows="2"
                                value={replyForm.content}
                                onChange={(e) => setReplyForm({ ...replyForm, content: e.target.value })}
                              ></textarea>
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                >
                                  Post Reply
                                </button>
                              </div>
                            </form>
                          )}
                          {comment.replies.length > 0 && (
                            <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-200">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="pt-2">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                                      <span className="text-gray-600 font-bold text-xs">{reply.initials}</span>
                                    </div>
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <h6 className="font-bold text-gray-800 text-sm">{reply.author}</h6>
                                        <p className="text-xs text-gray-500">{reply.time}</p>
                                      </div>
                                      <p className="text-gray-700 text-sm mt-1">{reply.content}</p>
                                      <button
                                        className={`text-xs mt-1 ${
                                          commentLikes[`post-${post.id}-comment-${comment.id}-reply-${reply.id}`]
                                            ? "text-blue-600"
                                            : "text-gray-500 hover:text-blue-600"
                                        }`}
                                        onClick={() =>
                                          handleCommentLike(`post-${post.id}-comment-${comment.id}-reply-${reply.id}`)
                                        }
                                        aria-label="Like reply"
                                      >
                                        <i
                                          className={`${
                                            commentLikes[`post-${post.id}-comment-${comment.id}-reply-${reply.id}`]
                                              ? "fas"
                                              : "far"
                                          } fa-thumbs-up`}
                                        ></i>
                                        <span className="ml-1">{reply.likes}</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                )}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-bold text-gray-800 mb-3">Leave a comment</h5>
                <form onSubmit={handleNewCommentSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name*"
                        className="w-full px-3 py-2 border rounded"
                        value={newComment.name}
                        onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-3 py-2 border rounded"
                        value={newComment.email}
                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Your comment*"
                    className="w-full px-3 py-2 border rounded mb-4"
                    rows="3"
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    required
                  ></textarea>
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: "#0066CC" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Post Comment
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };
  

export default PostCard;