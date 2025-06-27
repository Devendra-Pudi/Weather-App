import React, { useState, useEffect, useCallback } from 'react';
import { getWeatherData, getForecastData } from './api/weatherService';
import SearchBox from './components/SearchBox';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import WeatherAlert from './components/WeatherAlert';
import './styles/App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState('metric'); // metric or imperial

  // Apply background based on weather condition
  useEffect(() => {
    if (weather && weather.weather && weather.weather[0]) {
      const condition = weather.weather[0].main.toLowerCase();
      const isNight = new Date().getHours() > 18 || new Date().getHours() < 6;
      
      // Remove all condition classes
      document.body.classList.remove('clear', 'clouds', 'rain', 'snow', 'night');
      
      if (isNight) {
        document.body.classList.add('night');
      } else if (condition.includes('clear')) {
        document.body.classList.add('clear');
      } else if (condition.includes('cloud') || condition.includes('overcast')) {
        document.body.classList.add('clouds');
      } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
        document.body.classList.add('rain');
      } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) {
        document.body.classList.add('snow');
      }
    }
  }, [weather]);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      setLoading(true);
      setError('');
      
      const weatherData = await getWeatherData({ lat, lon, units });
      setWeather(weatherData);
      
      const forecastData = await getForecastData({ lat, lon, units });
      setForecast(forecastData);
      
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  }, [units]);

  const fetchWeatherByCity = useCallback(async (city) => {
    try {
      setLoading(true);
      setError('');
      
      const weatherData = await getWeatherData({ q: city, units });
      setWeather(weatherData);
      
      // Use coordinates from weather data to get forecast
      const { coord } = weatherData;
      const forecastData = await getForecastData({ 
        lat: coord.lat, 
        lon: coord.lon,
        units 
      });
      setForecast(forecastData);
      
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  }, [units]);

  useEffect(() => {
    // Get user's location weather on initial load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to a major city if geolocation fails
          fetchWeatherByCity('London');
        }
      );
    } else {
      fetchWeatherByCity('London');
    }
  }, [fetchWeatherByCoords, fetchWeatherByCity]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherByCity(query);
    }
  };

  const toggleUnits = useCallback(() => {
    setUnits(prevUnits => {
      const newUnits = prevUnits === 'metric' ? 'imperial' : 'metric';
      
      // Refetch data with new units
      if (weather && weather.coord) {
        fetchWeatherByCoords(weather.coord.lat, weather.coord.lon);
      } else if (query.trim()) {
        fetchWeatherByCity(query);
      } else {
        fetchWeatherByCity('London');
      }
      
      return newUnits;
    });
  }, [weather, query, fetchWeatherByCoords, fetchWeatherByCity]);

  return (
    <div className="app">
      <div className="container">
        <h1 className="app-title">Weather App</h1>
        
        <SearchBox 
          query={query} 
          setQuery={setQuery} 
          handleSearch={handleSearch} 
          units={units}
          toggleUnits={toggleUnits}
        />
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        ) : (
          <div className="content-wrapper">
            {weather && <WeatherDisplay weather={weather} units={units} />}
            
            {forecast && <Forecast forecast={forecast} units={units} />}
            
            {weather && weather.alerts && (
              <WeatherAlert alerts={weather.alerts} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 