import { useState } from 'react';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Prof. Julius Nyahongo',
      qualification: 'Socio-ecology research',
      role: 'Principal Investigator (PI)',
      contact: 'P. O Box 523, Dodoma\nEmail: nyahongo.jw@gmail.com'
    },
    {
      id: 2,
      name: 'Dr. Rose E. Matete',
      qualification: 'Dr. of Philosophy in Educational Management (PhD)',
      role: 'Co PI',
      contact: 'P.O. Box 523, Dodoma\nEmail: roseem2010@gmail.com\nPhone: +255 656 829 781'
    },
    {
      id: 3,
      name: 'Dr. Ombeni W. Msuya',
      qualification: 'Dr. of Philosophy in Community Development and Educational Management (PhD)',
      role: 'Assistant Investigator (AI)',
      contact: 'P.O. Box 523, Dodoma\nEmail: owmsuya@hotmail.com\nPhone: +255 754 843 942'
    },
    {
      id: 4,
      name: 'Dr. Abdallah J. Seni',
      qualification: 'Dr. of Philosophy in Education (PhD)',
      role: 'Head of Department (EFCE)',
      contact: 'P.O. Box 523, Dodoma\nEmail: ajseni@gmail.com\nPhone: +255 756 292 703'
    }
  ];

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // Filter team members based on search term
  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.qualification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="team" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4 md:mb-0">Project Team Members</h2>
          
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search team members..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Qualification</th>
                <th className="py-4 px-6 text-left">Role in the Project</th>
                <th className="py-4 px-6 text-left">Contact Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium">{member.name}</td>
                    <td className="py-4 px-6">{member.qualification}</td>
                    <td className="py-4 px-6">{member.role}</td>
                    <td className="py-4 px-6 whitespace-pre-line">
                      {member.contact.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No team members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Team;