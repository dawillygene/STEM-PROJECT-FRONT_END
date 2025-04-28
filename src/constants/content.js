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
      { title: "Transforming STEM Education in Tanzania", description: "New approaches in schools..." },
      { title: "Building Effective Laboratories", description: "Resources for schools..." },
      { title: "Women in STEM: Tanzanian Perspective", description: "Breaking barriers..." },
    ],
    pagination: {
      pages: [1, 2, 3],
      currentPage: 1,
    },
    sidebar: {
      newsletter: {
        title: "Stay Updated",
        description: "Subscribe to our newsletter for the latest updates on STEM education initiatives in Tanzania.",
        placeholder: "Your email address",
        buttonText: "Subscribe",
        successText: "Subscribed!",
      },
      popularArticles: { title: "Popular Articles" },
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
  
  export default CONTENT;