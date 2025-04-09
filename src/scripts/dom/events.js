import { DOM } from "../constants";
import { fetchWeatherForecast } from "../api/weather";

export const showError = (message) => {
  DOM.eventGrid.innerHTML = `<div class="error-message">${message}</div>`;
};

const getWeatherBadge = async (event) => {
  const venue = event._embedded?.venues?.[0];
  if (!venue?.location) return '';
  
  try {
    const weather = await fetchWeatherForecast(
      venue.location.latitude,
      venue.location.longitude,
      event.dates.start.dateTime
    );
    
    return weather ? `
      <div class="weather-badge">
        <img src="${CONFIG.OPENWEATHER.ICON_URL}/${weather.weather[0].icon}.png" 
             alt="${weather.weather[0].description}">
        <span>${Math.round(weather.main.temp)}°C</span>
      </div>
    ` : '';
  } catch {
    return '';
  }
};

export const displayEvents = async (events) => {
  const eventsWithWeather = await Promise.all(
    events.map(async event => ({
      ...event,
      weatherHTML: await getWeatherBadge(event)
    }))
  );

  DOM.eventGrid.innerHTML = eventsWithWeather.map(event => `
    <div class="event-card" data-event-id="${event.id}">
      ${event.images?.[0]?.url ? 
        `<img src="${event.images[0].url}" alt="${event.name}">` : 
        '<div class="image-placeholder">No Image Available</div>'}
      <h3>${event.name}</h3>
      <div class="event-meta">
        <p>📅 ${new Date(event.dates.start.dateTime).toLocaleDateString()}</p>
        <p>📍 ${event._embedded?.venues?.[0]?.name || "Unknown venue"}</p>
      </div>
      ${event.weatherHTML}
    </div>
  `).join("");

  document.querySelectorAll(".event-card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = `event.html?eventId=${card.dataset.eventId}`;
    });
  });
};