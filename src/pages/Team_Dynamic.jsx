import { useState, useEffect } from 'react';
import teamService from '../services/teamService';
import SkeletonLoader from '../components/Common/SkeletonLoader';

const Team = () => {
  // State management
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    if (searchTerm) {
      setSearching(true);
      teamService.searchTeamMembers(searchTerm)
        .then(response => {
          if (response.success) {
            setTeamMembers(response.data.team_members);
          }
        })
        .catch(err => {
          console.error('Search error:', err);
          setError('Failed to search team members');
        })
        .finally(() => {
          setSearching(false);
        });
    } else {
      fetchTeamMembers();
    }
  }, [searchTerm]);

  /**
   * Fetch all team members from API
   */
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await teamService.getTeamMembers();
      
      if (response.success) {
        setTeamMembers(response.data.team_members);
      } else {
        setError('Failed to fetch team members');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch team members. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retry fetching data
   */
  const handleRetry = () => {
    setError(null);
    fetchTeamMembers();
  };

  /**
   * Format contact information for display
   */
  const formatContact = (contact) => {
    if (!contact) return 'N/A';
    
    const contactLines = [];
    if (contact.address) contactLines.push(contact.address);
    if (contact.email) contactLines.push(`Email: ${contact.email}`);
    if (contact.phone) contactLines.push(`Phone: ${contact.phone}`);
    
    return contactLines;
  };

  // Loading state
  if (loading) {
    return (
      <section id="team" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4 md:mb-0">Project Team Members</h2>
            <div className="relative w-full md:w-64">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <SkeletonLoader count={4} height={80} />
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="team" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <i className="fas fa-exclamation-triangle text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

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
              {searching ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-search"></i>
              )}
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
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {member.profile_image ? (
                          <img
                            src={member.profile_image}
                            alt={member.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center">
                            <i className="fas fa-user text-gray-600"></i>
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{member.name}</div>
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <i className="fab fa-linkedin mr-1"></i>
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{member.qualification}</td>
                    <td className="py-4 px-6">{member.role}</td>
                    <td className="py-4 px-6">
                      {formatContact(member.contact).map((line, i) => (
                        <p key={i} className="text-sm">
                          {line.includes('Email:') ? (
                            <span>
                              Email: 
                              <a 
                                href={`mailto:${line.split('Email: ')[1]}`}
                                className="text-blue-600 hover:text-blue-800 ml-1"
                              >
                                {line.split('Email: ')[1]}
                              </a>
                            </span>
                          ) : line.includes('Phone:') ? (
                            <span>
                              Phone: 
                              <a 
                                href={`tel:${line.split('Phone: ')[1]}`}
                                className="text-blue-600 hover:text-blue-800 ml-1"
                              >
                                {line.split('Phone: ')[1]}
                              </a>
                            </span>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    {searchTerm 
                      ? 'No team members found matching your search.' 
                      : 'No team members available at the moment.'
                    }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Team statistics or additional info */}
        {teamMembers.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            <p>
              Showing {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
