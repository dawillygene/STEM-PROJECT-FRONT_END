import React, { useCallback } from "react";
import { motion } from "framer-motion";
import CommentSection from "../Comments/CommentSection";

const PostCard = ({
  post,
  activeCommentPostId,
  setActiveCommentPostId,
  postComments,
  setPostComments,
  commentLikes,
  handleCommentLike,
}) => {
  const handleCommentClick = useCallback(() => {
    setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id);
  }, [activeCommentPostId, post.id, setActiveCommentPostId]);

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
              className={`reaction-btn ${activeCommentPostId === post.id ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
              onClick={handleCommentClick}
              aria-label="Comment on post"
            >
              <i className={`${activeCommentPostId === post.id ? "fas" : "far"} fa-comment`}></i>
              <span className="ml-1">{(postComments[post.id]?.length || post.reactions.comments)}</span>
            </button>
            <button className="share-btn text-gray-500 hover:text-blue-600" aria-label="Share post">
              <i className="fas fa-share-alt"></i>
            </button>
          </div>
        </div>
        {activeCommentPostId === post.id && (
          <CommentSection
            postId={post.id}
            postComments={postComments}
            setPostComments={setPostComments}
            commentLikes={commentLikes}
            handleCommentLike={handleCommentLike}
          />
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;