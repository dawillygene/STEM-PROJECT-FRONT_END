import React from 'react'
import CONTENT from "../../constants/content";
import { motion } from "framer-motion";

const CommentSection = ({ comments, formState, setFormState, handleCommentSubmit, commentLikes, handleCommentLike }) => {
  return (
   <>
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#0066CC" }}>
          {CONTENT.header.joinDiscussion}
        </h2>
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="space-y-4" onSubmit={handleCommentSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  value={formState.name}
                  onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  value={formState.email}
                  onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                value={formState.comment}
                onChange={(e) => setFormState((prev) => ({ ...prev, comment: e.target.value }))}
                id="comment"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Your comment"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <motion.button
                type="submit"
                className="px-6 py-2 rounded-lg text-white font-medium transition"
                style={{ backgroundColor: "#0066CC" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {formState.submitted ? (
                  <span className="flex items-center">
                    <i className="fas fa-check mr-2"></i> {CONTENT.comments.form.successMessage}
                  </span>
                ) : (
                  <span>{CONTENT.comments.form.button}</span>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
        <div className="space-y-6">
          {comments.map((comment, commentIndex) => (
            <motion.div
              key={commentIndex}
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: commentIndex * 0.1 }}
            >
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
                    <button className="text-sm text-gray-500 hover:text-blue-600 transition" aria-label="Reply to comment">
                      Reply
                    </button>
                    <button
                      className={`reaction-btn text-sm ${
                        commentLikes[`comment-${commentIndex}`] ? "text-blue-600" : "text-gray-500"
                      }`}
                      onClick={() => handleCommentLike(`comment-${commentIndex}`)}
                      aria-label="Like comment"
                    >
                      <i className="far fa-thumbs-up"></i>
                      <span className="ml-1">{comment.likes}</span>
                    </button>
                  </div>
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="mt-4 ml-6 pl-4 border-l-2 border-gray-200">
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
                          <div className="mt-3 flex items-center space-x-4">
                            <button className="text-sm text-gray-500 hover:text-blue-600 transition" aria-label="Reply to reply">
                              Reply
                            </button>
                            <button
                              className={`reaction-btn text-sm ${
                                commentLikes[`comment-${commentIndex}-reply-${replyIndex}`]
                                  ? "text-blue-600"
                                  : "text-gray-500"
                              }`}
                              onClick={() => handleCommentLike(`comment-${commentIndex}-reply-${replyIndex}`)}
                              aria-label="Like reply"
                            >
                              <i className="far fa-thumbs-up"></i>
                              <span className="ml-1">{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
   </>
  )
}

export default CommentSection


