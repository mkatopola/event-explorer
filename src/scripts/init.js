// src/scripts/init.js
import { setupSearchHandlers } from "./handlers/searchHandlers";
import { displayFeaturedEvents } from "./dom/featured";
import { displayWeather } from "./dom/weather";
import { DOM } from "./constants";

export const initializeApp = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Reset visibility state on initial load
      document.querySelector('.categories-grid').style.display = 'grid';
      document.querySelector('.featured-events').style.display = 'block';
      document.querySelector('.weather-section').style.display = 'block';
      document.querySelector('.search-results-title')?.remove();
      document.querySelector('.back-button')?.remove();

      // Load initial content
      await displayFeaturedEvents();
      await displayWeather();
      
      // Setup search functionality
      setupSearchHandlers();

    } catch (error) {
      console.error("Initialization error:", error);
      DOM.featuredEvents.innerHTML = `
        <div class="error">
          Failed to load initial content. Please refresh.
        </div>
      `;
    }
  });
};