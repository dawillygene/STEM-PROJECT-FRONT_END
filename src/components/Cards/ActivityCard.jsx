const Card = ({ title, description, iconClass, color, icon_class, link, link_text, is_featured }) => {
  // Handle both old and new API field names
  const displayIconClass = icon_class || iconClass;
  
  return (
    <div className={`bg-gray-50 p-6 rounded-lg shadow-custom hover:shadow-lg transition-all ${is_featured ? 'ring-2 ring-blue-500' : ''}`}>
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mb-4"
        style={{ backgroundColor: color }}
      >
        <i className={displayIconClass}></i>
      </div>
      <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      {link && link_text && (
        <a 
          href={link}
          className="inline-block text-blue-600 hover:text-blue-800 font-medium underline"
        >
          {link_text}
        </a>
      )}
    </div>
  );
};

export default Card;