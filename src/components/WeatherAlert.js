import React, { useState } from 'react';
import '../styles/WeatherAlert.css';

const WeatherAlert = ({ alerts }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  
  if (!alerts || alerts.length === 0) return null;
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };
  
  const toggleAlert = (index) => {
    setExpandedAlert(expandedAlert === index ? null : index);
  };
  
  return (
    <div className="weather-alerts">
      <h3>Weather Alerts</h3>
      <div className="alert-list">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className={`alert-item ${expandedAlert === index ? 'expanded' : ''}`}
            onClick={() => toggleAlert(index)}
          >
            <div className="alert-header">
              <h4>{alert.event}</h4>
              <span className="alert-arrow">
                {expandedAlert === index ? '▲' : '▼'}
              </span>
            </div>
            
            {expandedAlert === index && (
              <div className="alert-details">
                <p><strong>Source:</strong> {alert.sender_name}</p>
                <p><strong>Start:</strong> {formatTime(alert.start)}</p>
                <p><strong>End:</strong> {formatTime(alert.end)}</p>
                <p className="alert-description">{alert.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlert; 