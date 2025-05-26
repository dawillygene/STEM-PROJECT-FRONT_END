import React, { useState, useEffect, useCallback } from "react";

const CommentSection = ({
  postId,
  postComments,
  setPostComments,
  commentLikes,
  handleCommentLike,
}) => {
  const [newComment, setNewComment] = useState({ name: "", email: "", content: "" });
  const [commentError, setCommentError] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    if (!postComments[postId]) {
      fetch(`/api/comments/post/${postId}`)
        .then((res) => res.ok ? res.json() : Promise.reject())
        .then((data) => {
          setPostComments((prev) => ({
            ...prev,
            [postId]: data.map((c) => ({
              id: c.id,
              author: c.guestAuthorName,
              initials: c.guestAuthorName
                ? c.guestAuthorName.split(" ").map((n) => n[0]).join("")
                : "U",
              time: c.createdAt ? new Date(c.createdAt).toLocaleString() : "",
              content: c.content,
              likes: 0,
              replies: [],
            })),
          }));
        })
        .catch(() => {});
    }
  }, [postId, postComments, setPostComments]);

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError("");
    if (!newComment.name || !newComment.content || !newComment.email) {
      setCommentError("All fields are required.");
      return;
    }
    setCommentSubmitting(true);
    try {
      const res = await fetch(`/api/comments/post/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment.content,
          guestAuthorName: newComment.name,
          guestAuthorEmail: newComment.email,
        }),
      });
      if (!res.ok) throw new Error();
      const newCommentObj = {
        id: (postComments[postId]?.length || 0) + 1,
        author: newComment.name,
        initials: newComment.name.split(" ").map((n) => n[0]).join(""),
        time: "Just now",
        content: newComment.content,
        likes: 0,
        replies: [],
      };
      setPostComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newCommentObj],
      }));
      setNewComment({ name: "", email: "", content: "" });
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 2000);
    } catch {
      setCommentError("Failed to post comment. Please try again.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="text-lg font-bold mb-4">Comments</h4>
      <div className="space-y-4 mb-6">
        {postComments[postId]?.length > 0 ? (
          postComments[postId].map((comment) => (
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
                      className={`text-xs ${
                        commentLikes[`post-${postId}-comment-${comment.id}`]
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-600"
                      }`}
                      onClick={() => handleCommentLike(`post-${postId}-comment-${comment.id}`)}
                      aria-label="Like comment"
                    >
                      <i
                        className={`${
                          commentLikes[`post-${postId}-comment-${comment.id}`] ? "fas" : "far"
                        } fa-thumbs-up`}
                      ></i>
                      <span className="ml-1">{comment.likes}</span>
                    </button>
                  </div>
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
        {commentError && (
          <div className="bg-red-50 p-2 rounded mb-2 text-red-600 text-sm">{commentError}</div>
        )}
        {commentSuccess && (
          <div className="bg-green-50 p-2 rounded mb-2 text-green-700 text-sm">Comment posted!</div>
        )}
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
                disabled={commentSubmitting}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email*"
                className="w-full px-3 py-2 border rounded"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                required
                disabled={commentSubmitting}
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
            disabled={commentSubmitting}
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: "#0066CC" }}
              disabled={commentSubmitting}
            >
              {commentSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;