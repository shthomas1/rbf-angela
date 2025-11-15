import React from 'react';
import '../../styles/sections/Team.css';
import SectionHeader from '../ui/SectionHeader';
import { FaLinkedinIn, FaGlobe, FaGithub, FaDribbble, FaMediumM } from 'react-icons/fa';
import { teamData } from '../../data/team';

const getSocialIcon = (platform) => {
  switch (platform) {
    case 'linkedin':
      return <FaLinkedinIn />;
    case 'website':
      return <FaGlobe />;
    case 'github':
      return <FaGithub />;
    case 'dribbble':
      return <FaDribbble />;
    case 'medium':
      return <FaMediumM />;
    default:
      return null;
  }
};

// Helper function to check if a social link is valid
const isValidSocialLink = (url) => {
  // Check if the URL is not null, undefined, empty string, or placeholder
  return url && url !== '#' && url !== 'N/A' && url.trim() !== '';
};

const TeamMemberCard = ({ member }) => (
  <div className="team-card">
    <div className="team-image">
      <img 
        src={member.image || `/api/placeholder/300/300?text=${member.name}`} 
        alt={member.name} 
      />
    </div>
    <div className="team-info">
      <h3 className="team-name">{member.name}</h3>
      <p className="team-role">{member.role}</p>
      <p className="team-bio">{member.bio}</p>
      <div className="team-social">
        {/* Only render social links that exist and are valid */}
        {member.social && Object.entries(member.social)
          .filter(([_, url]) => isValidSocialLink(url))
          .map(([platform, url]) => (
            <a 
              key={platform} 
              href={url} 
              className="social-icon" 
              aria-label={platform} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {getSocialIcon(platform)}
            </a>
          ))
        }
      </div>
    </div>
  </div>
);

const Team = () => {
  const organizers = teamData.filter(member => member.category === 'organizer');
  const judges = teamData.filter(member => member.category === 'judge');

  return (
    <section id="team" className="team-section">
      <div className="container">
        <SectionHeader
          title="Meet Our Team"
          subtitle="These people helped make this event possible."
        />

        {/* Organizers Section */}
        <div className="team-category">
          <h2 className="category-title">Organizers</h2>
          <div className="team-grid">
            {organizers.map((member, index) => (
              <TeamMemberCard key={`organizer-${index}`} member={member} />
            ))}
          </div>
        </div>

        {/* Judges Section */}
        <div className="team-category">
          <h2 className="category-title">Judges</h2>
          <div className="team-grid">
            {judges.map((member, index) => (
              <TeamMemberCard key={`judge-${index}`} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;