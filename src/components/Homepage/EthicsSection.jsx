import React from 'react';

const EthicsSection = ({ data }) => {
  if (!data || !data.principles?.length) {
    return (
      <section className="py-16 bg-gray-100" data-section="ethics">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-8 section-heading">
            Ethical Concerns
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-custom">
            <p className="text-gray-700 mb-4">
              All ethical concerns will be observed such as seeking the ethical research clearance letter, routing it to the respective Regional Administration Office (RAS), District Administrative Office (DAS), and District Directors (DDs), seeking the consent of the participants to take part in the study and keeping the collected information confidentially.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" style={{ backgroundColor: data.background_color || '#f8f9fa' }} data-section="ethics">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-8 section-heading">
          {data.title}
        </h2>
        <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          {data.description}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.principles
            .filter(principle => principle.is_published)
            .sort((a, b) => a.order - b.order)
            .map((principle) => (
              <div key={principle.id} className="bg-white rounded-lg shadow-custom p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4"
                    style={{ backgroundColor: principle.color }}
                  >
                    <i className={`${principle.icon_class} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {principle.description}
                  </p>
                  {principle.details && (
                    <p className="text-sm text-gray-500 italic">
                      {principle.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default EthicsSection;
