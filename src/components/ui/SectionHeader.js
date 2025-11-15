import React from 'react';
import '../../styles/ui/SectionHeader.css';

const SectionHeader = ({ title, subtitle, light }) => {
  return (
    <div className="section-header container">
      <h2 className={`section-title ${light ? 'light' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${light ? 'light' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;