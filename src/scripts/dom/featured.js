import { DOM, CONFIG } from "../constants";

export const displayFeaturedEvents = () => {
  DOM.featuredEvents.innerHTML = Object.values(CONFIG.SAMPLE_FEATURED)
    .map(event => `
      <div class="featured-event-card">
        ${event.image ? 
          `<img src="${event.image}" alt="${event.name}">` : 
          '<div class="image-placeholder">Featured Event</div>'}
        <div class="featured-event-content">
          <h4>${event.name}</h4>
          <p>${new Date(event.date).toLocaleDateString()}</p>
          <p>${event.venue}</p>
        </div>
      </div>
    `).join("");
};