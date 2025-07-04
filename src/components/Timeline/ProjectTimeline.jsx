import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline';

/**
 * Project Timeline component for About page
 * 
 * @author Elia William Mariki (@dawillygene)
 * @param {Object} props - Component props
 * @param {Array} props.timelineData - Timeline data array
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onPhaseClick - Callback for phase click
 */
const ProjectTimeline = ({ timelineData = [], loading = false, onPhaseClick }) => {
  const [selectedPhase, setSelectedPhase] = useState(null);

  // Default timeline data if none provided
  const defaultTimelineData = [
    {
      id: 1,
      title: "Project Planning & Preparation",
      description: "Initial research, stakeholder identification, and project framework development",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "completed",
      progress: 100,
      milestones: [
        { id: 1, title: "Stakeholder Analysis", completed: true },
        { id: 2, title: "Curriculum Review", completed: true },
        { id: 3, title: "Resource Assessment", completed: true }
      ]
    },
    {
      id: 2,
      title: "Teacher Training Program Development",
      description: "Design and development of comprehensive STEM teacher training curriculum",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      status: "completed",
      progress: 100,
      milestones: [
        { id: 1, title: "Training Materials Creation", completed: true },
        { id: 2, title: "Expert Consultation", completed: true },
        { id: 3, title: "Pilot Testing", completed: true }
      ]
    },
    {
      id: 3,
      title: "Implementation Phase 1",
      description: "Initial rollout of training programs in selected secondary schools",
      startDate: "2024-04-01",
      endDate: "2024-09-30",
      status: "in-progress",
      progress: 75,
      milestones: [
        { id: 1, title: "School Selection", completed: true },
        { id: 2, title: "Teacher Recruitment", completed: true },
        { id: 3, title: "Training Sessions", completed: false }
      ]
    },
    {
      id: 4,
      title: "Laboratory Enhancement",
      description: "Upgrading and equipping science laboratories with modern equipment",
      startDate: "2024-06-01",
      endDate: "2024-12-31",
      status: "in-progress",
      progress: 45,
      milestones: [
        { id: 1, title: "Equipment Procurement", completed: true },
        { id: 2, title: "Lab Setup", completed: false },
        { id: 3, title: "Quality Testing", completed: false }
      ]
    },
    {
      id: 5,
      title: "Community Engagement",
      description: "Engaging local communities and parents in STEM education initiatives",
      startDate: "2024-08-01",
      endDate: "2025-03-31",
      status: "planned",
      progress: 10,
      milestones: [
        { id: 1, title: "Community Mapping", completed: false },
        { id: 2, title: "Awareness Campaigns", completed: false },
        { id: 3, title: "Parent Workshops", completed: false }
      ]
    },
    {
      id: 6,
      title: "Evaluation & Scaling",
      description: "Project evaluation, impact assessment, and preparation for scaling",
      startDate: "2024-10-01",
      endDate: "2025-06-30",
      status: "planned",
      progress: 5,
      milestones: [
        { id: 1, title: "Impact Assessment", completed: false },
        { id: 2, title: "Scaling Strategy", completed: false },
        { id: 3, title: "Documentation", completed: false }
      ]
    }
  ];

  const data = timelineData.length > 0 ? timelineData : defaultTimelineData;

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <PlayIcon className="w-6 h-6 text-blue-500" />;
      case 'planned':
        return <ClockIcon className="w-6 h-6 text-gray-400" />;
      default:
        return <ClockIcon className="w-6 h-6 text-gray-400" />;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get progress bar color
  const getProgressColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'planned':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  // Handle phase click
  const handlePhaseClick = (phase) => {
    setSelectedPhase(selectedPhase?.id === phase.id ? null : phase);
    onPhaseClick?.(phase);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.map((phase, index) => (
        <motion.div
          key={phase.id}
          variants={itemVariants}
          className={`bg-white p-6 rounded-lg shadow-md border-l-4 cursor-pointer transition-all duration-300 ${
            selectedPhase?.id === phase.id ? 'border-l-blue-500 shadow-lg' : 'border-l-gray-200'
          }`}
          onClick={() => handlePhaseClick(phase)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(phase.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {phase.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(phase.status)}`}>
                    {phase.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {phase.description}
                </p>
                
                {/* Timeline dates */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <span>
                    <strong>Start:</strong> {new Date(phase.startDate).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>End:</strong> {new Date(phase.endDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">{phase.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${getProgressColor(phase.status)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${phase.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Milestones */}
                {selectedPhase?.id === phase.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <h4 className="font-semibold text-gray-700 mb-3">Key Milestones</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {milestone.completed && (
                              <CheckCircleIcon className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            milestone.completed ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectTimeline;
