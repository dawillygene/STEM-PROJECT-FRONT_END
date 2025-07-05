// Search utility functions and data
export const SEARCH_KEYWORDS = {
  about: ['about', 'background', 'mission', 'vision', 'history', 'overview'],
  team: ['team', 'staff', 'members', 'people', 'researchers', 'faculty'],
  contact: ['contact', 'reach', 'email', 'phone', 'address', 'location'],
  gallery: ['gallery', 'photos', 'images', 'pictures', 'media'],
  blog: ['blog', 'news', 'articles', 'posts', 'updates'],
  programs: ['programs', 'activities', 'training', 'courses', 'workshops'],
  outcomes: ['outcomes', 'results', 'achievements', 'impact', 'success'],
  monitoring: ['monitoring', 'evaluation', 'assessment', 'tracking'],
  ethics: ['ethics', 'principles', 'guidelines', 'standards']
};

export const searchContent = (query) => {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    return { type: 'empty', message: 'Please enter a search term' };
  }

  // Check each category
  for (const [category, keywords] of Object.entries(SEARCH_KEYWORDS)) {
    if (keywords.some(keyword => searchTerm.includes(keyword))) {
      return { type: 'category', category, searchTerm };
    }
  }

  // If no exact match, return general search
  return { type: 'general', searchTerm };
};

export const executeSearch = (searchResult, navigate) => {
  const { type, category, searchTerm } = searchResult;

  switch (type) {
    case 'empty':
      return { success: false, message: 'Please enter a search term' };

    case 'category':
      switch (category) {
        case 'about':
          navigate('/about');
          return { success: true, message: `Navigating to About page` };
        
        case 'team':
          navigate('/team');
          return { success: true, message: `Navigating to Team page` };
        
        case 'contact':
          navigate('/contact');
          return { success: true, message: `Navigating to Contact page` };
        
        case 'gallery':
          navigate('/gallery');
          return { success: true, message: `Navigating to Gallery page` };
        
        case 'blog':
          navigate('/blog');
          return { success: true, message: `Navigating to Blog page` };
        
        case 'programs':
          // Scroll to activities section
          const activitiesSection = document.getElementById('activities');
          if (activitiesSection) {
            activitiesSection.scrollIntoView({ behavior: 'smooth' });
            return { success: true, message: `Showing programs and activities` };
          }
          return { success: false, message: 'Programs section not found' };
        
        case 'outcomes':
          // Scroll to outcomes section
          const outcomesSection = document.getElementById('outcomes');
          if (outcomesSection) {
            outcomesSection.scrollIntoView({ behavior: 'smooth' });
            return { success: true, message: `Showing project outcomes` };
          }
          return { success: false, message: 'Outcomes section not found' };
        
        case 'monitoring':
          // Scroll to monitoring section if it exists
          const monitoringSection = document.querySelector('[data-section="monitoring"]');
          if (monitoringSection) {
            monitoringSection.scrollIntoView({ behavior: 'smooth' });
            return { success: true, message: `Showing monitoring information` };
          }
          return { success: false, message: 'Monitoring section not found' };
        
        case 'ethics':
          // Scroll to ethics section if it exists
          const ethicsSection = document.querySelector('[data-section="ethics"]');
          if (ethicsSection) {
            ethicsSection.scrollIntoView({ behavior: 'smooth' });
            return { success: true, message: `Showing ethical guidelines` };
          }
          return { success: false, message: 'Ethics section not found' };
        
        default:
          return { success: false, message: 'Unknown category' };
      }

    case 'general':
    default:
      return { 
        success: false, 
        message: `No specific results found for "${searchTerm}". Try searching for: programs, activities, about, team, contact, gallery, blog, outcomes, monitoring, ethics` 
      };
  }
};

// Search suggestions for autocomplete (future enhancement)
export const getSearchSuggestions = (query) => {
  const suggestions = [];
  const searchTerm = query.toLowerCase().trim();

  if (searchTerm.length < 2) return suggestions;

  // Get matching keywords
  for (const [category, keywords] of Object.entries(SEARCH_KEYWORDS)) {
    const matchingKeywords = keywords.filter(keyword => 
      keyword.startsWith(searchTerm) || keyword.includes(searchTerm)
    );
    
    if (matchingKeywords.length > 0) {
      suggestions.push({
        category,
        keywords: matchingKeywords,
        displayText: `${category.charAt(0).toUpperCase()}${category.slice(1)}`
      });
    }
  }

  return suggestions.slice(0, 5); // Limit to 5 suggestions
};
