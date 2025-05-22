
import Hero from '../layouts/Hero';
import { CARD_DATA } from '../constants/activities';
import Card from '../components/Cards/ActivityCard';
import { OUTCOME_DATA } from '../constants/outcomeData';
import OutcomeItem from '../components/Cards/OutcomeItem';

const Home = () => {
  return (
  <>
  <Hero />
  <section id="activities" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
          Main Activities of the Project
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARD_DATA.map((card) => (
            <Card 
              key={card.id}
              title={card.title}
              description={card.description}
              iconClass={card.iconClass}
              color={card.color}
            />
          ))}
        </div>
      </div>
    </section>
    <section id="outcomes" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-12 section-heading">
          Proposed Project Outcomes
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-custom">
          <p className="text-gray-700 mb-6">
            After the project implementation, it is expected to yield the following outcomes:
          </p>

          <div className="space-y-6">
            {OUTCOME_DATA.map((outcome) => (
              <OutcomeItem 
                key={outcome.id}
                title={outcome.title}
                description={outcome.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className="py-16  bg-white ">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-primary mb-12 section-heading">Project Monitoring and Evaluation</h2>
            <div className="bg-white p-8 rounded-lg shadow-custom">
                <p className="text-gray-700 mb-4">The project team will ensure that all activities are carried out as planned through regular follow-ups. Questionnaires will be used to get feedback from science teachers and students. Interviews will be employed for the school heads and
                    educational leaders on the perceived impact of the program.</p>
            </div>
        </div>
    </section>
    <section className="py-16  bg-gray-100">
    <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-primary mb-8 section-heading">Ethical Concerns</h2>
            <div className="bg-white p-8 rounded-lg shadow-custom">
            <p className="text-gray-700 mb-4">All ethical concerns will be observed such as seeking the ethical research clearance letter, routing it to the respective Regional Administration Office (RAS), District Administrative Office (DAS), and District Directors (DDs), seeking the consent of the participants to take part in the study and keeping the collected information confidentially.</p>
        </div>
        </div>
    </section>
  </>
  )
}

export default Home