import { getRandomCitiesWeather } from "../api/weather";

export const displayWeather = async () => {
  try {
    DOM.weatherGrid.innerHTML = "<div class='loading'>Loading weather...</div>";
    
    const weatherData = await getRandomCitiesWeather();
    
    DOM.weatherGrid.innerHTML = weatherData.map(weather => `
      <div class="weather-card">
        <h3>${weather.city}</h3>
        <img src="${CONFIG.OPENWEATHER.ICON_URL}/${weather.icon}.png" 
             alt="${weather.condition}">
        <p>${weather.temp}°C</p>
        <p>${weather.condition}</p>
      </div>
    `).join("");
    
  } catch (error) {
    DOM.weatherGrid.innerHTML = "<div class='error'>Weather data unavailable</div>";
  }
};