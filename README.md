# ☁️ Weather App

A beautiful, real-time weather application that provides current weather conditions, forecasts, and weather alerts for any location worldwide. Built with React and Weather API.

![Weather App Preview](screenshot.jpg)

## 🌐 Try It Live

**[Try the live web application](https://weather-app-by-devendra.netlify.app/)**

## ✨ Features

- **Real-time Weather Data**: Current conditions with temperature, feels-like, humidity, and wind speed
- **5-Day Forecast**: Plan ahead with a 5-day weather outlook
- **Weather Alerts**: Stay informed about important weather warnings
- **Unit Conversion**: Toggle between Celsius and Fahrenheit
- **Location-based Weather**: Automatically displays weather for your current location
- **Global Search**: Look up weather for any city worldwide
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Dynamic Backgrounds**: Background changes based on current weather conditions
- **Smooth Animations**: Polished UI with subtle animations and transitions

## 🛠️ Technologies Used

- **React.js** (v19.1.0) - Frontend library
- **JavaScript** - Programming language
- **Weather API** (weatherapi.com) - Weather data provider
- **Axios** - HTTP client for API requests
- **CSS3** - Styling with custom animations and transitions
- **HTML5** - Markup language

## 🚀 Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devendra-Pudi/Weather-App.git
   cd Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your Weather API key**
   - Sign up for a free API key at [Weather API](https://www.weatherapi.com/)
   - Create a `.env` file in the root directory
   - Add your API key: `REACT_APP_WEATHER_API_KEY=your_api_key_here`
   - Or replace the placeholder API key in `src/api/weatherService.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** to view the app in your browser

## 📱 Usage

- Upon loading, the app will request permission to use your location
- The app will display current weather and forecast for your location
- Use the search box to find weather information for any city
- Toggle between Celsius and Fahrenheit using the unit buttons
- The background gradient changes based on current weather conditions
- Click on weather alerts to expand and see detailed information

## 📸 Screenshots

### App Overview
<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/app-preview.jpg" alt="Weather App Overview" width="800"/>
</p>

### Current Weather Display
<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/main-weather.jpg" alt="Current Weather Display" width="800"/>
</p>

### 5-Day Forecast
<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/forecast.jpg" alt="5-Day Forecast" width="800"/>
</p>

### Weather Alerts
<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/weather-alerts.jpg" alt="Weather Alerts" width="800"/>
</p>

### Mobile View
<div align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/mobile-view.jpg" alt="Mobile View" width="300"/>
</div>

## 🔮 Future Enhancements

- [ ] Hourly forecast with timeline visualization
- [ ] Historical weather data with charts
- [ ] Interactive weather maps
- [ ] Air quality and UV index information
- [ ] Multiple location saving/favorites
- [ ] Dark/light mode toggle
- [ ] Weather-based recommendations (clothing, activities)
- [ ] PWA support for offline access
- [ ] Additional language support

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Weather data provided by [Weather API](https://www.weatherapi.com/)
- Icons from Weather API and Google Fonts
- Inspiration from various weather applications and design patterns

## 👨‍💻 Author

Devendra Pudi - [GitHub Profile](https://github.com/Devendra-Pudi)

---

Made with ❤️ and React 
