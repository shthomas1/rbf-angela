import React, { useState, useEffect } from 'react';
import '../../styles/ui/Countdown.css';

const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const Countdown = ({ targetDate, header = false }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft(targetDate));
    
    // Set up interval to update every second
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [targetDate]); // Only re-run if targetDate changes

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div className="countdown-item" key={interval}>
      <div className="countdown-number">
        {timeLeft[interval]}
      </div>
      <div className="countdown-label">
        {interval}
      </div>
    </div>
  ));

  return (
    <div className="countdown-wrapper">
      {timerComponents.length ? timerComponents : <span>The event has started!</span>}
    </div>
  );
};

export default Countdown;