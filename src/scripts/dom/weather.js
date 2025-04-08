import { DOM, CONFIG } from "../constants";

export const displayWeather = () => {
  DOM.weatherGrid.innerHTML = CONFIG.SAMPLE_WEATHER.map(city => `
    <div class="weather-card">
      <h3>${city.city}</h3>
      <div class="weather-icon">${city.icon}</div>
      <p>${city.temp}</p>
      <p>${city.condition}</p>
    </div>
  `).join("");
};