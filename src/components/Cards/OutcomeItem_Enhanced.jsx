import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OutcomeItem = ({ 
  title, 
  description, 
  icon = 'fas fa-target', 
  metrics = null, 
  status = 'on-track',
  milestones = [] 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'behind': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'at-risk': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track': return 'fas fa-check-circle';
      case 'behind': return 'fas fa-clock';
      case 'completed': return 'fas fa-trophy';
      case 'at-risk': return 'fas fa-exclamation-triangle';
      default: return 'fas fa-circle';
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'from-green-400 to-green-600';
    if (percentage >= 60) return 'from-blue-400 to-blue-600';
    if (percentage >= 40) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <motion.div
      className="border-l-4 border-blue-500 pl-6 pb-6 relative group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      {/* Status Indicator */}
      <div className="absolute -left-2 top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center flex-1">
            {icon && (
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <i className={`${icon} text-blue-600`}></i>
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">{title}</h4>
              {status && (
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                    <i className={`${getStatusIcon(status)} mr-1`}></i>
                    {status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {milestones && milestones.length > 0 && (
              <button
                onClick={() => setShowMilestones(!showMilestones)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="View Milestones"
              >
                <i className="fas fa-list-alt"></i>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-blue-600 transition-colors"
              title={isExpanded ? "Show Less" : "Show More"}
            >
              <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
            </button>
          </div>
        </div>

        {/* Description */}
        <p className={`text-gray-700 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
          {description}
        </p>

        {/* Metrics */}
        {metrics && (
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Progress Metrics</span>
              {metrics.timeline && (
                <span className="text-xs text-gray-500">{metrics.timeline}</span>
              )}
            </div>
            
            {/* Progress Bar */}
            {metrics.percentage !== undefined && (
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Completion</span>
                  <span className="text-sm font-semibold text-gray-800">{metrics.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(metrics.percentage)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            )}

            {/* Target vs Current */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.target && (
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{metrics.target}</div>
                  <div className="text-xs text-gray-500">Target {metrics.unit || ''}</div>
                </div>
              )}
              {metrics.current !== undefined && (
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{metrics.current}</div>
                  <div className="text-xs text-gray-500">Current {metrics.unit || ''}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Milestones */}
        <AnimatePresence>
          {showMilestones && milestones && milestones.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <h5 className="text-sm font-semibold text-gray-800 mb-3">Milestones</h5>
              <div className="space-y-2">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-md border-l-2 ${
                      milestone.completed 
                        ? 'bg-green-50 border-green-500' 
                        : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                      milestone.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {milestone.completed ? (
                        <i className="fas fa-check text-xs"></i>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm ${milestone.completed ? 'text-green-800' : 'text-gray-800'}`}>
                        {milestone.description}
                      </div>
                      {milestone.date && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(milestone.date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Details (Expanded View) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Key Indicators */}
                {metrics && (
                  <div>
                    <h6 className="text-sm font-semibold text-gray-800 mb-2">Key Indicators</h6>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {metrics.target && <li>• Target: {metrics.target} {metrics.unit || ''}</li>}
                      {metrics.current !== undefined && <li>• Current: {metrics.current} {metrics.unit || ''}</li>}
                      {metrics.timeline && <li>• Timeline: {metrics.timeline}</li>}
                    </ul>
                  </div>
                )}

                {/* Impact Areas */}
                <div>
                  <h6 className="text-sm font-semibold text-gray-800 mb-2">Expected Impact</h6>
                  <div className="text-sm text-gray-600">
                    This outcome contributes to the overall project success by enhancing educational quality and capacity building.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OutcomeItem;
