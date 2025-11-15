import React from 'react';
import '../../styles/sections/Benefits.css';
import SectionHeader from '../ui/SectionHeader';
import { benefitsData } from '../../data/benefits';

const Benefits = () => {
  return (
    <section id="benefits" className="benefits-section">
      <div className="container">
        <SectionHeader 
          title="Why Participate?" 
        />
        
        <div className="benefits-grid">
          {benefitsData.map((benefit, index) => (
            <div 
              className={`benefit-card benefit-card-${index % 3}`} 
              key={index}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;