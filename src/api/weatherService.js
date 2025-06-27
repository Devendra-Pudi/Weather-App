import axios from 'axios';

// Your Weather API key
const API_KEY = '6cb45f158987407da3f65229252706';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Current weather data API
export const getWeatherData = async (params) => {
  try {
    let queryParams = {
      key: API_KEY,
      aqi: 'yes', // Include air quality data
    };
    
    // Convert OpenWeather API params to WeatherAPI.com format
    if (params.q) {
      queryParams.q = params.q;
    } else if (params.lat && params.lon) {
      queryParams.q = `${params.lat},${params.lon}`;
    }
    
    // Add units parameter
    if (params.units === 'imperial') {
      queryParams.units = 'imperial';
    }
    
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: queryParams,
    });
    
    // Transform WeatherAPI.com response to match our app's expected format
    const transformedData = {
      name: response.data.location.name,
      coord: {
        lat: response.data.location.lat,
        lon: response.data.location.lon,
      },
      main: {
        temp: params.units === 'imperial' ? response.data.current.temp_f : response.data.current.temp_c,
        feels_like: params.units === 'imperial' ? response.data.current.feelslike_f : response.data.current.feelslike_c,
        humidity: response.data.current.humidity,
        pressure: response.data.current.pressure_mb,
      },
      weather: [
        {
          main: response.data.current.condition.text,
          description: response.data.current.condition.text,
          icon: response.data.current.condition.icon.split('/').pop(),
        },
      ],
      wind: {
        speed: params.units === 'imperial' ? response.data.current.wind_mph : response.data.current.wind_kph / 3.6, // Convert to m/s
      },
      sys: {
        country: response.data.location.country,
      },
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// Forecast API for 5 days
export const getForecastData = async (params) => {
  try {
    let queryParams = {
      key: API_KEY,
      days: 5,
    };
    
    // Convert OpenWeather API params to WeatherAPI.com format
    if (params.q) {
      queryParams.q = params.q;
    } else if (params.lat && params.lon) {
      queryParams.q = `${params.lat},${params.lon}`;
    }
    
    // Add units parameter
    if (params.units === 'imperial') {
      queryParams.units = 'imperial';
    }
    
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: queryParams,
    });
    
    // Transform the forecast data to match our app's expected format
    const transformedForecast = {
      city: {
        name: response.data.location.name,
        country: response.data.location.country,
      },
      list: response.data.forecast.forecastday.map(day => {
        return {
          date: day.date,
          timestamp: new Date(day.date).getTime() / 1000,
          main: day.day.condition.text,
          description: day.day.condition.text,
          icon: day.day.condition.icon.split('/').pop(),
          temp: params.units === 'imperial' ? day.day.avgtemp_f : day.day.avgtemp_c,
          minTemp: params.units === 'imperial' ? day.day.mintemp_f : day.day.mintemp_c,
          maxTemp: params.units === 'imperial' ? day.day.maxtemp_f : day.day.maxtemp_c,
          humidity: day.day.avghumidity,
          windSpeed: params.units === 'imperial' ? day.day.maxwind_mph : day.day.maxwind_kph / 3.6, // Convert to m/s
        };
      }),
    };
    
    return transformedForecast;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}; 