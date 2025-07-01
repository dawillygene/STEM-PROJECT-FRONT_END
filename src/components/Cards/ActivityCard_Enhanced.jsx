import { useState } from 'react';
import { motion } from 'framer-motion';

const ActivityCard = ({ 
  title, 
  description, 
  iconClass, 
  color, 
  link, 
  image, 
  progress, 
  tags = [], 
  additionalInfo,
  onClick 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    primary: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    secondary: 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    tertiary: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  };

  const handleCardClick = () => {
    if (onClick) onClick();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'planned': return 'bg-gray-400';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'fas fa-check-circle text-green-500';
      case 'in-progress': return 'fas fa-clock text-blue-500';
      case 'planned': return 'fas fa-calendar text-gray-500';
      case 'delayed': return 'fas fa-exclamation-triangle text-red-500';
      default: return 'fas fa-circle text-gray-400';
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer group ${
        colorClasses[color] || colorClasses.primary
      }`}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      layout
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-20">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      <div className="relative p-6 text-white h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            {iconClass && (
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
                <i className={`${iconClass} text-xl`}></i>
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 line-clamp-2">{title}</h3>
              {progress && (
                <div className="flex items-center text-xs">
                  <i className={getStatusIcon(progress.status)}></i>
                  <span className="ml-1 capitalize">{progress.status.replace('-', ' ')}</span>
                </div>
              )}
            </div>
          </div>
          
          {link && (
            <div className="text-white/80 group-hover:text-white transition-colors">
              <i className="fas fa-external-link-alt text-sm"></i>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {progress && progress.percentage !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Progress</span>
              <span className="text-xs">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress.status)}`}
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Description */}
        <p className={`text-white/90 text-sm leading-relaxed flex-1 ${
          isExpanded ? '' : 'line-clamp-3'
        }`}>
          {description}
        </p>

        {/* Additional Info */}
        {additionalInfo && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-white/20"
          >
            <p className="text-white/80 text-xs">{additionalInfo}</p>
          </motion.div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Expand/Collapse Button */}
        {(additionalInfo || (description && description.length > 120)) && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="mt-3 text-xs text-white/80 hover:text-white transition-colors flex items-center"
          >
            {isExpanded ? (
              <>
                <i className="fas fa-chevron-up mr-1"></i>
                Show Less
              </>
            ) : (
              <>
                <i className="fas fa-chevron-down mr-1"></i>
                Show More
              </>
            )}
          </button>
        )}

        {/* Last Updated */}
        {progress && progress.last_updated && (
          <div className="mt-2 text-xs text-white/60">
            Updated: {new Date(progress.last_updated).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default ActivityCard;
