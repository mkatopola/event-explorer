import { DOM, CONFIG } from "../constants";
import { fetchWeatherForecast } from "../api/weather";

// Date formatting with future check
const getEventDate = (dateString) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  
  if (eventDate < today) return null;
  
  const options = { weekday: "short", month: "short", day: "numeric" };
  return eventDate.toLocaleDateString("en-US", options);
};

// Weather badge component
const getWeatherBadge = async (event) => {
  const venue = event._embedded?.venues?.[0];
  if (!venue?.location) return "";

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
    ` : "";
  } catch {
    return "";
  }
};

// Validate event date
const isValidEventDate = (dateString) => {
  const eventDate = new Date(dateString);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - CONFIG.TICKETMASTER.MAX_PAST_DAYS);
  return eventDate >= cutoffDate;
};

export const showError = (message) => {
  DOM.eventGrid.innerHTML = `<div class="error-message">${message}</div>`;
};

export const displayEvents = async (events) => {
  const validEvents = events.filter(event => 
    isValidEventDate(event.dates.start.dateTime)
  );

  if (validEvents.length === 0) {
    showError("No upcoming events found");
    return;
  }

  DOM.eventGrid.innerHTML = await Promise.all(
    validEvents.map(async event => {
      const dateString = getEventDate(event.dates.start.dateTime);
      const weatherHTML = await getWeatherBadge(event);

      return `
        <div class="event-card" data-event-id="${event.id}">
          ${event.images?.[0]?.url ? 
            `<img src="${event.images[0].url}" alt="${event.name}">` : 
            '<div class="image-placeholder">No Image Available</div>'}
          ${weatherHTML}
          <div class="event-content">
            <h3>${event.name}</h3>
            ${dateString ? `<p class="event-date">${dateString}</p>` : ""}
            <p class="event-venue">${event._embedded?.venues?.[0]?.name || "Venue TBA"}</p>
          </div>
        </div>
      `;
    })
  ).then(cards => cards.join(""));

  // Event card click handlers
  document.querySelectorAll(".event-card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = `event.html?eventId=${card.dataset.eventId}`;
    });
  });
};