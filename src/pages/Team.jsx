import { useState, useEffect } from 'react';
import teamService from '../services/teamService';
import SkeletonLoader from '../components/Common/SkeletonLoader';
import '../styles/Team.css';

const Team = () => {
  // State management
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
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
    if (searchTerm.trim()) {
      setSearching(true);
      const searchTimeout = setTimeout(async () => {
        try {
          const response = await teamService.getTeamMembers({ search: searchTerm });
          if (response.success) {
            setFilteredMembers(response.data?.teamMembers || []);
          }
        } catch (err) {
          console.error('Search error:', err);
          // Fallback to client-side filtering if API search fails
          const filtered = (teamMembers || []).filter(member =>
            member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.qualification?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredMembers(filtered);
        } finally {
          setSearching(false);
        }
      }, 300);

      return () => clearTimeout(searchTimeout);
    } else {
      setFilteredMembers(teamMembers || []);
    }
  }, [searchTerm, teamMembers]);

  /**
   * Fetch all team members from API
   */
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await teamService.getTeamMembers();
      
      if (response.success) {
        const members = response.data?.teamMembers || [];
        setTeamMembers(members);
        setFilteredMembers(members);
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
   * Format contact information for display
   */
  const formatContact = (contact) => {
    if (!contact) return ['N/A'];
    
    // Handle both old format (string) and new format (object)
    if (typeof contact === 'string') {
      return contact.split('\n').filter(line => line.trim());
    }
    
    const contactLines = [];
    if (contact.address) contactLines.push(contact.address);
    if (contact.email) contactLines.push(`Email: ${contact.email}`);
    if (contact.phone) contactLines.push(`Phone: ${contact.phone}`);
    
    return contactLines.length > 0 ? contactLines : ['N/A'];
  };

  /**
   * Retry fetching data
   */
  const handleRetry = () => {
    setError(null);
    fetchTeamMembers();
  };

  // Loading state
  if (loading) {
    return (
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Header Loading */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse mx-auto max-w-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-lg animate-pulse mx-auto max-w-lg"></div>
          </div>
          
          {/* Search Loading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
            </div>
            <div className="w-full md:w-80 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Table Loading */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-4 px-6 text-left font-semibold">Team Member</th>
                    <th className="py-4 px-6 text-left font-semibold">Qualification</th>
                    <th className="py-4 px-6 text-left font-semibold">Role in Project</th>
                    <th className="py-4 px-6 text-left font-semibold">Contact Information</th>
                    <th className="py-4 px-6 text-left font-semibold">Research Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i}>
                      <td className="py-6 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gray-300 rounded-full animate-pulse"></div>
                          <div>
                            <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-40 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24"></div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-28"></div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-36"></div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="space-y-1">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-1"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-200">
                <i className="fas fa-exclamation-triangle text-3xl text-red-500"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Team Members</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
              >
                <i className="fas fa-redo mr-2"></i>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <i className="fas fa-users text-2xl text-primary"></i>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Project Team Members
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of professionals driving innovation and excellence in STEM education and research
          </p>
        </div>
        
        {/* Search Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800">Our Expert Team</h3>
            <p className="text-gray-600">Explore our team members and their expertise</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search team members..."
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {searching ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <i className="fas fa-search text-gray-400"></i>
              )}
            </div>
          </div>
        </div>

        {/* Professional Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-4 px-6 text-left font-semibold">Team Member</th>
                  <th className="py-4 px-6 text-left font-semibold">Qualification</th>
                  <th className="py-4 px-6 text-left font-semibold">Role in Project</th>
                  <th className="py-4 px-6 text-left font-semibold">Contact Information</th>
                  <th className="py-4 px-6 text-left font-semibold">Research Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers && filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-200">
                      {/* Team Member Column */}
                      <td className="py-6 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            {member.profileImage ? (
                              <img
                                src={member.profileImage}
                                alt={member.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-gray-200">
                                <i className="fas fa-user text-primary text-lg"></i>
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-lg">{member.name}</h4>
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm mt-1"
                              >
                                <i className="fab fa-linkedin mr-1"></i>
                                LinkedIn Profile
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Qualification Column */}
                      <td className="py-6 px-6">
                        <p className="text-gray-700 font-medium">{member.qualification}</p>
                        {member.bio && (
                          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{member.bio}</p>
                        )}
                      </td>

                      {/* Role Column */}
                      <td className="py-6 px-6">
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                          {member.role}
                        </span>
                        {member.publications && member.publications.length > 0 && (
                          <div className="mt-2 text-xs text-gray-500">
                            <i className="fas fa-book-open mr-1"></i>
                            {member.publications.length} publication{member.publications.length !== 1 ? 's' : ''}
                          </div>
                        )}
                      </td>

                      {/* Contact Column */}
                      <td className="py-6 px-6">
                        <div className="space-y-2">
                          {formatContact(member.contact).map((line, i) => (
                            <div key={i} className="text-sm">
                              {line.includes('Email:') ? (
                                <div className="flex items-center">
                                  <i className="fas fa-envelope text-primary mr-2 w-4"></i>
                                  <a 
                                    href={`mailto:${line.split('Email: ')[1]}`}
                                    className="text-primary hover:text-primary/80 transition-colors"
                                  >
                                    {line.split('Email: ')[1]}
                                  </a>
                                </div>
                              ) : line.includes('Phone:') ? (
                                <div className="flex items-center">
                                  <i className="fas fa-phone text-primary mr-2 w-4"></i>
                                  <a 
                                    href={`tel:${line.split('Phone: ')[1]}`}
                                    className="text-primary hover:text-primary/80 transition-colors"
                                  >
                                    {line.split('Phone: ')[1]}
                                  </a>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <i className="fas fa-map-marker-alt text-primary mr-2 w-4"></i>
                                  <span className="text-gray-600">{line}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Research Focus Column */}
                      <td className="py-6 px-6">
                        {member.researchInterests && member.researchInterests.length > 0 ? (
                          <div className="space-y-1">
                            {member.researchInterests.slice(0, 3).map((interest, idx) => (
                              <span 
                                key={idx}
                                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs mr-1 mb-1"
                              >
                                {interest}
                              </span>
                            ))}
                            {member.researchInterests.length > 3 && (
                              <div className="text-xs text-gray-500 mt-1">
                                +{member.researchInterests.length - 3} more areas
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Not specified</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <i className="fas fa-search text-gray-400 text-xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          {searchTerm ? 'No matching team members found' : 'No team members available'}
                        </h3>
                        <p className="text-gray-500">
                          {searchTerm 
                            ? `No results found for "${searchTerm}". Try adjusting your search.`
                            : 'Team member information will be displayed here.'
                          }
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            Clear Search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Team Statistics */}
        {filteredMembers && filteredMembers.length > 0 && (
          <div className="mt-8 flex justify-between items-center">
            <div className="text-gray-600">
              <p>
                Showing <span className="font-semibold text-primary">{filteredMembers.length}</span> team member{filteredMembers.length !== 1 ? 's' : ''}
                {searchTerm && (
                  <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>
                )}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <i className="fas fa-users mr-2"></i>
              Total team size: {filteredMembers.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;