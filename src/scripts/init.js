import { setupSearchHandlers } from "./handlers/searchHandlers";
import { displayFeaturedEvents } from "./dom/featured";
import { displayWeather } from "./dom/weather";
import { fetchFeaturedEvents } from "./api/ticketmaster"; // Add this import

export const initializeApp = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      // First load featured events
      const featuredEvents = await fetchFeaturedEvents();
      await displayFeaturedEvents(featuredEvents);
      
      // Then load weather
      await displayWeather();
      
      // Finally setup search handlers
      setupSearchHandlers();
    } catch (error) {
      console.error("Initialization error:", error);
      // Show error in featured events section
      DOM.featuredEvents.innerHTML = `
        <div class="error">
          Failed to load featured content. Please refresh.
        </div>
      `;
    }
  });
};