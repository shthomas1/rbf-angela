import React from "react";
import "../../styles/sections/EventDetails.css";

const EventDetails = () => {
  return (
    <section className="event-details">
      <div className="container">
        <div className="details-container">
          <div className="detail-card">
            <div className="detail-icon">👥</div>
            <h3 className="detail-title">Who</h3>
            <p className="detail-text">Anyone Can Join</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">📅</div>
            <h3 className="detail-title">When</h3>
            <p className="detail-text">June 28-29, 2025</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">⏰</div>
            <h3 className="detail-title">Time</h3>
            <p className="detail-text">6 AM Saturday - 6 PM Sunday</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">🌐</div>
            <h3 className="detail-title">Where</h3>
            <p className="detail-text">Anywhere online</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
