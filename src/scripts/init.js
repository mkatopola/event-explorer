import { DOM } from "./constants";
import { setupSearchHandlers } from "./handlers/searchHandlers";
import { displayFeaturedEvents } from "./dom/featured";
import { displayWeather } from "./dom/weather";

export const initializeApp = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      if (!DOM.weatherGrid || !DOM.featuredEvents) {
        throw new Error("Required page elements are missing");
      }

      await Promise.all([
        displayFeaturedEvents(),
        displayWeather()
      ]);
      
      setupSearchHandlers();
    } catch (error) {
      console.error("Initialization error:", error);
      if (DOM.eventGrid) {
        DOM.eventGrid.innerHTML = `
          <div class="error">
            Failed to initialize application. Please refresh the page.
          </div>
        `;
      }
    }
  });
};