import { DOM, CONFIG } from "./constants";
import { fetchEventDetails } from "./api/ticketmaster";
import { fetchWeatherForecast } from "./api/weather";
import { showError, formatLocalDate } from "./utils/helpers";

const createWeatherWidget = (weather) => {
  if (!weather) return '<p class="weather-error">Weather data unavailable</p>';
  
  return `
    <div class="weather-widget">
      <div class="weather-main">
        <img src="${CONFIG.OPENWEATHER.ICON_URL}/${weather.weather[0].icon}.png" 
             alt="${weather.weather[0].description}">
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
  try {
    const venue = event._embedded?.venues?.[0] || {};
    
    // Load weather after initial content render
    const weatherHTML = venue.location ? 
      await fetchWeatherForecast(
        venue.location.latitude,
        venue.location.longitude,
        event.dates.start.dateTime
      ).then(createWeatherWidget) : 
      '<p class="weather-info">Venue location unknown</p>';

    DOM.eventDetails.innerHTML = `
      <div class="event-header">
        <h1>${event.name}</h1>
        ${event.images?.[0]?.url ? 
          `<img src="${event.images[0].url}" 
                alt="${event.name}" 
                loading="lazy">` : 
          '<div class="image-placeholder">No Image Available</div>'}
      </div>
      
      <div class="details-grid">
        <div class="details-card">
          <h2>📅 Date & Time</h2>
          <p>${formatLocalDate(event.dates.start.dateTime, venue.timezone || 'UTC')}</p>
        </div>
        
        <div class="details-card">
          <h2>📍 Venue</h2>
          <p>${venue.name || "TBA"}</p>
          ${venue.address?.line1 ? `<p>${venue.address.line1}</p>` : ''}
          ${venue.city?.name ? `<p>${venue.city.name}, ${venue.state?.stateCode || ''}</p>` : ''}
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

  } catch (error) {
    console.error("Details rendering error:", error);
    DOM.eventDetails.innerHTML = `
      <div class="error-container">
        <h2>Error Loading Event</h2>
        <p>${error.message}</p>
        <a href="index.html" class="back-button">← Return to Home</a>
      </div>
    `;
  }
};

// Initialize only after DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("eventId");

    if (!eventId) {
      showError("No event ID provided", DOM.eventDetails);
      return;
    }

    const eventData = await fetchEventDetails(eventId);
    if (!eventData) throw new Error("Event not found");
    
    await displayEventDetails(eventData);
    
  } catch (error) {
    console.error("Initialization error:", error);
    showError("Failed to load event details", DOM.eventDetails);
  }
});