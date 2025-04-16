
import React, { useState } from "react";
import { motion } from "framer-motion";
import Search from '../components/Search/SearchWithDropdown';


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
        blogPosts: [
            {
                id: 1,
                image: "https://afrikahayat.org/wp-content/uploads/2023/12/cambodia-student-reads-class.jpg",
                alt: "STEM Classroom",
                category: "STEM Education",
                categoryId: "stem",
                title: "Building STEM Capacity in Tanzania's Secondary Schools",
                content:
                    "Tanzania's future depends on developing strong STEM capabilities in its youth. This article explores the current challenges and opportunities in building robust STEM education programs across secondary schools in Tanzania.",
                author: {
                    name: "Dr. Rose E. Matete",
                    initials: "RM",
                    date: "November 10, 2022 · 6 min read",
                },
                reactions: {
                    likes: 24,
                    comments: 8,
                },
            },
            {
                id: 2,
                image: "https://images.squarespace-cdn.com/content/v1/6037c51efd013540f2cb8756/1648654975736-FOIRDAT938BO8EKLTD3R/Milembe+girls+at+lab+slider.jpg?format=1000w",
                alt: "School Laboratory",
                category: "Laboratories",
                categoryId: "laboratories",
                title: "Designing Effective School Laboratories with Limited Resources",
                content:
                    "Practical laboratory experience is crucial for science education, but many Tanzanian schools face resource constraints. Learn how schools are creating innovative laboratory solutions with minimal resources.",
                author: {
                    name: "Dr. Ombeni W. Msuya",
                    initials: "OW",
                    date: "November 5, 2022 · 5 min read",
                },
                reactions: {
                    likes: 18,
                    comments: 5,
                },
            },
            {
                id: 3,
                image: "https://staticsb.we.org/f/52095/1152x640/c29fe47cc4/tanzania-carousel-9.jpg",
                alt: "Teacher Training",
                category: "Teacher Training",
                categoryId: "teacher",
                title: "Empowering Science Teachers: Professional Development Approaches",
                content:
                    "Well-trained teachers are the backbone of effective science education. This article discusses modern approaches to professional development for science teachers in Tanzania's secondary schools.",
                author: {
                    name: "Dr. Abdallah J. Seni",
                    initials: "AJ",
                    date: "October 28, 2022 · 7 min read",
                },
                reactions: {
                    likes: 32,
                    comments: 12,
                },
            },
            {
                id: 4,
                image:
                    "https://lsi.fsu.edu/sites/g/files/upcbnu1926/files/2024-04/IMGP2617-2.jpg",
                alt: "Community Education",
                category: "Community Engagement",
                categoryId: "community",
                title: "Engaging Parents and Communities in STEM Education",
                content:
                    "Community involvement is essential for sustainable education improvement. Discover effective strategies for engaging parents and community members in supporting STEM education initiatives in Tanzania.",
                author: {
                    name: "Christopher Emily",
                    initials: "CE",
                    date: "October 21, 2022 · 9 min read",
                },
                reactions: {
                    likes: 27,
                    comments: 9,
                },
            },
            {
                id: 5,
                image: "https://africa.unwomen.org/sites/default/files/2023-05/IMG_0329%20%281%29_1.JPG",
                alt: "Women in Science",
                category: "STEM Education",
                categoryId: "stem",
                title: "Breaking Barriers: Increasing Female Participation in STEM Fields",
                content:
                    "Gender disparities persist in STEM fields across Tanzania. This article explores innovative approaches to encourage more female students to pursue science and mathematics education.",
                author: {
                    name: "Andrew Keha Kuko",
                    initials: "AK",
                    date: "October 14, 2022 · 8 min read",
                },
                reactions: {
                    likes: 41,
                    comments: 16,
                },
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
                articles: [
                    {
                        image: "https://www.maishahuru.com/img/1%20(7).jpg",
                        alt: "Science",
                        title: "The Future of STEM Education in Tanzania",
                        views: "3,256 views",
                    },
                    {
                        image: "https://www.maishahuru.com/img/1%20(7).jpg",
                        alt: "Technology",
                        title: "Digital Tools for Science Education",
                        views: "2,841 views",
                    },
                    {
                        image:  "https://www.maishahuru.com/img/1%20(7).jpg",
                        alt: "Mathematics",
                        title: "Making Mathematics Relevant in Daily Life",
                        views: "2,547 views",
                    },
                    {
                        image:  "https://www.maishahuru.com/img/1%20(7).jpg",
                        alt: "Education",
                        title: "Community Support for Science Education",
                        views: "2,103 views",
                    },
                ],
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
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        comment: "",
        submitted: false,
    });
    const [reactionStates, setReactionStates] = useState(
        CONTENT.blogPosts.reduce((acc, post) => {
            acc[`post-${post.id}-like`] = false;
            acc[`post-${post.id}-comment`] = false;
            return acc;
        }, {})
    );
    const [commentLikes, setCommentLikes] = useState(
        CONTENT.comments.existing.reduce((acc, comment, index) => {
            acc[`comment-${index}`] = false;
            comment.replies.forEach((_, replyIndex) => {
                acc[`comment-${index}-reply-${replyIndex}`] = false;
            });
            return acc;
        }, {})
    );

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


    const handleSubscribe = (e) => {
        e.preventDefault();
        setSubscribedState(true);
    };


    const filteredPosts = CONTENT.blogPosts.filter(
        (post) => activeCategory === "all" || post.categoryId === activeCategory
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
                                    {CONTENT.categories.map((category) => (
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
                                            <div className="flex items-center mb-2">
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-semibold"
                                                    style={{ backgroundColor: "#0066CC", color: "white" }}
                                                >
                                                    {post.category}
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
                                                        className={`reaction-btn ${reactionStates[`post-${post.id}-like`]
                                                                ? "text-blue-600"
                                                                : "text-gray-500"
                                                            }`}
                                                        onClick={() =>
                                                            handleReactionClick(`post-${post.id}-like`)
                                                        }
                                                    >
                                                        <i className="far fa-thumbs-up"></i>
                                                        <span className="ml-1">{post.reactions.likes}</span>
                                                    </button>
                                                    <button
                                                        className={`reaction-btn ${reactionStates[`post-${post.id}-comment`]
                                                                ? "text-blue-600"
                                                                : "text-gray-500"
                                                            }`}
                                                        onClick={() =>
                                                            handleReactionClick(`post-${post.id}-comment`)
                                                        }
                                                    >
                                                        <i className="far fa-comment"></i>
                                                        <span className="ml-1">
                                                            {post.reactions.comments}
                                                        </span>
                                                    </button>
                                                    <button className="share-btn text-gray-500">
                                                        <i className="fas fa-share-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
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
                                        {CONTENT.sidebar.popularArticles.articles.map(
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