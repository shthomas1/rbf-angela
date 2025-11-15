import React from 'react';
import '../../styles/sections/Sponsors.css';
import SectionHeader from '../ui/SectionHeader';
import { sponsorsData } from '../../data/sponsors';

const Sponsors = () => {
  return (
    <section className="sponsors-section">
      <div className="container">
        <SectionHeader
          title="Our Sponsors"
          subtitle="These amazing organizations make our hackathon possible."
        />

        <div className="sponsors-grid">
          {sponsorsData.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.url}
              className="sponsor-item"
            >
              <img src={sponsor.logo} alt={""} />
              <p className="sponsor-name">{sponsor.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;