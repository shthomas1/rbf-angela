import React from 'react';
import '../../styles/sections/Schedule.css';
import SectionHeader from '../ui/SectionHeader';
import { scheduleData } from '../../data/schedule';

const Schedule = () => {
  return (
    <section id="schedule" className="schedule-section">
      <div className="container">
        <SectionHeader 
          title="Event Schedule" 
          subtitle="Here's what to expect during our action-packed 36-hour hackathon experience."
        />
        
        <div className="timeline">
          {scheduleData.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-content">
                <div className="timeline-time">{item.time}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;