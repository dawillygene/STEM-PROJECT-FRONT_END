import { motion } from "framer-motion";

const About = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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


  const stemBenefits = [
    "Creates active, creative, critical, and communicative individuals",
    "Contributes to scientific and technological innovations and advancement",
    "Enhances fight against diseases, food production, and environmental protection",
    "Drives industrial development and innovations",
    "Promotes tolerance, democracy, political awareness, and respect for dignity",
    "Increases employment opportunities in the fastest-growing job categories"
  ];

  // Project objectives data
  const objectives = [
    {
      title: "Teacher Training",
      description: "Training science teachers in secondary schools to enhance their capacity and teaching methodologies."
    },
    {
      title: "Decision-Maker Involvement",
      description: "Training decision-makers to recognize the necessity of emphasizing science subjects in secondary education."
    },
    {
      title: "Community Engagement",
      description: "Training local community members and parents to participate actively in the education of their children."
    },
    {
      title: "Laboratory Enhancement",
      description: "Strengthening laboratory services for effective teaching and learning of science subjects."
    }
  ];

  
  return (
    <>
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-primary mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Background Information
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="bg-gray-50 p-8 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">The Importance of Science Education</h3>
              <p className="text-gray-700 mb-4">
                The science education field has been acknowledged to play a significant role in sustainable development all over the world. In the 21st century, science education is vital for countries' economic competitiveness, peace and security, and general quality of life.
              </p>
              <p className="text-gray-700 mb-4">
                Integration of science activities cultivates students' critical thinking skills for them to be able to analyze, evaluate, and make arguments and conclusions correctly and logically about the problems and how they can solve them.
              </p>
              <p className="text-gray-700">
                Science education is thought to improve livelihood and an important tool for the advancement of socio-economic development in almost all countries. Indeed, Science, Mathematics, and Technology (SMT) is thought to accelerate socio-economic development.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-50 p-8 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">STEM Education Benefits</h3>
              <ul className="text-gray-700 space-y-3">
                {stemBenefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <span className="text-tertiary mr-2"><i className="fas fa-check-circle mt-1"></i></span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Justification Section */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-primary mb-12">Justification of the Project</h2>
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-4">
                The STEM-related workforce has been increasingly becoming important in the 21st century and many societies tend to integrate STEM education into the education curriculum with the intention of bringing about meaningful learning among the students.
              </p>
              <p className="text-gray-700 mb-4">
                According to Smith (2019), the fastest-growing job categories are related to STEM, and about 90 percent of future jobs will require people with specialization in information and communication technology (ICT) skills.
              </p>
              <p className="text-gray-700 mb-4">
                However, it has been observed that many students tend not to join STEM-related subjects and courses in both secondary schools and universities. A recent survey of 2017 in the Dodoma Region in Tanzania indicated a serious problem of lack of science laboratories and a shortage of teachers for science subjects in secondary schools.
              </p>
              <p className="text-gray-700">
                Matete's (2022) literature-based study in Tanzania also observed a shortage of science teachers and a lack of laboratories in secondary schools that forced teachers to teach science subjects using theories instead of practical ones.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-primary mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Project Objectives
          </motion.h2>

          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-gray-700 mb-6">
              This project intends to strengthen the science related subjects in secondary schools by building capacity to science teachers on STEM related subjects to improve the quality of education that will enable the Tanzanian nation to have graduates who can survive in a competitive economy and labor market place of the 21st century.
            </p>

            <h3 className="text-xl font-semibold text-primary mb-4">Specific Objectives:</h3>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {objectives.map((obj, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border-l-4 border-secondary hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="font-semibold text-tertiary mb-2">{obj.title}</h4>
                  <p className="text-gray-700">{obj.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  );
};

export default About;