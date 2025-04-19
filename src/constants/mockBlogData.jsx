export const mockBlogData = {
    posts: [
      {
        id: 1,
        title: "Understanding STEM Education",
        author: {
          name: "Dr. Sarah Johnson",
          avatar: "/images/avatars/sarah.jpg",
          role: "Education Specialist"
        },
        date: "2025-04-19",
        category: "education",
        content: "STEM education is becoming increasingly important in today's technological world...",
        image: "/images/blog/stem-education.jpg",
        readTime: "5 min",
        likes: 156,
        comments: 23,
        tags: ["STEM", "Education", "Technology"]
      },
      {
        id: 2,
        title: "Latest Trends in Technology",
        author: {
          name: "Prof. Michael Chen",
          avatar: "/images/avatars/michael.jpg",
          role: "Tech Researcher"
        },
        date: "2025-04-18",
        category: "technology",
        content: "The technological landscape is constantly evolving...",
        image: "/images/blog/tech-trends.jpg",
        readTime: "7 min",
        likes: 203,
        comments: 45,
        tags: ["Technology", "Innovation", "Future"]
      }
    ],
    categories: [
      { id: 1, name: "education", count: 15 },
      { id: 2, name: "technology", count: 23 },
      { id: 3, name: "science", count: 18 },
      { id: 4, name: "mathematics", count: 12 }
    ],
    comments: [
      {
        id: 1,
        postId: 1,
        author: {
          name: "Alex Thompson",
          avatar: "/images/avatars/alex.jpg"
        },
        content: "Great insights on STEM education!",
        date: "2025-04-19",
        likes: 12
      }
    ]
  };