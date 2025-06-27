import React from 'react';
import '../styles/WeatherDisplay.css';

const WeatherDisplay = ({ weather, units }) => {
  if (!weather) return null;

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: weatherDetails,
    wind,
    sys: { country },
  } = weather;

  const weatherIcon = weatherDetails[0].icon;
  const weatherDescription = weatherDetails[0].description;
  // Weather API uses full URLs for icons
  const iconUrl = weatherIcon.startsWith('http') 
    ? weatherIcon 
    : `https://cdn.weatherapi.com/weather/64x64/day/${weatherIcon}`;
  
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windSpeedUnit = units === 'metric' ? 'm/s' : 'mph';

  // Format current date
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="weather-display">
      <div className="weather-header">
        <h2>{name}, {country}</h2>
        <p className="date">{formattedDate}</p>
      </div>

      <div className="weather-main">
        <div className="temperature-container">
          <div className="temperature">
            <h1>{Math.round(temp)}{tempUnit}</h1>
            <p>Feels like: {Math.round(feels_like)}{tempUnit}</p>
          </div>
        </div>

        <div className="weather-icon-container">
          <img src={iconUrl} alt={weatherDescription} className="weather-icon" />
          <p className="weather-description">{weatherDescription}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{Math.round(wind.speed)} {windSpeedUnit}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 