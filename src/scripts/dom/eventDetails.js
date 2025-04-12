import { DOM, CONFIG } from "../constants";
import { fetchWeatherForecast } from "../api/weather";

export const createWeatherWidget = (weather) => {
  if (!weather) return '<p class="weather-error">Weather data unavailable</p>';
  
  return `
    <div class="weather-widget">
      <div class="weather-main">
        <img src="${CONFIG.OPENWEATHER.ICON_URL}/${weather.weather[0].icon}.png" 
             alt="${weather.weather[0].description}"
             aria-hidden="true">
        <div>
          <h3>${Math.round(weather.main.temp)}°C</h3>
          <p>${weather.weather[0].main}</p>
        </div>
      </div>
      <div class="weather-details">
        <div><span>Feels like</span> ${Math.round(weather.main.feels_like)}°C</div>
        <div><span>Humidity</span> ${weather.main.humidity}%</div>
        <div><span>Wind</span> ${Math.round(weather.wind.speed)} m/s</div>
      </div>
    </div>
  `;
};

export const displayEventDetails = async (event) => {
  const venue = event._embedded?.venues?.[0] || {};
  let weatherHTML = '<p>Weather data not available</p>';
  
  if (venue.location) {
    const weather = await fetchWeatherForecast(
      venue.location.latitude,
      venue.location.longitude,
      event.dates.start.dateTime
    );
    if (weather) weatherHTML = createWeatherWidget(weather);
  }

  DOM.eventDetails.innerHTML = `
    <div class="event-header">
      <h1>${event.name}</h1>
      ${event.images?.[0]?.url ? 
        `<img src="${event.images[0].url}" alt="${event.name}">` : 
        '<div class="image-placeholder">No Image Available</div>'}
    </div>
    
    <div class="details-grid">
      <div class="details-card">
        <h2>📅 Date & Time</h2>
        <p>${new Date(event.dates.start.dateTime).toLocaleString()}</p>
      </div>
      
      <div class="details-card">
        <h2>📍 Venue</h2>
        <p>${venue.name || "Not specified"}</p>
        ${venue.address?.line1 ? `<p>${venue.address.line1}</p>` : ''}
        ${venue.city?.name ? `<p>${venue.city.name}, ${venue.state?.stateCode}</p>` : ''}
      </div>
      
      <div class="details-card weather-card">
        <h2>🌤️ Event Weather</h2>
        ${weatherHTML}
      </div>
      
      <div class="details-card">
        <h2>🎟️ Tickets</h2>
        <a href="${event.url}" target="_blank" class="ticket-button">
          Buy Tickets on Ticketmaster
        </a>
        ${event.priceRanges ? `
          <div class="price-range">
            <p>From $${event.priceRanges[0].min} to $${event.priceRanges[0].max}</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;
};