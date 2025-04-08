import { sampleFeaturedEvents, sampleWeather } from './services/mockDataService.js';
import { displayEvents } from './dom/eventDisplay.js';

export function initializeFeaturedEvents(featuredEventsContainer) {
  featuredEventsContainer.innerHTML = Object.values(sampleFeaturedEvents)
    .map(event => `
      <div class="featured-event-card">
        <div class="image-placeholder">
          ${event.image ? `<img src="${event.image}" alt="${event.name}">` : 'Featured Event'}
        </div>
        <div class="featured-event-content">
          <h4>${event.name}</h4>
          <p>${new Date(event.date).toLocaleDateString()}</p>
          <p>${event.venue}</p>
        </div>
      </div>
    `).join('');
}

export function initializeWeather(weatherContainer) {
  weatherContainer.innerHTML = sampleWeather.map(city => `
    <div class="weather-card">
      <h3>${city.city}</h3>
      <div class="weather-icon">${city.icon}</div>
      <p>${city.temp}</p>
      <p>${city.condition}</p>
    </div>
  `).join('');
}