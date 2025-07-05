import React from 'react';

const MonitoringSection = ({ data }) => {
  if (!data || !data.monitoring_aspects?.length) {
    return (
      <section className="py-16 bg-white" data-section="monitoring">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
            Project Monitoring and Evaluation
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-custom">
            <p className="text-gray-700 mb-4">
              The project team will ensure that all activities are carried out as planned through regular follow-ups. Questionnaires will be used to get feedback from science teachers and students. Interviews will be employed for the school heads and educational leaders on the perceived impact of the program.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" style={{ backgroundColor: data.background_color || 'white' }} data-section="monitoring">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
          {data.title}
        </h2>
        <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          {data.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {data.monitoring_aspects
            .filter(aspect => aspect.is_published)
            .sort((a, b) => a.order - b.order)
            .map((aspect) => (
              <div key={aspect.id} className="bg-white rounded-lg shadow-custom p-6">
                <div className="flex items-start space-x-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: aspect.color }}
                  >
                    <i className={`${aspect.icon_class} text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {aspect.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {aspect.description}
                    </p>
                    
                    {aspect.metrics && aspect.metrics.length > 0 && (
                      <div className="space-y-2">
                        {aspect.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                            <span className="text-sm font-medium text-gray-700">
                              {metric.name}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold" style={{ color: aspect.color }}>
                                {metric.value}
                              </span>
                              {metric.trend && (
                                <i className={`fas fa-arrow-${metric.trend === 'up' ? 'up' : metric.trend === 'down' ? 'down' : 'right'} text-sm ${
                                  metric.trend === 'up' ? 'text-green-500' : 
                                  metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                                }`}></i>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;
