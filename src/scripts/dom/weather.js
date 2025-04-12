import { DOM, CONFIG } from "../constants";
import { getRandomCitiesWeather } from "../api/weather";
import { showError } from "../utils/helpers";

// Loading template for consistent UI
const loadingTemplate = `
  <div class="loading weather-loading">
    <div class="spinner"></div>
    <p>Loading weather data...</p>
  </div>
`;

export const displayWeather = async () => {
  try {
    if (!DOM.weatherGrid) {
      console.warn("Weather grid element not found in DOM");
      return;
    }

    // Show loading state
    DOM.weatherGrid.innerHTML = loadingTemplate;

    // Fetch weather data with timeout
    const weatherData = await Promise.race([
      getRandomCitiesWeather(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Weather request timed out")), 10000)
      )
    ]);

    // Handle empty results
    if (!weatherData?.length) {
      showError("Weather information is currently unavailable", DOM.weatherGrid);
      return;
    }

    // Build weather cards
    const weatherCards = weatherData.map(weather => {
      const iconUrl = `${CONFIG.OPENWEATHER.ICON_URL}/${weather.icon}.png`;
      
      return `
        <div class="weather-card" role="region" 
             aria-label="Current weather in ${weather.city}">
          <h3 class="weather-city">${weather.city}</h3>
          <img class="weather-icon" 
               src="${iconUrl}" 
               alt="${weather.condition} icon"
               loading="lazy"
               width="100"
               height="100">
          <div class="weather-temp">
            ${Math.round(weather.temp)}°C
          </div>
          <div class="weather-condition">
            ${weather.condition}
          </div>
        </div>
      `;
    });

    // Smooth transition for content update
    DOM.weatherGrid.style.opacity = 0;
    setTimeout(() => {
      DOM.weatherGrid.innerHTML = weatherCards.join("");
      DOM.weatherGrid.style.opacity = 1;
    }, 300);

  } catch (error) {
    console.error("Weather display error:", error);
    showError(
      "Unable to load weather data. Please try again later.", 
      DOM.weatherGrid
    );
  }
};