// src/scripts/init.js
import { setupSearchHandlers } from "./handlers/searchHandlers";
import { displayFeaturedEvents } from "./dom/featured";
import { displayWeather } from "./dom/weather";

export const initializeApp = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Load mock featured events directly
      await displayFeaturedEvents(); // Modified: No parameter needed
      
      // Then load weather
      await displayWeather();
      
      // Finally setup search handlers
      setupSearchHandlers();
    } catch (error) {
      console.error("Initialization error:", error);
      DOM.featuredEvents.innerHTML = `
        <div class="error">
          Failed to load featured content. Please refresh.
        </div>
      `;
    }
  });
};