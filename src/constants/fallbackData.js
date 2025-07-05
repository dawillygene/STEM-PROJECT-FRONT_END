// Fallback data for when API is not available
export const FALLBACK_HOMEPAGE_DATA = {
  hero: {
    title: "Enhancing Mathematics and Science Education in Secondary Schools in Tanzania",
    subtitle: "A Partnership Program with the Ministry of Education Science and Technology (MoEST) sponsored by The United Nations Children's Fund (UNICEF)",
    description: "Our comprehensive STEM programs are revolutionizing science education across Tanzania, providing teachers and students with modern tools and methodologies.",
    background_gradient: "from-[#0066CC] to-[#FD9148]",
    cta_text: "Learn More",
    cta_link: "/about",
    search_placeholder: "Search for programs...",
    search_enabled: true,
    is_published: true
  },
  activities: {
    title: "Main Activities of the Project",
    subtitle: "Comprehensive STEM education programs making a difference",
    background_color: "white",
    activities: [
      {
        id: 1,
        title: "Teacher Training Programs",
        description: "Comprehensive professional development for secondary school science teachers",
        icon_class: "fas fa-graduation-cap",
        color: "#1976d2",
        link: "/programs/teacher-training",
        link_text: "Learn More",
        is_featured: true,
        is_published: true,
        order: 1
      },
      {
        id: 2,
        title: "Laboratory Enhancement",
        description: "Upgrading science laboratories with modern equipment and resources",
        icon_class: "fas fa-flask",
        color: "#FD9148",
        link: "/programs/lab-enhancement",
        link_text: "Explore",
        is_featured: false,
        is_published: true,
        order: 2
      },
      {
        id: 3,
        title: "Curriculum Development",
        description: "Creating comprehensive science curricula aligned with international standards",
        icon_class: "fas fa-book",
        color: "#10b981",
        link: "/programs/curriculum",
        link_text: "Discover",
        is_featured: false,
        is_published: true,
        order: 3
      }
    ]
  },
  outcomes: {
    title: "Proposed Project Outcomes",
    description: "After the project implementation, it is expected to yield the following outcomes:",
    background_color: "#f8f9fa",
    content_background: "white",
    outcomes: [
      {
        id: 1,
        title: "Teachers Trained",
        description: "Secondary school science teachers have completed our comprehensive training programs",
        value: "500",
        unit: "Teachers",
        icon_class: "fas fa-graduation-cap",
        color: "#1976d2",
        type: "metric",
        is_featured: false,
        is_published: true,
        additional_info: "Across 15 regions in Tanzania",
        order: 1
      },
      {
        id: 2,
        title: "Student Performance Improvement",
        description: "Improvement in science subject performance among participating students",
        value: "75",
        unit: "%",
        icon_class: "fas fa-chart-line",
        color: "#10b981",
        type: "achievement",
        is_featured: true,
        is_published: true,
        additional_info: "Compared to baseline assessment",
        order: 2
      },
      {
        id: 3,
        title: "Schools Equipped",
        description: "Secondary schools have been equipped with modern science laboratory equipment",
        value: "150",
        unit: "Schools",
        icon_class: "fas fa-school",
        color: "#FD9148",
        type: "metric",
        is_featured: false,
        is_published: true,
        additional_info: "With complete laboratory setups",
        order: 3
      }
    ]
  },
  monitoring: {
    title: "Project Monitoring and Evaluation",
    description: "Continuous assessment and improvement of our STEM education programs",
    background_color: "white",
    monitoring_aspects: [
      {
        id: 1,
        title: "Quality Assurance",
        description: "Regular assessment of training quality and effectiveness",
        icon_class: "fas fa-shield-alt",
        color: "#0066CC",
        metrics: [
          {
            name: "Training Satisfaction",
            value: "94%",
            trend: "up"
          },
          {
            name: "Knowledge Retention",
            value: "87%",
            trend: "stable"
          }
        ],
        is_published: true,
        order: 1
      },
      {
        id: 2,
        title: "Impact Measurement",
        description: "Tracking long-term impact on student learning outcomes",
        icon_class: "fas fa-chart-bar",
        color: "#FFAD03",
        metrics: [
          {
            name: "Student Engagement",
            value: "78%",
            trend: "up"
          },
          {
            name: "Science Interest",
            value: "82%",
            trend: "up"
          }
        ],
        is_published: true,
        order: 2
      }
    ]
  },
  ethics: {
    title: "Ethical Concerns",
    description: "Our commitment to ethical practices in STEM education",
    background_color: "#f8f9fa",
    principles: [
      {
        id: 1,
        title: "Research Ethics",
        description: "Ensuring proper ethical clearance and research protocols",
        icon_class: "fas fa-shield-alt",
        color: "#10b981",
        details: "All ethical concerns will be observed such as seeking the ethical research clearance letter",
        is_published: true,
        order: 1
      },
      {
        id: 2,
        title: "Participant Consent",
        description: "Obtaining informed consent from all participants",
        icon_class: "fas fa-handshake",
        color: "#1976d2",
        details: "Seeking the consent of the participants to take part in the study",
        is_published: true,
        order: 2
      },
      {
        id: 3,
        title: "Data Confidentiality",
        description: "Maintaining strict confidentiality of collected information",
        icon_class: "fas fa-lock",
        color: "#FD9148",
        details: "Keeping the collected information confidentially",
        is_published: true,
        order: 3
      }
    ]
  }
};
