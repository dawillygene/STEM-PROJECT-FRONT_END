import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Search from "../components/Search/SearchWithDropdown";
import STATIC_COMMENTS from "../constants/Comments";
import BLOG_DATA from "../constants/blogData";
import CONTENT from "../constants/content";
import FeaturedPost from "../components/BlogComponents/FeaturedPost";
import PostCard from "../components/BlogComponents/PostCard";
import Sidebar from "../components/BlogComponents/Sidebar";
import SkeletonLoader from "../components/Common/SkeletonLoader";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(CONTENT.categories);
  const [popularArticles, setPopularArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [subscribedState, setSubscribedState] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [postComments, setPostComments] = useState(STATIC_COMMENTS);
  const [commentLikes, setCommentLikes] = useState({});
  const [formState, setFormState] = useState({ name: "", email: "", comment: "", submitted: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [postsRes, categoriesRes, popularRes] = await Promise.all([
          fetch("api/blog/posts", { signal: controller.signal }),
          fetch("api/blog/categories", { signal: controller.signal }),
          fetch("api/blog/popular", { signal: controller.signal })
        ]);
        
        if (!postsRes.ok || !categoriesRes.ok || !popularRes.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const [postsData, categoriesData, popularData] = await Promise.all([
          postsRes.json(),
          categoriesRes.json(),
          popularRes.json()
        ]);
        
        if (isMounted) {
          setPosts(postsData);
          setCategories(categoriesData);
          setPopularArticles(popularData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
    setCommentLikes(likesState);
  }, [postComments]);

  const handleSubscribe = useCallback(
    async (e) => {
      e.preventDefault();

      // Basic client-side email validation
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(formData.email)) {
        // Optionally, set an error state here to display to the user
        console.error("Invalid email format");
        return; 
      }

      setIsSubscribing(true);
      try {
        const res = await fetch("api/subscribe", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (!res.ok) throw new Error("Subscription failed");
        
        const data = await res.json();
        if (data.success) {
          setSubscribedState(true);
          setFormData({ email: "" });
          setTimeout(() => setSubscribedState(false), 5000);
        }
      } catch (err) {
        console.error("Subscription error:", err);
      } finally {
        setIsSubscribing(false);
      }
    },
    [formData]
  );

  const handleCommentSubmit = useCallback(() => {
    // TODO: Implement actual comment submission to a backend.
    // SECURITY: When implementing, ensure robust server-side validation and sanitization
    // of all fields (name, email, comment) to prevent XSS, SQL injection, etc.
    // Also, implement CSRF protection for the submission endpoint.
    setFormState(prev => ({ ...prev, submitted: true }));
    setTimeout(() => setFormState({ name: "", email: "", comment: "", submitted: false }), 2000);
  }, []);

  const handleCommentLike = useCallback((key) => {
    setCommentLikes(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const filteredPosts = useMemo(
    () => posts.filter((post) => activeCategory === "all" || post.category.id === activeCategory),
    [posts, activeCategory]
  );

  if (loading) return (
    <div className="container mx-auto px-4 py-10">
      <div className="py-10 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 lg:pr-8">
              <div className="mb-8">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded mb-8 animate-pulse"></div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  ))}
                </div>
              </div>
              <SkeletonLoader count={3} />
            </div>
            <div className="lg:w-1/3">
              <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="text-center py-10 text-red-600">
      Error: An unexpected error occurred while fetching blog content. Please try again later.
    </div>
  );

  return (
    <>
      <motion.section
        className="py-10 bg-gradient-to-br from-blue-50 to-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ y: 20 }} animate={{ y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#0066CC" }}>
              {BLOG_DATA.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{BLOG_DATA.description}</p>
          </motion.div>
          <FeaturedPost post={BLOG_DATA.featuredPost} />
        </div>
      </motion.section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 lg:pr-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{CONTENT.header.latestArticles}</h2>
                <Search />
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`category-btn px-4 py-2 rounded-full text-sm font-medium ${
                        activeCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                      }`}
                      aria-label={`Filter by ${category.name}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-10">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    activeCommentPostId={activeCommentPostId}
                    setActiveCommentPostId={setActiveCommentPostId}
                    postComments={postComments}
                    setPostComments={setPostComments}
                    commentLikes={commentLikes}
                    handleCommentLike={handleCommentLike}
                  />
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="#"
                    className="py-2 px-4 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    aria-label="Previous page"
                  >
                    Previous
                  </a>
                  {CONTENT.pagination.pages.map((page) => (
                    <a
                      key={page}
                      href="#"
                      className={`py-2 px-4 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                        page === CONTENT.pagination.currentPage
                          ? "text-blue-600"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </a>
                  ))}
                  <a
                    href="#"
                    className="py-2 px-4 border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    aria-label="Next page"
                  >
                    Next
                  </a>
                </div>
              </div>
            </div>
            <Sidebar
              popularArticles={popularArticles}
              subscribedState={subscribedState}
              setSubscribedState={setSubscribedState}
              formData={formData}
              setFormData={setFormData}
              handleSubscribe={handleSubscribe}
              isSubscribing={isSubscribing}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;