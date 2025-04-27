
import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Search from '../components/Search/SearchWithDropdown';
// import STATIC_COMMENTS from '../constants/Comments';


const STATIC_COMMENTS = {
    1: [
      {
        id: 1,
        author: "Maria Bukuku",
        initials: "MB",
        time: "2 days ago",
        content: "This initiative is exactly what we need in our schools. As a science teacher in a rural secondary school, I've seen firsthand how limited resources impact learning outcomes.",
        likes: 12,
        replies: [
          {
            id: 1,
            author: "Dr. Rose Matete",
            initials: "RM",
            time: "1 day ago",
            content: "Thank you for sharing your experience, Maria. We'd love to hear more about the specific challenges you face.",
            likes: 5,
          },
        ],
      },
    ],
    2: [
      {
        id: 1,
        author: "James Kimaro",
        initials: "JK",
        time: "3 days ago",
        content: "What specific strategies are being considered to encourage more girls to pursue STEM subjects? This is a critical issue in our region.",
        likes: 8,
        replies: [],
      },
    ],
    3: [
      {
        id: 1,
        author: "Fatima Hassan",
        initials: "FH",
        time: "1 week ago",
        content: "The laboratory equipment mentioned in this article has transformed how our students engage with practical science. It's making a real difference!",
        likes: 15,
        replies: [
          {
            id: 1,
            author: "Prof. Julius Nyahongo",
            initials: "JN",
            time: "6 days ago",
            content: "Glad to hear that, Fatima! We're planning to expand this program to more schools in the coming year.",
            likes: 7,
          },
        ],
      },
    ],
  };



const blogData = {
    title: "Blog | Publication",
    description: "Exploring innovations and insights in Mathematics and Science Education in Tanzania",
    featuredPost: {
        title: "Transforming STEM Education: New Approaches in Tanzanian Schools",
        excerpt: "Discover how innovative teaching methods and laboratory experiences are changing the way students engage with science and mathematics in Tanzania's secondary schools...",
        tags: [
            { label: "Featured", color: "#FFAD03", textColor: "#333" },
            { label: "STEM Education", color: "#0066CC", textColor: "white" }
        ],
        author: {
            name: "Prof. Julius Nyahongo",
            initials: "JN",
            image: "https://www.acacia.edu/wp-content/uploads/2024/07/young-boy-learning-more-about-chemistry-class.jpg"
        },
        date: "November 15, 2022",
        readTime: "8 min read",
        button: {
            label: "Read More",
            color: "#FD9148"
        }
    }
};



const posts = await fetch('api/blog/posts');
const postData = await posts.json();

const categories = await fetch('api/blog/categories');
const categoryData = await categories.json();

const PopularArticles = await fetch('api/blog/popular');
const popularArticles = await PopularArticles.json();




const Blog = () => {



    const CONTENT = {
        header: {
            latestArticles: "Latest Articles",
            searchPlaceholder: "Search articles...",
            joinDiscussion: "Join the Discussion",
        },
        categories: [
            { id: "all", name: "All" },
            { id: "stem", name: "STEM Education" },
            { id: "teacher", name: "Teacher Training" },
            { id: "laboratories", name: "Laboratories" },
            { id: "community", name: "Community Engagement" },
        ],
        searchResults: [
            {
                title: "Transforming STEM Education in Tanzania",
                description: "New approaches in schools...",
            },
            {
                title: "Building Effective Laboratories",
                description: "Resources for schools...",
            },
            {
                title: "Women in STEM: Tanzanian Perspective",
                description: "Breaking barriers...",
            },
        ],
       
        pagination: {
            pages: [1, 2, 3],
            currentPage: 1,
        },
        sidebar: {
            newsletter: {
                title: "Stay Updated",
                description:
                    "Subscribe to our newsletter for the latest updates on STEM education initiatives in Tanzania.",
                placeholder: "Your email address",
                buttonText: "Subscribe",
                successText: "Subscribed!",
            },
           
            popularArticles: {
                title: "Popular Articles",
            },
            tags: {
                title: "Popular Tags",
                items: [
                    "#STEM",
                    "#Mathematics",
                    "#Science",
                    "#Education",
                    "#Tanzania",
                    "#TeacherTraining",
                    "#Laboratories",
                    "#Community",
                    "#WomenInSTEM",
                    "#Innovation",
                    "#Research",
                ],
            },
        },
        comments: {
            form: {
                namePlaceholder: "Name",
                emailPlaceholder: "Email",
                commentPlaceholder: "Comment",
                button: "Post Comment",
                successMessage: "Comment Posted!",
            },
            existing: [
                {
                    author: "Maria Bukuku",
                    initials: "MB",
                    time: "2 days ago",
                    content:
                        "This initiative is exactly what we need in our schools. As a science teacher in a rural secondary school, I've seen firsthand how limited resources impact learning outcomes. I'm excited to see how this program develops!",
                    likes: 12,
                    replies: [
                        {
                            author: "Dr. Rose Matete",
                            initials: "RM",
                            time: "1 day ago",
                            content:
                                "Thank you for sharing your experience, Maria. We'd love to hear more about the specific challenges you face. Please reach out to us directly at stem@udom.ac.tz.",
                            likes: 5,
                        },
                    ],
                },
                {
                    author: "James Kimaro",
                    initials: "JK",
                    time: "3 days ago",
                    content:
                        "What specific strategies are being considered to encourage more girls to pursue STEM subjects? This is a critical issue in our region that needs targeted interventions.",
                    likes: 8,
                    replies: [],
                },
            ],
        },
    };


    const [activeCategory, setActiveCategory] = useState("all");
    const [subscribedState, setSubscribedState] = useState(false);
    const [activeCommentPostId, setActiveCommentPostId] = useState(null);
    const [postComments, setPostComments] = useState(STATIC_COMMENTS);
    const [newComment, setNewComment] = useState({
      name: "",
      email: "",
      content: "",
    });
    const [commentLikes, setCommentLikes] = useState({});
   
   
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        comment: "",
        submitted: false,
    });
    const [reactionStates, setReactionStates] = useState(
        postData.reduce((acc, post) => {
            acc[`post-${post.id}-like`] = false;
            acc[`post-${post.id}-comment`] = false;
            return acc;
        }, {})
    );
    // const [commentLikes, setCommentLikes] = useState(
    //     CONTENT.comments.existing.reduce((acc, comment, index) => {
    //         acc[`comment-${index}`] = false;
    //         comment.replies.forEach((_, replyIndex) => {
    //             acc[`comment-${index}-reply-${replyIndex}`] = false;
    //         });
    //         return acc;
    //     }, {})
    // );
    const [formData, setFormData] = useState({
        email: "",
    });

    const handleReactionClick = (key) => {
        setReactionStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };


    const handleCommentLike = (key) => {
        setCommentLikes((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };


    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setFormState((prev) => ({ ...prev, submitted: true }));

        // Reset form after timeout
        setTimeout(() => {
            setFormState({
                name: "",
                email: "",
                comment: "",
                submitted: false,
            });
        }, 2000);
    };


   async function handleSubscribe (e){
        e.preventDefault();

  
        const res = await fetch("api/subscribe", {
          method: "post",
          body: JSON.stringify(formData),
        });
    
        const data = await res.json();

if (data.success) {
            setSubscribedState(true);
      
        setFormData({ email: "" });
        setTimeout(() => {
            setSubscribedState(false);
        }, 5000);
    }
    else {
        // console.error("Subscription failed:", data.message);
    }
    };


    const filteredPosts = postData.filter(
        (post) => activeCategory === "all" || post.category.id === activeCategory
    );




    useEffect(() => {
        const likesState = {};
        
        Object.entries(postComments).forEach(([postId, comments]) => {
          comments.forEach((comment) => {
            likesState[`post-${postId}-comment-${comment.id}`] = false;
            
            comment.replies.forEach((reply) => {
              likesState[`post-${postId}-comment-${comment.id}-reply-${reply.id}`] = false;
            });
          });
        });
        
        setCommentLikes({...commentLikes, ...likesState});
      }, [postComments]);

      const handleCommentClick = (postId) => {
        setActiveCommentPostId(activeCommentPostId === postId ? null : postId);
      };

      const handleNewCommentSubmit = (e, postId) => {
        e.preventDefault();
        
        if (!newComment.name || !newComment.content) {
          return; // Basic validation
        }
        
        const newCommentObj = {
          id: postComments[postId] ? postComments[postId].length + 1 : 1,
          author: newComment.name,
          initials: newComment.name.split(' ').map(n => n[0]).join(''),
          time: "Just now",
          content: newComment.content,
          likes: 0,
          replies: [],
        };
        
        setPostComments((prev) => ({
          ...prev,
          [postId]: prev[postId] ? [...prev[postId], newCommentObj] : [newCommentObj],
        }));
        
        // Reset form
        setNewComment({
          name: "",
          email: "",
          content: "",
        });
      };

      const [replyForm, setReplyForm] = useState({
        postId: null,
        commentId: null,
        name: "",
        email: "",
        content: "",
      });

      const [showReplyForm, setShowReplyForm] = useState({
        postId: null,
        commentId: null,
      });

      const handleReplyClick = (postId, commentId) => {
        setShowReplyForm({
          postId,
          commentId,
        });
        setReplyForm({
          ...replyForm,
          postId,
          commentId,
        });
      };
      


  const handleReplySubmit = (e) => {
    e.preventDefault();
    
    if (!replyForm.name || !replyForm.content) {
      return; // Basic validation
    }
    
    const { postId, commentId } = replyForm;
    
    const newReply = {
      id: postComments[postId].find(c => c.id === commentId).replies.length + 1,
      author: replyForm.name,
      initials: replyForm.name.split(' ').map(n => n[0]).join(''),
      time: "Just now",
      content: replyForm.content,
      likes: 0,
    };
    
    setPostComments((prev) => {
      const updatedComments = [...prev[postId]];
      const commentIndex = updatedComments.findIndex(c => c.id === commentId);
      
      if (commentIndex !== -1) {
        updatedComments[commentIndex] = {
          ...updatedComments[commentIndex],
          replies: [...updatedComments[commentIndex].replies, newReply],
        };
      }
      
      return {
        ...prev,
        [postId]: updatedComments,
      };
    });
    
 
    setReplyForm({
      postId: null,
      commentId: null,
      name: "",
      email: "",
      content: "",
    });
    setShowReplyForm({
      postId: null,
      commentId: null,
    });
  };



    return (
        <>

            <motion.section
                className="py-10 bg-gradient-to-br from-blue-50 to-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0066CC' }}>
                            {blogData.title}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {blogData.description}
                        </p>
                    </motion.div>

                    {/* Featured Post */}
                    <motion.div
                        className="bg-white rounded-xl overflow-hidden shadow-lg max-w-5xl mx-auto mb-16 blog-card hover:shadow-xl transition-shadow"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="md:flex">
                            <motion.div
                                className="md:w-1/2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <img
                                    src={blogData.featuredPost.author.image}
                                    alt="Featured blog post"
                                    className="w-full h-full object-cover object-center"
                                />
                            </motion.div>

                            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                                <div>
                                    <motion.div
                                        className="flex items-center mb-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {blogData.featuredPost.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 rounded-full text-xs font-semibold mr-2"
                                                style={{
                                                    backgroundColor: tag.color,
                                                    color: tag.textColor
                                                }}
                                            >
                                                {tag.label}
                                            </span>
                                        ))}
                                    </motion.div>

                                    <motion.h2
                                        className="text-2xl font-bold mb-3"
                                        style={{ color: '#0066CC' }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {blogData.featuredPost.title}
                                    </motion.h2>

                                    <motion.p
                                        className="text-gray-600 mb-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {blogData.featuredPost.excerpt}
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="flex items-center justify-between mt-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex items-center">
                                        <motion.div
                                            className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <span className="text-gray-600 font-bold">
                                                {blogData.featuredPost.author.initials}
                                            </span>
                                        </motion.div>
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {blogData.featuredPost.author.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {blogData.featuredPost.date} · {blogData.featuredPost.readTime}
                                            </p>
                                        </div>
                                    </div>
                                    <motion.button
                                        className="px-4 py-2 rounded-lg text-white font-medium transition"
                                        style={{ backgroundColor: blogData.featuredPost.button.color }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {blogData.featuredPost.button.label}
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>



            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row">
                        {/* Main Content */}
                        <div className="lg:w-2/3 lg:pr-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                    {CONTENT.header.latestArticles}
                                </h2>

                                <Search />

                                {/* Filter Categories */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {categoryData.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`category-btn px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category.id
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Blog Posts */}
                            <div className="space-y-10">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-white rounded-xl overflow-hidden shadow-md blog-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={post.image}
              alt={post.alt}
              className="w-full max-h-auto object-cover object-center"
            />
            <div className="p-6">
              {/* Post content */}
              <div className="flex items-center mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "#0066CC", color: "white" }}
                >
                  {post.category.name}
                </span>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "#0066CC" }}
              >
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4">{post.content}</p>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-bold">
                      {post.author.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {post.author.date}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    className="reaction-btn text-gray-500 hover:text-blue-600"
                    onClick={() => handleReactionClick(`post-${post.id}-like`)}
                  >
                    <i className={`${reactionStates[`post-${post.id}-like`] ? "fas" : "far"} fa-thumbs-up`}></i>
                    <span className="ml-1">{post.reactions.likes}</span>
                  </button>
                  <button
                    className={`reaction-btn ${activeCommentPostId === post.id ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                    onClick={() => handleCommentClick(post.id)}
                  >
                    <i className={`${activeCommentPostId === post.id ? "fas" : "far"} fa-comment`}></i>
                    <span className="ml-1">
                      {(postComments[post.id]?.length || 0)}
                    </span>
                  </button>
                  <button className="share-btn text-gray-500 hover:text-blue-600">
                    <i className="fas fa-share-alt"></i>
                  </button>
                </div>
              </div>

              {/* Post Comments Section - only shown when activeCommentPostId matches this post */}
              {activeCommentPostId === post.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-bold mb-4">Comments</h4>
                  
                  {/* Comments list */}
                  <div className="space-y-4 mb-6">
                    {postComments[post.id] && postComments[post.id].length > 0 ? (
                      postComments[post.id].map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-600 font-bold">
                                {comment.initials}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-bold text-gray-800">
                                  {comment.author}
                                </h5>
                                <p className="text-xs text-gray-500">{comment.time}</p>
                              </div>
                              <p className="text-gray-700 mt-1">{comment.content}</p>

                              <div className="mt-2 flex items-center space-x-4">
                                <button 
                                  className="text-xs text-gray-500 hover:text-blue-600 transition"
                                  onClick={() => handleReplyClick(post.id, comment.id)}
                                >
                                  Reply
                                </button>
                                <button
                                  className={`text-xs ${commentLikes[`post-${post.id}-comment-${comment.id}`] ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                                  onClick={() => handleCommentLike(`post-${post.id}-comment-${comment.id}`)}
                                >
                                  <i className={`${commentLikes[`post-${post.id}-comment-${comment.id}`] ? "fas" : "far"} fa-thumbs-up`}></i>
                                  <span className="ml-1">{comment.likes}</span>
                                </button>
                              </div>

                              {/* Reply form for this comment */}
                              {showReplyForm.postId === post.id && 
                               showReplyForm.commentId === comment.id && (
                                <form className="mt-3 pl-4" onSubmit={handleReplySubmit}>
                                  <div className="grid grid-cols-2 gap-2 mb-2">
                                    <input
                                      type="text"
                                      placeholder="Your name"
                                      className="px-3 py-1 border rounded text-sm"
                                      value={replyForm.name}
                                      onChange={(e) => setReplyForm({...replyForm, name: e.target.value})}
                                    />
                                    <input
                                      type="email"
                                      placeholder="Your email"
                                      className="px-3 py-1 border rounded text-sm"
                                      value={replyForm.email}
                                      onChange={(e) => setReplyForm({...replyForm, email: e.target.value})}
                                    />
                                  </div>
                                  <textarea
                                    placeholder="Your reply"
                                    className="w-full px-3 py-1 border rounded text-sm mb-2"
                                    rows="2"
                                    value={replyForm.content}
                                    onChange={(e) => setReplyForm({...replyForm, content: e.target.value})}
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

                              {/* Replies to this comment */}
                              {comment.replies.length > 0 && (
                                <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-200">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="pt-2">
                                      <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                                          <span className="text-gray-600 font-bold text-xs">
                                            {reply.initials}
                                          </span>
                                        </div>
                                        <div>
                                          <div className="flex items-center justify-between">
                                            <h6 className="font-bold text-gray-800 text-sm">
                                              {reply.author}
                                            </h6>
                                            <p className="text-xs text-gray-500">{reply.time}</p>
                                          </div>
                                          <p className="text-gray-700 text-sm mt-1">{reply.content}</p>
                                          
                                          <button
                                            className={`text-xs mt-1 ${commentLikes[`post-${post.id}-comment-${comment.id}-reply-${reply.id}`] ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                                            onClick={() => handleCommentLike(`post-${post.id}-comment-${comment.id}-reply-${reply.id}`)}
                                          >
                                            <i className={`${commentLikes[`post-${post.id}-comment-${comment.id}-reply-${reply.id}`] ? "fas" : "far"} fa-thumbs-up`}></i>
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
                  
                  {/* New comment form */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-bold text-gray-800 mb-3">Leave a comment</h5>
                    <form onSubmit={(e) => handleNewCommentSubmit(e, post.id)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Your name*"
                            className="w-full px-3 py-2 border rounded"
                            value={newComment.name}
                            onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-3 py-2 border rounded"
                            value={newComment.email}
                            onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <textarea
                        placeholder="Your comment*"
                        className="w-full px-3 py-2 border rounded mb-4"
                        rows="3"
                        value={newComment.content}
                        onChange={(e) => setNewComment({...newComment, content: e.target.value})}
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
        ))}
      </div>

                            {/* Pagination */}
                            <div className="mt-12 flex justify-center">
                                <div className="inline-flex rounded-md shadow">
                                    <a
                                        href="#"
                                        className="py-2 px-4 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        Previous
                                    </a>
                                    {CONTENT.pagination.pages.map((page) => (
                                        <a
                                            key={page}
                                            href="#"
                                            className={`py-2 px-4 border-t border-b border-gray-300 bg-white text-sm font-medium ${page === CONTENT.pagination.currentPage
                                                    ? "text-blue-600"
                                                    : "text-gray-500 hover:bg-gray-50"
                                                }`}
                                        >
                                            {page}
                                        </a>
                                    ))}
                                    <a
                                        href="#"
                                        className="py-2 px-4 border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        Next
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3 mt-12 lg:mt-0">
                            <div className="sticky top-24">
                                {/* Newsletter Subscription */}
                                <motion.div
                                    className="bg-white p-6 rounded-xl shadow-md mb-8 newsletter-animation"
                                    style={{
                                        background: "linear-gradient(135deg, #0066CC, #0052a3)",
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-bold mb-4 text-white">
                                        {CONTENT.sidebar.newsletter.title}
                                    </h3>
                                    <p className="text-gray-100 mb-4">
                                        {CONTENT.sidebar.newsletter.description}
                                    </p>

                                    <form className="space-y-3">
                                        <div>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                placeholder={CONTENT.sidebar.newsletter.placeholder}
                                                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                            />
                                        </div>
                                        <button
                                            onClick={handleSubscribe}
                                            type="submit"
                                            className="w-full py-2 rounded-lg font-medium transition"
                                            style={{ backgroundColor: "#FFAD03", color: "#333" }}
                                        >
                                            {subscribedState ? (
                                                <span className="flex items-center justify-center">
                                                    <i className="fas fa-check mr-2"></i>{" "}
                                                    {CONTENT.sidebar.newsletter.successText}
                                                </span>
                                            ) : (
                                                <span>{CONTENT.sidebar.newsletter.buttonText}</span>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>

                                {/* Popular Posts */}
                                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                                    <h3
                                        className="text-xl font-bold mb-4"
                                        style={{ color: "#0066CC" }}
                                    >
                                        {CONTENT.sidebar.popularArticles.title}
                                    </h3>

                                    <div className="space-y-4">
                                        {popularArticles.map(
                                            (article, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-start related-post"
                                                    whileHover={{ x: 5 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <img
                                                        src={article.image}
                                                        alt={article.alt}
                                                        className="w-16 h-16 rounded-md object-cover mr-3"
                                                    />
                                                    <div>
                                                        <h4 className="font-medium text-gray-800 hover:text-blue-600 transition">
                                                            {article.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {article.views}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="bg-white p-6 rounded-xl shadow-md">
                                    <h3
                                        className="text-xl font-bold mb-4"
                                        style={{ color: "#0066CC" }}
                                    >
                                        {CONTENT.sidebar.tags.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {CONTENT.sidebar.tags.items.map((tag, index) => (
                                            <motion.a
                                                key={index}
                                                href="#"
                                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition"
                                                whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {tag}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comment Section */}
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2
                        className="text-2xl font-bold mb-6"
                        style={{ color: "#0066CC" }}
                    >
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
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Name
                                    </label>
                                    <input
                                        value={formState.name}
                                        onChange={(e) =>
                                            setFormState((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email
                                    </label>
                                    <input
                                        value={formState.email}
                                        onChange={(e) =>
                                            setFormState((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="comment"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Comment
                                </label>
                                <textarea
                                    value={formState.comment}
                                    onChange={(e) =>
                                        setFormState((prev) => ({
                                            ...prev,
                                            comment: e.target.value,
                                        }))
                                    }
                                    id="comment"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                            <i className="fas fa-check mr-2"></i>{" "}
                                            {CONTENT.comments.form.successMessage}
                                        </span>
                                    ) : (
                                        <span>{CONTENT.comments.form.button}</span>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Existing Comments */}
                    <div className="space-y-6">
                        {CONTENT.comments.existing.map((comment, commentIndex) => (
                            <motion.div
                                key={commentIndex}
                                className="bg-white p-6 rounded-xl shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: commentIndex * 0.1 }}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-600 font-bold">
                                            {comment.initials}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-bold text-gray-800">
                                                {comment.author}
                                            </h4>
                                            <p className="text-sm text-gray-500">{comment.time}</p>
                                        </div>
                                        <p className="text-gray-700 mt-2">{comment.content}</p>

                                        <div className="mt-3 flex items-center space-x-4">
                                            <button className="text-sm text-gray-500 hover:text-blue-600 transition">
                                                Reply
                                            </button>
                                            <button
                                                className={`reaction-btn text-sm ${commentLikes[`comment-${commentIndex}`]
                                                        ? "text-blue-600"
                                                        : "text-gray-500"
                                                    }`}
                                                onClick={() =>
                                                    handleCommentLike(`comment-${commentIndex}`)
                                                }
                                            >
                                                <i className="far fa-thumbs-up"></i>
                                                <span className="ml-1">{comment.likes}</span>
                                            </button>
                                        </div>

                                        {/* Replies */}
                                        {comment.replies.map((reply, replyIndex) => (
                                            <div
                                                key={replyIndex}
                                                className="mt-4 ml-6 pl-4 border-l-2 border-gray-200"
                                            >
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span className="text-gray-600 font-bold">
                                                            {reply.initials}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <h5 className="font-bold text-gray-800">
                                                                {reply.author}
                                                            </h5>
                                                            <p className="text-sm text-gray-500">
                                                                {reply.time}
                                                            </p>
                                                        </div>
                                                        <p className="text-gray-700 mt-2">
                                                            {reply.content}
                                                        </p>

                                                        <div className="mt-3 flex items-center space-x-4">
                                                            <button className="text-sm text-gray-500 hover:text-blue-600 transition">
                                                                Reply
                                                            </button>
                                                            <button
                                                                className={`reaction-btn text-sm ${commentLikes[
                                                                        `comment-${commentIndex}-reply-${replyIndex}`
                                                                    ]
                                                                        ? "text-blue-600"
                                                                        : "text-gray-500"
                                                                    }`}
                                                                onClick={() =>
                                                                    handleCommentLike(
                                                                        `comment-${commentIndex}-reply-${replyIndex}`
                                                                    )
                                                                }
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
    );
};

export default Blog;