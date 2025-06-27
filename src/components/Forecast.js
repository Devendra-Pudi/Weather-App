import React from 'react';
import '../styles/Forecast.css';

const Forecast = ({ forecast, units }) => {
  if (!forecast || !forecast.list) return null;
  
  const tempUnit = units === 'metric' ? '°C' : '°F';
  
  // Format date to display day name
  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Get icon URL based on icon code
  const getIconUrl = (icon) => {
    return icon.startsWith('http') 
      ? icon 
      : `https://cdn.weatherapi.com/weather/64x64/day/${icon}`;
  };

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.list.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-date">{formatDay(day.date)}</div>
            <img 
              src={getIconUrl(day.icon)} 
              alt={day.description} 
              className="forecast-icon" 
            />
            <div className="forecast-temp">
              <span className="max-temp">{Math.round(day.maxTemp)}{tempUnit}</span>
              <span className="min-temp">{Math.round(day.minTemp)}{tempUnit}</span>
            </div>
            <div className="forecast-desc">{day.main}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast; 