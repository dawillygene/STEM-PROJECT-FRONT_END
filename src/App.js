import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Hero from './layouts/Hero';

function App() {
  return (
   <>
 <Header />
<Hero />

<section id="about" class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-primary mb-12 section-heading">Background Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="bg-gray-50 p-8 rounded-lg shadow-custom">
                    <h3 class="text-2xl font-semibold text-primary mb-4">The Importance of Science Education</h3>
                    <p class="text-gray-700 mb-4">The science education field has been acknowledged to play a significant role in sustainable development all over the world. In the 21st century, science education is vital for countries' economic competitiveness, peace and security,
                        and general quality of life.</p>
                    <p class="text-gray-700 mb-4">Integration of science activities cultivates students' critical thinking skills for them to be able to analyze, evaluate, and make arguments and conclusions correctly and logically about the problems and how they can solve them.</p>
                    <p class="text-gray-700">Science education is thought to improve livelihood and an important tool for the advancement of socio-economic development in almost all countries. Indeed, Science, Mathematics, and Technology (SMT) is thought to accelerate socio-economic
                        development.
                    </p>
                </div>
                <div class="bg-gray-50 p-8 rounded-lg shadow-custom">
                    <h3 class="text-2xl font-semibold text-primary mb-4">STEM Education Benefits</h3>
                    <ul class="text-gray-700 space-y-3">
                        <li class="flex items-start">
                            <span class="text-tertiary mr-2"><i class="fas fa-check-circle mt-1"></i></span>
                            <span>Creates active, creative, critical, and communicative individuals</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-tertiary mr-2"><i class="fas fa-check-circle mt-1"></i></span>
                            <span>Contributes to scientific and technological innovations and advancement</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-tertiary mr-2"><i class="fas fa-check-circle mt-1"></i></span>
                            <span>Enhances fight against diseases, food production, and environmental protection</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-tertiary mr-2"><i class="fas fa-check-circle mt-1"></i></span>
                            <span>Drives industrial development and innovations</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-tertiary mr-2"><i class="fas fa-check-circle mt-1"></i></span>
                            <span>Promotes tolerance, democracy, political awareness, and respect for dignity</span>
                        </li>
                        <li class="flex items-start">
                            <span class="text-tertiary mr-2"><i class="fas fa-check-circle mt-1"></i></span>
                            <span>Increases employment opportunities in the fastest-growing job categories</span>
                        </li>
                    </ul>
                </div>
            </div>

      
            <div class="mt-16">
                <h2 class="text-3xl font-bold text-primary mb-12 section-heading">Justification of the Project</h2>
                <div class="bg-gray-50 p-8 rounded-lg shadow-custom">
                    <p class="text-gray-700 mb-4">The STEM-related workforce has been increasingly becoming important in the 21st century and many societies tend to integrate STEM education into the education curriculum with the intention of bringing about meaningful learning among
                        the students.</p>
                    <p class="text-gray-700 mb-4">According to Smith (2019), the fastest-growing job categories are related to STEM, and about 90 percent of future jobs will require people with specialization in information and communication technology (ICT) skills.</p>
                    <p class="text-gray-700 mb-4">However, it has been observed that many students tend not to join STEM-related subjects and courses in both secondary schools and universities. A recent survey of 2017 in the Dodoma Region in Tanzania indicated a serious problem of
                        lack of science laboratories and a shortage of teachers for science subjects in secondary schools.</p>
                    <p class="text-gray-700">Matete's (2022) literature-based study in Tanzania also observed a shortage of science teachers and a lack of laboratories in secondary schools that forced teachers to teach science subjects using theories instead of practical ones.</p>
                </div>
            </div>
        </div>
    </section>


<Footer />
   </>
  );
}

export default App;
