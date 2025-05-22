import { useState } from 'react';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const galleryData = [
    {
      id: 1,
      category: 'campus',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'University Main Campus',
      description: 'Aerial view of The University of Dodoma\'s main campus showcasing modern educational facilities.',
      tags: ['Campus Life']
    },
    {
      id: 2,
      category: 'campus',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'University Library',
      description: 'Students utilizing the modern library resources for research and studies.',
      tags: ['Campus Life']
    },
    {
      id: 3,
      category: 'stem',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Mathematics Instruction',
      description: 'Engaging mathematics lesson emphasizing problem-solving skills for secondary students.',
      tags: ['STEM Education']
    },
    {
      id: 4,
      category: 'stem',
      image: 'https://images.unsplash.com/photo-1564894809611-1742fc40ed80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Technology Integration',
      description: 'Students using computers and digital tools to enhance their learning experience in STEM subjects.',
      tags: ['STEM Education']
    },
    {
      id: 5,
      category: 'labs',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Chemistry Laboratory',
      description: 'Well-equipped chemistry laboratory for practical experiments and scientific research.',
      tags: ['Laboratories']
    },
    {
      id: 6,
      category: 'labs',
      image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Physics Laboratory',
      description: 'Students conducting physics experiments with modern equipment and professional guidance.',
      tags: ['Laboratories']
    },
    {
      id: 7,
      category: 'teacher',
      image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Teacher Professional Development',
      description: 'Science teachers participating in hands-on professional development workshops.',
      tags: ['Teacher Training']
    },
    {
      id: 8,
      category: 'teacher',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Curriculum Development Session',
      description: 'Educators collaborating on developing innovative STEM curriculum materials.',
      tags: ['Teacher Training']
    },
    {
      id: 9,
      category: 'community',
      image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Community STEM Workshop',
      description: 'Engaging local communities through interactive STEM workshops and demonstrations.',
      tags: ['Community Engagement']
    },
    {
      id: 10,
      category: 'community',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Parent-Teacher Meeting',
      description: 'Parents and teachers discussing strategies to support students\' interest in science.',
      tags: ['Community Engagement']
    },
    {
      id: 11,
      category: 'stem labs',
      image: 'https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Biology Research Project',
      description: 'Students engaged in advanced biology research using microscopes and lab equipment.',
      tags: ['STEM Education', 'Laboratories']
    },
    {
      id: 12,
      category: 'teacher community',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Teacher-Community Partnership',
      description: 'Teachers and community members collaborating on educational initiatives.',
      tags: ['Teacher Training', 'Community Engagement']
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'campus', label: 'Campus Life' },
    { id: 'stem', label: 'STEM Education' },
    { id: 'labs', label: 'Laboratories' },
    { id: 'teacher', label: 'Teacher Training' },
    { id: 'community', label: 'Community Engagement' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category.includes(activeFilter));

  return (
    <div>
      <header className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary">Gallery</h1>
          <p className="text-gray-600 mt-2">
            Explore visual highlights from our STEM education enhancement programs
          </p>
          <div className="flex items-center mt-2">
            <span className="text-tertiary">
              <i className="fas fa-home mr-2"></i>
            </span>
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary font-medium">Gallery</span>
          </div>
        </div>
      </header>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full border font-medium transition-all ${
                  activeFilter === category.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <GalleryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const GalleryItem = ({ item }) => {
  const getTagColor = (tag) => {
    switch(tag) {
      case 'Campus Life': return '#0066CC';
      case 'STEM Education': return '#FD9148';
      case 'Laboratories': return '#FFAD03';
      case 'Teacher Training': return '#0066CC';
      case 'Community Engagement': return '#FD9148';
      default: return '#0066CC';
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-white px-2 py-1 rounded-full"
              style={{ backgroundColor: getTagColor(tag) }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;