// src/scripts/dom/featured.js
import { DOM, CONFIG } from "../constants";
import { getFirstValidImage } from "../utils/helpers";
import { mockFeaturedEvents } from "../mocks/featuredEvents"; // Add this import

export const displayFeaturedEvents = async () => { // Remove events parameter
  try {
    // Use mock data instead of API call
    const events = mockFeaturedEvents;
    
    if (!events?.length) {
      throw new Error("No featured events available");
    }

    DOM.featuredEvents.innerHTML = events.map(event => {
      const venue = event._embedded?.venues?.[0] || {};
      const altText = `${CONFIG.ACCESSIBILITY.ALT_TEXTS.EVENT} ${event.name}`;
      const imageUrl = getFirstValidImage(event.images) || './placeholder-event.jpg';

      return `
        <article class="featured-event-card">
          <img src="${imageUrl}" 
               alt="${altText}"
               loading="lazy">
          <div class="featured-event-content">
            <h3>${event.name}</h3>
            <p>${new Date(event.dates.start.localDate).toLocaleDateString()}</p>
            <p>${venue.name || 'Location TBA'}</p>
          </div>
        </article>
      `;
    }).join("");

  } catch (error) {
    console.error("Featured events error:", error);
    DOM.featuredEvents.innerHTML = `
      <div class="error">
        Featured events preview unavailable
      </div>
    `;
  }
};